// Analytics and performance monitoring utilities

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, unknown>;
  timestamp?: number;
}

class Analytics {
  private isEnabled: boolean;
  private events: AnalyticsEvent[] = [];

  constructor() {
    this.isEnabled = typeof window !== 'undefined' && process.env.NODE_ENV === 'production';
  }

  // Track custom events
  track(event: string, properties?: Record<string, unknown>) {
    if (!this.isEnabled) return;

    const analyticsEvent: AnalyticsEvent = {
      event,
      properties: {
        ...properties,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      },
      timestamp: Date.now(),
    };

    this.events.push(analyticsEvent);

    // Send to Google Analytics if available
    if (typeof window !== 'undefined' && (window as unknown as { gtag?: (command: string, event: string, properties?: Record<string, unknown>) => void }).gtag) {
      (window as unknown as { gtag: (command: string, event: string, properties?: Record<string, unknown>) => void }).gtag('event', event, properties);
    }

    // Send to custom analytics endpoint
    this.sendToAnalytics(analyticsEvent);
  }

  // Track search events
  trackSearch(query: string, resultCount: number, responseTime: number) {
    this.track('search', {
      query: query.substring(0, 100), // Truncate for privacy
      resultCount,
      responseTime,
      queryLength: query.length,
    });
  }

  // Track page views
  trackPageView(page: string) {
    this.track('page_view', {
      page,
      referrer: document.referrer,
    });
  }

  // Track errors
  trackError(error: string, context?: string) {
    this.track('error', {
      error,
      context,
      severity: 'error',
    });
  }

  // Track user interactions
  trackInteraction(action: string, element: string) {
    this.track('interaction', {
      action,
      element,
    });
  }

  // Send events to analytics endpoint
  private async sendToAnalytics(event: AnalyticsEvent) {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
    } catch (error) {
      console.error('Failed to send analytics event:', error);
    }
  }

  // Get performance metrics
  getPerformanceMetrics() {
    if (typeof window === 'undefined') return null;

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    return {
      pageLoadTime: navigation.loadEventEnd - navigation.loadEventStart,
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
      firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
    };
  }

  // Track performance
  trackPerformance() {
    const metrics = this.getPerformanceMetrics();
    if (metrics) {
      this.track('performance', metrics);
    }
  }
}

export const analytics = new Analytics();

// Performance monitoring
export function initPerformanceMonitoring() {
  if (typeof window === 'undefined') return;

  // Track page load performance
  window.addEventListener('load', () => {
    setTimeout(() => {
      analytics.trackPerformance();
    }, 1000);
  });

  // Track Core Web Vitals
  if (typeof window !== 'undefined') {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS((metric) => analytics.track('web_vital', { name: 'CLS', value: metric.value }));
      getFID((metric) => analytics.track('web_vital', { name: 'FID', value: metric.value }));
      getFCP((metric) => analytics.track('web_vital', { name: 'FCP', value: metric.value }));
      getLCP((metric) => analytics.track('web_vital', { name: 'LCP', value: metric.value }));
      getTTFB((metric) => analytics.track('web_vital', { name: 'TTFB', value: metric.value }));
    }).catch(() => {
      // web-vitals not available, continue without it
    });
  }
}
