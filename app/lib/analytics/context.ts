// app/src/lib/analytics/context.ts
import React, { createContext, useContext, ReactNode } from 'react';
import { trackEvent } from './analytics';

interface AnalyticsContextType {
  trackEvent: (eventName: string, properties?: Record<string, unknown>) => void;
  trackError: (error: unknown, properties?: Record<string, unknown>) => void;
  trackPageView: (path: string, properties?: Record<string, unknown>) => void;
  trackUserAction: (action: string, properties?: Record<string, unknown>) => void;
}

export const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const AnalyticsContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const trackEventWithTimestamp = (eventName: string, properties?: Record<string, unknown>) => {
    const timestamp = new Date().toISOString();
    trackEvent(eventName, { ...properties, timestamp });
  };

  const trackError = (error: unknown, properties?: Record<string, any>) => {
    const errorProperties = {
      timestamp: new Date().toISOString(),
      environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || 'development',
      ...properties
    };

    if (error instanceof Error) {
      trackEvent('error', {
        ...errorProperties,
        message: error.message,
        stack: error.stack,
        name: error.name
      });
    } else {
      trackEvent('error', {
        ...errorProperties,
        message: 'Unknown error occurred',
        type: typeof error
      });
    }
  };

  const trackPageView = (path: string, properties?: Record<string, any>) => {
    trackEvent('page_view', {
      page: path,
      timestamp: new Date().toISOString(),
      ...properties
    });
  };

  const trackUserAction = (action: string, properties?: Record<string, any>) => {
    trackEvent('user_action', {
      action,
      timestamp: new Date().toISOString(),
      ...properties
    });
  };

  const value: AnalyticsContextType = {
    trackEvent: trackEventWithTimestamp,
    trackError,
    trackPageView,
    trackUserAction,
  };

  return React.createElement(AnalyticsContext.Provider, { value }, children);
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsContextProvider');
  }
  return context;
};