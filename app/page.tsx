"use client";

import {
  Sparkles,
  Search,
  ShoppingCart,
  Star,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Toaster, toast } from "sonner";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ErrorBoundary from "@/components/ui/error-boundary";
import { ClientOnly } from "@/components/client-only";
import { FeaturedCategories } from "@/components/custom/FeaturedCategories";
import { Product, CartItem } from "@/types/product";
import Image from "next/image";
import { useCart } from '@/contexts/cart-context';
import { useAnalytics } from '@/lib/analytics/context';
import { Features } from "@/components/features";
import { Testimonials } from "@/components/testimonials";

interface NavigationLink {
  href: string;
  text: string;
  // Optional properties for enhanced navigation
  icon?: React.ComponentType<{ className?: string }>;
  external?: boolean;
  target?: string;
  rel?: string;
  ariaLabel?: string;
}

// Server component to fetch data
// src/app/page.tsx
async function getFeaturedProducts() {
  try {
    const response = await fetch("/api/products/featured", {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

async function getServerData() {
  try {
    const products = await getFeaturedProducts();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { trackEvent } = useAnalytics();

  const fetchProducts = useCallback(async () => {
    try {
      const data = await getServerData();
      setProducts(data);
      setError(null);
      trackEvent('page_view', { page: 'home' });
    } catch (err) {
      console.error('Error fetching products:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load products';
      setError(errorMessage);
      trackEvent('error', {
        type: 'fetch_products',
        error: errorMessage,
        timestamp: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  }, [setProducts, setError, setLoading, trackEvent]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-gray-700 rounded-full"></div>
            <div className="w-48 h-4 bg-gray-700 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <Button 
            onClick={() => window.location.reload()}
            className="bg-primary hover:bg-primary/90"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <ClientOnly>
      <HomePageClient products={products} />
    </ClientOnly>
  );
}

// Client component that handles all interactive elements
function HomePageClient({ products }: { products: Product[] }) {
  const { theme, setTheme } = useTheme();
  const { addToCart, cartItemCount } = useCart();
  const { trackEvent } = useAnalytics();
  const [loadingState, setLoadingState] = useState(false);
  const [errorState, setErrorState] = useState<string | null>(null);
  const [retryCountState, setRetryCountState] = useState(0);
  const MAX_RETRIES = 3;

  const handleError = (err: unknown) => {
    const errorMessage = err instanceof Error 
      ? err.message 
      : 'An unexpected error occurred';
    
    setErrorState(errorMessage);
    setRetryCountState((prev) => prev + 1);
    trackEvent('error', {
      type: 'client_error',
      error: errorMessage,
      timestamp: new Date().toISOString(),
      retryCount: retryCountState + 1
    });
  };

  const handleAddToCart = async (product: Product) => {
    try {
      setLoadingState(true);
      await addToCart({ ...product, quantity: 1 } as CartItem);
      trackEvent('add_to_cart', {
        product_id: product.id,
        product_name: product.name,
        timestamp: new Date().toISOString()
      });
      toast.success('Added to cart!');
    } catch (err) {
      handleError(err);
      trackEvent('add_to_cart_failed', {
        product_id: product.id,
        product_name: product.name,
        error: err instanceof Error ? err.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
    } finally {
      setLoadingState(false);
    }
  };

  // Track page view
  useEffect(() => {
    if (!trackEvent) return;
    trackEvent('page_view', {
      page: 'home',
      products_count: products.length,
      path: window.location.pathname
    });
  }, [products, trackEvent]);

  // Track product views when products are rendered
  useEffect(() => {
    if (products.length > 0) {
      products.forEach(product => {
        trackEvent('product_view', {
          product_id: product.id,
          product_name: product.name,
          price: product.price,
          stock: product.stock,
          timestamp: new Date().toISOString()
        });
      });
    }
  }, [products, trackEvent]);

  // Navigation Types
  interface NavigationSection {
    title: string;
    links: NavigationLink[];
    className?: string;
  }

  interface NavigationConfig {
    sections: NavigationSection[];
    className?: string;
  }

  // Navigation Components
  const NavigationLink: React.FC<NavigationLink> = ({
    href,
    text,
    icon: Icon,
    external = false,
    target = external ? '_blank' : '_self',
    rel = external ? 'noopener noreferrer' : undefined,
    ariaLabel,
  }) => {
    return (
      <motion.li
        whileHover={{ scale: 1.05 }}
        className="group"
      >
        <Link
          href={href}
          target={target}
          rel={rel}
          aria-label={ariaLabel || text}
          className="text-text-muted hover:text-neonBlue transition-colors duration-300 flex items-center gap-2 group-hover:translate-x-1"
        >
          {Icon && <Icon className="w-4 h-4" />}
          {text}
        </Link>
      </motion.li>
    );
  };

  const NavigationSection: React.FC<NavigationSection> = ({ title, links, className }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`group ${className || ''}`}
    >
      <h3 className="text-xl font-bold text-text-primary mb-4">{title}</h3>
      <NavigationList links={links} />
    </motion.div>
  );

  const NavigationList: React.FC<{ links: NavigationLink[] }> = ({ links }) => (
    <ul className="space-y-2">
      {links.map((link, index) => (
        <NavigationLink key={`${link.text}-${index}`} {...link} />
      ))}
    </ul>
  );

  // Default Navigation Configuration
  const defaultNavigationConfig: NavigationConfig = {
    sections: [
      {
        title: 'Support',
        links: [
          { href: '/faq', text: 'FAQ' },
          { href: '/shipping', text: 'Shipping' },
          { href: '/returns', text: 'Returns' },
          { href: '/warranty', text: 'Warranty' },
        ],
      },
      {
        title: 'Contact Us',
        links: [
          { href: 'mailto:support@techfusion.com', text: 'Email Us', external: true },
          { href: 'tel:+15551234567', text: 'Call Us', external: true },
          { href: 'https://maps.google.com', text: 'Visit Us', external: true },
        ],
      },
    ],
  };

  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-bg-primary overflow-hidden">
        {/* Navigation */}
        <nav className="fixed w-full z-50 bg-bg-primary/95 backdrop-blur-sm border-b border-border-primary shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2 group">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="animate-neon-pulse"
                >
                  <Sparkles className="w-5 h-5 text-neonBlue" />
                </motion.div>
                <motion.h1
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="text-2xl font-bold text-text-primary"
                >
                  TechFusion
                </motion.h1>
              </Link>

              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-sm hover:bg-interactive-hover rounded-full transition-all duration-300"
                  >
                    {theme === "dark" ? "Light" : "Dark"}
                  </Button>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-sm hover:bg-interactive-hover rounded-full transition-all duration-300"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {cartItemCount}
                  </Button>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-sm hover:bg-interactive-hover rounded-full transition-all duration-300"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Search
                  </Button>
                </motion.button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative pt-24 pb-32 bg-gradient-to-br from-bg-primary/80 via-bg-secondary/80 to-bg-primary/80 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-neonOverlay to-transparent opacity-20 animate-neon-glow-slow"></div>
              <h2 className="text-3xl font-bold text-text-primary mb-6">
                Welcome to TechFusion
              </h2>
              <p className="text-text-muted mb-8">
                Discover the latest in technology and innovation
              </p>
              <Button
                variant="default"
                size="lg"
                className="bg-neonBlue hover:bg-neonBlueHover text-text-primary border border-border-primary"
              >
                Explore Products
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <FeaturedCategories />

        {/* Featured Products */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-text-primary text-center mb-12">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Card className="relative overflow-hidden hover:shadow-lg transition-shadow duration-200 bg-bg-primary/95">
                    <CardHeader className="flex flex-col items-center p-4">
                      <div className="relative aspect-square w-full mb-4">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-contain transition-transform duration-300 hover:scale-105"
                          priority
                        />
                      </div>
                      <div className="text-center">
                        <CardTitle className="text-lg font-semibold text-text-primary line-clamp-2">
                          {product.name}
                        </CardTitle>
                        <div className="flex items-center justify-center gap-1 mt-1">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm text-text-muted">
                            {product.rating?.toFixed(1)}
                          </span>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className="mt-2 bg-bg-secondary text-text-primary border border-border-primary"
                        >
                          {product.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-text-primary">${product.price}</span>
                        <Button
                          onClick={() => handleAddToCart(product)}
                          className="w-full bg-neonBlue hover:bg-neonBlueHover text-text-primary border border-border-primary"
                          disabled={product.stock === 0 || loadingState}
                        >
                          {product.stock === 0 ? 'Out of Stock' : loadingState ? 'Adding...' : 'Add to Cart'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <Features />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Error Handling */}
        {errorState && (
          <div className="container mx-auto px-4 py-8">
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
              {errorState}
              {retryCountState < MAX_RETRIES && (
                <button
                  onClick={() => {
                    setErrorState(null);
                    setRetryCountState(0);
                  }}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  Retry
                </button>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="bg-bg-primary/95 border-t border-border-primary">
          <div className="container mx-auto px-4 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {defaultNavigationConfig.sections.map((section) => (
                <NavigationSection key={section.title} {...section} />
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-border-primary text-center">
              <motion.p
                whileHover={{ scale: 1.05 }}
                className="text-text-muted"
              >
                2025 TechFusion. All rights reserved.
              </motion.p>
            </div>
          </div>
        </footer>

        <Toaster theme="dark" position="top-center" />
      </main>
    </ErrorBoundary>
  );
}
