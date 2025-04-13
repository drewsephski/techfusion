'use client';

import React, { useEffect } from 'react';
import { Product } from '@/types/product';
import { useProductContext } from '@/contexts/product-context';
import { Card } from '@/components/ui/card';
import { ProductCard } from './product-card';
import { Skeleton } from '@/components/ui/skeleton';
import { useComponentState } from 'app/lib/hooks/useComponentState';

interface RelatedProductsProps {
  products?: Product[];
  category?: string;
  excludeId?: string;
}

export function RelatedProducts({ products, category, excludeId }: RelatedProductsProps) {
  const { getProductsByCategory } = useProductContext();
  const { isLoading, error, data, startLoading, setError, setData } = useComponentState<Product[]>();
  
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      startLoading();
      try {
        const relatedProducts = await getProductsByCategory(category || '');
        const filteredProducts = relatedProducts.filter(
          (product: Product) => product.id !== excludeId
        );
        setData(filteredProducts);
      } catch (err) {
        setError(err as string);
      }
    };

    if (category) {
      fetchRelatedProducts();
    }
  }, [category, excludeId, getProductsByCategory, setData, setError, startLoading]);

  if (error) {
    return (
      <Card className="p-4">
        <div className="text-red-500 text-center">
          {error}
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Related Products</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} variant="card" className="w-full h-80" />
          ))
        ) : (
          (products || data || []).map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => console.log('Add to cart')}
              loading={false}
              error={null}
            />
          ))
        )}
      </div>
    </div>
  );
}