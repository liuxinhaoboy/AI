import React from 'react';
import { Settings, Award, Book, Clock, TrendingUp } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Profile() {
  const user = useStore((state) => state.user);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-emerald-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/4" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <img src={user?.avatar} alt={user?.name} className="w-32 h-32 rounded-full ring-4 ring-white shadow-lg" />
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-bold text-slate-900">{user?.name}</h1>
            <p className="text-slate-500 mt-1 mb-4">学习语言是一场马拉松，而你正渐入佳境。</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <span className="px-4 py-1.5 bg-blue-50 text-blue-700 font-bold rounded-xl text-sm border border-blue-100">
                当前等级：{user?.level}
              </span>
              <span className="px-4 py-1.5 bg-orange-50 text-orange-600 font-bold rounded-xl text-sm border border-orange-100">
                连胜：{user?.streak} 天
              </span>
              <span className="px-4 py-1.5 bg-slate-100 text-slate-700 font-bold rounded-xl text-sm border border-slate-200">
                加入时间：2024年1月
              </span>
            </div>
          </div>
          <button className="p-3 bg-slate-50 text-slate-500 hover:text-slate-900 rounded-2xl hover:bg-slate-100 transition-colors">
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
            学习统计
          </h3>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-slate-50 rounded-2xl">
              <div className="p-3 bg-white rounded-xl shadow-sm mr-4 text-emerald-500"><Clock className="w-6 h-6" /></div>
              <div className="flex-1">
                <div className="text-sm text-slate-500">总学习时长</div>
                <div className="font-bold text-slate-900 text-xl">42.5 小时</div>
              </div>
            </div>
            <div className="flex items-center p-4 bg-slate-50 rounded-2xl">
              <div className="p-3 bg-white rounded-xl shadow-sm mr-4 text-blue-500"><Book className="w-6 h-6" /></div>
              <div className="flex-1">
                <div className="text-sm text-slate-500">已完成课程</div>
                <div className="font-bold text-slate-900 text-xl">15 门</div>
              </div>
            </div>
            <div className="flex items-center p-4 bg-slate-50 rounded-2xl">
              <div className="p-3 bg-white rounded-xl shadow-sm mr-4 text-purple-500"><Award className="w-6 h-6" /></div>
              <div className="flex-1">
                <div className="text-sm text-slate-500">获得经验值</div>
                <div className="font-bold text-slate-900 text-xl">{user?.xp.toLocaleString()} XP</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
            <Award className="w-5 h-5 mr-2 text-orange-500" />
            徽章墙
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: '🏆', name: '破冰者', color: 'bg-yellow-50' },
              { icon: '🔥', name: '7天连胜', color: 'bg-orange-50' },
              { icon: '🗣️', name: '演说家', color: 'bg-purple-50' },
              { icon: '📚', name: '词汇达人', color: 'bg-blue-50' },
              { icon: '🎯', name: '百发百中', color: 'bg-emerald-50' },
              { icon: '⭐', name: '全优生', color: 'bg-rose-50' },
            ].map((badge, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-4 rounded-2xl border border-slate-100 hover:shadow-md transition-all group cursor-default">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition-transform ${badge.color}`}>
                  {badge.icon}
                </div>
                <span className="text-xs font-bold text-slate-600">{badge.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
