'use client'

import React from 'react';

interface ProductSpecsProps {
  product: {
    specs: Record<string, string>;
  };
}

export const ProductSpecs: React.FC<ProductSpecsProps> = ({ product }) => {
  return (
    <div className="product-specs">
      <h2>Product Specifications</h2>
      <div className="specs-grid">
        {Object.entries(product.specs).map(([key, value]) => (
          <div key={key} className="spec-item">
            <span className="spec-label">{key}:</span>
            <span className="spec-value">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};