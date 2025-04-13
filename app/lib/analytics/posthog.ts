import { posthog } from 'posthog-js';

// Define interfaces for our data types
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
}

interface Order {
  id: string;
  items: Product[];
  total: number;
  payment_method: string;
  shipping_method: string;
}

interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

// Initialize PostHog
if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
    autocapture: true,
    capture_pageleave: true,
    persistence: 'localStorage',
    loaded: (ph) => {
      // Track initial load
      const pathname = window.location.pathname;
      ph.capture('page_load', {
        $current_url: pathname,
        $referring_domain: document.referrer,
        $screen_width: window.innerWidth,
        $screen_height: window.innerHeight,
      });

      // Track scroll depth
      let lastScrollPercentage = 0;
      window.addEventListener('scroll', () => {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (Math.floor(scrollPercentage / 25) > Math.floor(lastScrollPercentage / 25)) {
          ph.capture('scroll_depth', {
            percentage: Math.floor(scrollPercentage / 25) * 25,
            $current_url: pathname,
          });
          lastScrollPercentage = scrollPercentage;
        }
      }, { passive: true });

      // Track user interactions
      document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.tagName === 'INPUT') {
          ph.capture('user_interaction', {
            element: target.tagName,
            text: target.textContent?.trim(),
            class: target.className,
            $current_url: pathname,
          });
        }
      }, { passive: true });
    },
  });

  // Track session duration
  const sessionStart = new Date().toISOString();
  window.addEventListener('beforeunload', () => {
    const sessionDuration = Date.now() - new Date(sessionStart).getTime();
    posthog.capture('session_end', {
      duration_seconds: Math.round(sessionDuration / 1000),
      $current_url: window.location.pathname,
    });
  });
}

export const trackPostHogEvent = (event: string, properties: Record<string, unknown> = {}) => {
  if (typeof window !== 'undefined' && posthog) {
    posthog.capture(event, {
      ...properties,
      $current_url: window.location.pathname,
      $lib: 'nextjs',
      $lib_version: process.env.NEXT_PUBLIC_VERSION || 'unknown',
    });
  }
};

export const identifyUser = (userId: string, traits?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && posthog) {
    posthog.identify(userId, traits);
  }
};

export const trackProductView = (product: Product) => {
  trackPostHogEvent('product_viewed', {
    product_id: product.id,
    product_name: product.name,
    category: product.category,
    price: product.price,
  });
};

export const trackAddToCart = (product: Product, quantity: number = 1) => {
  trackPostHogEvent('product_added_to_cart', {
    product_id: product.id,
    product_name: product.name,
    category: product.category,
    price: product.price,
    quantity,
    total_value: product.price * quantity,
  });
};

export const trackRemoveFromCart = (product: Product, quantity: number = 1) => {
  trackPostHogEvent('product_removed_from_cart', {
    product_id: product.id,
    product_name: product.name,
    category: product.category,
    price: product.price,
    quantity,
    total_value: product.price * quantity,
  });
};

export const trackCheckoutStarted = (cartItems: CartItem[]) => {
  trackPostHogEvent('checkout_started', {
    items_count: cartItems.length,
    total_value: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
  });
};

export const trackPurchaseCompleted = (order: Order) => {
  trackPostHogEvent('purchase_completed', {
    order_id: order.id,
    items_count: order.items.length,
    total_value: order.total,
    payment_method: order.payment_method,
    shipping_method: order.shipping_method,
  });
};

export const trackSearch = (query: string, resultsCount: number) => {
  trackPostHogEvent('search_performed', {
    query,
    results_count: resultsCount,
  });
};

export const trackCategoryView = (category: string) => {
  trackPostHogEvent('category_viewed', {
    category,
  });
};

// Export PostHog instance for direct access
export const getPostHog = () => posthog;