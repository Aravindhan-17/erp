"use client";

import {
  Users,
  CreditCard,
  Eye,
  TrendingUp,
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useMemo, useState } from "react";


const registrations = [
  {
    id: "REG-24081",
    customer: "Aarav Ramesh",
    email: "aarav@example.com",
    deal: "Fashion Weekend Flash",
    fee: "₹1",
    payment: "Paid",
    access: "Unused",
    registeredAt: "04 Aug, 12:12",
  },
  {
    id: "REG-24080",
    customer: "Meera Iyer",
    email: "meera@example.com",
    deal: "Monsoon Electronics Sale",
    fee: "₹1",
    payment: "Paid",
    access: "Access used",
    registeredAt: "04 Aug, 11:58",
  },
  {
    id: "REG-24079",
    customer: "Rohan Das",
    email: "rohan@example.com",
    deal: "Monsoon Electronics Sale",
    fee: "₹1",
    payment: "Paid",
    access: "Access used",
    registeredAt: "04 Aug, 11:44",
  },
  {
    id: "REG-24078",
    customer: "Priya Nair",
    email: "priya@example.com",
    deal: "Nordic Living Furniture Drop",
    fee: "₹1",
    payment: "Paid",
    access: "Unused",
    registeredAt: "04 Aug, 10:32",
  },
  {
    id: "REG-24077",
    customer: "Kabir Sen",
    email: "kabir@example.com",
    deal: "Monsoon Electronics Sale",
    fee: "₹1",
    payment: "Refunded",
    access: "Revoked",
    registeredAt: "04 Aug, 09:48",
  },
  {
    id: "REG-24076",
    customer: "Ananya Rao",
    email: "ananya@example.com",
    deal: "Beauty Box Blitz",
    fee: "₹1",
    payment: "Paid",
    access: "Unused",
    registeredAt: "03 Aug, 19:04",
  },
];

export default function RegistrationsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filteredRegistrations = useMemo(() => {
    return registrations.filter((item) => {
      const matchesSearch =
        item.customer.toLowerCase().includes(search.toLowerCase()) ||
        item.deal.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase());

      const matchesTab =
        activeTab === "All" ||
        (activeTab === "Paid" && item.payment === "Paid") ||
        (activeTab === "Refunded" && item.payment === "Refunded") ||
        (activeTab === "Access used" && item.access === "Access used");

      return matchesSearch && matchesTab;
    });
  }, [activeTab, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRegistrations.length / 6)
  );

  const currentPage = Math.min(page, totalPages);

  const currentRegistrations = filteredRegistrations.slice(
    (currentPage - 1) * 6,
    currentPage * 6
  );

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setPage(1);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="min-w-0 overflow-x-hidden bg-transparent font-poppins">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Registrations
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Customer access passes and ₹1 registration payment records.
          </p>
        </div>

        {/* Export */}
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

      {/* ================= STAT CARDS ================= */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total registrations */}
        <div
          className="
            flex
            min-h-27.5
            items-center
            justify-between
            rounded-2xl
            border
            border-gray-100
            bg-white
            px-5
            py-5
            shadow-[0_4px_20px_rgba(30,20,80,0.04)]
          "
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
              Total registrations
            </p>

            <p className="mt-3 text-3xl font-semibold text-gray-900">
              6
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50">
            <Users className="bg-[#f0ebff] text-[#6030e8]" size={22} />
          </div>
        </div>

        {/* Paid access */}
        <div
          className="
            flex
            min-h-27.5
            items-center
            justify-between
            rounded-2xl
            border
            border-gray-100
            bg-white
            px-5
            py-5
            shadow-[0_4px_20px_rgba(30,20,80,0.04)]
          "
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
              Paid access passes
            </p>

            <p className="mt-3 text-3xl font-semibold text-gray-900">
              5
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50">
            <CreditCard className="bg-[#f0ebff] text-[#6030e8]" size={22} />
          </div>
        </div>

        {/* Revenue */}
        <div
          className="
            flex
            min-h-27.5
            items-center
            justify-between
            rounded-2xl
            border
            border-gray-100
            bg-white
            px-5
            py-5
            shadow-[0_4px_20px_rgba(30,20,80,0.04)]
          "
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
              Registration revenue
            </p>

            <p className="mt-3 text-3xl font-semibold text-gray-900">
              ₹5
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50">
            <Eye className="bg-[#f0ebff] text-[#6030e8]" size={22} />
          </div>
        </div>

        {/* Converted */}
        <div
          className="
            flex
            min-h-27.5
            items-center
            justify-between
            rounded-2xl
            border
            border-gray-100
            bg-white
            px-5
            py-5
            shadow-[0_4px_20px_rgba(30,20,80,0.04)]
          "
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
              Access converted
            </p>

            <p className="mt-3 text-3xl font-semibold text-gray-900">
              2
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50">
            <TrendingUp className="bg-[#f0ebff] text-[#6030e8]" size={22} />
          </div>
        </div>
      </div>

      {/* ================= FILTERS ================= */}
      <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Tabs */}
        <div className="flex gap-1 w-fit max-w-full overflow-x-auto rounded-xl bg-transparent hide-scrollbar">
          {["All", "Paid", "Refunded", "Access used"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => handleTabChange(tab)}
              className={`
                whitespace-nowrap
                rounded-xl
                px-5
                py-2.5
                text-sm
                font-semibold
                transition-all
                ${
                  activeTab === tab
                    ? "bg-white text-gray-900 shadow-sm ring-1 ring-gray-100"
                  : "text-gray-500 hover:bg-white hover:text-gray-900"
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div
          className="
            flex
            w-full
            items-center
            gap-2
            rounded-xl
            border
            border-gray-200
            bg-white
            px-4
            py-2.5
            shadow-sm
            lg:w-85
          "
        >
          <Search size={17} className="shrink-0 text-gray-400" />

          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search customer or deal..."
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
          <table className="w-full min-w-262.5 border-collapse">
            {/* TABLE HEADER */}
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-5 py-4 text-left text-[12px] font-semibold uppercase tracking-wide text-gray-400">
                  Registration
                </th>

                <th className="px-5 py-4 text-left text-[12px] font-semibold uppercase tracking-wide text-gray-400">
                  Customer
                </th>

                <th className="px-5 py-4 text-left text-[12px] font-semibold uppercase tracking-wide text-gray-400">
                  Deal
                </th>

                <th className="px-5 py-4 text-left text-[12px] font-semibold uppercase tracking-wide text-gray-400">
                  Fee
                </th>

                <th className="px-5 py-4 text-left text-[12px] font-semibold uppercase tracking-wide text-gray-400">
                  Payment
                </th>

                <th className="px-5 py-4 text-left text-[12px] font-semibold uppercase tracking-wide text-gray-400">
                  Access
                </th>

                <th className="px-5 py-4 text-left text-[12px] font-semibold uppercase tracking-wide text-gray-400">
                  Registered at
                </th>

                <th className="px-5 py-4 text-center text-[12px] font-semibold uppercase tracking-wide text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>
              {currentRegistrations.length > 0 ? (
                currentRegistrations.map((item) => (
                  <tr
                    key={item.id}
                    className="
                      border-b
                      border-gray-100
                      transition-colors
                      hover:bg-violet-50/60
                    "
                  >
                    {/* Registration */}
                    <td className="px-5 py-4">
                      <span className="whitespace-nowrap text-sm font-bold text-gray-800">
                        {item.id}
                      </span>
                    </td>

                    {/* Customer */}
                    <td className="px-5 py-4">
                      <div>
                        <p className="whitespace-nowrap text-sm font-semibold text-gray-800">
                          {item.customer}
                        </p>

                        <p className="mt-0.5 text-xs text-gray-400">
                          {item.email}
                        </p>
                      </div>
                    </td>

                    {/* Deal */}
                    <td className="px-5 py-4">
                      <span className="whitespace-nowrap text-sm font-medium text-gray-700">
                        {item.deal}
                      </span>
                    </td>

                    {/* Fee */}
                    <td className="px-5 py-4">
                      <span className="whitespace-nowrap text-sm font-medium text-gray-700">
                        {item.fee}
                      </span>
                    </td>

                    {/* Payment */}
                    <td className="px-5 py-4">
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
                            item.payment === "Refunded"
                              ? "bg-red-50 text-red-500"
                              : "bg-emerald-50 text-emerald-600"
                          }
                        `}
                      >
                        {item.payment}
                      </span>
                    </td>

                    {/* Access */}
                    <td className="px-5 py-4">
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
                            item.access === "Revoked"
                              ? "bg-red-50 text-red-500"
                              : "bg-violet-50 text-violet-600"
                          }
                        `}
                      >
                        {item.access}
                      </span>
                    </td>

                    {/* Registered at */}
                    <td className="px-5 py-4">
                      <span className="whitespace-nowrap text-xs font-medium text-gray-400">
                        {item.registeredAt}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-5 py-4">
                      <div className="flex justify-center">
                        <button
                          type="button"
                          title={`View ${item.id}`}
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
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="px-5 py-12 text-center text-sm text-gray-400"
                  >
                    No registrations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ================= PAGINATION ================= */}
        <div
          className="
            flex
            flex-col
            gap-3
            border-t
            border-gray-100
            px-5
            py-3
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p className="text-xs text-gray-500">
            Showing{" "}
            {filteredRegistrations.length === 0
              ? 0
              : (currentPage - 1) * 6 + 1}{" "}
            to{" "}
            {Math.min(
              currentPage * 6,
              filteredRegistrations.length
            )}{" "}
            of {filteredRegistrations.length} registrations
          </p>

          <div className="flex items-center gap-2">
            {/* Previous */}
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() =>
                setPage((prev) => Math.max(1, prev - 1))
              }
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                border
                border-gray-200
                bg-white
                text-gray-500
                transition-all
                hover:border-gray-300
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              <ChevronLeft size={16} />
            </button>

            {/* Page number */}
            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                onClick={() => setPage(pageNumber)}
                className={`
                  flex
                  h-8
                  min-w-8
                  items-center
                  justify-center
                  rounded-lg
                  px-2
                  text-xs
                  font-semibold
                  transition-all
                  ${
                    currentPage === pageNumber
                      ? "bg-linear-to-r from-[#6631e8] to-[#5120d3] text-xs font-semibold text-white shadow-[0_5px_15px_rgba(91,33,216,0.25)]"
                      : "border border-gray-200 bg-white text-gray-600 hover:border-primary/30 hover:text-primary"
                  }
                `}
              >
                {pageNumber}
              </button>
            ))}

            {/* Next */}
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() =>
                setPage((prev) =>
                  Math.min(totalPages, prev + 1)
                )
              }
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                border
                border-gray-200
                bg-white
                text-gray-500
                transition-all
                hover:border-gray-300
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}