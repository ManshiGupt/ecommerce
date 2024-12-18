// "use client";

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../redux/slice/cartSlice";
// import { RootState } from "../redux/store";
// import Link from "next/link";

// export default function ProductsList() {
//   const [products, setProducts] = useState([]);
//   const [category, setCategory] = useState("all");
//   const cartItems = useSelector((state: RootState) => state.cart.cartItems);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     async function fetchProducts() {
//       const res = await fetch("https://fakestoreapi.com/products");
//       const data = await res.json();
//       setProducts(data);
//     }
//     fetchProducts();
//   }, []);

//   const filteredProducts =
//     category === "all"
//       ? products
//       : products.filter((p: any) => p.category === category);
//     function ram(){
//         <Link href="/cart"> </Link>
//         console.log("xjxs");
//       }

//   return (
//     <div className="bg-black text-white min-h-screen p-4 max-w-[400px] mx-auto">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Product List</h1>
//         <div className="relative">
//           <span className="absolute top-[-10px] right-[-5px] bg-red-500 text-xs rounded-full px-2">
//             {cartItems.length}
//           </span>
//           {/* <div className="mt-0 mr-3 cursor-pointer" onClick={()=>ram()}>🛒</div> */}
//           <Link href="/cart"className="mt-0 mr-3 cursor-pointer"> 🛒</Link>
//           </div>
//       </div>

//       {/* Category Navigation */}
//       <div className="flex space-x-4 mt-4">
//         {["all", "men's clothing", "electronics"].map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setCategory(cat)}
//             className={`px-4 py-1 rounded-full ${
//               category === cat ? "bg-yellow-500" : "bg-gray-700"
//             }`}
//           >
//             {cat.charAt(0).toUpperCase() + cat.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Product Cards */}
//       <div className="grid grid-cols-2 gap-4 mt-6">
//         {filteredProducts.map((product: any) => (
//           <div
//             key={product.id}
//             className="bg-gray-800 rounded-lg p-2 flex flex-col items-center"
//           >
//             <img
//               src={product.image}
//               alt={product.title}
//               className="w-24 h-24 object-contain"
//             />
//             <h3 className="text-sm font-bold mt-2 text-center line-clamp-1">
//               {product.title}
//             </h3>
//             <p className="text-yellow-400 mt-1">⭐ {product.rating.rate}</p>
//             <p className="text-green-400 font-semibold">${product.price}</p>
//             <button
//               onClick={() => dispatch(addToCart(product))}
//               className="text-yellow-500 mt-2"
//             >
//               +
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slice/cartSlice";
import { RootState } from "../redux/store";
import Link from "next/link";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  const filteredProducts =
    category === "all"
      ? products
      : products.filter((p: any) => p.category === category);

  return (
    <div className="bg-black text-white min-h-screen p-4 max-w-[400px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Product List</h1>
        <div className="relative">
  {cartItems.length > 0 && ( // Show the badge only when cart has items
    <span className="absolute top-[-10px] right-[-5px] bg-red-500 text-xs rounded-full px-2">
      {cartItems.length}
    </span>
  )}
  {cartItems.length > 0 ? (
    <Link href="/cart" className="mt-0 mr-3 cursor-pointer">
      🛒
    </Link>
  ) : (
    <div className="mt-0 mr-3 text-gray-400 cursor-not-allowed">
      🛒
    </div>
  )}
</div>

      </div>

      {/* Category Navigation */}
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

      {/* Product Cards */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {filteredProducts.map((product: any) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`} // Dynamic route
            passHref
          >
            <div className="bg-gray-800 rounded-lg p-2 flex flex-col items-center cursor-pointer">
              <img
                src={product.image}
                alt={product.title}
                className="w-24 h-24 object-contain"
              />
              <h3 className="text-sm font-bold mt-2 text-center line-clamp-1">
                {product.title}
              </h3>
              <p className="text-yellow-400 mt-1">⭐ {product.rating.rate}</p>
              <p className="text-green-400 font-semibold">Rs. {product.price}</p>
              <button
                onClick={(e) => {
                  e.preventDefault(); // Prevent navigation when clicking the button
                  dispatch(addToCart(product));
                }}
                className="text-yellow-500 mt-2"
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

