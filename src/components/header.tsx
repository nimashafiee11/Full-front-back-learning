"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

const Header: React.FC = () => {
  const { cart } = useCart();

  return (
    <header className="flex items-center justify-between p-4 bg-blue-500 text-white">
      <h1 className="text-xl font-bold">
        <Link href="/">My Shop</Link>
      </h1>
      <Link href="/cart" className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.6 8M17 13l1.6 8M6 21h12M9 9h6"
          />
        </svg>
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {cart.reduce((total, item) => total + item.quantity, 0)}
          </span>
        )}
      </Link>
    </header>
  );
};

export default Header;
