// src/app/components/ui/header.tsx
import { Button } from "app/app/components/ui/button";
import Link from "next/link";

export function Header() {
  return (
    <header className="bg-[#1E1E1E] text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/">
          <Button variant="ghost" className="text-white">
            <span className="text-2xl">TechFusion</span>
          </Button>
        </Link>
        <nav className="flex gap-4">
          <Link href="/catalog">
            <Button variant="ghost" className="text-white">
              Catalog
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="ghost" className="text-white">
              Cart
            </Button>
          </Link>
          <Link href="/profile">
            <Button variant="ghost" className="text-white">
              Profile
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}