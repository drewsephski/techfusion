import { CSSProperties } from 'react';
import { Product } from '@/types/product';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: CSSProperties;
  children: React.ReactNode;
  loading?: boolean;
  error?: string | null;
  data?: unknown;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'default' | 'outline' | 'secondary';
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  type: string;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading?: boolean;
  error?: string;
}

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onReset?: () => void;
  resetKeys?: unknown[];
  onError?: (error: Error) => void;
}

export interface LoadingState<T = unknown> {
  isLoading: boolean;
  error?: string | null;
  data?: T;
  retry: () => void;
}

export interface ProductCardProps extends CardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export interface RelatedProductsProps extends CardProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  category?: string;
  excludeId?: string;
  className?: string;
}

export interface UIState {
  loading: boolean;
  error: string | null;
  data: unknown;
  success: boolean;
  message: string | null;
}

export interface FormState {
  values: Record<string, unknown>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
}

// Add types for common UI states
export interface LoadingStates {
  isLoading: boolean;
  error?: string;
  data?: unknown;
  retry: () => void;
}

// Add types for error handling
export interface ErrorState {
  error: string | null;
  hasError: boolean;
  errorMessage: string;
  resetError: () => void;
}

// Add types for loading indicators
export interface LoadingIndicatorProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
}