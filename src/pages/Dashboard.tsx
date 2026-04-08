import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Flame, Star, PlayCircle, Trophy, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '一', duration: 20 },
  { name: '二', duration: 45 },
  { name: '三', duration: 30 },
  { name: '四', duration: 60 },
  { name: '五', duration: 40 },
  { name: '六', duration: 80 },
  { name: '日', duration: 0 },
];

export default function Dashboard() {
  const user = useStore((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            早上好，{user?.name?.split(' ')[0] || '学员'} 👋
          </h1>
          <p className="text-slate-500 mt-1">准备好今天的沉浸式练习了吗？</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center px-4 py-2 bg-orange-50 text-orange-600 rounded-2xl font-bold border border-orange-100">
            <Flame className="w-5 h-5 mr-2 fill-current" />
            {user?.streak || 0} 天连胜
          </div>
          <div className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-2xl font-bold border border-blue-100">
            <Star className="w-5 h-5 mr-2 fill-current" />
            {user?.xp || 0} XP
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommended Path */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-emerald-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/4" />
          
          <div className="relative z-10">
            <div className="flex items-center text-blue-600 font-medium mb-2">
              <SparklesIcon className="w-5 h-5 mr-2" />
              智能推荐
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">职场英语：主持季度汇报会议</h2>
            <p className="text-slate-600 mb-6 max-w-md">基于你最近的 B1 级别学习进度，这是最适合你当前阶段的实战情景模拟。</p>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/learn/demo')}
                className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-colors flex items-center shadow-lg shadow-blue-600/20"
              >
                <PlayCircle className="w-5 h-5 mr-2" />
                进入实战练习
              </button>
              <span className="text-sm font-medium text-slate-400">预计 15 分钟</span>
            </div>
          </div>
        </div>

        {/* Level Progress */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
          <div className="w-32 h-32 relative mb-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" className="text-slate-100 stroke-current" strokeWidth="8" fill="none" />
              <circle cx="50" cy="50" r="40" className="text-blue-600 stroke-current" strokeWidth="8" fill="none" strokeDasharray="251.2" strokeDashoffset="80" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-slate-900">{user?.level || 'B1'}</span>
            </div>
          </div>
          <h3 className="font-bold text-slate-900 mb-1">距离 B2 还有一步之遥</h3>
          <p className="text-sm text-slate-500">再获得 250 XP 即可升级</p>
        </div>
      </div>

      {/* Stats and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-emerald-500" />
              本周学习时长 (分钟)
            </h3>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDuration" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area type="monotone" dataKey="duration" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorDuration)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
              最近成就
            </h3>
            <button className="text-sm text-blue-600 font-medium hover:text-blue-700">查看全部</button>
          </div>
          <div className="space-y-4">
            {[
              { title: '初级演说家', desc: '完成 5 次口语实战模拟', time: '2小时前', icon: '🗣️', color: 'bg-purple-100 text-purple-600' },
              { title: '全勤王者', desc: '连续学习 7 天', time: '昨天', icon: '🔥', color: 'bg-orange-100 text-orange-600' },
              { title: '词汇达人', desc: '掌握 500 个职场核心词汇', time: '3天前', icon: '📚', color: 'bg-blue-100 text-blue-600' }
            ].map((achievement, i) => (
              <div key={i} className="flex items-center p-4 rounded-2xl hover:bg-slate-50 transition-colors group cursor-default">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mr-4 ${achievement.color}`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{achievement.title}</h4>
                  <p className="text-sm text-slate-500">{achievement.desc}</p>
                </div>
                <span className="text-xs font-medium text-slate-400">{achievement.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
    </svg>
  );
}
