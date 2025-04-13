import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";

export const CartButton = ({ cartItemCount }: { cartItemCount: number }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="group"
  >
    <Button
      variant="ghost"
      size="sm"
      className="text-sm hover:bg-interactive-hover rounded-full transition-all duration-300 relative"
    >
      <ShoppingCart className="w-5 h-5 mr-2" />
      {cartItemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-accent text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {cartItemCount}
        </span>
      )}
    </Button>
  </motion.button>
);