import { describe, it, expect, beforeEach, vi } from 'vitest';
import { storage } from '../../src/lib/storage';

/**
 * Unit Tests for the Storage Service.
 * Mocks localStorage to verify persistence logic.
 */
describe('Storage Service', () => {
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => { store[key] = value.toString(); },
      clear: () => { store = {}; },
      removeItem: (key: string) => { delete store[key]; }
    };
  })();

  beforeEach(() => {
    vi.stubGlobal('localStorage', localStorageMock);
    localStorage.clear();
  });

  it('should save and retrieve users', () => {
    const users = [{ id: '1', email: 'test@test.com', password: '123', createdAt: '' }];
    storage.saveUsers(users);
    expect(storage.getUsers()).toEqual(users);
  });

  it('should save and retrieve session', () => {
    const session = { userId: '1', email: 'test@test.com' };
    storage.saveSession(session);
    expect(storage.getSession()).toEqual(session);
  });

  it('should save and retrieve habits', () => {
    const habits = [{ id: 'h1', userId: '1', name: 'Run', completions: [], createdAt: '', frequency: 'daily' as const }];
    storage.saveHabits(habits);
    expect(storage.getHabits()).toEqual(habits);
  });

  it('should return empty arrays if no data exists', () => {
    expect(storage.getUsers()).toEqual([]);
    expect(storage.getHabits()).toEqual([]);
    expect(storage.getSession()).toBeNull();
  });
});
