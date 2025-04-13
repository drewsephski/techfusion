import { Product, FetchProductsParams } from '@/types/product';
import { db } from '@/lib/db';

export interface ProductResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

export async function getProducts(
  page: number = 1,
  limit: number = 12,
  category?: string
): Promise<ProductResponse> {
  try {
    const response = await fetch(
      `/api/products?category=${category}&page=${page}&limit=${limit}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function getProductById(id: string): Promise<Product> {
  try {
    const response = await fetch(`/api/products/${id}`);
    if (!response.ok) {
      throw new Error("Product not found");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

export async function createProduct(product: Omit<Product, "id">): Promise<Product> {
  try {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error("Failed to create product");
    }
    return response.json();
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

export async function updateProduct(id: string, product: Partial<Product>): Promise<Product> {
  try {
    const response = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error("Failed to update product");
    }
    return response.json();
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

export async function deleteProduct(id: string): Promise<void> {
  try {
    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete product");
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

export async function fetchProducts(params: FetchProductsParams): Promise<Product[]> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // In a real app, this would be your database query
    const products = await db.product.findMany({
      where: {
        ...(params.category && { category: params.category }),
        ...(params.rating && params.rating === '4-up' && { rating: { gte: 4 } }),
      },
      orderBy: {
        ...(params.sortBy === 'price-low' && { price: 'asc' }),
        ...(params.sortBy === 'price-high' && { price: 'desc' }),
        ...(params.sortBy === 'rating' && { rating: 'desc' }),
      },
      take: params.limit || 12,
      skip: params.page ? (params.page - 1) * (params.limit || 12) : 0,
    });

    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}