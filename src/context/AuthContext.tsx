import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: Omit<User, 'id' | 'joinedDate'> & { password: string }) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      // Check if backend is accessible first
      const healthCheck = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).catch(() => null);

      if (!healthCheck) {
        throw new Error('Backend server is not running. Please start the backend server first.');
      }

      const response = await fetch(`${API_BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const userData: User = {
          id: data.id?.toString() || '1',
          username: data.username,
          email: data.email,
          isAdmin: data.isAdmin || false,
          joinedDate: new Date().toISOString().split('T')[0]
        };
        
        setUser(userData);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(userData));
        setLoading(false);
        return true;
      } else {
        const errorData = await response.text();
        setError(errorData || 'Login failed');
        setLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Backend server is not running. Please start the backend server by running: cd backend && mvn spring-boot:run');
      }
      setLoading(false);
      return false;
    }
  };

  const signup = async (userData: Omit<User, 'id' | 'joinedDate'> & { password: string }): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userData.username,
          email: userData.email,
          password: userData.password,
        }),
      });

      if (response.ok) {
        // After successful signup, automatically log in
        const loginSuccess = await login(userData.email, userData.password);
        return loginSuccess;
      } else {
        const errorData = await response.text();
        setError(errorData || 'Signup failed');
        setLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('Network error. Please check if the backend server is running.');
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
};