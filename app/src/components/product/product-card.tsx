'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, X, Loader2, Share } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@/types/product";
import * as React from 'react';
import { useErrorBoundary } from '@/components/ui/error-boundary';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  loading?: boolean;
  error?: string | null;
}

export function ProductCard({ 
  product, 
  onAddToCart,
  loading = false,
  error = null 
}: ProductCardProps) {
  const { handleError, setLoading, clearError } = useErrorBoundary();

  const handleAddToCart = async () => {
    setLoading(true);
    clearError();
    try {
      await onAddToCart(product);
    } catch (err) {
      handleError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card 
        loading={loading} 
        error={error}
        className="relative overflow-hidden hover:shadow-lg transition-all duration-300"
      >
        {/* Product Image with hover effects */}
        <CardHeader className="flex flex-col items-center p-4 relative">
          <div className="relative aspect-square w-full mb-4 group-hover:opacity-70 transition-opacity duration-300">
            {loading ? (
              <Skeleton variant="image" className="absolute inset-0" />
            ) : error ? (
              <div className="text-red-500 text-center h-full flex items-center justify-center">
                {error}
              </div>
            ) : (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-contain transition-transform duration-300 hover:scale-105"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
            {/* Quick Actions Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50">
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/90 hover:bg-white/70"
                >
                  <Star className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/90 hover:bg-white/70"
                >
                  <Share className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
          {/* Product Info */}
          <div className="text-center">
            {loading ? (
              <Skeleton variant="text" />
            ) : error ? (
              <div className="text-red-500 text-center">
                {error}
              </div>
            ) : (
              <>
                <CardTitle className="text-lg font-semibold line-clamp-2">
                  {product.name}
                </CardTitle>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-muted-foreground">
                    {product.rating?.toFixed(1)}
                  </span>
                </div>
                <Badge 
                  variant="secondary" 
                  className="mt-2"
                >
                  {product.category}
                </Badge>
              </>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            {loading ? (
              <Skeleton variant="text" />
            ) : error ? (
              <div className="text-red-500 text-center">
                {error}
              </div>
            ) : (
              <span className="text-2xl font-bold">${product.price}</span>
            )}
            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0 || loading || !!error}
              className="w-full"
            >
              {product.stock === 0 ? (
                <>
                  <X className="w-4 h-4 mr-2" />
                  Out of Stock
                </>
              ) : loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}