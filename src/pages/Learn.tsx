import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mic, Send, Volume2, Sparkles, AlertCircle } from 'lucide-react';
import { cn } from '../utils/cn';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  corrections?: string[];
}

const INITIAL_MESSAGES: Message[] = [
  { id: '1', role: 'ai', content: 'Hello! I\'m your AI language partner. Are you ready to practice your English presentation skills today?' }
];

export default function Learn() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Mock AI response with some corrections
    setTimeout(() => {
      setIsTyping(false);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: 'That\'s a great start! However, in a formal business context, we might want to phrase it slightly differently.',
        corrections: [
          'Instead of "I want to talk about...", try "I would like to present..."'
        ]
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-500">
      {/* Header */}
      <div className="flex items-center px-6 py-4 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <button
          onClick={() => navigate('/dashboard')}
          className="p-2 mr-4 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
              B1
            </span>
            <h2 className="font-bold text-slate-900">实战：季度汇报会议</h2>
          </div>
        </div>
        <div className="flex items-center text-sm font-medium text-slate-500">
          <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
          AI 助手在线
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 custom-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              'flex max-w-[80%]',
              msg.role === 'user' ? 'ml-auto justify-end' : 'mr-auto'
            )}
          >
            {msg.role === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-emerald-400 flex items-center justify-center mr-3 shrink-0 shadow-sm">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            )}
            
            <div className="space-y-2 flex flex-col items-end">
              <div
                className={cn(
                  'px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm',
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-sm'
                    : 'bg-white text-slate-800 border border-slate-100 rounded-tl-sm'
                )}
              >
                {msg.content}
                {msg.role === 'ai' && (
                  <button className="block mt-2 text-slate-400 hover:text-blue-600 transition-colors">
                    <Volume2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Corrections */}
              {msg.corrections && msg.corrections.length > 0 && (
                <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 w-full animate-in slide-in-from-top-2">
                  <div className="flex items-start">
                    <AlertCircle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-orange-700 uppercase tracking-wider mb-1 block">AI 语法建议</span>
                      <ul className="space-y-1">
                        {msg.corrections.map((corr, idx) => (
                          <li key={idx} className="text-sm text-orange-800">{corr}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex max-w-[80%] mr-auto">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-emerald-400 flex items-center justify-center mr-3 shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="px-5 py-4 bg-white border border-slate-100 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1">
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex items-end gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-200 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100 transition-all">
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={cn(
              'p-3 rounded-xl transition-all shrink-0',
              isRecording 
                ? 'bg-red-100 text-red-600 animate-pulse' 
                : 'bg-white text-slate-500 hover:text-blue-600 hover:bg-blue-50 shadow-sm'
            )}
          >
            <Mic className="w-6 h-6" />
          </button>
          
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="输入回复，或点击左侧麦克风语音输入..."
            className="flex-1 max-h-32 min-h-[52px] bg-transparent resize-none outline-none py-3 px-2 text-slate-800 placeholder:text-slate-400"
            rows={1}
          />
          
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-all shadow-sm shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className="text-center mt-3">
          <span className="text-xs text-slate-400 font-medium tracking-wide uppercase">
            支持 Enter 发送，Shift + Enter 换行
          </span>
        </div>
      </div>
    </div>
  );
}
