'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '@/components/header';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}


export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [newProduct, setNewProduct] = useState({ title: '', price: '', image: '' });
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch products on page load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
        setFilteredProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);


  // Handle search query
  useEffect(() => {
    const results = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchQuery, products]);
  

    

  // Add a new product
  const handleAddProduct = async () => {
    try {
      const newResponse = await axios.post('https://fakestoreapi.com/products', {
        title: newProduct.title,
        price: newProduct.price,
        image: newProduct.image,
      });
      setProducts([...products, newResponse.data]);
      setNewProduct({ title: '', price: '', image: '' });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  // Delete a product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Update a product
  const handleUpdateProduct = async () => {
    try {
      const response = await axios.put(`https://fakestoreapi.com/products/${editingProduct.id}`,
        editingProduct
      )
      setProducts(
        products.map((product) =>
          product.id === editingProduct.id ? response.data : product
        )
      );
      setEditingProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <React.Fragment>
      <Header/>  
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>

      {/* Search Section */}
      <div className="mb-8">
        <input
          type="search"
          placeholder="Search for a product..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border px-4 py-2 w-full"
        />
      </div>

      {/* Add New Product Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
        <input
          type="text"
          placeholder="Product Title"
          value={newProduct.title}
          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
          className="border px-4 py-2 mb-4 w-full"
        />
        <input
          type="number"
          placeholder="Product Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="border px-4 py-2 mb-4 w-full"
        />
        <input
          type="text"
          placeholder="Product Image URL"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          className="border px-4 py-2 mb-4 w-full"
        />
        <button
          onClick={handleAddProduct}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </div>

      {/* Products List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow">
            <img
              src={product.image}
              alt={product.title}
              className="h-40 w-full mix-blend-darken object-cover mb-4"
            />
            <h2 className="font-bold text-lg">{product.title}</h2>
            <p className="text-gray-700">${product.price}</p>
            <button
              className="bg-red-500 text-white px-4 py-2 mt-2 rounded"
              onClick={() => handleDelete(product.id)}
            >
              Delete
            </button>
            <button
              className="bg-yellow-500 text-white px-4 py-2 mt-2 rounded ml-2"
              onClick={() => setEditingProduct(product)}
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {/* Edit Product Section */}
      {editingProduct && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
          <input
            type="text"
            placeholder="Product Title"
            value={editingProduct.title}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, title: e.target.value })
            }
            className="border px-4 py-2 mb-4 w-full"
          />
          <input
            type="number"
            placeholder="Product Price"
            value={editingProduct.price}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, price: e.target.value })
            }
            className="border px-4 py-2 mb-4 w-full"
          />
          <input
            type="text"
            placeholder="Product Image URL"
            value={editingProduct.image}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, images: e.target.value })
            }
            className="border px-4 py-2 mb-4 w-full"
          />
          <button
            onClick={handleUpdateProduct}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Update Product
          </button>
          <button
            onClick={() => setEditingProduct(null)}
            className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
    </React.Fragment>
  );
}
