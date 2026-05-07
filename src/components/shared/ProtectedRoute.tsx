'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/auth';
import SplashScreen from './SplashScreen';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute Wrapper.
 * Prevents unauthorized access to pages (e.g., Dashboard).
 * Redirects to /login if no session is found.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = auth.isAuthenticated();
      
      if (!isAuthenticated) {
        router.push('/login');
      } else {
        setIsVerifying(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isVerifying) {
    return <SplashScreen />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
