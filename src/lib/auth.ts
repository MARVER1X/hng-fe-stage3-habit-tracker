import { storage } from './storage';
import { User, Session } from '../types/auth';
import { generateId } from './utils';

/**
 * Authentication service for managing local users and sessions.
 * Encapsulates the logic for signup, login, and session validation.
 */
export const auth = {
  // Check if a session exists
  isAuthenticated: (): boolean => {
    return storage.getSession() !== null;
  },

  // Get current user details
  getCurrentUser: (): Session | null => {
    return storage.getSession();
  },

  // Log in a user
  login: (email: string, password: string): { success: boolean; error?: string } => {
    const users = storage.getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return { success: false, error: 'Invalid email or password' };
    }

    storage.saveSession({ userId: user.id, email: user.email });
    return { success: true };
  },

  // Sign up a new user
  signup: (email: string, password: string): { success: boolean; error?: string } => {
    const users = storage.getUsers();
    
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'User already exists' };
    }

    const newUser: User = {
      id: generateId(),
      email,
      password,
      createdAt: new Date().toISOString(),
    };

    storage.saveUsers([...users, newUser]);
    storage.saveSession({ userId: newUser.id, email: newUser.email });
    
    return { success: true };
  },

  // Log out
  logout: () => {
    storage.saveSession(null);
  }
};
