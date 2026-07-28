import Link from "next/link";

export function Hero() {
  return (
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
      </div>
    </section>
  );
}
