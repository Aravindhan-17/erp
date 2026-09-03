import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";

type Category = {
  id: number | string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating?: number;
  reviews?: number;
  stock?: boolean;
};

interface CategoryCardProps {
  product: Category;
}

export function CategoryCard({ product }: CategoryCardProps) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="h-50 relative flex items-center justify-center bg-white p-8">
        <Image
          src={product.image}
          alt={product.name}
          fill={false}
          width={220}
          height={220}
          className="object-contain transition duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="space-y-4 p-5">
        {/* Name */}
        <h3 className="line-clamp-2 min-h-[52px] text-lg font-semibold text-gray-900">
          {product.name}
        </h3>

        {/* Price */}
        <div>
          <div className="text-2xl font-semibold text-black">₹{product.price.toLocaleString()}</div>

          <div className="mt-1 flex items-center gap-3">
            {product.originalPrice && (
              <span className="text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}

            {product.discount && (
              <span className="rounded-md bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                {product.discount}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <Star size={16} className="fill-yellow-400 text-yellow-400" />

          <span className="font-medium">{product.rating ?? 4.8}</span>

          <span className="text-gray-400">({product.reviews ?? 125})</span>
        </div>

        {/* Stock */}
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

          <span className="text-sm font-medium text-green-600">
            {product.stock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button className="flex-1 rounded-xl border border-gray-200 py-3 font-semibold transition hover:bg-gray-100">
            View Details
          </button>

          <button className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 transition hover:bg-orange-500 hover:text-white">
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
