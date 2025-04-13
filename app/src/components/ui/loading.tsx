// src/components/ui/loading.tsx
import * as React from 'react';
import { LoadingIndicatorProps } from '@/types/ui';

interface LoadingProps {
  className?: string;
}

export function Loading({ className }: LoadingProps) {
  return (
    <div className={`flex items-center justify-center ${className || ''}`}>
      <LoadingIndicator />
    </div>
  );
}

export function LoadingIndicator({ 
  size = 'md', 
  className = '', 
  color = 'primary' 
}: LoadingIndicatorProps) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  const colors = {
    primary: 'border-primary',
    secondary: 'border-secondary',
    accent: 'border-accent'
  };

  return (
    <div className="flex items-center justify-center">
      <div 
        className={`relative animate-spin rounded-full ${sizes[size]} ${colors[color]} ${className}`}
      />
    </div>
  );
}