// src/components/product/product-skeleton.tsx

export function ProductSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          {/* Image placeholder */}
          <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
        </div>

        <div className="space-y-4">
          {/* Title placeholder */}
          <div className="h-8 w-1/2 bg-gray-200 rounded animate-pulse" />
          
          {/* Price placeholder */}
          <div className="h-6 w-1/4 bg-gray-200 rounded animate-pulse" />
          
          {/* Description placeholder */}
          <div className="space-y-2">
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Options placeholder */}
          <div className="space-y-2">
            <div className="h-8 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-8 w-full bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}