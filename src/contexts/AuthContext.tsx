
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

// Define context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Initialize user state from localStorage on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('pharmaUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user data from localStorage:', error);
        localStorage.removeItem('pharmaUser');
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('pharmaUsers') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      // Create a new user object without the password
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('pharmaUser', JSON.stringify(userWithoutPassword));
      toast.success('Login successful');
      return true;
    } else {
      toast.error('Invalid email or password');
      return false;
    }
  };

  // Signup function
  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Get existing users
    const users = JSON.parse(localStorage.getItem('pharmaUsers') || '[]');
    
    // Check if user already exists
    if (users.some((u: any) => u.email === email)) {
      toast.error('Email already in use');
      return false;
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // In a real app, this should be encrypted
      createdAt: new Date().toISOString()
    };
    
    // Update users list
    users.push(newUser);
    localStorage.setItem('pharmaUsers', JSON.stringify(users));
    
    // Log in the user automatically
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('pharmaUser', JSON.stringify(userWithoutPassword));
    
    toast.success('Account created successfully');
    return true;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('pharmaUser');
    setUser(null);
    toast.success('Logged out successfully');
  };

  // Update profile function
  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    if (!user) {
      toast.error('You need to be logged in to update your profile');
      return false;
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Update user data
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('pharmaUser', JSON.stringify(updatedUser));
    
    // Also update in users array
    const users = JSON.parse(localStorage.getItem('pharmaUsers') || '[]');
    const updatedUsers = users.map((u: any) => (
      u.id === user.id ? { ...u, ...userData } : u
    ));
    localStorage.setItem('pharmaUsers', JSON.stringify(updatedUsers));
    
    toast.success('Profile updated successfully');
    return true;
  };

  // Reset password function
  const resetPassword = async (email: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('pharmaUsers') || '[]');
    const userExists = users.some((u: any) => u.email === email);
    
    if (userExists) {
      // In a real app, this would send an email
      toast.success('Password reset instructions sent to your email');
      return true;
    } else {
      toast.error('Email not found');
      return false;
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateProfile,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
