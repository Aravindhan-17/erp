import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flash Deals — FlashERP",
  description: "View all active and upcoming flash deals.",
};

export default function FlashDealsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-black mb-8">Flash Deals</h1>
      <p className="text-foreground/75">
        Check out our currently active and upcoming flash deals. Check back often!
      </p>
      {/* Content for flash deals will go here */}
    </div>
  );
}
