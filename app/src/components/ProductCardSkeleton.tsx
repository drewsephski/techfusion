// src/components/product/product-skeleton.tsx

export function ProductSkeleton() {
  return (
    <div className="animate-fade-in animate-duration-500">
      <div className="bg-[#2D2D2D] rounded-xl p-4 shadow-lg hover:shadow-[#00Aaff]/20 transition-shadow duration-300">
        {/* Image placeholder */}
        <div className="aspect-square mb-4 relative overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00Aaff]/10 via-transparent to-[#00Aaff]/10 animate-shimmer" />
        </div>

        {/* Title placeholder */}
        <div className="h-4 w-3/4 bg-[#00Aaff]/10 rounded-full mb-2" />

        {/* Price placeholder */}
        <div className="h-3 w-1/3 bg-[#00Aaff]/10 rounded-full mb-4" />

        {/* Description placeholder */}
        <div className="space-y-2">
          <div className="h-3 w-4/5 bg-[#00Aaff]/10 rounded-full" />
          <div className="h-3 w-3/4 bg-[#00Aaff]/10 rounded-full" />
        </div>

        {/* Action buttons placeholder */}
        <div className="mt-4 flex space-x-2">
          <div className="w-1/2 h-10 bg-[#00Aaff]/10 rounded-lg" />
          <div className="w-1/2 h-10 bg-[#00Aaff]/10 rounded-lg" />
        </div>
      </div>
    </div>
  );
}