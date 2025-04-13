// src/app/lib/api/products/featured/route.ts
import { db } from './db';
import { NextResponse } from 'next/server';
import { Product } from '../src/types/product';

export async function GET() {
  try {
    const featuredProducts = await db.featuredProduct.findMany({
      include: {
        product: true
      },
      where: {
        startDate: {
          lte: new Date()
        },
        endDate: {
          gte: new Date()
        }
      },
      orderBy: {
        priority: 'desc'
      }
    });

    // Transform the data to include only necessary fields
    const formattedProducts = featuredProducts.map((fp: { product: Product; id: string; priority: number; startDate: Date; endDate: Date }) => ({
      id: fp.id,
      priority: fp.priority,
      startDate: fp.startDate,
      endDate: fp.endDate,
      product: {
        id: fp.product.id,
        name: fp.product.name,
        description: fp.product.description,
        price: fp.product.price,
        category: fp.product.category,
        features: fp.product.features,
        images: fp.product.images,
        featured: fp.product.featured
      }
    }));

    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch featured products', 
        details: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}