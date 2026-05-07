import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import LoginForm from '../../src/components/auth/LoginForm';
import SignupForm from '../../src/components/auth/SignupForm';
import { auth } from '../../src/lib/auth';

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('auth flow', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('submits the signup form and creates a session', async () => {
    render(<SignupForm />);
    
    fireEvent.change(screen.getByTestId('auth-signup-email'), { target: { value: 'new@test.com' } });
    fireEvent.change(screen.getByTestId('auth-signup-password'), { target: { value: 'password123' } });
    
    fireEvent.click(screen.getByTestId('auth-signup-submit'));
    
    await waitFor(() => {
      const session = localStorage.getItem('habit-tracker-session');
      expect(session).not.toBeNull();
      expect(JSON.parse(session!).email).toBe('new@test.com');
    });
  });

  it('shows an error for duplicate signup email', async () => {
    // Pre-seed user
    auth.signup('existing@test.com', 'password123');
    
    render(<SignupForm />);
    
    fireEvent.change(screen.getByTestId('auth-signup-email'), { target: { value: 'existing@test.com' } });
    fireEvent.change(screen.getByTestId('auth-signup-password'), { target: { value: 'password123' } });
    
    fireEvent.click(screen.getByTestId('auth-signup-submit'));
    
    expect(await screen.findByText(/user already exists/i)).toBeInTheDocument();
  });

  it('submits the login form and stores the active session', async () => {
    auth.signup('user@test.com', 'password123');
    localStorage.removeItem('habit-tracker-session');
    
    render(<LoginForm />);
    
    fireEvent.change(screen.getByTestId('auth-login-email'), { target: { value: 'user@test.com' } });
    fireEvent.change(screen.getByTestId('auth-login-password'), { target: { value: 'password123' } });
    
    fireEvent.click(screen.getByTestId('auth-login-submit'));
    
    await waitFor(() => {
      const session = localStorage.getItem('habit-tracker-session');
      expect(session).not.toBeNull();
    });
  });

  it('shows an error for invalid login credentials', async () => {
    render(<LoginForm />);
    
    fireEvent.change(screen.getByTestId('auth-login-email'), { target: { value: 'wrong@test.com' } });
    fireEvent.change(screen.getByTestId('auth-login-password'), { target: { value: 'wrongpass' } });
    
    fireEvent.click(screen.getByTestId('auth-login-submit'));
    
    expect(await screen.findByText(/invalid email or password/i)).toBeInTheDocument();
  });
});
