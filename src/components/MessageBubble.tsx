import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Bot, User } from 'lucide-react';
import type { Message } from '../types/chat';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  if (isSystem) {
    return (
      <div className="flex justify-center my-4">
        <span className="text-sm text-red-500 bg-red-50 px-3 py-1 rounded-full">
          {message.content}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[90%] md:max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div
          className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full ${
            isUser ? 'bg-blue-500 ml-2 md:ml-3' : 'bg-emerald-500 mr-2 md:mr-3'
          }`}
        >
          {isUser ? (
            <User className="w-5 h-5 text-white" />
          ) : (
            <Bot className="w-5 h-5 text-white" />
          )}
        </div>

        <div
          className={`px-4 py-3 rounded-2xl ${
            isUser
              ? 'bg-blue-500 text-white rounded-tr-none'
              : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 shadow-sm rounded-tl-none'
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
      </div>
    </div>
  );
};
