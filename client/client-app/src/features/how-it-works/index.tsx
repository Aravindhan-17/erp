import { UserPlus, ShoppingCart, ShieldCheck, Zap, Clock, CreditCard } from "lucide-react";

const STEPS = [
  {
    title: "Register for Deals",
    description: "Pay a nominal ₹1 fee to unlock eligibility for our exclusive flash drops.",
    icon: UserPlus,
    color: "from-blue-500 to-cyan-400",
    bg: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  {
    title: "Reserve Your Item",
    description:
      "When a flash deal goes live, click reserve. Once added to your cart, stock is atomically reserved for you for 10 minutes.",
    icon: ShoppingCart,
    color: "from-primary to-purple-500",
    bg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    title: "Checkout Securely",
    description:
      "Complete your purchase within the 10-minute window to secure your deal. If you miss the window, the item goes back into the pool!",
    icon: ShieldCheck,
    color: "from-secondary to-orange-400",
    bg: "bg-secondary/10",
    iconColor: "text-secondary",
  },
];

export function HowItWorksPage() {
  return (
    <div className="min-h-screen pb-24 pt-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="from-primary/10 via-background to-background absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))]"></div>
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex justify-center">
            <span className="border-primary/20 bg-primary/10 text-primary flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium shadow-sm">
              <Zap className="fill-primary h-4 w-4" />
              Lightning Fast Sales
            </span>
          </div>
          <h1 className="mb-6 text-5xl font-black tracking-tight md:text-6xl lg:text-7xl">
            How to secure your{" "}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              Flash Deal
            </span>
          </h1>
          <p className="text-foreground/70 mx-auto max-w-2xl text-lg md:text-xl">
            Welcome to FlashERP! Here is everything you need to know about reserving and buying
            products during our highly competitive flash drops.
          </p>
        </div>
      </div>

      {/* Steps Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="border-border bg-background hover:shadow-primary/10 group relative overflow-hidden rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Number Watermark */}
                <span className="text-foreground/3 group-hover:text-foreground/5 absolute -right-4 -top-8 text-9xl font-black transition-colors duration-300">
                  {index + 1}
                </span>

                <div
                  className={`mb-6 inline-flex rounded-2xl p-4 transition-transform duration-300 group-hover:scale-110 ${step.bg}`}
                >
                  <Icon className={`h-8 w-8 ${step.iconColor}`} />
                </div>

                <h3 className="mb-4 text-2xl font-bold">{step.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{step.description}</p>

                {/* Bottom decorative gradient line */}
                <div
                  className={`bg-linear-to-r absolute bottom-0 left-0 h-1.5 w-0 ${step.color} transition-all duration-500 group-hover:w-full`}
                ></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="mx-auto mt-32 max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="border-border bg-foreground/2 overflow-hidden rounded-3xl border p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex items-start gap-4">
              <div className="bg-secondary/10 rounded-xl p-3">
                <Clock className="text-secondary h-6 w-6" />
              </div>
              <div>
                <h4 className="mb-2 font-bold">10-Minute Window</h4>
                <p className="text-foreground/70 text-sm">
                  Once reserved, you have exactly 10 minutes to complete checkout. The timer
                  doesn&apos;t stop!
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 rounded-xl p-3">
                <CreditCard className="text-primary h-6 w-6" />
              </div>
              <div>
                <h4 className="mb-2 font-bold">Seamless Payment</h4>
                <p className="text-foreground/70 text-sm">
                  Ensure your payment methods are ready. Stock is only guaranteed after successful
                  payment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
