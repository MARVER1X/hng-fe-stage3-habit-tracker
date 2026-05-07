'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/auth';
import Link from 'next/link';

/**
 * LoginForm Component.
 * Handles user authentication via email and password.
 * Complies with Section 11 of the TRD.
 */
const LoginForm: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Simple validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    const result = auth.login(email, password);

    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error || 'Invalid credentials');
    }
    
    setIsLoading(false);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-6"
      data-testid="login-form"
    >
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
        <p className="mt-2 text-gray-600">Please enter your details to sign in.</p>
      </div>

      {error && (
        <div className="p-3 bg-red-100 text-red-700 text-sm rounded-lg border border-red-200">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="name@example.com"
            data-testid="login-email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="••••••••"
            data-testid="login-password"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>

      <p className="text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link href="/signup" className="text-blue-600 font-semibold hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
