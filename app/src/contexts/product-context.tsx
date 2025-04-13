'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/types/product';

interface ProductContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  loading: boolean;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  setTotalPages: (pages: number) => void;
  setLoading: (loading: boolean) => void;
  getProductsByCategory: (category: string) => Promise<Product[]>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getProductsByCategory = async (category: string) => {
    setLoading(true);
    try {
      // Implement your API call here to fetch products by category
      // This is just a placeholder - replace with your actual API call
      const response = await fetch(`/api/products?category=${category}`);
      const data = await response.json();
      setProducts(data);
      return data;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        loading,
        currentPage,
        totalPages,
        setCurrentPage,
        setTotalPages,
        setLoading,
        getProductsByCategory
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
}