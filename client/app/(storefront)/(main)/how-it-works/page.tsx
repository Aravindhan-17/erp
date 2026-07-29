import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How it Works — FlashERP",
  description: "Learn how to participate in our flash sales.",
};

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-4xl font-black">How it Works</h1>
      <p className="text-foreground/75 mb-8">
        Welcome to FlashERP! Here is everything you need to know about reserving and buying products
        during our flash deals.
      </p>

      <div className="space-y-6">
        <div className="bg-background border-border rounded-2xl border p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-bold">1. Register for Deals</h2>
          <p className="text-foreground/75">
            Pay a nominal ₹1 fee to unlock eligibility for our exclusive flash drops.
          </p>
        </div>

        <div className="bg-background border-border rounded-2xl border p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-bold">2. Reserve Your Item</h2>
          <p className="text-foreground/75">
            When a flash deal goes live, click reserve. Once added to your cart, stock is atomically
            reserved for you for 10 minutes.
          </p>
        </div>

        <div className="bg-background border-border rounded-2xl border p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-bold">3. Checkout Securely</h2>
          <p className="text-foreground/75">
            Complete your purchase within the 10-minute window to secure your deal. If you miss the
            window, the item goes back into the pool!
          </p>
        </div>
      </div>
    </div>
  );
}
