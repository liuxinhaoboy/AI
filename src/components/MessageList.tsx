import React, { useEffect, useRef } from 'react';
import type { Message } from '../types/chat';
import { MessageBubble } from './MessageBubble';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 dark:bg-gray-900 scroll-smooth">
      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
            <span className="text-3xl text-blue-500">✨</span>
          </div>
          <p className="text-lg font-medium">Hello! How can I help you today?</p>
          <p className="text-sm mt-2 text-center max-w-sm">
            You can ask me anything, from code explanations to general knowledge questions.
          </p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          <div ref={bottomRef} className="h-4" />
        </div>
      )}
    </div>
  );
};
