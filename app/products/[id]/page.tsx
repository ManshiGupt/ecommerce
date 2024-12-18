"use client";

import { useEffect, useState, use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/app/redux/slice/cartSlice";
import { RootState } from "@/app/redux/store";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  increaseQuantity,
  decreaseQuantity,
  
} from "@/app/redux/slice/cartSlice";

interface ProductPageProps {
  params: Promise<{ id: string }>; // params is now a Promise
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

export default function ProductDetails({ params }: ProductPageProps) {
  const { id } = use(params); // Unwrap params using `use()`
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleBack = () => {
    router.push("/products");
  };
  const handlefor = () => {
    router.push("/cart");
  };

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data: Product = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const cartItem = cartItems.find((item) => item.id === product?.id);


  if (loading) return <div className="text-center text-white">Loading...</div>;

  if (!product) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <button onClick={handleBack} className="text-yellow-500 underline">
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="bg-black text-white w-[350px] h-[750px] mx-auto shadow-lg p-4 rounded-2xl">
      <div className="flex justify-start mb-2">
        <button className="text-gray-300 text-lg" onClick={handleBack}>
          <ChevronLeft />
        </button>
      </div>
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-contain mb-4"
      />
      <h1 className="text-xl font-bold mb-2">{product.title}</h1>
      <p className="text-sm text-gray-400 mb-4">
        {/* {product.description.length > 80
          ? `${product.description.substring(0, 80)}...`
          : product.description} */}
          {product.description}
      </p>
      <div className="flex flex-row gap-28">
      <p className="text-lg font-bold text-white mb-6">Rs. {product.price}</p>
      <div className="flex items-center gap-6 mb-7">
        <button
          className="bg-gray-700 text-yellow-500 rounded-full w-6 h-6 flex items-center justify-center"
          onClick={() => dispatch(decreaseQuantity(product.id))}
        >
          ➖
        </button>
       
        <span>{cartItem?.quantity || 0}</span>
        <button
          className="bg-gray-700 text-yellow-500 rounded-full w-6 h-6 flex items-center justify-center"
          onClick={() => dispatch(increaseQuantity(product.id))}
        >
          ➕
        </button>
      </div>
      </div>
      <button
        className="w-full bg-yellow-500 text-black py-3 rounded-full font-bold shadow-md"
        // onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
        onClick={handlefor} 
      >
        Add to cart
      </button>
    </div>
  );
}
