import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Bot, User, Copy, RefreshCw, Check } from 'lucide-react';
import type { Message } from '../types/chat';

interface MessageBubbleProps {
  message: Message;
  onRegenerate?: () => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, onRegenerate }) => {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isSystem) {
    return (
      <div className="flex justify-center my-4">
        <span className="text-sm text-red-500 bg-red-50 px-3 py-1 rounded-full shadow-sm">
          {message.content}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'} group`}>
      <div className={`flex max-w-[90%] md:max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div
          className={`flex-shrink-0 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full shadow-lg ${
            isUser 
              ? 'bg-gradient-to-br from-blue-400 to-blue-600 shadow-blue-500/30 ml-2 md:ml-3' 
              : 'bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-emerald-500/30 mr-2 md:mr-3'
          }`}
        >
          {isUser ? (
            <User className="w-5 h-5 md:w-6 md:h-6 text-white" />
          ) : (
            <Bot className="w-5 h-5 md:w-6 md:h-6 text-white" />
          )}
        </div>

        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[calc(100%-3rem)] md:max-w-[calc(100%-4rem)]`}>
          <div
            className={`px-4 py-3 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${
              isUser
                ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-tr-none shadow-md shadow-blue-500/20'
                : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-800 dark:text-gray-100 border border-white/20 dark:border-gray-700/50 shadow-lg shadow-black/5 rounded-tl-none'
            }`}
          >
            <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none break-words">
              {isUser ? (
                <p className="whitespace-pre-wrap m-0">{message.content}</p>
              ) : (
                message.content ? (
                  <ReactMarkdown
                    components={{
                      code({ node, inline, className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={vscDarkPlus as any}
                            language={match[1]}
                            PreTag="div"
                            className="rounded-md my-2"
                            {...props}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        ) : (
                          <code
                            className={`${className} bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm`}
                            {...props}
                          >
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                ) : (
                  <div className="flex space-x-2 h-6 items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  </div>
                )
              )}
            </div>
          </div>
          
          {/* 复制和重新生成按钮 */}
          {!isUser && message.content && (
            <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2 py-1 text-xs text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md transition-colors"
                title="复制消息"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '已复制' : '复制'}</span>
              </button>
              
              {onRegenerate && (
                <button
                  onClick={onRegenerate}
                  className="flex items-center gap-1.5 px-2 py-1 text-xs text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md transition-colors"
                  title="重新生成"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>重新生成</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
