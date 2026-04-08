import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { useStore } from '../../store/useStore';

export function MainLayout() {
  const user = useStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
      <Sidebar />
      <main className="flex-1 flex flex-col relative overflow-hidden h-full">
        <div className="flex-1 overflow-y-auto px-6 py-8 md:px-10 md:py-10 pb-24 lg:pb-10 custom-scrollbar">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
