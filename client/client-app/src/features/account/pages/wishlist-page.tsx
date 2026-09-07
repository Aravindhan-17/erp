import { useState } from 'react';
import { Link } from "@tanstack/react-router";
import { Product1, Product2, Product3 } from "@/assets/images";
import { Heart, ShoppingCart, Trash2, Share2 } from "lucide-react";

export function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: "wl_1",
      name: "USB-C Fast Charging Cable",
      price: 19.99,
      image: Product1,
      inStock: true,
      addedDate: "Aug 10, 2026",
    },
    {
      id: "wl_2",
      name: "Wireless Noise-Cancelling Earbuds",
      price: 149.0,
      image: Product2,
      inStock: false,
      addedDate: "Jul 22, 2026",
    },
    {
      id: "wl_3",
      name: "Ergonomic Office Chair",
      price: 299.5,
      image: Product3,
      inStock: true,
      addedDate: "Jun 05, 2026",
    },
  ]);

  const removeItem = (id: string) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-6 border-b border-gray-200 pb-6 md:flex-row md:items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Your Wishlist</h1>
          <p className="mt-1 text-sm text-gray-500">
            Keep track of the items you love and move them to your cart when you&apos;re ready.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
            <Share2 size={16} /> Share List
          </button>
        </div>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-16 text-center">
          <div className="mb-4 rounded-full bg-white p-4 text-gray-300 shadow-sm">
            <Heart size={48} />
          </div>
          <h2 className="text-lg font-bold text-gray-900">Your wishlist is empty</h2>
          <p className="mt-2 text-sm text-gray-500">
            Find something you love and tap the heart icon to save it here.
          </p>
          <Link
            to="/"
            className="bg-primary mt-6 rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="hover:border-secondary group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
            >
              {/* Product Image */}
              <div className="relative flex h-48 w-full items-center justify-center border-b border-gray-100 bg-gray-50 p-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className={`h-full w-full object-contain mix-blend-multiply transition-transform group-hover:scale-105 ${!item.inStock ? "opacity-50 grayscale" : ""}`}
                />

                {/* Actions Overlay */}
                <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm hover:text-red-500"
                    title="Remove from wishlist"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {!item.inStock && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm">
                    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900/10 backdrop-blur-md">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <Link
                    to="/"
                    className="hover:text-secondary line-clamp-2 font-bold text-gray-900"
                  >
                    {item.name}
                  </Link>
                </div>

                <p className="mb-4 text-xs text-gray-500">Added {item.addedDate}</p>

                <div className="mt-auto flex items-center justify-between">
                  <p className="text-lg font-bold text-gray-900">${item.price.toFixed(2)}</p>
                </div>

                {/* Add to Cart */}
                <button
                  disabled={!item.inStock}
                  className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-opacity ${
                    item.inStock
                      ? "bg-primary text-white hover:opacity-90"
                      : "cursor-not-allowed bg-gray-100 text-gray-400"
                  }`}
                >
                  <ShoppingCart size={16} />
                  {item.inStock ? "Move to Cart" : "Notify when available"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
