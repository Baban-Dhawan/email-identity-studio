
import { createContext, useContext, ReactNode } from 'react';
import { User } from '@/types';

type AuthContextType = {
  user: User;
  isAuthenticated: boolean;
  isLoading: boolean;
};

// Create a default user that's always logged in
const defaultUser: User = {
  id: "default-user-id",
  email: "user@example.com",
  name: "Demo User"
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Always authenticated, never loading
  const value: AuthContextType = {
    user: defaultUser,
    isAuthenticated: true,
    isLoading: false,
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
