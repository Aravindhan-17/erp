import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FlashERP — Live B2C Flash Deals & Urgency Sales",
  description: "Reserve flash items with 10-minute cart holds and ₹1 pre-registration access.",
};

export default function StorefrontHomePage() {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-secondary/30 bg-secondary/10 text-secondary text-xs font-bold tracking-wide uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              Live Flash Sales Engine
            </div>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
              Exclusive Deals with{" "}
              <span className="text-secondary underline decoration-primary decoration-4">
                Guaranteed 10-Min Cart Holds
              </span>
            </h1>

            <p className="text-lg text-foreground/75 leading-relaxed">
              Pay ₹1 to unlock deal eligibility. Once added to cart, stock is atomically reserved for 10 minutes so no one can snip your purchase!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/auth/register"
                id="hero-register-btn"
                className="w-full sm:w-auto px-8 py-3.5 text-base font-bold text-white bg-secondary hover:bg-secondary-hover rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                Register for ₹1 Deal ⚡
              </Link>
            </div>
          </div>

          {/* Live Deals Section */}
          <div className="mt-12 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-extrabold flex items-center gap-2">
                🔥 Active Flash Drops
              </h2>
              <span className="text-xs font-mono bg-muted px-3 py-1 rounded-full border border-border">
                Server Time: <span className="font-bold text-primary">12:00:45 PM</span>
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-background rounded-2xl p-5 border border-border shadow-sm space-y-4 hover:shadow-md transition-shadow">
                <div className="h-40 bg-primary/5 rounded-xl flex items-center justify-center text-5xl">
                  📱
                </div>
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-secondary">
                    Limited 50 Units
                  </span>
                  <h3 className="font-bold text-base mt-0.5">Flagship Smartphone Pro</h3>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-secondary font-black text-2xl">₹999</span>
                  <span className="line-through text-foreground/50 text-sm">₹29,999</span>
                </div>
                <div className="space-y-1.5 pt-2 border-t border-border">
                  <div className="flex justify-between text-xs font-bold">
                    <span>Reserved: 48/50</span>
                    <span className="text-secondary">Only 2 Left!</span>
                  </div>
                  <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                    <div className="w-[96%] h-full bg-secondary rounded-full" />
                  </div>
                </div>
                <button
                  id="deal-btn-1"
                  className="w-full py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow transition-all"
                >
                  Reserve Item (10:00) ⚡
                </button>
              </div>

              <div className="bg-background rounded-2xl p-5 border border-border shadow-sm space-y-4 hover:shadow-md transition-shadow">
                <div className="h-40 bg-primary/5 rounded-xl flex items-center justify-center text-5xl">
                  🎧
                </div>
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-primary">
                    Limited 100 Units
                  </span>
                  <h3 className="font-bold text-base mt-0.5">Wireless ANC Earbuds</h3>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-secondary font-black text-2xl">₹299</span>
                  <span className="line-through text-foreground/50 text-sm">₹4,999</span>
                </div>
                <div className="space-y-1.5 pt-2 border-t border-border">
                  <div className="flex justify-between text-xs font-bold">
                    <span>Reserved: 85/100</span>
                    <span className="text-primary">15 Available</span>
                  </div>
                  <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                    <div className="w-[85%] h-full bg-primary rounded-full" />
                  </div>
                </div>
                <button
                  id="deal-btn-2"
                  className="w-full py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow transition-all"
                >
                  Reserve Item (10:00) ⚡
                </button>
              </div>

              <div className="bg-background rounded-2xl p-5 border border-border shadow-sm space-y-4 hover:shadow-md transition-shadow">
                <div className="h-40 bg-primary/5 rounded-xl flex items-center justify-center text-5xl">
                  ⌚
                </div>
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-primary">
                    Limited 150 Units
                  </span>
                  <h3 className="font-bold text-base mt-0.5">Smart Watch Ultra 2</h3>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-secondary font-black text-2xl">₹499</span>
                  <span className="line-through text-foreground/50 text-sm">₹8,999</span>
                </div>
                <div className="space-y-1.5 pt-2 border-t border-border">
                  <div className="flex justify-between text-xs font-bold">
                    <span>Reserved: 120/150</span>
                    <span className="text-primary">30 Available</span>
                  </div>
                  <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                    <div className="w-[80%] h-full bg-primary rounded-full" />
                  </div>
                </div>
                <button
                  id="deal-btn-3"
                  className="w-full py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow transition-all"
                >
                  Reserve Item (10:00) ⚡
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
