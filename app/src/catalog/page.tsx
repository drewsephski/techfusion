'use client';

import React from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Search, Filter, Link, Loader2 } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { toast, Toaster } from "sonner";
import { useDebounce } from 'use-debounce';
import { useState, useCallback, useMemo } from 'react';
import { categories } from "@/data/categories";
import { mockProducts } from '../data/mock-products';
import Image from 'next/image';

// Types
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  features: string[];
  images: string[];
  specs: Record<string, string>;
  stock: number;
  featured: boolean;
}

// Shared props interface
interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

// Components
const ProductCard = React.memo(({ product, onAddToCart }: ProductCardProps) => (
  <Card className="bg-[#2D2D2D] hover:bg-[#3D3D3D] transition-colors duration-300 relative">
    <div className="aspect-square relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#00Aaff]/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      <Image
        src={product.images[0] || '/placeholder.jpg'}
        alt={product.name}
        fill
        className="object-cover transition-opacity duration-300"
        onError={(e) => {
          const img = e.target as HTMLImageElement;
          img.src = '/placeholder.jpg';
        }}
        aria-label={`Product image for ${product.name}`}
        priority={false}
      />
    </div>
    <div className="p-4">
      <h3 className="text-sm font-medium text-white truncate" title={product.name}>
        {product.name}
      </h3>
      <div className="mt-2 flex flex-col gap-2">
        <span className="text-[#00Aaff] font-medium">
          ${product.price.toFixed(2)}
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="bg-[#00Aaff] text-black hover:bg-[#0088cc] transition-colors duration-300 w-full"
          onClick={() => onAddToCart(product)}
          disabled={product.stock <= 0}
          aria-label={product.stock <= 0 ? 'Item out of stock' : `Add ${product.name} to cart`}
        >
          {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </div>
    </div>
  </Card>
));

ProductCard.displayName = 'ProductCard';

const Header = React.memo(({ onRefresh, cartCount }: { 
  onRefresh: () => void;
  cartCount: number;
}) => (
  <div className="flex flex-col md:flex-row justify-between items-center mb-8">
    <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">Product Catalog</h1>
    <button
      onClick={onRefresh}
      className="px-4 py-2 bg-[#00Aaff] text-white rounded hover:bg-[#0088cc] transition-colors"
      aria-label="Refresh product list"
    >
      Refresh
    </button>
    <div className="flex gap-4">
      <Button variant="ghost">
        <Link href="/cart" className="flex items-center gap-2">
          Cart
          <span className="text-[#00Aaff]">({cartCount})</span>
        </Link>
      </Button>
      <Button variant="outline" className="bg-[#00Aaff] text-black hover:bg-[#0088cc]">
        <Link href="/checkout" className="flex items-center gap-2">
          Checkout
          <Sparkles className="w-4 h-4 text-white animate-pulse" aria-hidden="true" />
        </Link>
      </Button>
    </div>
  </div>
));

Header.displayName = 'Header';

const SearchBar = ({ 
  searchQuery, 
  setSearchQuery,
  selectedCategory,
  setSelectedCategory
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}) => (
  <div className="flex flex-col md:flex-row gap-4 mb-8">
    <div className="flex-1">
      <Label htmlFor="search" className="sr-only">Search products</Label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          id="search"
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
    </div>
    
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setSelectedCategory("")}
      disabled={!searchQuery && !selectedCategory}
    >
      <Filter className="w-4 h-4 mr-2" />
      Clear Filters
    </Button>
  </div>
);

const CategoryTabs = ({ setSelectedCategory }: { 
  setSelectedCategory: (category: string) => void;
}) => (
  <Tabs defaultValue="all" className="w-full mb-8">
    <TabsList className="grid w-full grid-cols-4">
      <TabsTrigger 
        value="all" 
        className="bg-[#2D2D2D] text-white hover:bg-[#3D3D3D]"
        onClick={() => setSelectedCategory("")}
      >
        All
      </TabsTrigger>
      {categories.map((category) => (
        <TabsTrigger
          key={category.id}
          value={String(category.id)}
          className="bg-[#00092d62] text-white hover:bg-[#3b5d73]"
          onClick={() => setSelectedCategory(String(category.id))}
        >
          {category.name}
        </TabsTrigger>
      ))}
    </TabsList>
  </Tabs>
);

const LoadMoreButton = ({ isLoading, onRefetch }: { 
  isLoading: boolean;
  onRefetch: () => void;
}) => (
  !isLoading && (
    <div className="mt-8 text-center">
      <Button
        variant="outline"
        className="bg-[#00Aaff] text-black hover:bg-[#0088cc] transition-colors duration-300"
        onClick={onRefetch}
      >
        Load More <Loader2 className="w-4 h-4 animate-spin" />
      </Button>
    </div>
  )
);

export default function CatalogPage() {
  const { addToCart, cartItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [products] = useState(mockProducts);
  const [error, setError] = useState<string | null>(null);

  const handleAddToCart = useCallback((product: Product) => {
    try {
      const now = new Date().toISOString();
      addToCart({
        ...product,
        quantity: 1,
        createdAt: now,
        updatedAt: now
      });
      toast.success(`Added ${product.name} to cart!`, {
        className: "bg-[#2D2D2D] text-white border border-[#00Aaff]/20",
        duration: 3000
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add product to cart');
      toast.error('Failed to add product to cart', {
        className: "bg-[#2D2D2D] text-white border border-[#FF4444]/20",
        duration: 3000
      });
    }
  }, [addToCart]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    
    return products.filter(product => {
      const matchesSearch = debouncedSearchQuery 
        ? product.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
        : true;
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, debouncedSearchQuery, selectedCategory]);

  const refetch = useCallback(() => {
    setIsLoading(true);
    setError(null);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Products loaded successfully!', {
        className: "bg-[#2D2D2D] text-white border border-[#00Aaff]/20",
        duration: 3000
      });
    }, 1000);
  }, []);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <main className="min-h-screen bg-[#1E1E1E]" role="main">
      <div className="container mx-auto px-4 py-8">
        <Header 
          onRefresh={handleRefresh} 
          cartCount={cartItems.length}
        />
        
        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <CategoryTabs 
          setSelectedCategory={setSelectedCategory}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div 
                key={i} 
                className="bg-[#2D2D2D] p-4 rounded animate-pulse" 
                role="status"
                aria-label="Loading product"
              />
            ))
          ) : error ? (
            <div className="col-span-full text-center text-red-400 py-8" role="alert">
              {error}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 py-8">
              No products found matching your criteria
            </div>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart} 
              />
            ))
          )}
        </div>

        <LoadMoreButton 
          isLoading={isLoading}
          onRefetch={refetch}
        />
      </div>

      <Toaster 
        theme="dark" 
        position="top-center" 
        toastOptions={{
          duration: 3000,
          className: "bg-[#2D2D2D] text-white border border-[#00Aaff]/20"
        }}
      />
    </main>
  );
}