// src/app/lib/product-hunt.ts
import { ProductHuntPost } from '../src/types/product-hunt';
import { cache } from 'react';
import { z } from 'zod';
import { logger } from 'app/lib/logger';

const PRODUCT_HUNT_API_KEY = process.env.PRODUCT_HUNT_API_KEY;
if (!PRODUCT_HUNT_API_KEY) {
  throw new Error('PRODUCT_HUNT_API_KEY environment variable is not set');
}

const API_URL = 'https://api.producthunt.com/v2/api/graphql';
const CACHE_CONFIG = {
  maxAge: 60 * 60 * 1000, // 1 hour
  staleWhileRevalidate: 30 * 60 * 1000, // 30 minutes
  maxRetries: 3,
  retryDelay: 1000, // 1 second
};

// Zod schema for request validation
const ProductHuntRequestSchema = z.object({
  query: z.string().min(1),
});

// Zod schema for response validation
const ProductHuntResponseSchema = z.object({
  data: z.object({
    posts: z.object({
      edges: z.array(z.object({
        node: z.object({
          id: z.number(),
          name: z.string(),
          tagline: z.string(),
          description: z.string(),
          thumbnail: z.object({
            image_url: z.string().url(),
            width: z.number(),
            height: z.number(),
          }),
          votes_count: z.number(),
          comments_count: z.number(),
          redirect_url: z.string().url(),
          topics: z.array(z.object({
            id: z.number(),
            name: z.string(),
          })),
          created_at: z.string(),
          updated_at: z.string(),
        }),
      })),
    }),
  }),
  errors: z.array(z.object({
    message: z.string(),
    locations: z.array(z.object({
      line: z.number(),
      column: z.number(),
    })),
  })).optional(),
});

type ProductHuntResponse = z.infer<typeof ProductHuntResponseSchema>;

const cacheFetch = cache(async (url: string, options: RequestInit) => {
  const response = await fetch(url, options);
  const data = await response.json();
  
  // Validate response schema
  try {
    ProductHuntResponseSchema.parse(data);
  } catch (error) {
    logger.error('Invalid Product Hunt API response:', error);
    throw new Error('Invalid response format from Product Hunt API');
  }

  return {
    data,
    timestamp: Date.now(),
    headers: response.headers,
  };
});

const fetchWithCache = async (url: string, options: RequestInit) => {
  const cachedData = await cacheFetch(url, options);
  
  // Check if data is stale
  const isStale = Date.now() - cachedData.timestamp > CACHE_CONFIG.maxAge;
  
  // If data is stale but within stale-while-revalidate window, fetch fresh data in background
  if (isStale && Date.now() - cachedData.timestamp < CACHE_CONFIG.maxAge + CACHE_CONFIG.staleWhileRevalidate) {
    cacheFetch(url, options).catch(error => {
      logger.error('Background fetch failed:', error);
    });
  }
  
  return cachedData.data;
};

const handleApiError = (error: unknown, context: string) => {
  logger.error(`Product Hunt API error in ${context}:`, error);
  
  if (error instanceof Error) {
    throw new Error(`Product Hunt API request failed: ${error.message}`);
  }
  
  throw new Error('An unknown error occurred while fetching Product Hunt data');
};

export const fetchFeaturedProducts = async (searchQuery: string = 'saas ai coding'): Promise<ProductHuntPost[]> => {
  try {
    // Validate input
    const validatedQuery = ProductHuntRequestSchema.parse({ query: searchQuery });

    const query = `
      query {
        posts(search: "${validatedQuery.query}", sort: "POPULARITY") {
          edges {
            node {
              id
              name
              tagline
              description
              thumbnail {
                image_url
                width
                height
              }
              votes_count
              comments_count
              redirect_url
              topics {
                id
                name
              }
              created_at
              updated_at
            }
          }
        }
      }
    `;

    const response = await fetchWithCache(
      API_URL,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${PRODUCT_HUNT_API_KEY}`,
        },
        body: JSON.stringify({ query }),
      }
    );

    const data = response as ProductHuntResponse;

    if (data.errors) {
      logger.error('GraphQL errors:', data.errors);
      throw new Error('GraphQL errors occurred while fetching Product Hunt data');
    }

    return data.data.posts.edges.map(edge => edge.node);
  } catch (error) {
    handleApiError(error, 'fetchFeaturedProducts');
    throw error;
  }
};