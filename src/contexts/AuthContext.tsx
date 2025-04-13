
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define user types
export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USERS = [
  { id: '1', email: 'admin@micromood.com', name: 'Admin User', password: 'admin123', role: 'admin' as UserRole },
  { id: '2', email: 'user@micromood.com', name: 'Regular User', password: 'user123', role: 'user' as UserRole },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('micromood-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      const matchedUser = MOCK_USERS.find(u => u.email === email && u.password === password);
  
      if (!matchedUser) {
        throw new Error('Invalid credentials');
      }
  
      const { password: _, ...userWithoutPassword } = matchedUser;
      setUser(userWithoutPassword);
      localStorage.setItem('micromood-user', JSON.stringify(userWithoutPassword));
  
      return userWithoutPassword; // ✅ return user
    } finally {
      setIsLoading(false);
    }
  };
  

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (MOCK_USERS.some(u => u.email === email)) {
        throw new Error('User already exists');
      }
      
      const newUser = {
        id: `${MOCK_USERS.length + 1}`,
        email,
        name,
        role: 'user' as UserRole,
      };
      
      setUser(newUser);
      localStorage.setItem('micromood-user', JSON.stringify(newUser));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('micromood-user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
