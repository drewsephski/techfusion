// Create a new file: related-products-by-category.tsx
import { useProductContext } from '@/contexts/product-context';
import Image from 'next/image';

interface RelatedProductsByCategoryProps {
  category: string;
  excludeId: string;
}

export const RelatedProductsByCategory: React.FC<RelatedProductsByCategoryProps> = ({ category, excludeId }) => {
  const { products } = useProductContext();
  
  // Filter related products
  const relatedProducts = products
    .filter(p => p.category === category && p.id !== excludeId)
    .slice(0, 4); // Show 4 related products

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {relatedProducts.map((product) => (
        <div
          key={product.id}
          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="relative w-full h-48 mb-4">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-blue-950">${product.price}</p>
        </div>
      ))}
    </div>
  );
};