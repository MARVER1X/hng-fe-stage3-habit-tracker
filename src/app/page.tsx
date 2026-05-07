'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/auth';
import SplashScreen from '@/components/shared/SplashScreen';

/**
 * Root route handles the initial application boot sequence.
 * Session validation and redirection are performed after a mandatory splash delay.
 */
export default function Home() {
  const router = useRouter();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      // Artificial delay is applied to ensure splash visibility for testing purposes
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
  }, [router]);

  // Splash screen is rendered during initialization phase
  if (isInitializing) {
    return <SplashScreen />;
  }

  // Fallback (rarely seen due to redirects)
  return null;
}
