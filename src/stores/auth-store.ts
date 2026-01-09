import { create } from 'zustand';

import { authApi } from '@/lib/api/auth';
import type { AuthStatus,User } from '@/types/auth';

interface AuthState {
  user: User | null;
  authStatus: AuthStatus;
  checkAuthStatus: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  authStatus: 'idle',

  checkAuthStatus: async () => {
    set({ authStatus: 'loading' });
    try {
      const response = await authApi.checkAuthStatus();
      if (response.ok && response.data.isAuthenticated) {
        set({ user: response.data.user, authStatus: 'authenticated' });
      } else {
        set({ user: null, authStatus: 'unauthenticated' });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      set({ user: null, authStatus: 'unauthenticated' });
    }
  },

  logout: async () => {
    try {
      await authApi.logout();
      set({ user: null, authStatus: 'unauthenticated' });
    } catch (error) {
      console.error('Logout failed:', error);
      set({ user: null, authStatus: 'unauthenticated' });
    }
  },
}));
