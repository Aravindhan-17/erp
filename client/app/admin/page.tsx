import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vendor Admin Dashboard — FlashERP",
  description: "Real-time flash deal monitoring, inventory locks, and financial ledgers.",
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Live Operations & Analytics</h1>
          <p className="text-xs text-foreground/70">Real-time WebSocket monitoring for active flash deal #101</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-secondary text-white text-xs font-bold rounded-xl shadow hover:bg-secondary-hover transition-colors">
            + Schedule New Flash Deal
          </button>
        </div>
      </div>

      {/* Real-time KPI Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-background p-5 rounded-2xl border border-border shadow-sm space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-foreground/60">
            Active Cart Holds (Redis)
          </span>
          <div className="text-3xl font-black text-primary">253</div>
          <p className="text-[11px] text-emerald-600 font-semibold">↑ 10-Min TTL locks active</p>
        </div>

        <div className="bg-background p-5 rounded-2xl border border-border shadow-sm space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-foreground/60">
            ₹1 Registrations Paid
          </span>
          <div className="text-3xl font-black text-foreground">1,480</div>
          <p className="text-[11px] text-foreground/60 font-semibold">₹1,480 pre-sale revenue</p>
        </div>

        <div className="bg-background p-5 rounded-2xl border border-border shadow-sm space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-foreground/60">
            Completed Orders
          </span>
          <div className="text-3xl font-black text-secondary">198</div>
          <p className="text-[11px] text-emerald-600 font-semibold">100% GST invoices generated</p>
        </div>

        <div className="bg-background p-5 rounded-2xl border border-border shadow-sm space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-foreground/60">
            Gross Flash Revenue
          </span>
          <div className="text-3xl font-black text-foreground">₹2,45,800</div>
          <p className="text-[11px] font-semibold text-primary">Target: ₹3,00,000</p>
        </div>
      </div>

      {/* Stock & Processing Table */}
      <div className="bg-background rounded-2xl border border-border p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg">Active Flash Deal Stock Allocation</h3>
          <span className="text-xs font-semibold text-foreground/60">Live WebSocket Feed</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted text-foreground/80 font-bold uppercase tracking-wider border-b border-border">
              <tr>
                <th className="p-3">Product SKU</th>
                <th className="p-3">Total Allocated</th>
                <th className="p-3">Reserved (Redis)</th>
                <th className="p-3">Purchased (DB)</th>
                <th className="p-3">Available Stock</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-medium">
              <tr>
                <td className="p-3 font-mono">SKU-SMARTPHONE-PRO</td>
                <td className="p-3">50</td>
                <td className="p-3 text-secondary font-bold">48</td>
                <td className="p-3">0</td>
                <td className="p-3 font-bold">2</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded bg-secondary/10 text-secondary font-bold">
                    CRITICAL LOW
                  </span>
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono">SKU-EARBUDS-ANC</td>
                <td className="p-3">100</td>
                <td className="p-3 text-primary font-bold">85</td>
                <td className="p-3">10</td>
                <td className="p-3 font-bold">15</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-bold">
                    SELLING FAST
                  </span>
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono">SKU-WATCH-ULTRA</td>
                <td className="p-3">150</td>
                <td className="p-3 text-primary font-bold">120</td>
                <td className="p-3">25</td>
                <td className="p-3 font-bold">30</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-bold">
                    ACTIVE
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
