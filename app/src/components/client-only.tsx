'use client';

import { useEffect, useState } from 'react';
import ErrorBoundary from '@/components/ui/error-boundary';
import { LoadingSpinner } from '@/components/loading-spinner';

interface ClientOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  loading?: React.ReactNode;
} 

export function ClientOnly({ children, fallback, loading }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return loading || <LoadingSpinner className="h-8 w-8" />;
  }

  if (hasError) {
    return fallback || <div className="text-red-500">Failed to load component</div>;
  }

  return (
    <ErrorBoundary onError={() => setHasError(true)}>
      {children}
    </ErrorBoundary>
  );
}