import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Deal Monitor — FlashERP Admin",
};

const stats = [
  {
    value: "00:00:00",
    label: "TIME REMAINING",
  },
  {
    value: "1,842",
    label: "REGISTERED",
  },
  {
    value: "1,284",
    label: "LIVE VISITORS",
  },
  {
    value: "135",
    label: "PRODUCTS SOLD",
  },
  {
    value: "611",
    label: "ORDERS PLACED",
  },
  {
    value: "33.2%",
    label: "CONVERSION RATE",
  },
];

const products = [
  {
    name: 'UltraSound 65" 4K Smart TV',
    opening: "40",
    sold: "26",
    reserved: "4",
    available: "10",
    status: "In stock",
    orders: "16",
    revenue: "₹13,77,974",
  },
  {
    name: "AirPure Noise-Cancel Headphones",
    opening: "120",
    sold: "88",
    reserved: "12",
    available: "20",
    status: "Low stock",
    orders: "53",
    revenue: "₹4,83,912",
  },
  {
    name: 'FlexBook 14" Ultraslim Laptop',
    opening: "25",
    sold: "21",
    reserved: "3",
    available: "1",
    status: "Low stock",
    orders: "13",
    revenue: "₹8,81,979",
  },
];

const activities = [
  {
    type: "success",
    text: "Rohan Das placed order FD-88230 · ₹10,998",
    time: "2s ago",
  },
  {
    type: "purple",
    text: "Cart reserved — AirPure Headphones ×2 (Meera Iyer)",
    time: "18s ago",
  },
  {
    type: "warning",
    text: "New registration for Monsoon Electronics Sale",
    time: "40s ago",
  },
  {
    type: "danger",
    text: "Cart expired — 1 UltraSound TV returned to inventory",
    time: "1m ago",
  },
  {
    type: "gray",
    text: "FlexBook Laptop stock updated — 25 units available",
    time: "2m ago",
  },
  {
    type: "success",
    text: "Kabir Sen placed order FD-88228 · ₹41,999",
    time: "3m ago",
  },
  {
    type: "warning",
    text: "New registration for Monsoon Electronics Sale",
    time: "3m ago",
  },
  {
    type: "purple",
    text: "Cart reserved — UltraSound TV ×1",
    time: "4m ago",
  },
  {
    type: "success",
    text: "Priya Sharma placed order FD-88221 · ₹28,499",
    time: "5m ago",
  },
];

const activityDot: Record<string, string> = {
  success: "bg-emerald-500",
  purple: "bg-primary",
  warning: "bg-amber-500",
  danger: "bg-red-500",
  gray: "bg-slate-400",
};

export default function MonitorPage() {
  return (
    <div className="min-w-0 overflow-x-hidden font-poppins">

      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Live deal monitor
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Real-time performance of the currently live flash deal.
          </p>
        </div>

        {/* LIVE BADGE */}
        <div
          className="
            inline-flex
            w-fit
            items-center
            gap-2
            rounded-full
            border
            border-emerald-100
            bg-emerald-50
            px-4
            py-2
            text-xs
            font-semibold
            text-emerald-600
          "
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>

          LIVE — Monsoon Electronics Sale
        </div>

      </div>


      {/* STAT CARDS */}
      <div
        className="
          mt-7
          grid
          grid-cols-2
          gap-3
          sm:grid-cols-3
          lg:grid-cols-6
        "
      >

        {stats.map((stat) => (
          <div
            key={stat.label}
            className="
              rounded-2xl
              border
              border-gray-100
              bg-white
              px-4
              py-5
              text-center
              shadow-[0_3px_15px_rgba(30,20,80,0.035)]
              transition
              hover:-translate-y-0.5
              hover:shadow-[0_7px_20px_rgba(30,20,80,0.06)]
            "
          >
            <p className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
              {stat.value}
            </p>

            <p className="mt-2 text-[12px] font-semibold uppercase tracking-wide text-gray-400">
              {stat.label}
            </p>
          </div>
        ))}

      </div>


      {/* MAIN CONTENT */}
      <div
        className="
          mt-5
          grid
          grid-cols-1
          gap-4
          xl:grid-cols-[1.45fr_1fr]
        "
      >

        {/* PRODUCT INVENTORY */}
        <section
          className="
            min-w-0
            overflow-hidden
            rounded-2xl
            border
            border-gray-100
            bg-white
            shadow-[0_3px_15px_rgba(30,20,80,0.035)]
          "
        >

          <div className="px-5 pb-3 pt-5 sm:px-7">

            <h2 className="text-base font-bold text-gray-900 sm:text-lg">
              Product-level inventory
            </h2>

          </div>


          {/* Table */}
          <div className="w-full overflow-x-auto hide-scrollbar">

            <table className="w-full min-w-180 border-collapse">

              <thead>

                <tr className="border-b border-gray-100">

                  <th className="w-52.5 px-5 py-3 text-left text-[12px] font-bold uppercase tracking-wide text-gray-400 sm:px-7">
                    Product
                  </th>

                  <th className="px-3 py-3 text-center text-[12px] font-bold uppercase tracking-wide text-gray-400">
                    Opening
                  </th>

                  <th className="px-3 py-3 text-center text-[12px] font-bold uppercase tracking-wide text-gray-400">
                    Sold
                  </th>

                  <th className="px-3 py-3 text-center text-[12px] font-bold uppercase tracking-wide text-gray-400">
                    Reserved
                  </th>

                  <th className="px-3 py-3 text-center text-[12px] font-bold uppercase tracking-wide text-gray-400">
                    Available
                  </th>

                  <th className="px-3 py-3 text-center text-[12px] font-bold uppercase tracking-wide text-gray-400">
                    Status
                  </th>

                  <th className="px-3 py-3 text-center text-[12px] font-bold uppercase tracking-wide text-gray-400">
                    Orders
                  </th>

                  <th className="px-5 py-3 text-right text-[12px] font-bold uppercase tracking-wide text-gray-400 sm:px-7">
                    Revenue
                  </th>

                </tr>

              </thead>


              <tbody>

                {products.map((product) => (
                  <tr
                    key={product.name}
                    className="
                      border-b
                      border-gray-100
                      last:border-b-0
                      transition
                      hover:bg-primary/5
                    "
                  >

                    {/* Product */}
                    <td className="px-5 py-3 sm:px-5">

                      <p className="max-w-50 text-xs font-bold leading-5 text-gray-800">
                        {product.name}
                      </p>

                    </td>


                    {/* Opening */}
                    <td className="px-3 py-5 text-center text-xs font-medium text-gray-700">
                      {product.opening}
                    </td>


                    {/* Sold */}
                    <td className="px-3 py-5 text-center text-xs font-medium text-gray-700">
                      {product.sold}
                    </td>


                    {/* Reserved */}
                    <td className="px-3 py-5 text-center text-xs font-medium text-gray-700">
                      {product.reserved}
                    </td>


                    {/* Available */}
                    <td className="px-3 py-5 text-center text-xs font-medium text-gray-700">
                      {product.available}
                    </td>


                    {/* Status */}
                    <td className="px-3 py-5 text-center">

                      <span
                        className={`
                          inline-flex
                          whitespace-nowrap
                          rounded-full
                          px-3
                          py-1.5
                          text-[11px]
                          font-semibold
                          ${
                            product.status === "In stock"
                              ? "bg-emerald-50 text-emerald-600 font-semibold"
                              : "bg-red-50 text-red-500 font-semibold"
                          }
                        `}
                      >
                        {product.status}
                      </span>

                    </td>


                    {/* Orders */}
                    <td className="px-3 py-5 text-center text-xs font-medium text-gray-700">
                      {product.orders}
                    </td>


                    {/* Revenue */}
                    <td className="px-5 py-5 text-right text-xs font-semibold text-gray-800 sm:px-7">
                      {product.revenue}
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </section>


        {/* LIVE ACTIVITY FEED */}
        <section
          className="
            min-w-0
            overflow-hidden
            rounded-2xl
            border
            border-gray-100
            bg-white
            shadow-[0_3px_15px_rgba(30,20,80,0.035)]
          "
        >

          {/* Header */}
          <div className="flex items-center justify-between px-5 pb-3 pt-5 sm:px-6">

            <h2 className="text-base font-bold text-gray-900 sm:text-lg">
              Live activity feed
            </h2>

            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>

          </div>


          {/* Activity List */}
          <div
            className="
              max-h-75
              hide-scrollbar
              overflow-y-auto
              px-5
              pb-3
              sm:px-6
            "
          >

            {activities.map((activity, index) => (
              <div
                key={`${activity.text}-${index}`}
                className="
                  flex
                  gap-3
                  border-b
                  border-gray-100
                  py-3
                  last:border-b-0
                "
              >

                {/* Dot */}
                <div className="pt-1.5">

                  <span
                    className={`
                      block
                      h-2.5
                      w-2.5
                      rounded-full
                      ${activityDot[activity.type]}
                    `}
                  />

                </div>


                {/* Content */}
                <div className="min-w-0">

                  <p className="text-xs font-medium leading-5 text-gray-800">
                    {activity.text}
                  </p>

                  <p className="mt-0.5 text-[11px] text-gray-400">
                    {activity.time}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </section>

      </div>

    </div>
  );
}