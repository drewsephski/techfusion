"use client";

import React, { useEffect, useCallback } from "react";
import { Review } from "@/types/product";
import { Star } from "lucide-react";

interface ProductReviewsProps {
  initialReviews: Review[];
  productId: string;
}

interface ReviewState {
  reviews: Review[];
  loading: boolean;
  error: string | null;
}

const ReviewCard = ({ review }: { review: Review }) => (
  <div className="border rounded-lg p-4 bg-white shadow-sm">
    <div className="flex items-center gap-2 mb-2">
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 ${index < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
          />
        ))}
      </div>
      <span className="text-sm text-gray-500">{review.rating}/5</span>
    </div>
    <p className="text-gray-700">{review.content}</p>
    <div className="mt-2 text-sm text-gray-500">
      <span>{review.author}</span>
      <span className="mx-1">•</span>
      <span>{new Date(review.date).toLocaleDateString()}</span>
    </div>
  </div>
);

export const ProductReviews: React.FC<ProductReviewsProps> = ({ initialReviews, productId }) => {
  const [state, setState] = React.useState<ReviewState>({
    reviews: initialReviews,
    loading: false,
    error: null,
  });

  const fetchReviews = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const response = await fetch(`/api/products/${productId}/reviews`);
      if (!response.ok) {
        setState(prev => ({ ...prev, error: 'Failed to fetch reviews' }));
        return;
      }
      
      const data = await response.json();
      setState(prev => ({ ...prev, reviews: data.reviews }));
    } catch {
      setState(prev => ({ ...prev, error: 'Failed to load reviews. Please try again later.' }));
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, [productId]);

  useEffect(() => {
    fetchReviews();
  }, [productId, fetchReviews]);

  const { reviews, loading, error } = state;

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <div className="animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-100 rounded-lg mb-4" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <p className="text-red-600">{error}</p>
        <button onClick={fetchReviews} className="mt-2">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Customer Reviews</h2>
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet</p>
        ) : (
          reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        )}
      </div>
    </div>
  );
};