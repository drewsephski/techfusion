import { PrismaClient } from '@prisma/client'

interface Product {
  name: string
  description: string
  price: number
  images: string[]
  category: string
  rating: number
  stock: number
}

const prisma = new PrismaClient()

const products: Product[] = [
  {
    name: 'Quantum Prodigy',
    description: 'Next-generation AI-powered productivity suite',
    price: 99.99,
    images: [
      '/products/prodigy-1.jpg',
      '/products/prodigy-2.jpg',
      '/products/prodigy-3.jpg'
    ],
    category: 'Software',
    rating: 4.9,
    stock: 100
  },
  {
    name: 'Neural Nexus',
    description: 'Advanced neural network hardware accelerator',
    price: 499.99,
    images: [
      '/products/nexus-1.jpg',
      '/products/nexus-2.jpg',
      '/products/nexus-3.jpg'
    ],
    category: 'Hardware',
    rating: 4.8,
    stock: 50
  }
]

async function main() {
  try {
    console.log('Seeding database...')
    await prisma.product.createMany({
      data: products,
      skipDuplicates: true
    })
    console.log('Database seeding completed successfully')
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()