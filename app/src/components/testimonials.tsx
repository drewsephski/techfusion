"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "John Doe",
    role: "CTO",
    company: "TechCorp",
    content: "TechFusion has revolutionized our workflow. The AI integration is simply amazing!",
    image: "/avatars/john.jpg"
  },
  {
    name: "Jane Smith",
    role: "Developer",
    company: "CodeTech",
    content: "The real-time integration with our tools has saved us countless hours.",
    image: "/avatars/jane.jpg"
  },
  {
    name: "John Doe",
    role: "CTO",
    company: "TechCorp",
    content: "TechFusion has revolutionized our workflow. The AI integration is simply amazing!",
    image: "/avatars/john.jpg"
  },
  {
    name: "Jane Smith",
    role: "Developer",
    company: "CodeTech",
    content: "The real-time integration with our tools has saved us countless hours.",
    image: "/avatars/jane.jpg"
  } 
]

export function Testimonials() {
  return (
    <section className="py-20 bg-bg-secondary relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12 text-gradient"
        >
          What Our Customers Say
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="fade-in"
            >
              <Card className="card-hover relative overflow-hidden">
                <CardContent className="flex flex-col items-center p-6">
                  <Avatar className="w-32 h-32 mb-4">
                    <AvatarImage src={testimonial.image} />
                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                  </Avatar>
                  <p className="text-text-muted text-center mb-4 text-lg leading-relaxed">
                    {testimonial.content}
                  </p>
                  <div className="text-center">
                    <p className="font-semibold text-text-primary text-gradient">{testimonial.name}</p>
                    <p className="text-text-muted">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-radial pointer-events-none"></div>
    </section>
  )
}