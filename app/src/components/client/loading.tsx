'use client';

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-[#1E1E1E] z-50"
    >
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="text-center text-white"
        >
          <h1 className="text-4xl font-bold mb-4">TechFusion</h1>
          <p className="text-lg">Loading your experience...</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}