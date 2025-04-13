'use client';

import { useState, useCallback } from 'react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';

interface ProductOptionsProps {
  product: Product;
  onAddToCart: (product: Product, options: Record<string, string>) => void;
  className?: string;
}

export function ProductOptions({ product, onAddToCart, className }: ProductOptionsProps) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);

  const handleOptionChange = useCallback((option: string, value: string) => {
    setSelectedOptions(prev => ({ ...prev, [option]: value }));
  }, []);

  const handleQuantityChange = useCallback((value: number) => {
    setQuantity(value);
  }, []);

  const handleAddToCart = useCallback(() => {
    if (product.stock < quantity) {
      alert(`Only ${product.stock} items available in stock`);
      return;
    }
    
    onAddToCart(product, selectedOptions);
  }, [product, selectedOptions, quantity, onAddToCart]);

  return (
    <div className={`bg-gray-50 p-4 rounded-lg ${className}`}>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <label htmlFor="quantity" className="text-sm font-medium">
            Quantity
          </label>
          <select
            id="quantity"
            value={quantity}
            onChange={(e) => handleQuantityChange(Number(e.target.value))}
            className="w-20 p-2 border rounded"
          >
            {Array.from({ length: Math.min(product.stock, 10) }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {product.options && Object.entries(product.options).map(([option, values]) => (
          <div key={option} className="space-y-2">
            <label className="text-sm font-medium">{option}</label>
            <select
              value={selectedOptions[option] || ''}
              onChange={(e) => handleOptionChange(option, e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select {option}</option>
              {Array.isArray(values) ? values.map((value: string) => (
                <option key={value} value={value}>
                  {value}
                </option>
              )) : null}
            </select>
          </div>
        ))}

        <Button
          onClick={handleAddToCart}
          className="w-full"
          disabled={product.stock < quantity}
        >
          Add to Cart
        </Button>

        {product.stock === 0 && (
          <p className="text-sm text-red-500 mt-2">Out of stock</p>
        )}
      </div>
    </div>
  );
}