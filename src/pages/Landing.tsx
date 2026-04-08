import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Landing() {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);

  if (user) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-center p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-400/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 max-w-3xl mx-auto space-y-8">
        <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-sm border border-slate-100 mb-4">
          <Sparkles className="w-10 h-10 text-blue-600" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-tight">
          突破语言障碍 <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-400">
            沉浸式 AI 学习体验
          </span>
        </h1>
        
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          通过智能推荐、实时对话互动与系统化课程，开启您的个性化语言学习之旅。
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-600/25 flex items-center group"
          >
            开始学习
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => navigate('/courses')}
            className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-bold text-lg hover:bg-slate-50 transition-all hover:border-slate-300"
          >
            浏览课程
          </button>
        </div>
      </div>
    </div>
  );
}
