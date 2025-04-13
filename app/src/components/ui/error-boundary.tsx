// src/app/components/ui/error-boundary.tsx
'use client';

import * as React from 'react';
import { ErrorBoundaryProps } from '@/types/ui';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Button } from './button';

interface State {
  hasError: boolean;
  loading: boolean;
  error?: string;
  errorInfo?: React.ErrorInfo;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
  state: State = {
    hasError: false,
    loading: false,
    error: undefined,
    errorInfo: undefined,
  };

  static getDerivedStateFromError(error: Error): State {
    return { 
      hasError: true,
      loading: false,
      error: error.message,
      errorInfo: undefined
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught:', error, errorInfo);
    if (this.props.onError) {
      this.props.onError(error);
    }
    this.setState({ errorInfo });
  }

  resetError = () => {
    this.setState({ 
      hasError: false,
      loading: false,
      error: undefined,
      errorInfo: undefined
    });
  };

  render() {
    if (this.state.hasError) {
      const errorInfo = this.state.errorInfo;
      return (
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-500">{this.state.error || 'Something went wrong'}</p>
            {errorInfo && (
              <pre className="mt-2 text-sm text-red-400 whitespace-pre-wrap">
                {errorInfo.componentStack}
              </pre>
            )}
            <Button onClick={this.resetError} className="mt-4">
              Try Again
            </Button>
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}

// Create a custom hook for error handling
export function useErrorBoundary() {
  const [state, setState] = React.useState<State>({
    hasError: false,
    loading: false,
    error: undefined,
    errorInfo: undefined
  });

  const handleError = (err: unknown) => {
    if (err instanceof Error) {
      setState(prev => ({
        ...prev,
        hasError: true,
        loading: false,
        error: err.message,
        errorInfo: undefined
      }));
    } else {
      setState(prev => ({
        ...prev,
        hasError: true,
        loading: false,
        error: 'An unexpected error occurred',
        errorInfo: undefined
      }));
    }
  };

  const setLoading = (isLoading: boolean) => {
    setState(prev => ({
      ...prev,
      loading: isLoading,
      error: undefined,
      errorInfo: undefined
    }));
  };

  const clearError = () => {
    setState({
      hasError: false,
      loading: false,
      error: undefined,
      errorInfo: undefined
    });
  };

  return {
    ...state,
    handleError,
    setLoading,
    clearError,
  };
}

export default ErrorBoundary;