import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  role: 'student' | 'staff';
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string, role: 'student' | 'staff', id: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session securely
    const token = sessionStorage.getItem('auth_token');
    const role = sessionStorage.getItem('user_role') as 'student' | 'staff';
    const id = sessionStorage.getItem('user_id');

    if (token && role && id) {
      setUser({ id, role, token });
    }
  }, []);

  const login = (token: string, role: 'student' | 'staff', id: string) => {
    // Use sessionStorage to prevent cross-tab persistence and clear on browser close
    sessionStorage.setItem('auth_token', token);
    sessionStorage.setItem('user_role', role);
    sessionStorage.setItem('user_id', id);
    setUser({ id, role, token });
  };

  const logout = () => {
    sessionStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
