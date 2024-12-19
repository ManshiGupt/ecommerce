"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slice/cartSlice";
import { RootState } from "../redux/store";
import Link from "next/link";

interface Rating {
  rate: number;
  count: number;
}

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
  rating: Rating;
}

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState("all");
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("https://fakestoreapi.com/products");
      const data: Product[] = await res.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  const filteredProducts =
    category === "all"
      ? products
      : products.filter((product) => product.category === category);

  return (
    <div className="bg-black text-white min-h-screen p-4 max-w-[400px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center ">
        <h1 className="text-2xl font-bold">Product List</h1>
        <div className="relative">
          {cartItems.length > 0 && (
            <span className="absolute top-[-10px] right-[-5px] bg-red-500 text-xs rounded-full px-2">
              {cartItems.length}
            </span>
          )}
          {cartItems.length > 0 ? (
            <Link href="/cart" className="mt-0 mr-3 cursor-pointer">
              🛒
            </Link>
          ) : (
            <div className="mt-0 mr-3 text-gray-400 cursor-not-allowed">🛒</div>
          )}
        </div>
      </div>

      <div className="flex space-x-4 mt-4">
        {["all", "men's clothing", "electronics"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1 rounded-full ${
              category === cat ? "bg-yellow-500" : "bg-gray-700"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        {filteredProducts.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`} passHref>
            <div className="bg-gray-800 rounded-lg p-2 flex flex-col  cursor-pointer">
              <div className="w-36 h-36 rounded-lg items-center bg-white ">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover rounded-lg "
                />
              </div>

              <h3 className="text-sm font-bold mt-5 text-center line-clamp-1">
                {product.title}
              </h3>
              {/* <h3 className="text-sm font-bold mt-2 text-center line-clamp-1">
                {product.subtitle}
              </h3> */}
              <p className="text-yellow-400 mt-1 text-left ml-3">
                ⭐ {product.rating.rate}
              </p>
              <p className="text-green-400 font-semibold text-left ml-3">
                Rs. {product.price}
              </p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(addToCart(product));
                }}
                className="text-yellow-500 mt-2 py-1 px-14 rounded-lg bg-black"
              >
                +
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
