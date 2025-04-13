// src/components/product/product-gallery.tsx
'use client';

import { Product } from "app/app/types/product";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useCallback } from "react";

interface ProductGalleryProps {
  product: Product;
  className?: string;
}

export function ProductGallery({ product, className }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div className="aspect-square overflow-hidden rounded-lg">
        <Image 
          src={product.mainImage} 
          alt={product.name} 
          fill 
          className="object-contain transition-transform duration-300 hover:scale-105"
          priority
        />
      </div>

      {product.images.length > 1 && (
        <div className="flex gap-2 mt-4">
          {product.images.map((image, index) => (
            <button
              key={image}
              onClick={() => handleImageClick(index)}
              className={`relative aspect-square w-20 cursor-pointer rounded-md overflow-hidden border-2 border-transparent transition-colors ${
                index === currentIndex ? 'border-blue-500' : 'hover:border-gray-300'
              }`}
            >
              <Image 
                src={image} 
                alt={product.name} 
                fill 
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// src/components/product/product-specs.tsx
interface ProductSpecsProps {
  specs: Record<string, string>;
}

export function ProductSpecs({ specs }: ProductSpecsProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Specifications</h3>
      <div className="space-y-2">
        {Object.entries(specs).map(([key, value]) => (
          <div key={key} className="flex justify-between">
            <span className="text-gray-600">{key}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// src/components/product/product-reviews.tsx
interface ProductReviewsProps {
  productId: string;
  initialReviews: number;
}

export function ProductReviews({ productId, initialReviews }: ProductReviewsProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
      <div>
        <p className="text-gray-600">Total Reviews: {initialReviews}</p>
        {/* Add your review components here */}
      </div>
    </div>
  );
}

// src/components/product/related-products.tsx
interface RelatedProductsProps {
  category: string;
  excludeId: string;
}

export function RelatedProducts({ category, excludeId }: RelatedProductsProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Related Products</h3>
      {/* Add your related products grid here */}
    </div>
  );
}

// src/components/product/product-options.tsx
interface ProductOptionsProps {
  product: Product; 
  onAddToCart: (options: Record<string, any>) => void;
}

export function ProductOptions({ product, onAddToCart }: ProductOptionsProps) {
  const handleAddToCart = () => {
    onAddToCart({});
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Options</h3>
      <button 
        onClick={handleAddToCart}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </div>
  );
}