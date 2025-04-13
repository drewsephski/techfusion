// src/app/contexts/search-context.tsx
import { createContext, useContext, useState } from 'react';

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: {
    price: string;
    rating: string;
    category: string;
  };
  setFilters: (filters: Partial<SearchContextType['filters']>) => void;
}

export const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    price: 'all',
    rating: 'all',
    category: 'all',
  });

  const handleSetFilters = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
    }));
  };

  const value = {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters: handleSetFilters,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}