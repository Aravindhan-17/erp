import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export type ProductType = {
  id: number | string;
  name: string;
  category: string;
  image: StaticImageData | string;
  originalPrice: number;
  discountPrice: number;
  discount: string | number;
};

interface ProductCardProps {
  product: ProductType;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/flash-deals/products/${product.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 transition duration-300 hover:shadow-lg"
    >
      <div className="relative mb-4 flex h-40 items-center justify-center overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          className="h-full w-auto object-contain transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <h3 className="mb-1 line-clamp-1 text-sm font-bold text-gray-900 md:text-base">
          {product.name}
        </h3>
        <p className="mb-4 text-xs font-medium text-black/50 md:text-sm">{product.category}</p>

        <div className="mb-4 mt-auto flex items-end justify-between">
          <div className="flex flex-col">
            <span className="mb-1 text-xs font-medium text-gray-400 line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
            <span className="text-lg font-extrabold leading-none text-gray-900 md:text-xl">
              ₹{product.discountPrice.toLocaleString()}
            </span>
          </div>
          <span className="mb-1 text-xs font-bold text-red-500 md:text-sm">
            {typeof product.discount === 'number' ? `${product.discount}% OFF` : product.discount}
          </span>
        </div>

        <button className="bg-primary flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white transition hover:opacity-90">
          <ShoppingCart size={16} /> Add to Cart
        </button>
      </div>
    </Link>
  );
}
