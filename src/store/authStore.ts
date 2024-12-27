import { create } from 'zustand';
import { User } from '@supabase/supabase-js';
import { AuthService } from '../services/auth';

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  signOut: async () => {
    set({ loading: true });
    try {
      await AuthService.signOut();
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  }
}));