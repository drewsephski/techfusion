// src/lib/hooks/useProduct.ts
import { useQuery } from "@tanstack/react-query";
import { getProductById } from 'app/lib/api/products';

export function useProduct(productId: string) {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}