import React from 'react';
import { Bot, Settings, Trash2, Mail, Download } from 'lucide-react';
import type { Message } from '../types/chat';

interface HeaderProps {
  onClear: () => void;
  onSettingsClick: () => void;
  onMailClick: () => void;
  messages?: Message[];
}

export const Header: React.FC<HeaderProps> = ({ onClear, onSettingsClick, onMailClick, messages = [] }) => {
  const handleExport = () => {
    if (!messages.length) {
      alert('没有可导出的聊天记录');
      return;
    }

    const content = messages
      .filter(m => m.role !== 'system')
      .map((m) => {
        const role = m.role === 'user' ? 'You' : 'AI';
        const date = new Date(m.timestamp).toLocaleString();
        return `[${date}] ${role}:\n${m.content}\n`;
      })
      .join('\n----------------------------------------\n\n');

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-history-${new Date().toISOString().replace(/[:.]/g, '-')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm border-b border-white/20 dark:border-gray-700/50 sticky top-0 z-50">
      <div className="flex items-center space-x-2 md:space-x-3">
        <div className="p-1.5 md:p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/20">
          <Bot className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </div>
        <h1 className="text-lg md:text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300">
          AI 聊天助手
        </h1>
      </div>
      <div className="flex items-center space-x-1 md:space-x-2">
        <button
          onClick={handleExport}
          className="p-2 text-gray-500 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-xl transition-all duration-200"
          title="导出聊天记录"
        >
          <Download className="w-5 h-5" />
        </button>
        <button
          onClick={onMailClick}
          className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200"
          title="临时邮箱"
        >
          <Mail className="w-5 h-5" />
        </button>
        <button
          onClick={onClear}
          className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200"
          title="清空对话"
        >
          <Trash2 className="w-5 h-5" />
        </button>
        <button
          onClick={onSettingsClick}
          className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200"
          title="设置"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
