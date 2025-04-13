"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "app/lib/utils";
import { ChevronRight, Loader2, Sparkles } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Category } from "@/data/categories";
import { useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";
import Image from 'next/image';

interface CatalogGridProps {
  categories: Category[];
  className?: string;
  isLoading?: boolean;
  hasMore?: boolean;
  loadMore?: () => void;
  error?: string;
}

export function CatalogGrid({ 
  categories, 
  className, 
  isLoading = false, 
  hasMore = false,
  loadMore,
  error 
}: CatalogGridProps) {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const router = useRouter();
  const [ref, inView] = useInView({ threshold: 0.5 });

  const handleCategoryClick = (category: Category) => {
    router.push(`/catalog/${category.slug}`);
  };

  const handleLoadMore = useCallback(() => {
    if (loadMore && hasMore) {
      loadMore();
    }
  }, [loadMore, hasMore]);

  // Handle scroll direction for infinite scroll
  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      handleLoadMore();
    }
  }, [inView, hasMore, isLoading, handleLoadMore]);

  return (
    <div className={cn("relative", className)}>
      {/* Loading State with enhanced animation */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="flex flex-col items-center gap-4"
          >
            <Loader2 className="h-12 w-12 animate-spin text-white" />
            <p className="text-white/80">Loading Categories...</p>
          </motion.div>
        </div>
      )}

      {/* Error State with enhanced styling */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-red-400"
        >
          <p className="text-lg font-semibold mb-2">Error loading categories</p>
          <p className="text-sm">{error}</p>
        </motion.div>
      )}

      {/* Grid Container with enhanced animations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "grid gap-6",
          !isLoading && !error && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        )}
      >
        {categories.map((category) => (
          <motion.div
            key={category.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: category.id * 0.1 }}
            className="relative group cursor-pointer overflow-hidden rounded-2xl bg-[#2D2D2D] p-4"
            onMouseEnter={() => setHoveredCategory(category.id)}
            onMouseLeave={() => setHoveredCategory(null)}
            onClick={() => handleCategoryClick(category)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="relative h-full">
              <CardHeader className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <motion.div
                  className="mb-4 h-20 w-20 rounded-full bg-white/10 relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="h-full w-full relative">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 200px"
                      priority
                    />
                  </div>
                  {/* Parallax effect for image */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${category.image})`,
                      backgroundSize: "120%",
                      backgroundPosition: "center",
                    }}
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
                <CardTitle className="text-2xl font-bold text-white">
                  {category.name}
                </CardTitle>
                <p className="mt-2 text-gray-400">
                  {category.description}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <Badge variant="secondary">{category.products} products</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-auto text-sm font-medium text-white hover:text-[#00F5FF] transition-transform"
                  >
                    Browse
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform" />
                  </Button>
                </div>
              </CardHeader>
            </Card>

            {/* Enhanced Hover Overlay with sparkles effect */}
            {hoveredCategory === category.id && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30"
              >
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Badge variant="outline" className="bg-white/10">
                      {category.color}
                    </Badge>
                    {category.featured && (
                      <Badge variant="outline" className="bg-white/10">
                        Featured
                      </Badge>
                    )}
                    {category.new && (
                      <Badge variant="outline" className="bg-white/10">
                        New
                      </Badge>
                    )}
                  </motion.div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-sm font-medium text-white hover:text-[#00F5FF] transition-transform"
                  >
                    View Products
                    <Sparkles className="ml-2 h-4 w-4 animate-pulse text-[#00F5FF]" />
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Enhanced Load More Button with infinite scroll */}
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleLoadMore}
            variant="outline"
            className="w-full max-w-md relative"
            disabled={isLoading}
          >
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin text-[#00F5FF]" />
                </motion.div>
              )}
            </AnimatePresence>
            {isLoading ? "" : "Load More Categories"}
          </Button>
        </div>
      )}

      {/* Enhanced Intersection Observer with loading animation */}
      {hasMore && (
        <motion.div
          ref={ref}
          className="h-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </div>
  );
}