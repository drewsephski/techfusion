import { Button } from "@/components/ui/button"
import { Tag } from "lucide-react"
import { motion } from "framer-motion"

export function FeaturedCategories() {
  const categories = [
    'Laptops & Computers',
    'Smartphones',
    'Gaming',
    'Audio',
    'Accessories'
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-foreground text-center mb-8">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <motion.div
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group"
            >
              <Button
                variant="ghost"
                className="w-full hover:bg-secondary/50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Tag className="w-5 h-5" />
                {category}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}