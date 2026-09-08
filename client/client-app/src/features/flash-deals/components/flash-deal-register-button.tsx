
import { Link } from "@tanstack/react-router";
import type { Product } from "@/features/flash-deals/products/lib/product-data";

interface FlashDealRegisterButtonProps {
  product: Product;
  className?: string;
  children?: React.ReactNode;
}

export function FlashDealRegisterButton({
  product,
  className,
  children,
}: FlashDealRegisterButtonProps) {
  return (
    <Link
      to="/flash-deals"
      className={
        className ||
        "bg-primary flex w-full items-center justify-center rounded-xl py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
      }
    >
      {children || `Register for ₹${product.registrationFee ?? 1}`}
    </Link>
  );
}
