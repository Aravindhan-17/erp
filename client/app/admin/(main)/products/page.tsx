import { Metadata } from "next";
import { ProductsClient } from "./components/products-client";

export const metadata: Metadata = {
  title: "Products — FlashERP Admin",
  description: "Manage products available for flash deals.",
};

export default function ProductsPage() {
  return <ProductsClient />;
}
