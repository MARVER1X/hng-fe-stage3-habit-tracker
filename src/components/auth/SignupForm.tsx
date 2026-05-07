'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/auth';
import Link from 'next/link';

/**
 * SignupForm Component.
 * Handles new user registration.
 * Complies with Section 11 of the TRD.
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
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-5 sm:space-y-6"
      data-testid="signup-form"
    >
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Create Account</h2>
        <p className="mt-2 text-sm sm:text-base text-gray-600">Join us to start tracking your habits.</p>
      </div>

      {error && (
        <div className="p-3 bg-red-100 text-red-700 text-sm rounded-lg border border-red-200">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:bg-gray-800 dark:text-white dark:border-gray-700"
            placeholder="name@example.com"
            data-testid="auth-signup-email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:bg-gray-800 dark:text-white dark:border-gray-700"
            placeholder="Minimum 6 characters"
            data-testid="auth-signup-password"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        data-testid="auth-signup-submit"
        className="w-full py-2.5 sm:py-3 px-4 bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
      >
        {isLoading ? 'Creating account...' : 'Create Account'}
      </button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/login" className="text-green-600 font-semibold hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
};

export default SignupForm;
