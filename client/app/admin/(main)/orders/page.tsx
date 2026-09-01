import { Metadata } from "next";
import { OrdersClient } from "./components/orders-client";

export const metadata: Metadata = {
  title: "B2C Orders & Invoices — FlashERP Admin",
};

export default function OrdersPage() {
  return <OrdersClient />;
}
