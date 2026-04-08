import React, { useState } from 'react';
import { Trophy, Heart, MessageSquare, Share2, Award, Crown } from 'lucide-react';
import { cn } from '../utils/cn';

const LEADERBOARD = [
  { id: 1, name: 'Sarah Chen', xp: 12500, level: 'C1', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: 2, name: 'Alex Learner', xp: 11200, level: 'B2', avatar: 'https://i.pravatar.cc/150?img=11', isCurrentUser: true },
  { id: 3, name: 'Mike Ross', xp: 10800, level: 'B2', avatar: 'https://i.pravatar.cc/150?img=8' },
  { id: 4, name: 'Emma Wilson', xp: 9500, level: 'B1', avatar: 'https://i.pravatar.cc/150?img=9' },
  { id: 5, name: 'David Lee', xp: 8900, level: 'A2', avatar: 'https://i.pravatar.cc/150?img=12' },
];

const POSTS = [
  {
    id: 1,
    user: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?img=5' },
    content: '刚刚完成了 "深度学术讨论" 模块，AI 助手的反馈真的太精准了！特别是关于被动语态的使用建议，让我受益匪浅。🎉',
    time: '2小时前',
    likes: 24,
    comments: 5,
    achievement: '完成高阶学术模块',
  },
  {
    id: 2,
    user: { name: 'Mike Ross', avatar: 'https://i.pravatar.cc/150?img=8' },
    content: '坚持打卡第30天！每天早上通勤时间练习15分钟口语，感觉现在开外企早会完全不慌了。继续冲鸭！🚀',
    time: '5小时前',
    likes: 89,
    comments: 12,
    achievement: '连续打卡30天',
  }
];

export default function Community() {
  const [activeTab, setActiveTab] = useState<'feed' | 'leaderboard'>('feed');

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">社区与成就</h1>
          <p className="text-slate-500 mt-2">与全球学习者分享经验，共同进步</p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-2xl">
          <button
            onClick={() => setActiveTab('feed')}
            className={cn(
              'px-6 py-2.5 rounded-xl font-bold text-sm transition-all',
              activeTab === 'feed' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            )}
          >
            动态分享
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={cn(
              'px-6 py-2.5 rounded-xl font-bold text-sm transition-all',
              activeTab === 'leaderboard' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            )}
          >
            本周排行榜
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'feed' ? (
            <>
              {/* Post Input */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex gap-4">
                <img src="https://i.pravatar.cc/150?img=11" alt="User" className="w-12 h-12 rounded-full ring-2 ring-slate-50" />
                <div className="flex-1">
                  <textarea
                    placeholder="分享你的学习心得或新解锁的成就..."
                    className="w-full bg-slate-50 rounded-2xl p-4 text-slate-800 placeholder:text-slate-400 border border-slate-100 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none resize-none transition-all"
                    rows={3}
                  />
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex gap-2 text-slate-400">
                      <button className="p-2 hover:bg-slate-100 rounded-full transition-colors"><Award className="w-5 h-5" /></button>
                    </div>
                    <button className="px-6 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
                      发布动态
                    </button>
                  </div>
                </div>
              </div>

              {/* Feed Posts */}
              {POSTS.map(post => (
                <div key={post.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <img src={post.user.avatar} alt={post.user.name} className="w-12 h-12 rounded-full" />
                      <div>
                        <h3 className="font-bold text-slate-900">{post.user.name}</h3>
                        <span className="text-xs text-slate-500">{post.time}</span>
                      </div>
                    </div>
                  </div>
                  
                  {post.achievement && (
                    <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-orange-50 to-amber-50 text-orange-600 rounded-lg text-sm font-bold mb-3 border border-orange-100/50">
                      <Award className="w-4 h-4 mr-1.5" />
                      解锁成就：{post.achievement}
                    </div>
                  )}
                  
                  <p className="text-slate-700 leading-relaxed mb-6">{post.content}</p>
                  
                  <div className="flex items-center gap-6 border-t border-slate-50 pt-4">
                    <button className="flex items-center gap-2 text-slate-400 hover:text-rose-500 font-medium transition-colors group">
                      <Heart className="w-5 h-5 group-hover:fill-rose-500" /> {post.likes}
                    </button>
                    <button className="flex items-center gap-2 text-slate-400 hover:text-blue-500 font-medium transition-colors">
                      <MessageSquare className="w-5 h-5" /> {post.comments}
                    </button>
                    <button className="flex items-center gap-2 text-slate-400 hover:text-emerald-500 font-medium transition-colors ml-auto">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="bg-white rounded-3xl p-2 sm:p-6 shadow-sm border border-slate-100">
              <div className="space-y-2">
                {LEADERBOARD.map((user, index) => (
                  <div
                    key={user.id}
                    className={cn(
                      'flex items-center p-4 rounded-2xl transition-all',
                      user.isCurrentUser ? 'bg-blue-50 border border-blue-100' : 'hover:bg-slate-50'
                    )}
                  >
                    <div className="w-8 font-bold text-center mr-4 text-slate-400 flex justify-center">
                      {index === 0 ? <Crown className="w-6 h-6 text-yellow-500 fill-yellow-500" /> :
                       index === 1 ? <Crown className="w-6 h-6 text-slate-400 fill-slate-300" /> :
                       index === 2 ? <Crown className="w-6 h-6 text-amber-700 fill-amber-700/50" /> :
                       `#${index + 1}`}
                    </div>
                    <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full mr-4 ring-2 ring-white shadow-sm" />
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900">{user.name}</h4>
                      <span className="text-xs font-bold text-slate-500 px-2 py-0.5 bg-slate-100 rounded-md">Lv. {user.level}</span>
                    </div>
                    <div className="font-black text-blue-600 bg-blue-50 px-4 py-1.5 rounded-xl">
                      {user.xp.toLocaleString()} XP
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-emerald-400 rounded-3xl p-6 text-white shadow-lg shadow-blue-600/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4" />
            <Trophy className="w-10 h-10 mb-4 text-white/90" />
            <h3 className="text-xl font-bold mb-2">我的成就概览</h3>
            <div className="space-y-3 mt-6">
              <div className="flex justify-between items-center text-blue-50">
                <span>总排名</span>
                <span className="font-bold text-white text-lg">#2</span>
              </div>
              <div className="h-px w-full bg-white/20" />
              <div className="flex justify-between items-center text-blue-50">
                <span>已解锁徽章</span>
                <span className="font-bold text-white text-lg">12 个</span>
              </div>
              <div className="h-px w-full bg-white/20" />
              <div className="flex justify-between items-center text-blue-50">
                <span>本周获得</span>
                <span className="font-bold text-white text-lg">+1,250 XP</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4">本周目标</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600">参与 3 次实战模拟</span>
                  <span className="font-bold text-blue-600">2/3</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 w-2/3 rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600">在社区分享 1 次动态</span>
                  <span className="font-bold text-blue-600">0/1</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 w-0 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
