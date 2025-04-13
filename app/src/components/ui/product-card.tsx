// src/app/components/product-card.tsx
"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { Product } from "@/types/product";
import { trackProductView } from "@/lib/analytics/posthog";
import { useEffect } from "react";

interface ProductCardProps {
  product: Product;
  className?: string;
  onProductClick?: (product: Product) => void;
}

export function ProductCard({ product, className, onProductClick }: ProductCardProps) {
  useEffect(() => {
    trackProductView(product);
  }, [product]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("group relative cursor-pointer overflow-hidden rounded-2xl bg-[#2D2D2D] p-4", className)}
      onClick={() => onProductClick?.(product)}
    >
      <Card className="relative h-full">
        <CardHeader className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="mb-4 h-20 w-20 rounded-full bg-white/10">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
          <CardTitle className="text-xl font-bold text-white">
            {product.name}
          </CardTitle>
          <p className="mt-2 text-blue-300">
            {product.description}
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">${product.price}</Badge>
              <Badge variant="outline" className="bg-white/10">
                {product.rating} ⭐
              </Badge>
              <Badge variant="outline" className="bg-blue-600/40">
                {product.reviews?.length || 0} reviews
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-sm font-bold text-white hover:text-[#5bb2ff] hover:shadow-2xl hover:shadow-[#09f]"
            >
              View Product
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
      </Card>
    </motion.div>
  );
}