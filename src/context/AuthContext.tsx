
import { createContext, useContext, ReactNode } from 'react';
import { User } from '@/types';

type AuthContextType = {
  user: User;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
};

// Create a default user that's always logged in
const defaultUser: User = {
  id: "default-user-id",
  email: "user@example.com",
  name: "Demo User"
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Placeholder functions since we're always authenticated
  const login = async (email: string, password: string) => {
    // No-op since we're always logged in
    console.log('Login called with:', email);
  };

  const signup = async (email: string, password: string, name: string) => {
    // No-op since we're always logged in
    console.log('Signup called with:', email, name);
  };

  // Always authenticated, never loading
  const value: AuthContextType = {
    user: defaultUser,
    isAuthenticated: true,
    isLoading: false,
    login,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
