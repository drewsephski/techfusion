'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from "app/src/types"
import { useErrorBoundary } from './error-boundary';
import { Slot } from '@radix-ui/react-slot';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-[#00Aaff] text-white hover:bg-[#0090e6] active:bg-[#0077cc] focus-visible:ring-[#00Aaff]',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-[#00Aaff] bg-background hover:bg-[#00Aaff]/10 hover:border-[#00Aaff]/50 active:bg-[#00Aaff]/20 focus-visible:ring-[#00Aaff]',
        secondary:
          'bg-[#2D2D2D] text-white hover:bg-[#2D2D2D]/90 active:bg-[#2D2D2D]/80 focus-visible:ring-[#00Aaff]',
        ghost: 'hover:bg-[#00Aaff]/10 hover:text-[#00Aaff] active:bg-[#00Aaff]/20 focus-visible:ring-[#00Aaff]',
        link: 'text-[#00Aaff] underline-offset-4 hover:underline active:text-[#0090e6] focus-visible:ring-[#00Aaff]',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    asChild = false, 
    children, 
    loading = false, 
    disabled = false, 
    onClick, 
    ...props 
  }, ref) => {
    const { handleError, clearError } = useErrorBoundary();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (loading || disabled) return;
      
      try {
        onClick?.(e);
        clearError();
      } catch (err: unknown) {
        handleError(err as Error);
      }
    };

    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        type="button"
        className={cn(
          buttonVariants({ variant, size, className }),
          loading ? "opacity-75 cursor-not-allowed" : "",
          "relative group"
        )}
        ref={ref}
        onClick={handleClick}
        disabled={loading || disabled}
        {...props}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#00Aaff] border-t-transparent"></div>
            <span>Loading...</span>
          </div>
        ) : (
          <>
            {children}
            {variant === 'default' && (
              <div className="absolute inset-0 bg-[#00Aaff] rounded-md opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
            )}
          </>
        )}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };