import { Eye, Pencil } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "B2C Orders & Invoices — FlashERP Admin",
};
const tabs = ["All", "Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"];

const statusClass = (status: string) => {
  switch (status) {
    case "LIVE NOW":
      return "bg-emerald-50 text-emerald-600";

    case "UPCOMING":
      return "bg-violet-50 text-violet-600";

    case "ENDED":
      return "bg-gray-100 text-gray-500";

    case "DRAFT":
      return "bg-gray-100 text-gray-500";

    default:
      return "bg-gray-100 text-gray-500";
  }
};

const orders = [
  {
    id: "FD-88192",
    customer: "Aarav Ramesh",
    deal: "Office Essentials Clearance",
    products: "ErgoFlex Mesh Office Chair",
    value: "₹5,999",
    payment: "Paid",
    status: "Delivered",
    date: "02 Aug, 16:20",
  },
  {
    id: "FD-88231",
    customer: "Meera Iyer",
    deal: "Monsoon Electronics Sale",
    products: "UltraSound TV",
    value: "₹52,999",
    payment: "Paid",
    status: "Confirmed",
    date: "20 Jul, 11:42",
  },
  {
    id: "FD-88230",
    customer: "Rohan Das",
    deal: "Monsoon Electronics Sale",
    products: "AirPure Headphones ×2",
    value: "₹10,998",
    payment: "Paid",
    status: "Shipped",
    date: "20 Jul, 11:20",
  },
  {
    id: "FD-88229",
    customer: "Priya Nair",
    deal: "Office Essentials Clearance",
    products: "ErgoFlex Chair",
    value: "₹5,999",
    payment: "Paid",
    status: "Delivered",
    date: "19 Jul, 18:05",
  },
  {
    id: "FD-88228",
    customer: "Kabir Sen",
    deal: "Monsoon Electronics Sale",
    products: "FlexBook Laptop",
    value: "₹41,999",
    payment: "Pending",
    status: "Payment Pending",
    date: "20 Jul, 12:01",
  },
  {
    id: "FD-88227",
    customer: "Ananya Rao",
    deal: "Office Essentials Clearance",
    products: "Badminton Set ×2",
    value: "₹3,398",
    payment: "Paid",
    status: "Cancelled",
    date: "19 Jul, 15:33",
  },
  {
    id: "FD-88226",
    customer: "Vikram Shah",
    deal: "Monsoon Electronics Sale",
    products: "AirPure Headphones",
    value: "₹5,499",
    payment: "Refunded",
    status: "Refunded",
    date: "19 Jul, 09:14",
  },
  {
    id: "FD-88225",
    customer: "Divya Menon",
    deal: "Office Essentials Clearance",
    products: "ErgoFlex Chair, Racket Set",
    value: "₹7,698",
    payment: "Paid",
    status: "Processing",
    date: "19 Jul, 08:52",
  },
];


export default function OrdersPage() {
  return (
    <div className="min-w-0 overflow-x-hidden font-poppins">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Orders
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            All flash deal orders across the platform.
          </p>
        </div>
        
    {/* TABS */}
      <div className="mt-7 flex items-center gap-1 overflow-x-auto pb-1 scrollbar-hide">

        {tabs.map((tab, index) => (
          <button
            key={tab}
            type="button"
            className={`
              shrink-0
              rounded-xl
              px-5
              py-2.5
              text-sm
              font-semibold
              transition
              ${
                index === 0
                  ? "bg-white text-gray-900 shadow-sm ring-1 ring-gray-100"
                  : "text-gray-500 hover:bg-white hover:text-gray-900"
              }
            `}
          >
            {tab}
          </button>
        ))}

      </div>


         <div
        className="
          mt-6
          w-full
          overflow-hidden
          rounded-2xl
          border
          border-gray-100
          bg-white
          shadow-[0_4px_20px_rgba(30,20,80,0.04)]
        "
      >
        <div className="max-h-[600px] w-full overflow-x-auto overflow-y-auto hide-scrollbar">
          <table className="w-full min-w-[1200px] border-collapse">

            {/* Column widths */}
            <colgroup>
              <col className="w-[305px]" />
              <col className="w-[135px]" />
              <col className="w-[105px]" />
              <col className="w-[110px]" />
              <col className="w-[110px]" />
              <col className="w-[110px]" />
              <col className="w-[190px]" />
              <col className="w-[135px]" />
              <col className="w-[100px]" />
            </colgroup>

            {/* ================= TABLE HEADER ================= */}
            <thead className="sticky top-0 z-10 bg-white">
  <tr className="border-b border-gray-100">
    <th className="px-4 py-4 text-left text-[12px] font-bold uppercase tracking-wide text-gray-400">
      Order ID
    </th>

    <th className="px-4 py-4 text-left text-[12px] font-bold uppercase tracking-wide text-gray-400">
      Customer
    </th>

    <th className="px-4 py-4 text-left text-[12px] font-bold uppercase tracking-wide text-gray-400">
      Deal
    </th>

    <th className="px-4 py-4 text-left text-[12px] font-bold uppercase tracking-wide text-gray-400">
      Products
    </th>

    <th className="px-4 py-4 text-left text-[12px] font-bold uppercase tracking-wide text-gray-400">
      Value
    </th>

    <th className="px-4 py-4 text-left text-[12px] font-bold uppercase tracking-wide text-gray-400">
      Payment
    </th>

    <th className="px-4 py-4 text-left text-[12px] font-bold uppercase tracking-wide text-gray-400">
      Status
    </th>

    <th className="px-4 py-4 text-left text-[12px] font-bold uppercase tracking-wide text-gray-400">
      Date
    </th>

    <th className="px-4 py-4 text-center text-[12px] font-bold uppercase tracking-wide text-gray-400">
      Actions
    </th>
  </tr>
</thead>

            {/* ================= TABLE BODY ================= */}
            <tbody>
  {orders.map((order) => (
    <tr
      key={order.id}
      className="border-b border-gray-100 transition-colors hover:bg-violet-50/60"
    >
      {/* ORDER ID */}
      <td className="px-4 py-4">
        <span className="whitespace-nowrap text-sm font-bold text-gray-800">
          {order.id}
        </span>
      </td>

      {/* CUSTOMER */}
      <td className="px-4 py-4">
        <span className="whitespace-nowrap text-sm font-medium text-gray-700">
          {order.customer}
        </span>
      </td>

      {/* DEAL */}
      <td className="px-4 py-4">
        <span className="whitespace-nowrap text-sm font-medium text-gray-700">
          {order.deal}
        </span>
      </td>

      {/* PRODUCTS */}
      <td className="px-4 py-4">
        <span className="whitespace-nowrap text-xs font-medium text-gray-400">
          {order.products}
        </span>
      </td>

      {/* VALUE */}
      <td className="px-4 py-4">
        <span className="whitespace-nowrap text-sm font-semibold text-gray-800">
          {order.value}
        </span>
      </td>

      {/* PAYMENT */}
      <td className="px-4 py-4">
        <span className="whitespace-nowrap text-sm font-medium text-gray-700">
          {order.payment}
        </span>
      </td>

      {/* STATUS */}
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
              order.status === "Delivered"
                ? "bg-emerald-50 text-emerald-600"
                : order.status === "Confirmed" ||
                    order.status === "Shipped" ||
                    order.status === "Processing"
                  ? "bg-violet-50 text-violet-600"
                  : order.status === "Payment Pending"
                    ? "bg-amber-50 text-amber-600"
                    : "bg-red-50 text-red-500"
            }
          `}
        >
          {order.status}
        </span>
      </td>

      {/* DATE */}
      <td className="px-4 py-4">
        <span className="whitespace-nowrap text-xs font-medium text-gray-400">
          {order.date}
        </span>
      </td>

      {/* ACTION */}
      <td className="px-4 py-4">
        <div className="flex justify-center">
          <button
            type="button"
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
              text-gray-600
              shadow-sm
              transition-all
              hover:border-violet-200
              hover:bg-violet-50
              hover:text-violet-600
            "
          >
            {/* Eye icon */}
            <Eye size={15}/>
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
