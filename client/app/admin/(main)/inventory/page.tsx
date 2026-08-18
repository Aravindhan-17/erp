import { Metadata } from "next";
import { ChevronDown, Pencil } from "lucide-react";

export const metadata: Metadata = {
  title: "Inventory & POs — FlashERP Admin",
};

const inventoryItems = [
  {
    id: 1,
    product: 'UltraSound 65" 4K Smart TV',
    sku: "ELEC-TV-065",
    onHand: 14,
    reserved: 4,
    available: 10,
    alertAt: 8,
    status: "Partially reserved",
  },
  {
    id: 2,
    product: "AirPure Noise-Cancel Headphones",
    sku: "ELEC-HP-021",
    onHand: 32,
    reserved: 12,
    available: 20,
    alertAt: 20,
    status: "Low stock",
  },
  {
    id: 3,
    product: 'FlexBook 14" Ultraslim Laptop',
    sku: "ELEC-LP-014",
    onHand: 4,
    reserved: 3,
    available: 1,
    alertAt: 5,
    status: "Low stock",
  },
  {
    id: 4,
    product: "ChillMax 260L Frost-Free Fridge",
    sku: "APP-FR-260",
    onHand: 9,
    reserved: 2,
    available: 7,
    alertAt: 5,
    status: "Partially reserved",
  },
  {
    id: 5,
    product: "SpinPro 8kg Front-Load Washer",
    sku: "APP-WM-008",
    onHand: 2,
    reserved: 1,
    available: 1,
    alertAt: 4,
    status: "Low stock",
  },
  {
    id: 6,
    product: "Linen Weekend Shirt (Pack of 2)",
    sku: "FSH-SH-102",
    onHand: 60,
    reserved: 18,
    available: 42,
    alertAt: 30,
    status: "Partially reserved",
  },
  {
    id: 7,
    product: "StrideFit Running Sneakers",
    sku: "FSH-SN-045",
    onHand: 29,
    reserved: 9,
    available: 20,
    alertAt: 15,
    status: "Partially reserved",
  },
  {
    id: 8,
    product: "Nordic Oak 3-Seater Sofa",
    sku: "FUR-SF-301",
    onHand: 6,
    reserved: 1,
    available: 5,
    alertAt: 3,
    status: "Partially reserved",
  },
  {
    id: 9,
    product: "Study Desk with Storage",
    sku: "FUR-DS-118",
    onHand: 23,
    reserved: 2,
    available: 21,
    alertAt: 8,
    status: "Partially reserved",
  },
  {
    id: 10,
    product: "GlowLab Vitamin C Serum Kit",
    sku: "BEA-SK-009",
    onHand: 53,
    reserved: 14,
    available: 39,
    alertAt: 25,
    status: "Partially reserved",
  },
];

export default function InventoryPage() {
  return (
    <div className="min-w-0 overflow-x-hidden font-poppins">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Inventory management
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            On-hand, reserved and available stock across all products.
          </p>
        </div>

{/* Category Dropdown */}
<div className="relative w-full sm:w-[180px]">
  <select
    defaultValue="Electronics"
    className="
      w-full
      appearance-none
      rounded-xl
      border
      border-gray-200
      bg-white
      px-4
      py-3
      pr-10
      text-sm
      font-medium
      text-gray-600
      shadow-sm
      outline-none
      transition-all
      hover:border-gray-300
      focus:border-primary
      focus:ring-2
      focus:ring-primary/10
    "
  >
    <option value="Electronics">Electronics</option>
    <option value="Home Appliances">Home Appliances</option>
    <option value="Fashion">Fashion</option>
    <option value="Furniture">Furniture</option>
    <option value="Beauty">Beauty</option>
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
              <tr className="border-b border-gray-200">

                <th
                  className="
                    px-4
                    py-4
                    text-left
                    text-[12px]
                    font-bold
                    uppercase
                    tracking-wide
                    text-gray-400
                  "
                >
                  Product
                </th>

                <th
                  className="
                    px-3
                    py-4
                    text-left
                    text-[12px]
                    font-bold
                    uppercase
                    tracking-wide
                    text-gray-400
                  "
                >
                  SKU
                </th>

                <th
                  className="
                    px-3
                    py-4
                    text-left
                    text-[12px]
                    font-bold
                    uppercase
                    tracking-wide
                    text-gray-400
                  "
                >
                  On Hand
                </th>

                <th
                  className="
                    px-3
                    py-4
                    text-left
                    text-[12px]
                    font-bold
                    uppercase
                    tracking-wide
                    text-gray-400
                  "
                >
                  Reserved
                </th>

                <th
                  className="
                    px-3
                    py-4
                    text-left
                    text-[12px]
                    font-bold
                    uppercase
                    tracking-wide
                    text-gray-400
                  "
                >
                  Available
                </th>

                <th
                  className="
                    px-3
                    py-4
                    text-left
                    text-[12px]
                    font-bold
                    uppercase
                    tracking-wide
                    text-gray-400
                  "
                >
                  Alert At
                </th>

                <th
                  className="
                    px-3
                    py-4
                    text-left
                    text-[12px]
                    font-bold
                    uppercase
                    tracking-wide
                    text-gray-400
                  "
                >
                  Status
                </th>

                <th
                  className="
                    px-3
                    py-4
                    text-left
                    text-[12px]
                    font-bold
                    uppercase
                    tracking-wide
                    text-gray-400
                  "
                >
                  Last Updated
                </th>

                <th
                  className="
                    px-3
                    py-4
                    text-center
                    text-[12px]
                    font-bold
                    uppercase
                    tracking-wide
                    text-gray-400
                  "
                >
                  Actions
                </th>

              </tr>
            </thead>

            {/* ================= TABLE BODY ================= */}
            <tbody>
              {inventoryItems.map((item) => (
                <tr
                  key={item.id}
                  className="
                    border-b
                    border-gray-100
                    transition-colors
                    hover:bg-violet-50/60
                  "
                >

                  {/* PRODUCT */}
                  <td className="px-4 py-3 sm:px-6">
                    <p className="text-sm font-semibold text-gray-800">
                      {item.product}
                    </p>
                  </td>

                  {/* SKU */}
                  <td className="px-3 py-3">
                    <span className="whitespace-nowrap text-xs font-medium text-gray-600">
                      {item.sku}
                    </span>
                  </td>

                  {/* ON HAND */}
                  <td className="px-3 py-3">
                    <span className="text-sm font-medium text-gray-700">
                      {item.onHand}
                    </span>
                  </td>

                  {/* RESERVED */}
                  <td className="px-3 py-3">
                    <span className="text-sm font-medium text-gray-700">
                      {item.reserved}
                    </span>
                  </td>

                  {/* AVAILABLE */}
                  <td className="px-3 py-3">
                    <span
                      className={`text-sm font-medium ${
                        item.available <= item.alertAt
                          ? "text-red-500"
                          : "text-gray-700"
                      }`}
                    >
                      {item.available}
                    </span>
                  </td>

                  {/* ALERT AT */}
                  <td className="px-3 py-3">
                    <span className="text-sm font-medium text-gray-700">
                      {item.alertAt}
                    </span>
                  </td>

                  {/* STATUS */}
                  <td className="px-3 py-3">
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
                          item.status === "Low stock"
                            ? "bg-red-50 text-red-500"
                            : "bg-violet-50 text-violet-600"
                        }
                      `}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* LAST UPDATED */}
                  <td className="px-3 py-3">
                    <span className="whitespace-nowrap text-xs font-medium text-gray-400">
                      Just now
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="px-3 py-3">
                    <div className="flex justify-center">
                      <button
                        type="button"
                        title="Edit inventory"
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
                        <Pencil size={15} />
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