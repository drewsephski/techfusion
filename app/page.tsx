import { useEffect } from 'react';
import { prisma } from 'app/lib/prisma';

export default async function Home() {
  try {
    const products = await prisma.product.findMany({
      where: { featured: true },
      orderBy: { priority: 'desc' },
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

    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Featured Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex items-center mb-4">
                <span className="text-lg font-bold">${product.price}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.reviews.map((review) => (
                  <div key={review.id} className="bg-gray-100 p-2 rounded">
                    <p className="text-sm">{review.comment}</p>
                    <p className="text-xs text-gray-500">
                      {review.user.name} - Rating: {review.rating}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-500">Error loading products</p>
      </div>
    );
  }
}
