"use client";

import Link from "next/link";
import { Product } from "@/app/(storefront)/(main)/flash-deals/products/lib/product-data";

interface FlashDealRegisterButtonProps {
  product: Product;
  className?: string;
  children?: React.ReactNode;
}

export function FlashDealRegisterButton({ product, className, children }: FlashDealRegisterButtonProps) {
  return (
    <Link 
      href={`/flash-deals/register/${product.id}`}
      className={className || "bg-primary w-full rounded-xl py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 flex items-center justify-center"}
    >
      {children || `Register for ₹${product.registrationFee ?? 1}`}
    </Link>
  );
}
