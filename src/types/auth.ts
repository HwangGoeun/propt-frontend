export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  status: AuthStatus;
}

export interface AuthStatusResponse {
  isAuthenticated: boolean;
  user: User | null;
}
