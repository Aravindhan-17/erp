import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/app/(storefront)/(main)/flash-deals/products/lib/product-data";
import { FlashDealRegisterButton } from "./flash-deal-register-button";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 transition duration-300 hover:shadow-lg">
      <Link href={`/flash-deals/products/${product.id}`} className="flex flex-col flex-1">
        <div className="relative mb-4 flex h-40 items-center justify-center overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain transition duration-500 group-hover:scale-105"
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
                ₹{product.flashPrice.toLocaleString()}
              </span>
            </div>
            <span className="mb-1 text-xs font-bold text-red-500 md:text-sm">
              {product.discount}% OFF
            </span>
          </div>
        </div>
      </Link>
      
      {/* Registration Button Modal Trigger */}
      <FlashDealRegisterButton product={product} />
    </div>
  );
}
