/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Product, CartItem, ApiResponse } from './types';

export * from './product';

// Shared utilities
export const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

// Shared constants
export const SORT_OPTIONS = {
  relevance: (_a: Product, b: Product) => 0,
  'price-low': (a: Product, b: Product) => a.price - b.price,
  'price-high': (a: Product, b: Product) => b.price - a.price,
  rating: (a: Product, b: Product) => (b.rating ?? 0) - (a.rating ?? 0),
} as const;

export const priceFilters = [
  { value: 'all', label: 'All Prices' },
  { value: 'under-50', label: 'Under $50' },
  { value: '50-100', label: '$50 - $100' },
  { value: 'over-100', label: 'Over $100' },
];