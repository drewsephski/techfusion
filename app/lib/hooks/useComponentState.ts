// src/hooks/useComponentState.ts
import { useState } from 'react';

export interface LoadingState<T = unknown> {
  isLoading: boolean;
  error?: string | null;
  data?: T | null;
  retry: () => void;
}

export function useComponentState<T = unknown>() {
  const [state, setState] = useState<LoadingState<T>>({
    isLoading: false,
    error: null,
    data: undefined,
    retry: () => {}
  });

  const startLoading = () => setState(prev => ({ ...prev, isLoading: true, error: null }));
  const setError = (error: string) => setState(prev => ({ ...prev, isLoading: false, error }));
  const setData = (data: T) => setState(prev => ({ ...prev, isLoading: false, error: null, data }));
  const reset = () => setState({ isLoading: false, error: null, data: undefined, retry: () => {} });

  return {
    ...state,
    startLoading,
    setError,
    setData,
    reset,
  };
}