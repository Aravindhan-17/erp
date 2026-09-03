import { Metadata } from "next";
import { Hero } from "./components/hero";
import { FlashDeals } from "./components/flash-deals";
import { HowItWorks } from "./components/how-it-works";
import Category from "./components/category";
import { TopBrands } from "./components/top-brands";
import Subscribe from "./components/subscribe";

export const metadata: Metadata = {
  title: "FlashERP — Live B2C Flash Deals & Urgency Sales",
  description: "Reserve flash items with 10-minute cart holds and ₹1 pre-registration access.",
};

export default function StorefrontHomePage() {
  return (
    <div className="space-y-15 pb-15 pt-0">
      <Hero />
      <FlashDeals />
      <Category />
      <HowItWorks />
      <TopBrands />
      <Subscribe />
    </div>
  );
}
