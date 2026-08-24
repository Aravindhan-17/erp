import { Metadata } from "next";
import {
  Wallet,
  Users,
  ShoppingCart,
  TrendingUp,
  BarChart3,
  ShoppingBag,
  Timer,
  CalendarDays,
  Download,
  ArrowUpRight,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Ledgers & GST Reports — FlashERP Admin",
};

const topProducts = [
  {
    name: "Linen Weekend Shirt (Pack of 2)",
    sold: "140 sold",
  },
  {
    name: "GlowLab Vitamin C Serum Kit",
    sold: "97 sold",
  },
  {
    name: "AirPure Noise-Cancel Headphones",
    sold: "88 sold",
  },
  {
    name: "StrideFit Running Sneakers",
    sold: "61 sold",
  },
  {
    name: "TimeKeeper Chrono Watch",
    sold: "41 sold",
  },
];

const stats = [
  {
    title: "FLASH DEAL REVENUE",
    value: "₹35,30,000",
    growth: "18.6%",
    icon: Wallet,
  },
  {
    title: "REGISTRATION REVENUE",
    value: "₹4,079",
    growth: "8.3%",
    icon: Users,
  },
  {
    title: "ORDER VOLUME",
    value: "8",
    growth: "14.3%",
    icon: ShoppingCart,
  },
  {
    title: "AVG. CONVERSION RATE",
    value: "32.4%",
    growth: "6.7%",
    icon: TrendingUp,
  },
];

export default function FinancePage() {
  return (
    <div className="min-w-0 overflow-x-hidden font-poppins">

      {/* HEADER */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Reports
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Flash deal performance across revenue, conversion and inventory.
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">

         {/* Date Dropdown */}
<button
  type="button"
  className="
    flex
    h-11
    w-full
    items-center
    gap-2
    rounded-xl
    border
    border-gray-200
    bg-white
    px-4
    text-sm
    font-medium
    text-gray-600
    shadow-sm
    transition
    hover:border-gray-300
    sm:w-[170px]
  "
>
  <CalendarDays
    size={17}
    className="text-primary"
  />

  <span>Last 7 days</span>

  <ChevronDown
    size={16}
    className="ml-auto text-gray-400"
  />
</button>

          {/* Export */}
          <button
            type="button"
            className="
              flex
              h-11
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-gray-200
              bg-white
              px-5
              text-sm
              font-semibold
              text-gray-800
              shadow-sm
              transition
              hover:border-gray-300
              hover:bg-gray-50
              sm:w-auto
            "
          >
            <span>Export report</span>

            <Download size={16} />
          </button>

        </div>

      </div>


      {/* STAT CARDS */}
      <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="
                rounded-2xl
                border
                border-gray-100
                bg-white
                p-5
                shadow-[0_4px_20px_rgba(30,20,80,0.04)]
                sm:p-6
                transition 
                duration-200   
                hover:-translate-y-0.5   
                hover:shadow-[0_8px_25px_rgba(30,20,80,0.07)] 
              "
            >

              <div className="flex items-start justify-between gap-4">

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-400">
                    {stat.title}
                  </p>

                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                    {stat.value}
                  </h2>
                </div>

                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#f0ebff] text-[#6030e8]
                  "
                >
                  <Icon size={23} />
                </div>

              </div>

              <div className="mt-5 flex items-center gap-1.5 text-sm">

                <ArrowUpRight
                  size={17}
                  className="text-emerald-500"
                />

                <span className="font-semibold text-emerald-500">
                  {stat.growth}
                </span>

                <span className="text-gray-500">
                  vs previous 7 days
                </span>

              </div>

            </div>
          );
        })}

      </div>


      {/* MAIN REPORT CARDS */}
      <div className="mt-7 grid grid-cols-1 gap-5 xl:grid-cols-3">


        {/* REVENUE BY DEAL */}
        <div
          className="
            rounded-2xl
            border
            border-gray-100
            bg-white
            p-5
            shadow-[0_4px_20px_rgba(30,20,80,0.04)]
            sm:p-6
          "
        >

          {/* Card Header */}
          <div className="flex  items-center justify-between">

            <h2 className="text-base font-bold text-gray-900">
              Revenue by deal
            </h2>

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-[#f0ebff] text-[#6030e8]
              "
            >
              <BarChart3 size={21} />
            </div>

          </div>


          {/* Donut + Details */}
          <div className="min-h-[200px] mt-8 flex flex-col items-center gap-6 sm:flex-row">

            {/* Donut */}
            <div
              className="
                relative
                flex
                h-34
                w-34
                shrink-0
                items-center
                justify-center
                rounded-full
              "
              style={{
                background:
                  "conic-gradient(#5b2be0 0deg 218deg, #e65aad 218deg 360deg)",
              }}
            >

              <div
                className="
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                "
              >
                <span className="text-xs font-medium text-gray-400">
                  Revenue
                </span>
              </div>

            </div>


            {/* Revenue Details */}
            <div className="w-full space-y-6">

              <div className="flex items-start gap-3">

                <span className="mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full bg-[#5b2be0]" />

                <div className="min-w-0">

                  <p className="text-sm font-medium text-gray-800">
                    Monsoon Electronics Sale
                  </p>

                  <div className="mt-1 flex items-center justify-between gap-4">

                    <span className="text-sm font-semibold text-gray-900">
                      ₹21,48,000
                    </span>

                    <span className="text-xs text-gray-400">
                      60.6%
                    </span>

                  </div>

                </div>

              </div>


              <div className="flex items-start gap-3">

                <span className="mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full bg-pink-400" />

                <div className="min-w-0">

                  <p className="text-sm font-medium text-gray-800">
                    Office Essentials Clearance
                  </p>

                  <div className="mt-1 flex items-center justify-between gap-4">

                    <span className="text-sm font-semibold text-gray-900">
                      ₹13,82,000
                    </span>

                    <span className="text-xs text-gray-400">
                      39.4%
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* Total Revenue */}
          <div
            className="
              mt-8
              flex
              items-center
              justify-between
              border-t
              border-gray-100
              pt-5
            "
          >
            <span className="text-sm font-medium text-primary">
              Total Revenue
            </span>

            <span className="text-lg font-semibold text-primary">
              ₹35,30,000
            </span>
          </div>

        </div>


        {/* TOP SELLING PRODUCTS */}
        <div
          className="
            rounded-2xl
            border
            border-gray-100
            bg-white
            p-5
            shadow-[0_4px_20px_rgba(30,20,80,0.04)]
            sm:p-6
          "
        >

          {/* Header */}
          <div className="flex items-center justify-between">

            <h2 className="text-base font-bold text-gray-900">
              Top-selling products
            </h2>

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-[#f0ebff] text-[#6030e8]
              "
            >
              <ShoppingBag size={21} />
            </div>

          </div>


          {/* Products */}
          <div className="mt-4">

            {topProducts.map((product) => (

              <div
                key={product.name}
                className="
                  flex
                  items-center
                  gap-3
                  border-b
                  border-gray-100
                  py-3.5
                  last:border-b-0
                "
              >
                <p className="min-w-0 flex-1 truncate text-sm text-gray-700">
                  {product.name}
                </p>


                <span className="shrink-0 text-sm font-semibold text-primary">
                  {product.sold}
                </span>

              </div>

            ))}

          </div>


          {/* View Products */}
          <button
            type="button"
            className="
              mt-4
              flex
              h-11
              w-full
              items-center
              justify-between
              gap-2
              px-5
              rounded-xl
              border
              border-gray-200
              bg-white
              text-sm
              font-medium
              text-primary
              transition
              hover:bg-primary/5
            "
          >
            <span>View all products</span>

            <ChevronRight size={17} />

          </button>

        </div>


        {/* CART EXPIRY RATE */}
        <div
          className="
            rounded-2xl
            border
            border-gray-100
            bg-white
            p-5
            shadow-[0_4px_20px_rgba(30,20,80,0.04)]
            sm:p-6
          "
        >

          {/* Header */}
          <div className="flex items-center justify-between">

            <h2 className="text-base font-bold text-gray-900">
              Cart expiry rate
            </h2>

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-[#f0ebff] text-[#6030e8]
              "
            >
              <Timer size={21} />
            </div>

          </div>


          {/* Percentage */}
          <div
            className="
              flex
              min-h-[275px]
              flex-col
              items-center
              justify-center
              text-center
            "
          >

            <p className="text-4xl font-semibold text-red-500 sm:text-5xl">
              14.2%
            </p>

            <p className="mt-5 max-w-[330px] text-[13px] leading-6 text-gray-500">
              of reserved carts expired unpaid in the last 7 days,
              releasing stock back to deal inventory.
            </p>

          </div>


          {/* Insights */}
          <button
            type="button"
            className="
              flex
              h-11
              w-full
              items-center
              justify-between
              rounded-xl
              border
              border-gray-200
              bg-white
              px-4
              text-sm
              font-medium
              text-primary
              transition
              hover:bg-primary/5
            "
          >
            <span>View cart insights</span>

            <ChevronRight size={17} />

          </button>

        </div>

      </div>

    </div>
  );
}