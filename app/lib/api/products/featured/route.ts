// src/app/api/products/featured/route.ts
import { NextResponse } from 'next/server';
import { fetchFeaturedProducts } from '../../../product-hunt';

export async function GET() {
  try {
    const products = await fetchFeaturedProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching Product Hunt data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}