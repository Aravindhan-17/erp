import { CategoriesProvider } from "./context/categories-provider";
import { CategoriesContent } from "./components/categories-content";

export function CategoriesPage() {
  return (
    <CategoriesProvider>
      <CategoriesContent />
    </CategoriesProvider>
  );
}