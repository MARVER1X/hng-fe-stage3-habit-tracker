'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/auth';
import Link from 'next/link';

/**
 * SignupForm component handles new user registration.
 */
const SignupForm: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    const result = auth.signup(email, password);

    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error || 'Signup failed');
    }

    setIsLoading(false);
  };

  return (
    // New user registration form is rendered
    <form 
      onSubmit={handleSubmit} 
      className="cyber-card w-full max-w-md md:max-w-lg p-8 sm:p-10 md:p-12 space-y-6 sm:space-y-8 md:space-y-10 animate-in fade-in zoom-in duration-500"
      data-testid="signup-form"
    >
      <div className="text-center relative">
        <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-[var(--neon-magenta)] opacity-50" />
        <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-[var(--neon-magenta)] opacity-50" />
        {/* Header section includes registration title and description */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-gray-100 uppercase tracking-tighter italic">
          Create Account
        </h2>
        <p className="mt-3 text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Join us to start tracking your habits.</p>
      </div>

      {error && (
        <div className="p-3 bg-red-950/20 border border-red-500 text-red-500 text-[10px] md:text-xs font-black uppercase tracking-widest animate-pulse">
          {error}
        </div>
      )}

      {/* Input fields for registration details are grouped */}
      <div className="space-y-6 md:space-y-8">
        <div>
          <label 
            htmlFor="auth-signup-email"
            className="block text-[10px] md:text-xs font-black text-[var(--neon-cyan)] uppercase tracking-widest mb-3"
          >
            Email Address
          </label>
          <input
            id="auth-signup-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-4 bg-black/5 border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-white focus:border-[var(--neon-cyan)] focus:cyber-glow-cyan outline-none transition-all rounded-none font-mono text-sm md:text-base"
            placeholder="name@example.com"
            data-testid="auth-signup-email"
          />
        </div>

        <div>
          <label 
            htmlFor="auth-signup-password"
            className="block text-[10px] md:text-xs font-black text-[var(--neon-magenta)] uppercase tracking-widest mb-3"
          >
            Password
          </label>
          <input
            id="auth-signup-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-4 bg-black/5 border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-white focus:border-[var(--neon-magenta)] focus:cyber-glow-magenta outline-none transition-all rounded-none font-mono text-sm md:text-base"
            placeholder="••••••••"
            data-testid="auth-signup-password"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        data-testid="auth-signup-submit"
        className="w-full py-4 px-8 bg-black text-[var(--neon-magenta)] border border-[var(--neon-magenta)] text-xs md:text-sm font-black uppercase tracking-[0.4em] hover:bg-[var(--neon-magenta)] hover:text-black transition-all hover:cyber-glow-magenta disabled:opacity-30 relative group overflow-hidden"
      >
        <span className="relative z-10">{isLoading ? "Processing..." : "Sign Up"}</span>
        <div className="absolute inset-0 bg-[var(--neon-magenta)] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      </button>

      <p className="text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
        Already have an account?{' '}
        <Link href="/login" className="text-[var(--neon-cyan)] hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
};

export default SignupForm;
