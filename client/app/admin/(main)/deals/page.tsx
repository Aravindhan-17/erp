import { Metadata } from "next";
import { DealsClient } from "./components/deals-client";

export const metadata: Metadata = {
  title: "Flash Deals — FlashERP Admin",
  description: "Manage live, upcoming, past and draft deals.",
};

export default function DealsPage() {
  return <DealsClient />;
}
