'use client';

import { useEffect } from 'react';
import { initPerformanceMonitoring, analytics } from '@/lib/analytics';

export function PerformanceMonitor() {
  useEffect(() => {
    // Initialize performance monitoring
    initPerformanceMonitoring();

    // Track page view
    analytics.trackPageView(window.location.pathname);

    // Track performance metrics after page load
    const handleLoad = () => {
      setTimeout(() => {
        analytics.trackPerformance();
      }, 1000);
    };

    window.addEventListener('load', handleLoad);
    
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return null; // This component doesn't render anything
}
