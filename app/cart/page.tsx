"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "@/app/redux/slice/cartSlice";
import { RootState } from "@/app/redux/store";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

const CardComponent: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useDispatch();
  const router = useRouter();

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const discount = 0.05 * calculateSubtotal();
  const orderTotal = calculateSubtotal() - discount;

  const handleCheckout = () => {
    alert("Items are dispatched successfully!");
    dispatch(clearCart());
    router.push("/"); // Navigate to the first screen
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center">
      {/* Header */}
      <div className="w-[375px] flex items-center justify-between p-4">
        <button onClick={() => router.push("/")}>
          <ChevronLeft className="text-white" />
        </button>
        <h1 className="text-3xl font-bold">Cart</h1>
      </div>

      {/* Cart Items */}
      <div className="w-[375px]">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-400">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center p-3 mb-4 border border-gray-700 rounded-md bg-gray-900"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-contain rounded"
              />
              <div className="ml-4 flex-1">
                <p className="text-sm font-semibold truncate">{item.title}</p>
                <p className="text-gray-400 text-xs mt-1">
                  Price: ${item.price} x {item.quantity}
                </p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <button onClick={() => dispatch(increaseQuantity(item.id))}>➕</button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch(decreaseQuantity(item.id))}>➖</button>
              </div>
              <button
                className="text-red-500 hover:text-red-700 ml-4"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {/* Summary Section */}
      {cartItems.length > 0 && (
        <div className="w-[375px] p-4 border-t border-gray-700">
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>${calculateSubtotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Discount (5%)</span>
            <span>- ${discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg mb-2">
            <span>Order Total</span>
            <span>${orderTotal.toFixed(2)}</span>
          </div>
          <button
            className="w-full bg-yellow-500 text-black font-semibold py-2 rounded"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CardComponent;
