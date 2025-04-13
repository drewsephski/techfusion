// src/components/ui/skeleton.tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'image' | 'card';
}

export function Skeleton({ className, variant = 'text' }: SkeletonProps) {
  const variants = {
    text: 'h-4 w-32',
    image: 'h-32 w-full',
    card: 'h-48 w-full'
  };

  return (
    <div className={cn(
      "animate-pulse bg-gray-200 rounded-lg",
      variants[variant],
      className
    )}></div>
  );
}