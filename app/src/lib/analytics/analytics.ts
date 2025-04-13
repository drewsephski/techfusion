// app/src/lib/analytics/analytics.ts
import * as Sentry from '@sentry/nextjs';
import { trackPostHogEvent } from './posthog';

// Track events to both Vercel and PostHog
export type AnalyticsEvent = {
  name: string;
  properties?: Record<string, string | number | boolean | null | undefined>;
  timestamp?: string;
  metadata?: {
    page?: string;
    session_id?: string;
    user_id?: string;
    device?: {
      type: 'mobile' | 'tablet' | 'desktop';
      os?: string;
      browser?: string;
    };
  };
};

// Helper function to safely get window dimensions
const getWindowDimensions = (): { width: number; height: number } => {
  return typeof window !== 'undefined' 
    ? { width: window.innerWidth, height: window.innerHeight }
    : { width: 0, height: 0 };
};

// Helper function to safely get referrer
const getDocumentReferrer = (): string => {
  return typeof document !== 'undefined' ? document.referrer : '';
};

export const trackEvent = (event: AnalyticsEvent['name'], properties: AnalyticsEvent['properties'] = {}) => {
  try {
    const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
    const { width: screen_width, height: screen_height } = getWindowDimensions();
    const metadata = {
      page: pathname,
      session_id: localStorage.getItem('session_id') || generateSessionId(),
      user_id: localStorage.getItem('user_id'),
      device: detectDevice(),
      screen: { width: screen_width, height: screen_height },
      referrer: getDocumentReferrer()
    };

    // Track to PostHog
    trackPostHogEvent(event, {
      ...properties,
      page: metadata.page,
      session_id: metadata.session_id,
      user_id: metadata.user_id,
      device_type: metadata.device.type,
      device_os: metadata.device.os,
      device_browser: metadata.device.browser,
      screen_width,
      screen_height,
      referrer: metadata.referrer
    });

    // Track with Sentry for error tracking
    if (properties.error) {
      Sentry.captureException(properties.error, {
        extra: {
          event,
          properties,
          metadata,
        },
      });
    }
  } catch (error) {
    console.error('Error tracking analytics event:', error);
    
    // Capture analytics tracking errors with Sentry
    if (typeof window !== 'undefined') {
      Sentry.captureException(error, {
        extra: {
          event,
          properties,
          metadata: {
            page: typeof window !== 'undefined' ? window.location.pathname : '',
            session_id: localStorage.getItem('session_id'),
            user_id: localStorage.getItem('user_id'),
          },
        },
      });
    }
  }
};

// Helper functions
const generateSessionId = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2);
  return `${timestamp}-${random}`;
};

const detectDevice = () => {
  const userAgent = navigator.userAgent;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isTablet = /iPad|Android/i.test(userAgent) && !/Mobile/i.test(userAgent);
  
  return {
    type: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
    os: userAgent,
    browser: navigator.userAgent,
  };
};

// Initialize analytics
export const initializeAnalytics = () => {
  // Generate session ID if not exists
  if (!localStorage.getItem('session_id')) {
    localStorage.setItem('session_id', generateSessionId());
  }

  // Track initial page load
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  trackEvent('page_load', {
    path: pathname,
    referrer: getDocumentReferrer(),
    screen_width: getWindowDimensions().width,
    screen_height: getWindowDimensions().height,
  });
};

// Performance monitoring
export const monitorPerformance = () => {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((entryList) => {
      entryList.getEntries().forEach((entry) => {
        if (entry.entryType === 'paint') {
          trackEvent('performance', {
            metric: entry.name,
            value: entry.startTime,
          });
        }
      });
    });

    observer.observe({ entryTypes: ['paint'] });
  }
};

// Initialize analytics and performance monitoring
if (typeof window !== 'undefined') {
  initializeAnalytics();
  monitorPerformance();
}