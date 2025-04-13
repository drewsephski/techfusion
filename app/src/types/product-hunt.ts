// src/app/types/product-hunt.ts
export interface ProductHuntPost {
  id: number;
  name: string;
  tagline: string;
  description: string;
  thumbnail: {
    image_url: string;
    width: number;
    height: number;
  };
  votes_count: number;
  comments_count: number;
  redirect_url: string;
  topics: Array<{
    id: number;
    name: string;
  }>;
  created_at: string;
  updated_at: string;
}