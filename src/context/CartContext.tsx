"use client";

import { createContext, useContext } from "react";
import {useState , useEffect} from 'react'

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

interface CartContextType  {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({children,}) => {

  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedTimestamp = localStorage.getItem("cartTimestamp");

    if (savedCart && savedTimestamp) {
      const now = new Date().getTime();
      const savedTime = parseInt(savedTimestamp, 10);

      // Check if the saved cart is within 1 miniute
      if (now - savedTime <= 60 * 1000) {
        setCart(JSON.parse(savedCart));
      } else {
        // If more than 1 miniute , clear the saved cart
        localStorage.removeItem("cart");
        localStorage.removeItem("cartTimestamp");
      }
    }
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("cartTimestamp", new Date().getTime().toString());      
    }
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { 
                ...cartItem, 
                quantity: cartItem.quantity + (item.quantity || 1) // مقدار پیش‌فرض برای جلوگیری از undefined
              }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: item.quantity || 1 }];
    });
  };
  

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max( 1 , quantity) } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    localStorage.removeItem("cartTimestamp");
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}  >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
