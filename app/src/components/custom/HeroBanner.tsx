import { Button } from "@/components/ui/button";
import { Search, Video } from "lucide-react";
import { motion } from "framer-motion";

export function HeroBanner() {
  return (
    <section className="relative pt-24 pb-32 bg-gradient-to-br from-primary/80 via-secondary/80 to-primary/80 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-neonOverlay to-transparent opacity-20 animate-neon-glow-slow" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
              Welcome to TechFusion
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-12">
              Discover the latest in technology and innovation
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                size="lg"
                className="flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                Explore Products
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex items-center gap-2"
              >
                <Video className="w-5 h-5" />
                Watch Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}