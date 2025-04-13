'use client';

import * as Sentry from '@sentry/nextjs';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

interface Props {
  children: React.ReactNode;
  fallbackRender?: (props: {
    error: Error;
    resetErrorBoundary: () => void;
  }) => React.ReactNode;
}

export function SentryErrorBoundary({ children, fallbackRender }: Props) {
  const defaultFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
    <div>
      <h2>Something went wrong.</h2>
      <p>{error.message}</p>
      <button onClick={() => resetErrorBoundary()}>Try again</button>
    </div>
  );

  return (
    <ReactErrorBoundary
      fallbackRender={fallbackRender || defaultFallback}
      onReset={() => {
        // Reset the state of your application so the error doesn't happen again
      }}
      onError={(error, errorInfo) => {
        Sentry.captureException(error, {
          extra: {
            componentStack: errorInfo.componentStack,
          },
        });
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}