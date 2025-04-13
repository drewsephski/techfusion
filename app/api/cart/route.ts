import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const cart = await prisma.cart.findUnique({
      where: { id: params.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      return NextResponse.json(
        {
          success: false,
          error: 'Cart not found',
        } as ApiResponse<null>,
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: cart,
    } as ApiResponse<typeof cart>);
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch cart',
      } as ApiResponse<null>,
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { userId, productId, quantity = 1 } = await request.json();

    const cart = await prisma.cart.upsert({
      where: { userId },
      update: {},
      create: {
        userId,
      },
    });

    const cartItem = await prisma.cartItem.upsert({
      where: { cartId_productId: { cartId: cart.id, productId } },
      update: {
        quantity: {
          increment: quantity,
        },
      },
      create: {
        cartId: cart.id,
        productId,
        quantity,
      },
      include: {
        product: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: cartItem,
    } as ApiResponse<typeof cartItem>);
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to add item to cart',
      } as ApiResponse<null>,
      { status: 500 }
    );
  }
}