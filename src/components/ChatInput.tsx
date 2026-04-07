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
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-t border-white/20 dark:border-gray-700/50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.2)] p-2 md:p-4 pb-safe-bottom z-50">
      <div className="max-w-4xl mx-auto flex items-end space-x-2">
        <div className="flex-1 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500 transition-all duration-200 p-2">
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
            className="flex-shrink-0 p-3 bg-red-500 hover:bg-red-600 text-white rounded-2xl shadow-lg shadow-red-500/30 transition-all hover:scale-105 active:scale-95 mb-1 focus:outline-none focus:ring-2 focus:ring-red-500/50"
            title="停止生成"
          >
            <StopCircle className="w-6 h-6" />
          </button>
        ) : (
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`flex-shrink-0 p-3 rounded-2xl transition-all mb-1 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
              input.trim()
                ? 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/30 hover:scale-105 active:scale-95'
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
