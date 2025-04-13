'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-[#1E1E1E] z-50"
    >
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 0, y: 20 }}
        exit={{ opacity: 0 }}
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
            ease: 'easeInOut',
          }}
          className="text-center text-white bg-[#2D2D2D] p-8 rounded-lg shadow-lg"
        >
          <h1 className="text-4xl font-bold mb-4">TechFusion</h1>
          <p className="text-lg mb-4">Loading your experience...</p>
          <div className="w-16 h-16 mx-auto border-2 border-[#00Aaff] border-t-transparent rounded-full animate-spin"></div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}