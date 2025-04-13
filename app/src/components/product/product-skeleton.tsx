'use client';

import React from 'react';

export const ProductSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      {/* Add your skeleton loading UI here */}
      <div className="h-64 bg-gray-200 rounded mb-4"></div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  );
};