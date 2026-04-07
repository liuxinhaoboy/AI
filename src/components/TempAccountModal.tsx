import React, { useState, useEffect, useCallback } from 'react';
import { X, RefreshCw, Copy, Mail, ChevronLeft } from 'lucide-react';

interface TempAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface EmailMessage {
  id: number;
  from: string;
  subject: string;
  date: string;
}

interface EmailDetail extends EmailMessage {
  attachments: any[];
  body: string;
  textBody: string;
  htmlBody: string;
}

export const TempAccountModal: React.FC<TempAccountModalProps> = ({ isOpen, onClose }) => {
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [messages, setMessages] = useState<EmailMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedMessage, setSelectedMessage] = useState<EmailDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);

  // Generate a new email address
  const generateEmail = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1');
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          setEmailAddress(data[0]);
          setMessages([]);
          setSelectedMessage(null);
        }
      } else {
        console.error('获取邮箱失败:', response.statusText);
      }
    } catch (error) {
      console.error('获取邮箱错误:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch messages for the current email
  const fetchMessages = useCallback(async () => {
    if (!emailAddress) return;
    setLoading(true);
    const [login, domain] = emailAddress.split('@');
    try {
      const response = await fetch(`https://www.1secmail.com/api/v1/?action=getMessages&login=${login}&domain=${domain}`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        console.error('刷新收件箱失败:', response.statusText);
      }
    } catch (error) {
      console.error('刷新收件箱错误:', error);
    } finally {
      setLoading(false);
    }
  }, [emailAddress]);

  // Fetch details for a specific message
  const fetchMessageDetail = async (id: number) => {
    if (!emailAddress) return;
    setDetailLoading(true);
    const [login, domain] = emailAddress.split('@');
    try {
      const response = await fetch(`https://www.1secmail.com/api/v1/?action=readMessage&login=${login}&domain=${domain}&id=${id}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedMessage(data);
      } else {
        console.error('获取邮件详情失败:', response.statusText);
      }
    } catch (error) {
      console.error('获取邮件详情错误:', error);
    } finally {
      setDetailLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && !emailAddress) {
      generateEmail();
    }
  }, [isOpen, emailAddress]);

  const handleCopy = () => {
    if (emailAddress) {
      navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            {selectedMessage ? (
              <button
                onClick={() => setSelectedMessage(null)}
                className="p-1 -ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg transition-colors"
                title="返回"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            ) : (
              <Mail className="w-5 h-5 text-blue-500" />
            )}
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              {selectedMessage ? '邮件详情' : '临时邮箱'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg transition-colors"
            title="关闭"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {selectedMessage ? (
            <div className="space-y-4">
              <div className="border-b border-gray-100 dark:border-gray-700 pb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{selectedMessage.subject || '无主题'}</h3>
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 flex flex-col space-y-1">
                  <span>发件人: {selectedMessage.from}</span>
                  <span>时间: {selectedMessage.date}</span>
                </div>
              </div>
              <div className="prose dark:prose-invert max-w-none text-sm md:text-base text-gray-800 dark:text-gray-200">
                {detailLoading ? (
                  <div className="flex justify-center py-8">
                    <RefreshCw className="w-6 h-6 text-gray-400 animate-spin" />
                  </div>
                ) : (
                  selectedMessage.htmlBody ? (
                    <div dangerouslySetInnerHTML={{ __html: selectedMessage.htmlBody }} />
                  ) : (
                    <pre className="whitespace-pre-wrap font-sans">{selectedMessage.textBody}</pre>
                  )
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 flex items-center bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2">
                  <span className="flex-1 text-gray-900 dark:text-gray-100 truncate">
                    {emailAddress || '正在生成...'}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="ml-2 p-1.5 text-gray-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    title="复制"
                  >
                    {copied ? <span className="text-xs text-blue-500 font-medium px-1">已复制</span> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={generateEmail}
                    disabled={loading}
                    className="flex-1 md:flex-none px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors disabled:opacity-50"
                  >
                    更换邮箱
                  </button>
                  <button
                    onClick={fetchMessages}
                    disabled={loading || !emailAddress}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors shadow-sm disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    刷新
                  </button>
                </div>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                <div className="bg-gray-50 dark:bg-gray-900/50 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">收件箱</h3>
                </div>
                {messages.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    收件箱为空
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {messages.map((msg) => (
                      <li key={msg.id}>
                        <button
                          onClick={() => fetchMessageDetail(msg.id)}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors flex flex-col gap-1"
                        >
                          <div className="flex justify-between items-baseline">
                            <span className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate pr-4">
                              {msg.from}
                            </span>
                            <span className="text-xs text-gray-500 whitespace-nowrap">
                              {new Date(msg.date).toLocaleTimeString()}
                            </span>
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-300 truncate">
                            {msg.subject || '无主题'}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
