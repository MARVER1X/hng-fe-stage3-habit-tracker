'use client';

import { useEffect } from 'react';

/**
 * Client Component for registering the Service Worker.
 * Extracted from RootLayout to keep the layout as a Server Component.
 */
export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      window.location.hostname !== 'localhost'
    ) {
      // We only register if it's not localhost to avoid dev caching issues
      // Or you can register on localhost if you want to test PWA features locally
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => console.log('Service Worker registered', reg))
        .catch((err) => console.error('Service Worker failed', err));
    } else if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      window.location.hostname === 'localhost'
    ) {
        // For HNG tasks, we usually want to prove it's registered even on local
        navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => console.log('Service Worker registered on Localhost', reg))
        .catch((err) => console.error('Service Worker failed', err));
    }
  }, []);

  return null;
}
