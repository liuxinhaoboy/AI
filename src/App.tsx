import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MessageList } from './components/MessageList';
import { ChatInput } from './components/ChatInput';
import { SettingsModal } from './components/SettingsModal';
import { useChat } from './hooks/useChat';
import './App.css';

const DEFAULT_API_URL = 'https://api.chatanywhere.tech/v1/chat/completions';
// Just a placeholder or public proxy key if applicable. Or let the user fill it.
const DEFAULT_API_KEY = '';

function App() {
  const { messages, isLoading, sendMessage, clearMessages, stopGeneration } = useChat();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [apiUrl, setApiUrl] = useState(() => localStorage.getItem('apiUrl') || DEFAULT_API_URL);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('apiKey') || DEFAULT_API_KEY);

  useEffect(() => {
    localStorage.setItem('apiUrl', apiUrl);
    localStorage.setItem('apiKey', apiKey);
  }, [apiUrl, apiKey]);

  const handleSend = (content: string) => {
    sendMessage(content, apiUrl, apiKey);
  };

  const handleSaveSettings = (newUrl: string, newKey: string) => {
    setApiUrl(newUrl);
    setApiKey(newKey);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <Header
        onClear={clearMessages}
        onSettingsClick={() => setIsSettingsOpen(true)}
      />
      
      <main className="flex-1 overflow-hidden flex flex-col relative">
        <MessageList messages={messages} isLoading={isLoading} />
      </main>

      <ChatInput
        onSend={handleSend}
        onStop={stopGeneration}
        isLoading={isLoading}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiUrl={apiUrl}
        apiKey={apiKey}
        onSave={handleSaveSettings}
      />
    </div>
  );
}

export default App;
