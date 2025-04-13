// animated-link.tsx
'use client';

import { cn } from 'app/src/types';
import { motion } from 'framer-motion';
import Link from 'next/link';
 
interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function AnimatedLink({ href, children, className }: AnimatedLinkProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        href={href}
        className={cn(
          'flex items-center gap-2 transition-all duration-300',
          className || ''
        )}
      >
        {children}
      </Link>
    </motion.div>
  );
}