import React, { useState, useRef, useEffect } from 'react';
import { Send, StopCircle } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  onStop: () => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, onStop, isLoading }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSend(input);
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-2 md:p-4 pb-safe-bottom">
      <div className="max-w-4xl mx-auto flex items-end space-x-2">
        <div className="flex-1 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500 transition-all duration-200 p-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入消息... (Shift+Enter 换行)"
            className="w-full max-h-[200px] min-h-[44px] bg-transparent border-none outline-none resize-none px-3 py-2 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 leading-relaxed overflow-y-auto"
            rows={1}
            disabled={isLoading}
          />
        </div>
        
        {isLoading ? (
          <button
            onClick={onStop}
            className="flex-shrink-0 p-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors mb-1 focus:outline-none focus:ring-2 focus:ring-red-500/50"
            title="停止生成"
          >
            <StopCircle className="w-6 h-6" />
          </button>
        ) : (
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`flex-shrink-0 p-3 rounded-xl transition-colors mb-1 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
              input.trim()
                ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-sm hover:shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
            title="发送消息"
          >
            <Send className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};
