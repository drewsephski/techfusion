// src/app/components/ui/header.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Header() {
  return (
    <header className="bg-[#1E1E1E] text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/">
          <Button
            variant="ghost"
            className="text-white font-bold text-2xl tracking-wide"
          >
            TechFusion
          </Button>
        </Link>
        <nav className="flex gap-4">
          <Link href="/catalog">
            <Button
              variant="ghost"
              className="text-white font-medium text-base tracking-wide"
            >
              Catalog
            </Button>
          </Link>
          <Link href="/cart">
            <Button
              variant="ghost"
              className="text-white font-medium text-base tracking-wide"
            >
              Cart
            </Button>
          </Link>
          <Link href="/profile">
            <Button
              variant="ghost"
              className="text-white font-medium text-base tracking-wide"
            >
              Profile
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}