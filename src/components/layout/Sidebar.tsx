import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, MessageCircle, Users, User, LogOut, Sparkles } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { cn } from '../../utils/cn';

const NAV_ITEMS = [
  { path: '/dashboard', label: '仪表盘', icon: Home },
  { path: '/courses', label: '课程中心', icon: BookOpen },
  { path: '/learn/demo', label: '互动学习', icon: MessageCircle },
  { path: '/community', label: '社区与成就', icon: Users },
  { path: '/profile', label: '个人中心', icon: User },
];

export function Sidebar() {
  const logout = useStore((state) => state.logout);

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-full shrink-0 relative z-20 shadow-sm">
      <div className="h-16 flex items-center px-6 border-b border-slate-100">
        <Sparkles className="w-6 h-6 text-blue-600 mr-2" />
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-400 tracking-tight">
          LinguaAI
        </span>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center px-3 py-2.5 rounded-xl font-medium transition-all duration-200 group relative',
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={cn(
                    'w-5 h-5 mr-3 transition-colors',
                    isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'
                  )}
                />
                {item.label}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-r-full" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button
          onClick={logout}
          className="flex items-center px-3 py-2.5 w-full text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-xl font-medium transition-colors group"
        >
          <LogOut className="w-5 h-5 mr-3 text-slate-400 group-hover:text-red-500 transition-colors" />
          退出登录
        </button>
      </div>
    </aside>
  );
}
