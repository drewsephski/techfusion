import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

export const SearchButton = () => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="group"
  >
    <Button
      variant="ghost"
      size="sm"
      className="text-sm hover:bg-interactive-hover rounded-full transition-all duration-300"
    >
      <Search className="w-5 h-5 mr-2" />
      Search
    </Button>
  </motion.button>
);