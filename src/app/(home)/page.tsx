"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  //feching products in home page
  useEffect(() => {
       axios.get("https://fakestoreapi.com/products").then((response) => {
       setProducts(response.data);
       setFilteredProducts(products);  
    });
  }, []);

   
    
   //search Engeen
  useEffect(() => {
    const results = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchQuery, products]);

  return (
    <React.Fragment>
    <div className="p-4 bg-slate-200   "  id="background" >
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <input
        type="search"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-80  mb-4 mt-2  p-2 border rounded-xl text-center border-green-500 shadow-lg  "
      />
      <div className="grid grid-cols-1  sm:grid-cols-1 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border border-purple-800 p-4   rounded-lg shadow-sm hover:shadow-md hover:shadow-blue-600 shadow-blue-500"
          >
            <img
              src={product.image}
              alt={product.title}
              // className="w-full mix-blend-darken  h-40 object-cover mb-2"
              className="w-full  rounded-md  h-40  object-cover mb-2"
            />
            <h2 className="text-lg text-slate-400 font-bold">{product.title.slice(0,30)}...</h2>
            <p className="text-sky-700">${product.price}</p>
            <button
              className="mt-2 bg-blue-800 text-slate-300 py-1 px-3       rounded hover:bg-blue-600"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <Link href="/cart" className=" mt-4  p-1 rounded float-end bg-blue-700 inline-block text-yellow-50 hover:underline">
        Go to Cart
      </Link>
    </div>
    </React.Fragment>
  );
};

export default ProductsPage;
