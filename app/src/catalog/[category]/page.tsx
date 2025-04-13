'use client';

import { motion } from 'framer-motion';
import { Product } from '@/types/product';
import { PagePagination } from "@/components/ui/pagination";
import { ProductCard } from '@/components/product/product-card';
import { useProductContext } from "app/src/contexts/product-context";

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  onAddToCart: (product: Product) => void;
}

export const ProductGrid = ({ 
  products, 
  isLoading, 
  onAddToCart 
}: ProductGridProps) => {
  // Memoize the loading state array to prevent unnecessary re-renders
  const loadingArray = Array.from({ length: 4 });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loadingArray.map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="animate-pulse"
          >
            <div className="h-48 w-full bg-gray-200 rounded-lg mb-4" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-1/3" />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-muted-foreground"
        >
          No products found in this category
        </motion.p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="group"
        >
          <ProductCard
            product={product}
            onAddToCart={onAddToCart || (() => {})}  // Provide empty function if undefined
            loading={false}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { products, loading, currentPage, totalPages, setCurrentPage } = useProductContext();

  const handleAddToCart = (product: Product) => {
    // Implement your cart logic here
    console.log('Adding to cart:', product);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">
          {params.category.charAt(0).toUpperCase() + params.category.slice(1)}
        </h1>
      </motion.div>

      <ProductGrid 
        products={products} 
        isLoading={loading} 
        onAddToCart={handleAddToCart}
      />

      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center gap-4 mt-8"
        >
          <PagePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page: number) => setCurrentPage(page)}
          />
        </motion.div>
      )}
    </div>
  );
}