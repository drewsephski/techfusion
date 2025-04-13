"use client"

import { motion } from "framer-motion"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const features = [
  {
    title: "AI-Powered Insights",
    description: "Get intelligent recommendations and analytics",
    icon: "🤖",
    gradient: "text-gradient"
  },
  {
    title: "Real-time Integration",
    description: "Seamlessly connect with your existing tools",
    icon: "🔗",
    gradient: "text-gradient"
  },
  {
    title: "Enterprise Security",
    description: "Bank-grade security for your data",
    icon: "🔒",
    gradient: "text-gradient"
  }
]

export function Features() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12 text-gradient"
        >
          Why Choose TechFusion?
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="fade-in"
            >
              <Card className="card-hover relative overflow-hidden">
                <CardHeader className="flex flex-col items-center gap-4">
                  <div className="text-4xl font-bold text-primary icon-gradient">{feature.icon}</div>
                  <CardTitle className={`text-xl ${feature.gradient}`}>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-text-muted text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-radial pointer-events-none"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-r from-primary to-secondary rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-l from-secondary to-primary rounded-full blur-3xl opacity-20 animate-pulse"></div>
    </section>
  )
}