import { NextResponse } from 'next/server';
import { Product } from '@/types/product';

// Constants
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 12;
const MAX_LIMIT = 100;

// Types
export interface ProductQueryParams {
  page?: string;
  limit?: string;
  search?: string;
  category?: string;
}

export interface PaginationResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Error handling
const createErrorResponse = (message: string, status: number = 400) => 
  NextResponse.json({ error: message }, { status });

// Pagination utilities
const validatePaginationParams = (params: ProductQueryParams) => {
  const page = Number(params.page) || DEFAULT_PAGE;
  const limit = Number(params.limit) || DEFAULT_LIMIT;

  if (isNaN(page) || page < 1) {
    throw new Error('Page must be a positive integer');
  }

  if (isNaN(limit) || limit < 1 || limit > MAX_LIMIT) {
    throw new Error(`Limit must be an integer between 1 and ${MAX_LIMIT}`);
  }

  return { page, limit };
};

const filterProducts = (products: Product[], params: ProductQueryParams) => {
  return products.filter(product => {
    const matchesSearch = !params.search || 
      product.name.toLowerCase().includes(params.search.toLowerCase());
    const matchesCategory = !params.category || 
      product.category === params.category;
    return matchesSearch && matchesCategory;
  });
};

const paginateProducts = (products: Product[], page: number, limit: number) => {
  const start = (page - 1) * limit;
  const end = start + limit;
  return {
    paginated: products.slice(start, end),
    total: products.length,
    totalPages: Math.ceil(products.length / limit)
  };
};

// Mock data
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Product 1",
    category: "Electronics",
    price: 199.99,
    featured: true,
    rating: 4.5,
    description: "A great product",
    mainImage: "/product1.jpg",
    features: [],
    images: [],
    specs: {},
    stock: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "2",
    name: "Product 2",
    category: "Electronics",
    price: 299.99,
    featured: true,
    rating: 4.5,
    description: "Another great product",
    mainImage: "/product2.jpg",
    features: [],
    images: [],
    specs: {},
    stock: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "3",
    name: "Product 3",
    category: "Electronics",
    price: 399.99,
    featured: true,
    rating: 4.5,
    description: "A third great product",
    mainImage: "/product3.jpg",
    features: [],
    images: [],
    specs: {},
    stock: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "4",
    name: "Product 4",
    category: "Electronics",
    price: 499.99,
    featured: true,
    rating: 4.5,
    description: "A fourth great product",
    mainImage: "/product4.jpg",
    features: [],
    images: [],
    specs: {},
    stock: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "5",
    name: "Product 5",
    category: "Electronics",
    price: 599.99,
    featured: true,
    rating: 4.5,
    description: "A fifth great product",
    mainImage: "/product5.jpg",
    features: [],
    images: [],
    specs: {},
    stock: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "6",
    name: "Product 6",
    category: "Electronics",
    price: 699.99,
    featured: true,
    rating: 4.5,
    description: "A sixth great product",
    mainImage: "/product6.jpg",
    features: [],
    images: [],
    specs: {},
    stock: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "7",
    name: "Product 7",
    category: "Electronics",
    price: 799.99,
    featured: true,
    rating: 4.5,
    description: "A seventh great product",
    mainImage: "/product7.jpg",
    features: [],
    images: [],
    specs: {},
    stock: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "8",
    name: "Product 8",
    category: "Electronics",
    price: 899.99,
    featured: true,
    rating: 4.5,
    description: "An eighth great product",
    mainImage: "/product8.jpg",
    features: [],
    images: [],
    specs: {},  
    stock: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "9",
    name: "Product 9",
    category: "Electronics",
    price: 999.99,
    featured: true,
    rating: 4.5,
    description: "A ninth great product",
    mainImage: "/product9.jpg",
    features: [],
    images: [],
    specs: {},
    stock: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "10",
    name: "Product 10",
    category: "Electronics",
    price: 1099.99,
    featured: true,
    rating: 4.5,
    description: "A tenth great product",
    mainImage: "/product10.jpg",
    features: [],
    images: [],
    specs: {},
    stock: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "11",
    name: "Product 11",
    category: "Electronics",
    featured: true,
    price: 1199.99,
    rating: 4.5,
    description: "An eleventh great product",
    mainImage: "/product11.jpg",
    features: [],
    images: [],
    specs: {},
    stock: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "12",
    name: "Product 12",
    category: "Electronics",
    featured: true,
    price: 1299.99,
    rating: 4.5,
    description: "A twelfth great product",
    mainImage: "/product12.jpg",
    features: [],
    images: [],
    specs: {},
    stock: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// API Route
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query: ProductQueryParams = {
      page: searchParams.get('page') ?? undefined,
      limit: searchParams.get('limit') ?? undefined,
      search: searchParams.get('search') ?? undefined,
      category: searchParams.get('category') ?? undefined
    };

    const { page, limit } = validatePaginationParams(query);
    const filteredProducts = filterProducts(mockProducts, query);
    const { paginated, total, totalPages } = paginateProducts(filteredProducts, page, limit);

    return NextResponse.json({
      products: paginated,
      total,
      page,
      limit,
      totalPages
    } as PaginationResponse);

  } catch (error) {
    if (error instanceof Error) {
      return createErrorResponse(error.message, 400);
    }
    return createErrorResponse('An unexpected error occurred', 500);
  }
}