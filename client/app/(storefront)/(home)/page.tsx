import { Metadata } from "next";
import { Hero } from "./components/hero";
import { FlashDeals } from "./components/flash-deals";

export const metadata: Metadata = {
  title: "FlashERP — Live B2C Flash Deals & Urgency Sales",
  description: "Reserve flash items with 10-minute cart holds and ₹1 pre-registration access.",
};

export default function StorefrontHomePage() {
  return (
    <div className="space-y-16 py-8">
      <Hero />
      <FlashDeals />
    </div>
  );
}
