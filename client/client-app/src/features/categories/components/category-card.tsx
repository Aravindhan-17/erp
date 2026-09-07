
import { Link } from "@tanstack/react-router";

export type CategoryType = {
  id: number | string;
  title: string;
  products: number;
  image: string | any;
  industry?: string;
  status?: string;
};

interface CategoryCardProps {
  category: CategoryType;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      to="/categories/$id" params={{ id: String(category.id) }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 text-center transition duration-300 hover:border-gray-300 hover:shadow-lg"
    >
      <div className="mb-5 flex flex-1 items-center justify-center">
        <img
          src={category.image}
          alt={category.title}
          className="h-30 w-50 object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <h3 className="group-hover:text-primary text-lg font-semibold text-gray-900 transition-colors">
        {category.title}
      </h3>

      <p className="mt-1 text-sm font-medium text-black/50">{category.products} Products</p>
    </Link>
  );
}
