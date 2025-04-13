'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { toast } from 'sonner';
import { CartItem as ProductCartItem } from '@/types/product';

interface CartItem extends ProductCartItem {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  updateQuantity: (item: CartItem, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  cartItemCount: number;
  isInCart: (item: CartItem) => boolean;
  getCartItem: (item: CartItem) => CartItem | undefined;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((item: CartItem, quantity: number = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity <= 0) {
          toast.error('Cannot add negative quantity');
          return prev;
        }
        
        toast.success(`Added ${quantity} ${item.name}${quantity > 1 ? 's' : ''}`);
        return prev.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: newQuantity }
            : cartItem
        );
      }
      
      toast.success(`Added ${quantity} ${item.name}${quantity > 1 ? 's' : ''}`);
      return [...prev, { ...item, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((item: CartItem) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (!existingItem) {
      toast.error('Product not found in cart');
      return;
    }

    setCartItems(prev => prev.filter(cartItem => cartItem.id !== item.id));
    toast.success(`Removed ${existingItem.name} from cart`);
  }, [cartItems]);

  const updateQuantity = useCallback((item: CartItem, quantity: number) => {
    if (quantity < 1) {
      toast.error('Quantity must be at least 1');
      return;
    }

    setCartItems(prev => 
      prev.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity }
          : cartItem
      )
    );
    toast.success(`Updated quantity of ${item.name} to ${quantity}`);
  }, []);

  const clearCart = useCallback(() => {
    if (cartItems.length === 0) {
      toast.error('Cart is already empty');
      return;
    }

    setCartItems([]);
    toast.success('Cart cleared');
  }, [cartItems]);

  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  const isInCart = useCallback((item: CartItem) => {
    return cartItems.some(cartItem => cartItem.id === item.id);
  }, [cartItems]);

  const getCartItem = useCallback((item: CartItem) => {
    return cartItems.find(cartItem => cartItem.id === item.id);
  }, [cartItems]);

  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      clearCart,
      getCartTotal,
      cartItemCount,
      isInCart,
      getCartItem
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartContextProvider');
  }
  return context;
};