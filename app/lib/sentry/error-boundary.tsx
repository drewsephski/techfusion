'use client';

import React, { ErrorInfo, ReactNode } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

// Only import Sentry if it's installed
let Sentry: any;
try {
  Sentry = require('@sentry/nextjs');
} catch (error) {
  console.warn('Sentry not installed or configured');
}

interface ErrorState {
  error?: Error;
  errorInfo?: ErrorInfo;
  hasError: boolean;
}

class SentryErrorBoundary extends React.Component<{
  children: React.ReactNode;
  onReset?: () => void;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  className?: string;
  errorClassName?: string;
}, ErrorState> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Only capture error if Sentry is available
    if (Sentry) {
      Sentry.captureException(error, {
        extra: {
          componentStack: errorInfo.componentStack,
        },
      });
    }
    this.props.onError?.(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false });
    this.props.onReset?.();
  };

  defaultFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
    <div 
      className={`flex flex-col items-center justify-center min-h-[50vh] p-8 space-y-6 ${this.props.className} ${this.props.errorClassName} animate-fade-in`}
      role="alert"
    >
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-12 h-12 rounded-full bg-[#00Aaff]/10 flex items-center justify-center animate-pulse">
            <svg className="w-8 h-8 text-[#00Aaff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-[#00Aaff] mb-2">Error Detected</h2>
        <p className="text-gray-300 max-w-md mx-auto">{error?.message || 'An unexpected error occurred'}</p>
        <p className="text-sm text-gray-500">Please try again or contact support if the issue persists.</p>
      </div>
      <button 
        onClick={resetErrorBoundary} 
        className="px-6 py-2 text-white bg-[#00Aaff] rounded-lg hover:bg-[#0090e6] transition-colors duration-200 shadow-lg hover:shadow-[#00Aaff]/30 focus:outline-none focus:ring-2 focus:ring-[#00Aaff]/50 focus:ring-offset-2"
        aria-label="Try again"
      >
        Try Again
      </button>
    </div>
  );

  render() {
    if (this.state.hasError) {
      return this.defaultFallback({ error: this.state.error, resetErrorBoundary: this.handleReset });
    }

    return this.props.children;
  }
}

export default SentryErrorBoundary;