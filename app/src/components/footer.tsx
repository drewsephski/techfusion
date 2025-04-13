'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="container mx-auto px-4"
    >
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">2025 TechFusion. All rights reserved.</p>
        <nav className="flex gap-4">
          <a href="/terms" className="text-sm hover:text-[#00Aaff] transition-colors duration-300">
            Terms
          </a>
          <a href="/privacy" className="text-sm hover:text-[#00Aaff] transition-colors duration-300">
            Privacy
          </a>
          <a href="/contact" className="text-sm hover:text-[#00Aaff] transition-colors duration-300">
            Contact
          </a>
        </nav>
      </div>
    </motion.div>
  );
}