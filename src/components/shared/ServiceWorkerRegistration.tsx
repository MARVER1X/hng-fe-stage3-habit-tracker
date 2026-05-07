'use client';

import { useEffect } from 'react';

/**
 * Service Worker registration is handled via this client component.
 */
export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      window.location.hostname !== 'localhost'
    ) {
      // Service worker is registered for offline support
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => console.log('Service Worker registered', reg))
        .catch((err) => console.error('Service Worker failed', err));
    } else if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      window.location.hostname === 'localhost'
    ) {
        // Service worker is registered on localhost for development testing
        navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => console.log('Service Worker registered on Localhost', reg))
        .catch((err) => console.error('Service Worker failed', err));
    }
  }, []);

  return null;
}
