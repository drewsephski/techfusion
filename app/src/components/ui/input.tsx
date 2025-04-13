import * as React from 'react';
import { InputProps } from '@/types/ui';
import { useErrorBoundary } from './error-boundary';
import { cn } from "@/lib/utils"

export function Input({ 
  id, 
  type = 'text', 
  placeholder = '', 
  className = '', 
  value, 
  onChange, 
  loading = false, 
  error = '', 
  ...props 
}: InputProps) {
  const { handleError, clearError } = useErrorBoundary();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      onChange?.(e);
      clearError();
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An unknown error occurred');
      handleError(error);
    }
  };

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          "file:text-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          error && "border-red-500",
          loading && "opacity-75 cursor-not-allowed",
          className
        )}
        value={value}
        onChange={handleChange}
        disabled={loading || !!error}
        aria-invalid={!!error}
        aria-describedby={`${id}-error`}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
      {loading && (
        <div className="absolute inset-y-0 right-3 flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
        </div>
      )}
    </div>
  );
}
