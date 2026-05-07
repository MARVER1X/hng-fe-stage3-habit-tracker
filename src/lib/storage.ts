import { STORAGE_KEYS } from './constants';
import { User, Session } from '../types/auth';
import { Habit } from '../types/habit';

/**
 * Deterministic access to users, sessions, and habits is provided via 
 * the LocalStorage API.
 */
export const storage = {
  // USERS
  getUsers: (): User[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.USERS);
    return data ? JSON.parse(data) : [];
  },
  
  saveUsers: (users: User[]) => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },

  // SESSION
  getSession: (): Session | null => {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(STORAGE_KEYS.SESSION);
    return data ? JSON.parse(data) : null;
  },

  saveSession: (session: Session | null) => {
    if (session === null) {
      localStorage.removeItem(STORAGE_KEYS.SESSION);
    } else {
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
    }
  },

  // HABITS
  getHabits: (): Habit[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.HABITS);
    return data ? JSON.parse(data) : [];
  },

  saveHabits: (habits: Habit[]) => {
    localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits));
  },
};

