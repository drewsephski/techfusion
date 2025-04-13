export interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  color: string;
  products: number;
  slug: string;  // Added for URL generation
  featured: boolean;  // For featured categories
  new: boolean;  // For new categories
}

export const categories: Category[] = [
  {
    id: 1,
    name: "React",
    description: "Build amazing React applications with our premium components",
    image: "/tech/react.png",
    color: "blue",
    products: 25,
    slug: "react",
    featured: true,
    new: false
  },
  {
    id: 2,
    name: "Vue",
    description: "Modern Vue.js development tools and resources",
    image: "/tech/vue.png",
    color: "green",
    products: 18,
    slug: "vue",
    featured: true,
    new: true
  },
  {
    id: 3,
    name: "Angular",
    description: "Enterprise-grade Angular solutions",
    image: "/tech/angular.png",
    color: "red",
    products: 22,
    slug: "angular",
    featured: false,
    new: false
  },
  {
    id: 4,
    name: "Next.js",
    description: "Production-ready Next.js templates and components",
    image: "/tech/nextjs.png",
    color: "purple",
    products: 30,
    slug: "nextjs",
    featured: true,
    new: true
  },
  {
    id: 5,
    name: "Svelte",
    description: "Lightweight and performant framework",
    image: "/tech/svelte.png",
    color: "orange",
    products: 15,
    slug: "svelte",
    featured: false,
    new: true
  }
];