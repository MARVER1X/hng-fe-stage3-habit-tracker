'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/auth';
import Link from 'next/link';

/**
 * LoginForm component handles user authentication via email and password.
 */
const LoginForm: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Input fields are validated for presence
    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    const result = auth.login(email, password);

    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error || 'Invalid email or password');
    }
    
    setIsLoading(false);
  };

  return (
    // Authentication form is rendered within a centered container
    <form 
      onSubmit={handleSubmit} 
      className="cyber-card w-full max-w-md p-8 sm:p-10 space-y-6 sm:space-y-8 animate-in fade-in zoom-in duration-500"
      data-testid="login-form"
    >
      <div className="text-center relative">
        <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-[var(--neon-cyan)] opacity-50" />
        <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-[var(--neon-cyan)] opacity-50" />
        {/* Header section displays the welcome message */}
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-gray-100 uppercase tracking-tighter italic">
          Welcome Back
        </h2>
        <p className="mt-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Please enter your details to sign in.</p>
      </div>

      {error && (
        <div className="p-3 bg-red-950/20 border border-red-500 text-red-500 text-[10px] font-black uppercase tracking-widest animate-pulse">
          {error}
        </div>
      )}

      {/* Input fields for user credentials are grouped */}
      <div className="space-y-6">
        <div>
          <label 
            htmlFor="auth-login-email"
            className="block text-[10px] font-black text-[var(--neon-cyan)] uppercase tracking-widest mb-2"
          >
            Email Address
          </label>
          <input
            id="auth-login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-black/5 border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-white focus:border-[var(--neon-cyan)] focus:cyber-glow-cyan outline-none transition-all rounded-none font-mono text-sm"
            placeholder="name@example.com"
            data-testid="auth-login-email"
          />
        </div>

        <div>
          <label 
            htmlFor="auth-login-password"
            className="block text-[10px] font-black text-[var(--neon-magenta)] uppercase tracking-widest mb-2"
          >
            Password
          </label>
          <input
            id="auth-login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-black/5 border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-white focus:border-[var(--neon-magenta)] focus:cyber-glow-magenta outline-none transition-all rounded-none font-mono text-sm"
            placeholder="••••••••"
            data-testid="auth-login-password"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        data-testid="auth-login-submit"
        className="w-full py-4 px-6 bg-black text-[var(--neon-cyan)] border border-[var(--neon-cyan)] text-xs font-black uppercase tracking-[0.4em] hover:bg-[var(--neon-cyan)] hover:text-black transition-all hover:cyber-glow-cyan disabled:opacity-30 relative group overflow-hidden"
      >
        <span className="relative z-10">{isLoading ? "Signing in..." : "Sign In"}</span>
        <div className="absolute inset-0 bg-[var(--neon-cyan)] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      </button>

      <p className="text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
        Don't have an account?{' '}
        <Link href="/signup" className="text-[var(--neon-magenta)] hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
