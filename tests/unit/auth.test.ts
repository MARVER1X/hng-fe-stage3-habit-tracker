import { describe, it, expect, beforeEach, vi } from 'vitest';
import { auth } from '../../src/lib/auth';
import { storage } from '../../src/lib/storage';

/**
 * Unit Tests for the Authentication Service.
 * Mocks the storage layer to test business logic.
 */
describe('Authentication Service', () => {
  beforeEach(() => {
    vi.spyOn(storage, 'getUsers').mockReturnValue([]);
    vi.spyOn(storage, 'saveUsers').mockImplementation(() => {});
    vi.spyOn(storage, 'saveSession').mockImplementation(() => {});
    vi.spyOn(storage, 'getSession').mockReturnValue(null);
  });

  it('should sign up a new user successfully', () => {
    const result = auth.signup('new@test.com', 'password123');
    expect(result.success).toBe(true);
    expect(storage.saveUsers).toHaveBeenCalled();
    expect(storage.saveSession).toHaveBeenCalled();
  });

  it('should fail signup if user already exists', () => {
    vi.spyOn(storage, 'getUsers').mockReturnValue([
      { id: '1', email: 'exists@test.com', password: '123', createdAt: '' }
    ]);
    
    const result = auth.signup('exists@test.com', 'pass');
    expect(result.success).toBe(false);
    expect(result.error).toBe('User already exists');
  });

  it('should log in with correct credentials', () => {
    vi.spyOn(storage, 'getUsers').mockReturnValue([
      { id: '1', email: 'user@test.com', password: 'password123', createdAt: '' }
    ]);
    
    const result = auth.login('user@test.com', 'password123');
    expect(result.success).toBe(true);
    expect(storage.saveSession).toHaveBeenCalled();
  });

  it('should fail login with incorrect credentials', () => {
    vi.spyOn(storage, 'getUsers').mockReturnValue([
      { id: '1', email: 'user@test.com', password: 'password123', createdAt: '' }
    ]);
    
    const result = auth.login('user@test.com', 'wrong');
    expect(result.success).toBe(false);
    expect(result.error).toBe('Invalid email or password');
  });

  it('should log out correctly', () => {
    auth.logout();
    expect(storage.saveSession).toHaveBeenCalledWith(null);
  });
});
