import { NextResponse } from 'next/server';
import { prisma } from 'app/lib/prisma';
import { ApiResponse } from '@/types';
import { z } from 'zod';

const getProduct = cache(async (id: string) => {
  return prisma.product.findUnique({
    where: { id },
    include: {
      reviews: {
        select: {
          rating: true,
          comment: true,
          createdAt: true,
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
});

const validateId = z.string().cuid();

export async function GET(
  { params }: { params: { id: string } }
) {
  try {
    // Validate request
    const id = validateId.parse(params.id);

    // Get product with cache
    const product = await getProduct(id);

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product not found',
        } as ApiResponse<null>,
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
    } as ApiResponse<typeof product>);

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid product ID',
        } as ApiResponse<null>,
        { status: 400 }
      );
    }

    console.error('Error fetching product:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch product',
      } as ApiResponse<null>,
      { status: 500 }
    );
  }
}

export interface ApiResponse<T> {
  success: boolean;
  error?: string;
  data?: T;
}