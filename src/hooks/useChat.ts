import { useState, useEffect, useCallback, useRef } from 'react';
import type { Message } from '../types/chat';

const LOCAL_STORAGE_KEY = 'chat_messages';

const BUILTIN_API_POOL = [
  { url: 'https://api.chatanywhere.tech/v1/chat/completions', key: 'sk-Vf2iM0zK5qL6X3B0A5R7E4N1C8T2Y9F6' },
  { url: 'https://api.chatanywhere.com.cn/v1/chat/completions', key: 'sk-Vf2iM0zK5qL6X3B0A5R7E4N1C8T2Y9F6' },
  { url: 'https://api.chatanywhere.cn/v1/chat/completions', key: 'sk-Vf2iM0zK5qL6X3B0A5R7E4N1C8T2Y9F6' }
];

export function useChat() {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsLoading(false);
    }
  }, []);

  const sendMessage = useCallback(async (content: string, apiUrl?: string, apiKey?: string) => {
    if (!content.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const assistantMessageId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
        timestamp: Date.now(),
      },
    ]);

    let apiNodes = [];
    if (apiKey && apiKey.trim() !== '') {
      apiNodes = [{ url: apiUrl || 'https://api.openai.com/v1/chat/completions', key: apiKey }];
    } else {
      apiNodes = [...BUILTIN_API_POOL];
    }

    let success = false;
    let lastError: Error | null = null;

    const requestMessages = [...messages, newMessage].map((m) => ({
      role: m.role,
      content: m.content,
    }));

    for (let i = 0; i < apiNodes.length; i++) {
      const node = apiNodes[i];
      try {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };
        
        if (node.key) {
          headers['Authorization'] = `Bearer ${node.key}`;
        }

        const response = await fetch(node.url, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: requestMessages,
            stream: true,
          }),
          signal: abortController.signal,
        });

        if (!response.ok) {
          let errorMessage = `请求失败 (状态码: ${response.status})`;
          if (response.status === 401) {
            errorMessage = 'API Key 无效或未授权，请检查您的设置。';
          } else if (response.status === 429) {
            errorMessage = '请求过于频繁（达到速率限制），请稍后再试。';
          } else if (response.status >= 500) {
            errorMessage = 'API 服务器内部错误，请稍后重试。';
          } else if (response.status === 404) {
            errorMessage = '请求的 API 节点不存在。';
          } else if (response.status === 400) {
            errorMessage = '请求参数错误，请检查输入或配置。';
          }
          throw new Error(errorMessage);
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder('utf-8');

        if (!reader) throw new Error('无法读取响应流');

        let done = false;
        let assistantContent = '';
        let buffer = '';

        while (!done) {
          const { value, done: readerDone } = await reader.read();
          done = readerDone;

          if (value) {
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            
            buffer = lines.pop() || '';
            
            for (const line of lines) {
              const trimmedLine = line.trim();
              if (trimmedLine.startsWith('data: ') && trimmedLine !== 'data: [DONE]') {
                try {
                  const data = JSON.parse(trimmedLine.slice(6));
                  const delta = data.choices[0]?.delta?.content || '';
                  assistantContent += delta;
                  
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === assistantMessageId
                        ? { ...m, content: assistantContent }
                        : m
                    )
                  );
                } catch (e) {
                  console.error('解析数据块失败:', e);
                }
              }
            }
          }
        }

        success = true;
        break; // 请求成功，跳出重试循环
      } catch (error: any) {
        if (error.name === 'AbortError') {
          console.log('用户已停止生成');
          success = true; // 视为成功终止，不继续重试
          break;
        } else {
          console.error(`节点 ${node.url} 请求失败:`, error);
          lastError = error;
          // 如果不是最后一个节点，我们继续循环
        }
      }
    }

    if (!success) {
      setMessages((prev) => {
        const filteredMessages = prev.filter(m => !(m.id === assistantMessageId && !m.content));
        
        let errorMsg = lastError?.message || '无法连接到API，请检查网络或API Key设置。';
        if (errorMsg.includes('Failed to fetch') || errorMsg.includes('NetworkError')) {
          errorMsg = '网络连接失败，请检查您的网络连接或确认目标 API 支持跨域请求 (CORS)。';
        }

        return [
          ...filteredMessages,
          {
            id: Date.now().toString(),
            role: 'system',
            content: `请求失败: 所有可用节点均尝试失败。最后错误信息：${errorMsg}`,
            timestamp: Date.now(),
          },
        ];
      });
    }

    setIsLoading(false);
    abortControllerRef.current = null;
  }, [messages]);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
    stopGeneration,
  };
}
