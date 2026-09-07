import { Hero } from "@/features/home/components/hero";
import { FlashDeals } from "@/features/home/components/flash-deals";
import { HowItWorks } from "@/features/home/components/how-it-works";
import Category from "@/features/home/components/category";
import { TopBrands } from "@/features/home/components/top-brands";
import Subscribe from "@/features/home/components/subscribe";



export function StorefrontHomePage() {
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
