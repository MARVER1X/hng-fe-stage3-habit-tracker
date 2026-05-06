'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/auth';
import SplashScreen from '@/components/shared/SplashScreen';

/**
 * Root Route: Splash/Boot Sequence.
 * Responsible for initial session check and redirection with a mandatory delay.
 * Target duration: 1200ms (within 800ms - 2000ms range).
 */
export default function Home() {
  const router = useRouter();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      // Small artificial delay to ensure splash screen is testable
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const authenticated = auth.isAuthenticated();
      
      if (authenticated) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
      
      setIsInitializing(false);
    };

    checkSession();
  }, []);

  // Render the splash screen while checking session
  if (isInitializing) {
    return <SplashScreen />;
  }

  // Fallback (rarely seen due to redirects)
  return null;
}
