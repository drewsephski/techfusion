import { NextResponse } from 'next/server';
import { prisma } from 'app/lib/prisma';

export async function GET() {
  const featuredProducts = await prisma.product.findMany({
    where: { featured: true },
    orderBy: { priority: 'desc' },
    include: {
      reviews: {
        select: {
          rating: true,
          comment: true,
          createdAt: true,
        },
      },
    },
  });

  return NextResponse.json(featuredProducts);
}