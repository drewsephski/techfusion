// src/types/product.ts

export interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  date: string;
  helpfulCount: number;
}

export interface Product {
  id: string;
  name: string;
  mainImage: string;
  images: string[];
  price: number;
  description: string;
  specs?: Record<string, string>;
  rating?: number;  // Add this line
}

export interface SimpleProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  rating?: number;
  stock: number;
}

export interface HomePageProps {
  products: SimpleProduct[];
}

export interface HomePageClientProps {
  products: SimpleProduct[];
}

export interface ProductCardProps {
  product: SimpleProduct;
  onAddToCart: (product: SimpleProduct) => void;
  loading: boolean;
}

export interface FooterLink {
  href: string;
  text: string;
}

export interface FooterSectionProps {
  title: string;
  content: string;
}

export interface FooterLinksProps {
  title: string;
  links: FooterLink[];
}

export type SortOption = 'relevance' | 'price-low' | 'price-high' | 'rating';

export interface FilterOptions {
  price: 'all' | 'under-50' | '50-100' | 'over-100';
  rating: 'all' | '3-up' | '4-up';
  sortBy: SortOption;
}

export interface FetchProductsParams {
  limit: number;
  category: string;
  searchQuery?: string;
  page: number;
  price?: string;
  rating?: string;
  sortBy?: string;
}

export interface CategoryPageProps {
  params: {
    category: string;
  };
}

export interface CartItem extends Omit<Product, 'mainImage'> {
  quantity: number;
  options?: Record<string, string | number | boolean>;
  images: string[];
}

// Utility types
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type Required<T> = {
  [P in keyof T]-?: T[P];
};

// Common constants
export const SORT_OPTIONS = {
  relevance: () => 0,
  'price-low': (a: Product, b: Product) => a.price - b.price,
  'price-high': (a: Product, b: Product) => b.price - a.price,
  rating: (a: Product, b: Product) => (b.rating || 0) - (a.rating || 0)
} as const;