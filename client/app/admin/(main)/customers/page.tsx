import { Metadata } from "next";
import { CustomersClient } from "./components/customers-client";

export const metadata: Metadata = {
  title: "Customers — FlashERP Admin",
};

export default function CustomersPage() {
  return <CustomersClient />;
}