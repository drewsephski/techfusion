import { motion } from "framer-motion"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <motion.div whileHover={{ scale: 1.02 }} className="group">
            <h3 className="text-xl font-bold text-foreground mb-4">
              TechFusion
            </h3>
            <p className="text-muted-foreground">
              Your trusted source for the latest technology and innovation.
            </p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className="group">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/about", text: "About Us" },
                { href: "/products", text: "Products" },
                { href: "/contact", text: "Contact" },
                { href: "/blog", text: "Blog" },
              ].map((link) => (
                <motion.li
                  key={link.text}
                  whileHover={{ scale: 1.05 }}
                  className="group"
                >
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2 group-hover:translate-x-1"
                  >
                    {link.text}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className="group">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/faq", text: "FAQ" },
                { href: "/shipping", text: "Shipping" },
                { href: "/returns", text: "Returns" },
                { href: "/warranty", text: "Warranty" },
              ].map((link) => (
                <motion.li
                  key={link.text}
                  whileHover={{ scale: 1.05 }}
                  className="group"
                >
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2 group-hover:translate-x-1"
                  >
                    {link.text}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className="group">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Contact Us
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>123 Tech Street, Silicon Valley, CA</li>
              <li>support@techfusion.com</li>
              <li>(555) 123-4567</li>
              <li>Mon-Fri: 9am - 6pm PST</li>
            </ul>
          </motion.div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <motion.p
            whileHover={{ scale: 1.05 }}
            className="text-muted-foreground"
          >
            2025 TechFusion. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  )
}