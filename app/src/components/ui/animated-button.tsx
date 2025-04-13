// animated-button.tsx
'use client';

import { motion } from 'framer-motion';
import { Button } from './button';

interface AnimatedButtonProps extends React.ComponentProps<typeof Button> {
  icon?: React.ReactNode;
}

export function AnimatedButton({ children, icon, ...props }: AnimatedButtonProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Button {...props}>
        <div className="flex items-center gap-2">
          {icon}
          {children}
        </div>
      </Button>
    </motion.div>
  );
}