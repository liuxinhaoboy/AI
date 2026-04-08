import { create } from 'zustand';

interface UserProfile {
  id: string;
  name: string;
  level: string;
  xp: number;
  streak: number;
  avatar: string;
}

interface AppState {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  login: () => void;
  logout: () => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  login: () => set({
    user: {
      id: 'u1',
      name: 'Alex Learner',
      level: 'B1',
      xp: 1250,
      streak: 5,
      avatar: 'https://i.pravatar.cc/150?img=11',
    }
  }),
  logout: () => set({ user: null }),
}));
