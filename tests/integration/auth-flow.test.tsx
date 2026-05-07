import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import LoginForm from '../../src/components/auth/LoginForm';
import { auth } from '../../src/lib/auth';

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('Auth Flow Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show error on empty login attempt', async () => {
    render(<LoginForm />);
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);
    expect(await screen.findByText(/please fill in all fields/i)).toBeInTheDocument();
  });

  it('should call auth.login on valid submission', () => {
    const loginSpy = vi.spyOn(auth, 'login');
    render(<LoginForm />);
    
    fireEvent.change(screen.getByTestId('login-email'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByTestId('login-password'), { target: { value: 'password123' } });
    
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    expect(loginSpy).toHaveBeenCalledWith('test@test.com', 'password123');
  });
});
