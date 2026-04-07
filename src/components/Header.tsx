import React from 'react';
import { Bot, Settings, Trash2 } from 'lucide-react';

interface HeaderProps {
  onClear: () => void;
  onSettingsClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onClear, onSettingsClick }) => {
  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-2 md:space-x-3">
        <div className="p-1.5 md:p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <Bot className="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100">
          AI Chat Assistant
        </h1>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={onClear}
          className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          title="清空对话"
        >
          <Trash2 className="w-5 h-5" />
        </button>
        <button
          onClick={onSettingsClick}
          className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
          title="设置"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
