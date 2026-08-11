"use client";

import React, { useEffect } from "react";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import Image from "next/image";
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
    price: 199.50,
    quantity: 2,
  },
];

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const [items, setItems] = React.useState<CartItem[]>(mockCartItems);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      // Prevent scrolling on the body when drawer is open
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const updateQuantity = (id: string, delta: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[70] shadow-2xl flex flex-col transform transition-transform duration-300 font-poppins">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-gray-900" />
            <h2 className="text-lg font-bold text-gray-900">Shopping Cart</h2>
            <span className="ml-2 bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-0.5 rounded-full">
              {items.length}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-gray-300" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Your cart is empty</h3>
                <p className="text-sm text-gray-500 mt-1">Looks like you haven't added anything yet.</p>
              </div>
              <button 
                onClick={onClose}
                className="mt-4 px-6 py-2 bg-primary text-white rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                {/* Image Placeholder */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 rounded-xl flex-shrink-0 flex items-center justify-center border border-gray-100 transition-colors group-hover:border-gray-200">
                  <ShoppingBag className="w-8 h-8 text-gray-200" />
                </div>
                
                {/* Item Details */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="flex justify-between gap-2">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-tight">
                      {item.name}
                    </h3>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 mt-0.5"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-bold text-gray-900">
                      ${item.price.toFixed(2)}
                    </span>
                    
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-2 py-1 border border-gray-100">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="text-gray-500 hover:text-gray-900 disabled:opacity-50 disabled:hover:text-gray-500 transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-sm font-medium w-4 text-center text-gray-900">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="text-gray-500 hover:text-gray-900 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
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
          <div className="border-t border-gray-100 p-4 sm:p-6 bg-gray-50/50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 font-medium">Subtotal</span>
              <span className="text-xl font-bold text-gray-900">
                ${total.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-5 text-center">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="flex flex-col gap-3">
              <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-4 rounded-xl transition-colors shadow-lg shadow-primary/25">
                Go to Checkout
              </button>
              <Link 
                href="/cart"
                onClick={onClose}
                className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 font-bold py-3 px-4 rounded-xl transition-colors text-center"
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
