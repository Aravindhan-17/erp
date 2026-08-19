import { Metadata } from "next";
import { Eye, Search, ChevronDown, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Customers — FlashERP Admin",
};

const customers = [
  {
    id: 1,
    name: "Aarav Ramesh",
    email: "aarav@example.com",
    phone: "+91 98765 43210",
    segment: "Active",
    registrations: 1,
    orders: 1,
    spend: "₹5,999",
    activity: "04 Aug, 12:12",
    status: "Active",
  },
  {
    id: 2,
    name: "Meera Iyer",
    email: "meera@example.com",
    phone: "+91 98401 11220",
    segment: "VIP",
    registrations: 1,
    orders: 1,
    spend: "₹52,999",
    activity: "04 Aug, 11:58",
    status: "Active",
  },
  {
    id: 3,
    name: "Rohan Das",
    email: "rohan@example.com",
    phone: "+91 99030 88441",
    segment: "VIP",
    registrations: 1,
    orders: 1,
    spend: "₹10,998",
    activity: "04 Aug, 11:44",
    status: "Active",
  },
  {
    id: 4,
    name: "Priya Nair",
    email: "priya@example.com",
    phone: "+91 98470 33121",
    segment: "Active",
    registrations: 1,
    orders: 1,
    spend: "₹5,999",
    activity: "04 Aug, 10:32",
    status: "Active",
  },
  {
    id: 5,
    name: "Kabir Sen",
    email: "kabir@example.com",
    phone: "+91 98300 11882",
    segment: "Active",
    registrations: 1,
    orders: 1,
    spend: "₹0",
    activity: "04 Aug, 09:48",
    status: "Review",
  },
  {
    id: 6,
    name: "Ananya Rao",
    email: "ananya@example.com",
    phone: "+91 98860 44210",
    segment: "New",
    registrations: 1,
    orders: 1,
    spend: "₹3,398",
    activity: "03 Aug, 19:04",
    status: "Active",
  },
];

export default function CustomersPage() {
  return (
    <div className="min-w-0 overflow-x-hidden font-poppins">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Customers
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Customer profiles, participation, spend and risk signals.
          </p>
        </div>

        <button
          type="button"
          className="
            flex
            w-fit
            items-center
            gap-2
            rounded-xl
            border
            border-gray-200
            bg-white
            px-4
            py-2.5
            text-sm
            font-semibold
            text-gray-800
            shadow-sm
            transition-all
            hover:border-gray-300
            hover:shadow
          "
        >
          <span>Export CSV</span>
          <Download size={16} />
        </button>

      </div>


      {/* ================= FILTERS ================= */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">

        {/* Search */}
        <div
          className="
            flex
            h-12
            w-full
            items-center
            gap-3
            rounded-xl
            border
            border-gray-200
            bg-white
            px-4
            shadow-sm
            sm:max-w-[330px]
          "
        >
          <Search
            size={18}
            className="shrink-0 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search name, email or phone..."
            className="
              w-full
              bg-transparent
              text-sm
              text-gray-700
              outline-none
              placeholder:text-gray-400
            "
          />
        </div>


        {/* Segment */}
        <div className="relative w-full sm:w-[165px]">
  <select
    defaultValue="all"
    className="
      h-12
      w-full
      appearance-none
      rounded-xl
      border
      border-gray-200
      bg-white
      px-4
      pr-10
      text-sm
      font-medium
      text-gray-700
      shadow-sm
      outline-none
      transition
      hover:border-gray-300
      focus:border-primary
      focus:ring-2
      focus:ring-primary/10
    "
  >
    <option value="all">All segments</option>
    <option value="active">Active</option>
    <option value="vip">VIP</option>
    <option value="new">New</option>
  </select>

  <ChevronDown
    size={17}
    className="
      pointer-events-none
      absolute
      right-4
      top-1/2
      -translate-y-1/2
      text-gray-500
    "
  />
</div>

      </div>


      {/* ================= TABLE ================= */}
      <div
        className="
          mt-5
          w-full
          overflow-hidden
          rounded-2xl
          border
          border-gray-100
          bg-white
          shadow-[0_4px_20px_rgba(30,20,80,0.04)]
        "
      >

        {/* Horizontal scroll */}
        <div className="w-full overflow-x-auto hide-scrollbar">

          <table className="w-full min-w-[1100px] border-collapse">

            {/* ================= TABLE HEADER ================= */}
            <thead>

              <tr className="border-b border-gray-100">

                <th
                  className="
                    w-[240px]
                    px-5
                    py-4
                    text-left
                    text-[12px]
                    font-semibold
                    uppercase
                    tracking-wide
                    text-gray-400
                  "
                >
                  Customer
                </th>

                <th className="px-4 py-4 text-left text-[12px] font-semibold uppercase tracking-wide text-gray-400">
                  Segment
                </th>

                <th className="px-4 py-4 text-center text-[12px] font-semibold uppercase tracking-wide text-gray-400">
                  Registrations
                </th>

                <th className="px-4 py-4 text-center text-[12px] font-semibold uppercase tracking-wide text-gray-400">
                  Orders
                </th>

                <th className="px-4 py-4 text-left text-[12px] font-semibold uppercase tracking-wide text-gray-400">
                  Total Spend
                </th>

                <th className="px-4 py-4 text-left text-[12px] font-semibold uppercase tracking-wide text-gray-400">
                  Last Activity
                </th>

                <th className="px-4 py-4 text-left text-[12px] font-semibold uppercase tracking-wide text-gray-400">
                  Status
                </th>

                <th className="px-4 py-4 text-center text-[12px] font-semibold uppercase tracking-wide text-gray-400">
                  Actions
                </th>

              </tr>

            </thead>


            {/* ================= TABLE BODY ================= */}
            <tbody>

              {customers.map((customer) => (

                <tr
                  key={customer.id}
                  className="
                    border-b
                    border-gray-100
                    transition-colors
                    hover:bg-violet-50/60
                  "
                >

                  {/* Customer */}
                  <td className="px-5 py-4">

                    <div className="min-w-[210px]">

                      <p className="text-sm font-semibold text-gray-800">
                        {customer.name}
                      </p>

                      <p className="mt-0.5 text-xs text-gray-400">
                        {customer.email}
                      </p>

                      <p className="mt-0.5 text-xs text-gray-400">
                        {customer.phone}
                      </p>

                    </div>

                  </td>


                  {/* Segment */}
                  <td className="px-4 py-4">

                    <span
                      className={`
                        inline-flex
                        whitespace-nowrap
                        rounded-full
                        px-3
                        py-1.5
                        text-[12px]
                        font-semibold
                        ${
                          customer.segment === "VIP"
                            ? "bg-amber-50 text-amber-600"
                            : customer.segment === "New"
                              ? "bg-violet-50 text-violet-600"
                              : "bg-violet-50 text-violet-600"
                        }
                      `}
                    >
                      {customer.segment}
                    </span>

                  </td>


                  {/* Registrations */}
                  <td className="px-4 py-4 text-center">

                    <span className="text-sm font-medium text-gray-700">
                      {customer.registrations}
                    </span>

                  </td>


                  {/* Orders */}
                  <td className="px-4 py-4 text-center">

                    <span className="text-sm font-medium text-gray-700">
                      {customer.orders}
                    </span>

                  </td>


                  {/* Total Spend */}
                  <td className="px-4 py-4">

                    <span className="whitespace-nowrap text-sm font-medium text-gray-700">
                      {customer.spend}
                    </span>

                  </td>


                  {/* Last Activity */}
                  <td className="px-4 py-4">

                    <span className="whitespace-nowrap text-xs font-medium text-gray-400">
                      {customer.activity}
                    </span>

                  </td>


                  {/* Status */}
                  <td className="px-4 py-4">

                    <span
                      className={`
                        inline-flex
                        whitespace-nowrap
                        rounded-full
                        px-3
                        py-1.5
                        text-[12px]
                        font-semibold
                        ${
                          customer.status === "Review"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-emerald-50 text-emerald-600"
                        }
                      `}
                    >
                      {customer.status}
                    </span>

                  </td>


                  {/* Action */}
                  <td className="px-4 py-4">

                    <div className="flex justify-center">

                      <button
                        type="button"
                        title="View customer"
                        className="
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-lg
                          border
                          border-gray-100
                          bg-white
                          text-gray-700
                          shadow-sm
                          transition-all
                          hover:border-violet-200
                          hover:bg-violet-50
                          hover:text-violet-600
                        "
                      >
                        <Eye size={16} />

                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}