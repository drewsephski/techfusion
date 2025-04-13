'use client';

import { usePathname } from 'next/navigation';
import { Button } from "app/src/components/ui/button";
import { cn } from "app/src/types";
import { Home, Package, ShoppingCart, User } from 'lucide-react';

export function BottomNavigation() {
  const pathname = usePathname();

  const navigation = [
    {
      name: 'Home',
      href: '/',
      icon: Home,
      active: pathname === '/',
    },
    {
      name: 'Catalog',
      href: '/catalog',
      icon: Package,
      active: pathname.startsWith('/catalog'),
    },
    {
      name: 'Cart',
      href: '/cart',
      icon: ShoppingCart,
      active: pathname === '/cart',
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: User,
      active: pathname.startsWith('/profile'),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-[#0A1A2F] border-t border-[#2D2D2D]">
        <div className="flex h-14 items-center justify-around">
          {navigation.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              size="icon"
              className={cn(
                'text-[#F5F5F5]/50 hover:text-[#F5F5F5]',
                item.active ? 'text-[#00F5FF]' : ''
              )}
              onClick={() => window.location.href = item.href}
            >
              <item.icon className="h-6 w-6" />
              <span className="sr-only">{item.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
}