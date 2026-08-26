import { Metadata } from "next";
import { InventoryClient } from "./components/inventory-client";

export const metadata: Metadata = {
  title: "Inventory & POs — FlashERP Admin",
};

export default function InventoryPage() {
  return <InventoryClient />;
}
