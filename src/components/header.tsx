"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

const Header: React.FC = () => {
  const { cart } = useCart();

  return (
    <header className="flex items-center justify-between p-4 fixed z-20 w-screen  bg-blue-500 text-white">
      <h1 className="text-xl font-bold">
        <Link href="/">My Shop</Link>
      </h1>
     <div className="absolute end-0 mr-20" >
     <Link
            href="/profile"
            className="hover:text-orange-400 transition-colors duration-300"
          >
           <span className="hidden" > Profile</span>
            <svg className="w-7 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z" clip-rule="evenodd"/>
</svg>

          </Link>
     </div>
      <Link href="/cart" className="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 mr-5 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.6 8M17 13l1.6 8M6 21h12M9 9h6"
          />
        </svg>
        
        {cart.length > 0 && (
          <span className="absolute -top-0 -right-0  bg-red-500 mr-6 mt-1  text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {cart.reduce((total , item) => total + item.quantity , 0)}
          </span>
        )}
      </Link>
    </header>
  );
};

export default Header;
