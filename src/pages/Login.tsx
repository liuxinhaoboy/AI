import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Sparkles } from 'lucide-react';

export default function Login() {
  const login = useStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-2xl mb-4">
            <Sparkles className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">欢迎回来</h2>
          <p className="text-slate-500 mt-2">继续您的语言学习之旅</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">邮箱地址</label>
              <input
                type="email"
                defaultValue="demo@lingua.ai"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all"
                placeholder="输入邮箱"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">密码</label>
              <input
                type="password"
                defaultValue="password"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all"
                placeholder="输入密码"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-600/25"
          >
            一键登录 (Demo)
          </button>
        </form>
      </div>
    </div>
  );
}
