export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  features: string[];
  images: string[];
  specs: Record<string, string>;
  reviews: Review[];
  featured: boolean;
  stock: number;
  inventory: number;
  inStock: boolean;
  affiliateLink?: string;
  commissionRate?: number;
  trialPeriod?: string;
  tags?: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Codeium AI Coding Assistant',
    description: 'The world’s first AI pair programmer that works inside your IDE. Get real-time code suggestions, explanations, and debugging help.',
    price: 29.99,
    rating: 4.8,
    category: 'AI Development',
    features: [
      'Real-time code suggestions',
      'Context-aware code completion',
      'Code debugging assistance',
      'Works in multiple IDEs'
    ],
    images: ['/images/codeium-logo.svg'],
    specs: {
      'Languages': 'JavaScript, Python, Java, Go, and more',
      'Integration': 'VS Code, IntelliJ, PyCharm',
      'Trial': '7-day free trial'
    },
    reviews: [
      {
        id: '1',
        author: 'John Doe',
        rating: 5,
        comment: 'Codeium has transformed my coding workflow. The AI suggestions are spot on and save me hours every week.',
        date: '2025-04-01'
      }
    ],
    featured: true,
    stock: 0,
    inventory: 0,
    inStock: true,
    affiliateLink: 'https://codeium.com/aff/12345',
    commissionRate: 0.2,
    trialPeriod: '7 days',
    tags: ['AI', 'Development', 'IDE', 'Assistant']
  },
  {
    id: '2',
    name: 'Framer - UI Design & Prototyping',
    description: 'Design, prototype, and animate interfaces in one tool. Perfect for creating interactive UI/UX designs.',
    price: 19.99,
    rating: 4.7,
    category: 'UI/UX Design',
    features: [
      'Real-time collaboration',
      'Interactive prototypes',
      'Auto-animate',
      'Design system management'
    ],
    images: ['/images/framer-logo.svg'],
    specs: {
      'Platforms': 'Web, Mac, Windows',
      'File Types': 'Framer, Figma, Sketch',
      'Team Size': 'Up to 5 members'
    },
    reviews: [],
    featured: true,
    stock: 0,
    inventory: 0,
    inStock: true,
    affiliateLink: 'https://framer.com/aff/12345',
    commissionRate: 0.15,
    trialPeriod: '30 days',
    tags: ['Design', 'UI', 'UX', 'Prototyping']
  },
  {
    id: '3',
    name: 'Notion - All-in-One Workspace',
    description: 'Organize your work, build a knowledge base, and plan your projects in one place.',
    price: 10.00,
    rating: 4.9,
    category: 'Productivity',
    features: [
      'Database builder',
      'Task management',
      'Knowledge base',
      'Team collaboration'
    ],
    images: ['/images/notion-logo.svg'],
    specs: {
      'Platforms': 'Web, Mac, Windows, iOS, Android',
      'Storage': '10GB per workspace',
      'Team Size': 'Up to 10 members'
    },
    reviews: [],
    featured: true,
    stock: 0,
    inventory: 0,
    inStock: true,
    affiliateLink: 'https://notion.so/aff/12345',
    commissionRate: 0.1,
    trialPeriod: '14 days',
    tags: ['Productivity', 'Team', 'Organization']
  },
  {
    id: '4',
    name: 'Databricks - AI & Analytics',
    description: 'Powerful platform for AI and analytics workloads. Build, train, and deploy ML models at scale.',
    price: 49.99,
    rating: 4.6,
    category: 'AI/ML',
    features: [
      'Unified analytics',
      'AutoML capabilities',
      'Real-time processing',
      'Enterprise security'
    ],
    images: ['/images/databricks-logo.svg'],
    specs: {
      'Deployment': 'Cloud, On-premises',
      'Scalability': 'Up to 100 nodes',
      'Storage': 'Unlimited',
      'Support': '24/7 Enterprise'
    },
    reviews: [],
    featured: false,
    stock: 0,
    inventory: 0,
    inStock: true,
    affiliateLink: 'https://databricks.com/aff/12345',
    commissionRate: 0.15,
    trialPeriod: '14 days',
    tags: ['AI', 'Analytics', 'Machine Learning', 'Big Data']
  },
  {
    id: '5',
    name: 'Canva Pro - Design Platform',
    description: 'Create professional designs for social media, presentations, and marketing materials.',
    price: 12.95,
    rating: 4.8,
    category: 'Design',
    features: [
      '100+ design types',
      'Professional templates',
      'Team collaboration',
      'Brand kit management'
    ],
    images: ['/images/canva-logo.svg'],
    specs: {
      'Platforms': 'Web, iOS, Android',
      'Storage': '5GB',
      'Team Size': 'Up to 5 members'
    },
    reviews: [],
    featured: true,
    stock: 0,
    inventory: 0,
    inStock: true,
    affiliateLink: 'https://canva.com/aff/12345',
    commissionRate: 0.2,
    trialPeriod: '30 days',
    tags: ['Design', 'Marketing', 'Social Media', 'Templates']
  }
];
