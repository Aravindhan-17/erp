import { Metadata } from "next";
import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Box,
  Eye,
  FileText,
  Plus,
  ShoppingCart,
  Tag,
  Users,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Vendor Admin Dashboard — FlashERP",
  description: "Real-time flash deal monitoring, inventory locks, and financial ledgers.",
};

const stats = [
  {
    title: "TOTAL REVENUE",
    value: "₹35,30,000",
    change: "+12.4% vs last week",
    icon: BarChart3,
    type: "success",
  },
  {
    title: "TODAY'S SALES",
    value: "₹2,14,500",
    change: "+6.1% vs yesterday",
    icon: ShoppingCart,
    type: "success",
  },
  {
    title: "FLASH DEAL REVENUE",
    value: "₹35,30,000",
    change: "+12.4% vs last week",
    icon: Zap,
    type: "success",
  },
  {
    title: "ACTIVE DEALS",
    value: "1",
    change: "3 upcoming",
    icon: Tag,
    type: "neutral",
  },
  {
    title: "PENDING ORDERS",
    value: "1",
    change: "Needs payment confirmation",
    icon: FileText,
    type: "danger",
  },
  {
    title: "REGISTERED USERS",
    value: "4,079",
    change: "+284 today",
    icon: Users,
    type: "success",
  },
  {
    title: "LIVE VISITORS",
    value: "1,284",
    change: "Right now",
    icon: Eye,
    type: "neutral",
  },
  {
    title: "LOW STOCK PRODUCTS",
    value: "3",
    change: "of 13 total",
    icon: Box,
    type: "danger",
  },
];

const revenue = [
  { day: "Mon", value: 42 },
  { day: "Tue", value: 58 },
  { day: "Wed", value: 49 },
  { day: "Thu", value: 71 },
  { day: "Fri", value: 66 },
  { day: "Sat", value: 88 },
  { day: "Sun", value: 74 },
];

const orders = [
  {
    id: "#ORD-12568",
    customer: "Rahul Sharma",
    deal: "Summer Electronics Flash Sale",
    amount: "₹12,499",
    status: "Paid",
    time: "2 min ago",
  },
  {
    id: "#ORD-12567",
    customer: "Priya Nair",
    deal: "Monsoon Electronics Sale",
    amount: "₹8,999",
    status: "Pending",
    time: "8 min ago",
  },
  {
    id: "#ORD-12566",
    customer: "Arjun Mehta",
    deal: "Fashion Weekend Flash",
    amount: "₹6,249",
    status: "Paid",
    time: "15 min ago",
  },
  {
    id: "#ORD-12565",
    customer: "Sneha Iyer",
    deal: "Summer Electronics Flash Sale",
    amount: "₹15,999",
    status: "Paid",
    time: "18 min ago",
  },
  {
    id: "#ORD-12564",
    customer: "Vikram Singh",
    deal: "Monsoon Electronics Sale",
    amount: "₹9,499",
    status: "Pending",
    time: "25 min ago",
  },
];

const activeDeals = [
  {
    title: "Monsoon Electronics Sale",
    registered: "1,842 registered",
    orders: "611 orders",
    status: "LIVE NOW",
    statusClass: "bg-emerald-50 text-emerald-600",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=150&q=80",
  },
  {
    title: "Fashion Weekend Flash",
    registered: "963 registered",
    orders: "0 orders",
    status: "STARTING SOON",
    statusClass: "bg-orange-50 text-orange-500",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=150&q=80",
  },
];

const products = [
  {
    rank: "1.",
    name: "Noise Cancelling Headphones",
    sold: "512 sold",
    growth: "+12.4%",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80",
  },
  {
    rank: "2.",
    name: "Smart Watch Series 8",
    sold: "398 sold",
    growth: "+8.7%",
    image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=100&q=80",
  },
  {
    rank: "3.",
    name: "Wireless Earbuds Pro",
    sold: "365 sold",
    growth: "+5.3%",
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=100&q=80",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="w-full min-w-0 space-y-5 sm:space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Dashboard
          </h1>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            Real-time overview of platform performance.
          </p>
        </div>

        <button
          type="button"
          className="
            bg-primary
            hover:bg-primary-hover
            shadow-primary/20
            shadow-primary/20
            inline-flex
            w-fit items-center
            gap-2
            rounded-xl
            px-4
            py-2.5
            text-sm
            font-semibold text-white
            shadow-md
            transition
            hover:-translate-y-0.5 hover:shadow-md
          "
        >
          <Plus size={18} />
          Create new deal
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="
                group
                rounded-2xl
                border
                border-gray-100
                bg-white
                p-5
                shadow-[0_2px_12px_rgba(30,20,80,0.04)]
                transition
                duration-200
                hover:-translate-y-0.5
                hover:shadow-[0_8px_25px_rgba(30,20,80,0.07)]
              "
            >
              <div className="flex items-center gap-4">
                <div
                  className={`
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full

                    ${
                      stat.type === "danger"
                        ? "bg-red-50 text-red-500"
                        : "bg-primary/10 text-primary"
                    }
                  `}
                >
                  <Icon size={21} strokeWidth={2} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-[10px] font-semibold tracking-wide text-gray-400 sm:text-[11px]">
                    {stat.title}
                  </p>

                  <p className="mt-1 text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
                    {stat.value}
                  </p>
                </div>
              </div>

              <p
                className={`
                  mt-3
                  text-xs
                  font-medium

                  ${
                    stat.type === "success"
                      ? "text-emerald-500"
                      : stat.type === "danger"
                        ? "text-red-500"
                        : "text-gray-400"
                  }
                `}
              >
                {stat.change}
              </p>
            </div>
          );
        })}
      </div>

      {/* CHART + ACTIVE DEALS */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.7fr_1fr]">
        <div className="min-w-0 rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_2px_12px_rgba(30,20,80,0.04)] sm:p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900">Revenue — last 7 days</h2>

            <button
              type="button"
              className="flex items-center gap-1 text-xs font-semibold text-primary"
            >
              Export
              <ArrowDown size={14} />
            </button>
          </div>

          <div className="mt-7">
            <div className="h-55 flex items-end gap-2 sm:gap-5">
              {/* Y axis */}
              <div className="flex h-full w-8 shrink-0 flex-col justify-between pb-7 text-[10px] text-gray-400">
                <span>₹100k</span>
                <span>₹75k</span>
                <span>₹50k</span>
                <span>₹25k</span>
                <span>₹0</span>
              </div>

              {/* Bars */}
              <div className="flex h-full min-w-0 flex-1 items-end justify-between gap-1 sm:gap-4">
                {revenue.map((item) => (
                  <div
                    key={item.day}
                    className="flex h-full min-w-0 flex-1 flex-col items-center justify-end"
                  >
                    <span className="mb-2 text-[10px] font-medium text-gray-500">
                      ₹{item.value}k
                    </span>

                    <div
                      className="
                        max-w-14.5
                        bg-linear-to-t
                        from-primary/20
                        to-primary w-full rounded-t-md
                      "
                      style={{
                        height: `${(item.value / 100) * 155}px`,
                      }}
                    />

                    <span className="mt-2 text-[10px] text-gray-500">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Active Deals */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_2px_12px_rgba(30,20,80,0.04)] sm:p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900">Active flash deals</h2>

            <button
              type="button"
              className="flex items-center gap-1 text-xs font-semibold text-primary"
            >
              Manage
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="mt-5 divide-y divide-gray-100">
            {activeDeals.map((deal) => (
              <div key={deal.title} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={deal.image}
                    alt={deal.title}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-gray-900">{deal.title}</h3>

                  <p className="mt-1 text-xs text-gray-500">
                    {deal.registered} · {deal.orders}
                  </p>
                </div>

                <span
                  className={`
                    shrink-0
                    rounded-full
                    px-3
                    py-1.5
                    text-[10px]
                    font-bold
                    ${deal.statusClass}
                  `}
                >
                  {deal.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RECENT ORDERS + RIGHT SIDEBAR */}

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.7fr_1fr]">
        {/* Recent Orders */}
        <div className="min-w-0 overflow-hidden  rounded-2xl border border-gray-100 bg-white shadow-[0_2px_12px_rgba(30,20,80,0.04)]">
          <div className="flex items-center justify-between p-5 sm:p-6">
            <h2 className="text-base font-bold text-gray-900">Recent orders</h2>

            <button
              type="button"
              className="flex items-center gap-1 text-xs font-semibold text-primary"
            >
              View all
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Responsive table wrapper */}
          <div className="hide-scrollbar overflow-x-auto">
            <table className="min-w-175 w-full text-left">
              <thead>
                <tr className="border-y border-gray-100 bg-gray-50/70">
                  <th className="px-5 py-3 text-[12px] font-semibold text-gray-400">ORDER ID</th>

                  <th className="px-5 py-3 text-[12px] font-semibold text-gray-400">CUSTOMER</th>

                  <th className="px-5 py-3 text-[12px] font-semibold text-gray-400">DEAL</th>

                  <th className="px-5 py-3 text-[12px] font-semibold text-gray-400">AMOUNT</th>

                  <th className="px-5 py-3 text-[12px] font-semibold text-gray-400">STATUS</th>

                  <th className="px-5 py-3 text-[12px] font-semibold text-gray-400">TIME</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50"
                  >
                    <td className="whitespace-nowrap px-5 py-3.5 text-xs font-medium text-gray-600">
                      {order.id}
                    </td>

                    <td className="whitespace-nowrap px-5 py-3.5 text-xs text-gray-700">
                      {order.customer}
                    </td>

                    <td className="whitespace-nowrap px-5 py-3.5 text-xs text-gray-600">
                      {order.deal}
                    </td>

                    <td className="whitespace-nowrap px-5 py-3.5 text-xs font-semibold text-gray-800">
                      {order.amount}
                    </td>

                    <td className="px-5 py-3.5">
                      <span
                        className={`
                          rounded-full
                          px-2.5
                          py-1
                          text-[10px]
                          font-semibold
                          ${
                            order.status === "Paid"
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-orange-50 text-orange-500"
                          }
                        `}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-5 py-3.5 text-xs text-gray-500">
                      {order.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Cards */}
        <div className="space-y-5">
          {/* Low Stock */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_2px_12px_rgba(30,20,80,0.04)]">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900">Low stock alerts</h2>

              <button
                type="button"
                className="flex items-center gap-1 text-xs font-semibold text-primary"
              >
                View all
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-50">
                <Image
                  src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=120&q=80"
                  alt="FlexBook 14"
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-semibold text-gray-900">
                  FlexBook 14&quot; Ultraslim Laptop
                </h3>

                <p className="mt-1 text-xs text-gray-500">SKU: FLB-014</p>
              </div>

              <span className="shrink-0 rounded-full bg-orange-50 px-3 py-1.5 text-[10px] font-bold text-orange-500">
                1 left
              </span>
            </div>
          </div>

          {/* Top Selling Products */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_2px_12px_rgba(30,20,80,0.04)]">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900">Top selling products</h2>

              <button
                type="button"
                className="flex items-center gap-1 text-xs font-semibold text-primary"
              >
                View all
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="mt-4 divide-y divide-gray-100">
              {products.map((product) => (
                <div
                  key={product.rank}
                  className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-gray-900">
                      {product.rank} {product.name}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">{product.sold}</p>
                  </div>

                  <span className="text-xs font-semibold text-emerald-500">{product.growth}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          DEMO GUIDE
      ========================================================= */}
      <button
        type="button"
        className="
          fixed
          bottom-5
          right-5
          z-30
          flex
          items-center
          gap-2
          rounded-full
          bg-[#172033]
          px-4
          py-3
          text-xs
          font-semibold
          text-white
          shadow-xl
          transition
          hover:-translate-y-0.5
          hover:bg-[#111827]
        "
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/50 text-[10px]">
          ?
        </span>
        Demo guide
      </button>
    </div>
  );
}
