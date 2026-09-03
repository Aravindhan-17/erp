"use client";

import React, { useEffect } from "react";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import Link from "next/link";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

const mockCartItems: CartItem[] = [
  {
    id: "1",
    name: "Wireless Noise-Cancelling Headphones",
    price: 299.99,
    quantity: 1,
  },
  {
    id: "2",
    name: "Ergonomic Office Chair with Lumbar Support",
    price: 199.5,
    quantity: 2,
  },
];

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const [items, setItems] = React.useState<CartItem[]>(mockCartItems);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      // Prevent scrolling on the body when drawer is open
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const updateQuantity = (id: string, delta: number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="z-60 fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="sm:w-100 z-70 font-poppins fixed right-0 top-0 flex h-full w-full transform flex-col bg-white shadow-2xl transition-transform duration-300">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 p-4 sm:p-6">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-gray-900" />
            <h2 className="text-lg font-bold text-gray-900">Shopping Cart</h2>
            <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600">
              {items.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 transition-colors hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 space-y-6 overflow-y-auto p-4 sm:p-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-50">
                <ShoppingBag className="h-10 w-10 text-gray-300" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Your cart is empty</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Looks like you haven&apos;t added anything yet.
                </p>
              </div>
              <button
                onClick={onClose}
                className="bg-primary hover:bg-primary/90 mt-4 rounded-full px-6 py-2 text-sm font-semibold text-white transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="group flex gap-4">
                {/* Image Placeholder */}
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-gray-50 transition-colors group-hover:border-gray-200 sm:h-24 sm:w-24">
                  <ShoppingBag className="h-8 w-8 text-gray-200" />
                </div>

                {/* Item Details */}
                <div className="flex flex-1 flex-col justify-between py-1">
                  <div className="flex justify-between gap-2">
                    <h3 className="line-clamp-2 text-sm font-medium leading-tight text-gray-900">
                      {item.name}
                    </h3>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="mt-0.5 shrink-0 text-gray-400 transition-colors hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-bold text-gray-900">${item.price.toFixed(2)}</span>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 px-2 py-1">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="text-gray-500 transition-colors hover:text-gray-900 disabled:opacity-50 disabled:hover:text-gray-500"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-4 text-center text-sm font-medium text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="text-gray-500 transition-colors hover:text-gray-900"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 bg-gray-50/50 p-4 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-medium text-gray-600">Subtotal</span>
              <span className="text-xl font-bold text-gray-900">${total.toFixed(2)}</span>
            </div>
            <p className="mb-5 text-center text-xs text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="flex flex-col gap-3">
              <button className="bg-primary hover:bg-primary/90 shadow-primary/25 w-full rounded-xl px-4 py-3.5 font-bold text-white shadow-lg transition-colors">
                Go to Checkout
              </button>
              <Link
                href="/cart"
                onClick={onClose}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-center font-bold text-gray-900 transition-colors hover:bg-gray-50"
              >
                View Full Cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
