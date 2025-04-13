// src/app/products/[id]/page.tsx
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductSpecs } from "@/components/product/product-specs";
import { ProductReviews } from "@/components/product/product-reviews";
import { RelatedProducts } from "@/components/product/related-products";
import { ProductOptions } from "@/components/product/product-options";
import { ProductSkeleton } from "@/components/product/product-skeleton"; 
import { useCart } from "@/contexts/cart-context";
import { useProduct } from 'app/lib/hooks/useProduct';
import { Product } from "@/types/product";
import Link from "next/link";
import { motion } from "framer-motion";
import { Metadata } from "next";

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { id } = params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
  const product = await response.json();

  if (!product) {
    return {
      title: "Product Not Found | TechFusion",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: `${product.name} | TechFusion`,
    description: product.description || '',
    openGraph: {
      images: product.images ? [product.images[0]] : [],
      type: "website",
      locale: "en_US",
      siteName: "TechFusion"
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = params;
  const { data: product, isLoading, error } = useProduct(id);
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product, options: Record<string, string>) => {
    const cartItem = {
      ...product,
      quantity: 1,
      options,
      images: product.images || []
    };
    addToCart(cartItem);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ProductSkeleton />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Error loading product</h1>
          <p className="text-gray-600 mb-6">Please try again later.</p>
          <Link 
            href="/products" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Link 
              href="/products" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
              aria-label="Back to products"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Products
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left side - Product Images */}
            <div className="relative">
              <ProductGallery 
                product={product}
              />
              {product.stock > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-4 left-4 right-4"
                >
                  <div className="flex justify-between items-center bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-sm">
                    <span className="text-sm text-gray-600">
                      {product.stock} available
                    </span>
                    <button 
                      onClick={() => handleAddToCart(product, {})}
                      className="group relative text-gray-500 hover:text-gray-700 transition-colors duration-200"
                      aria-label="Add to wishlist"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs font-medium text-white bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Wishlist
                      </span>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right side - Product Info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">{product.name}</h1>
                <p className="text-2xl font-semibold text-blue-600">${product.price}</p>
                
                {/* Stock Status */}
                <div className="flex items-center gap-2">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`px-3 py-1 rounded-full text-sm ${
                      product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </motion.span>
                  {product.stock > 0 && (
                    <span className="text-sm text-gray-600">
                      {product.stock} available
                    </span>
                  )}
                </div>
              </div>

              {/* Product Description */}
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold mb-4">Product Description</h2>
                <div 
                  dangerouslySetInnerHTML={{ __html: product.description }} 
                  className="prose prose-lg max-w-none"
                />
              </div>

              {/* Product Options */}
              <ProductOptions 
                product={product}
                onAddToCart={handleAddToCart}
              />

              {/* Product Specs */}
             <ProductSpecs 
               product={product}
             />
              {/* Product Reviews */}
              <ProductReviews 
                productId={product.id}
                initialReviews={product.reviews || []}
              />

              {/* Related Products */}
              <RelatedProducts 
                category={product.category}
                excludeId={product.id}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}