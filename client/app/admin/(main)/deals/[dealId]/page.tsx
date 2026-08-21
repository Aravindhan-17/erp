"use client";

import {
  CalendarDays,
  Clock3,
  Monitor,
  Smartphone,
  X,
  Plus,
  Image as ImageIcon,
} from "lucide-react";
import { useState } from "react";

type PreviewMode = "desktop" | "mobile";

const products = [
  {
    id: 1,
    name: 'UltraSound 65" 4K Smart TV',
    price: "₹52,999",
    image: "/assets/products/tv.jpg",
  },
  {
    id: 2,
    name: "AirPure Noise-Cancel Headphones",
    price: "₹5,499",
    image: "/assets/products/headphones.jpg",
  },
  {
    id: 3,
    name: 'FlexBook 14" Ultraslim Laptop',
    price: "₹41,999",
    image: "/assets/products/laptop.jpg",
  },
  {
    id: 4,
    name: "ChillMax 260L Frost-Free Fridge",
    price: "₹22,499",
    image: "/assets/products/fridge.jpg",
  },
  {
    id: 5,
    name: "SpinPro 8kg Front-Load Washer",
    price: "₹18,999",
    image: "/assets/products/washing-machine.jpg",
  },
  {
    id: 6,
    name: "Linen Weekend Shirt (Pack of 2)",
    price: "₹999",
    image: "/assets/products/shirt.jpg",
  },
];

export default function CreateDealPage() {
  const [previewMode, setPreviewMode] =
    useState<PreviewMode>("mobile");

  const [selectedProducts, setSelectedProducts] = useState([
    products[0],
    products[1],
  ]);

  const [dealTitle, setDealTitle] = useState("");
  const [dealSubtitle, setDealSubtitle] = useState("");

  const toggleProduct = (product: (typeof products)[number]) => {
    const exists = selectedProducts.some(
      (item) => item.id === product.id
    );

    if (exists) {
      setSelectedProducts((current) =>
        current.filter((item) => item.id !== product.id)
      );
    } else {
      setSelectedProducts((current) => [
        ...current,
        product,
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f8fc] font-poppins text-gray-900">
      {/* PAGE HEADER */}
      <div className="mb-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Create new flash deal
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            The right panel updates instantly to match the
            customer experience.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="
              rounded-xl
              border
              border-gray-200
              bg-white
              px-5
              py-2.5
              text-sm
              font-semibold
              text-gray-700
              shadow-sm
              transition
              hover:border-gray-300
            "
          >
            Cancel
          </button>

          <button
            type="button"
            className="
              rounded-xl
              bg-gradient-to-r
              from-[#6631e8]
              to-[#5120d3]
              px-5
              py-2.5
              text-sm
              font-bold
              text-white
              shadow-[0_8px_20px_rgba(102,49,232,0.25)]
              transition
              hover:opacity-90
            "
          >
            Save deal
          </button>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(360px,0.85fr)]">
        {/* LEFT FORM */}
        <div className="space-y-3">
          {/* DEAL INFORMATION */}
          <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-3">
              <h2 className="text-lg font-bold text-gray-800">
                Deal information
              </h2>

              <p className="text-sm text-gray-500">
                Basic details shown across the storefront.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {/* Deal title */}
              <InputField
                label="Deal title"
                placeholder="Enter deal title"
                value={dealTitle}
                onChange={setDealTitle}
              />

              {/* Deal subtitle */}
              <InputField
                label="Deal subtitle"
                placeholder="Enter short subtitle"
                value={dealSubtitle}
                onChange={setDealSubtitle}
              />

              {/* Banner URL */}
              <div className="md:col-span-2">
                <InputField
                  label="Deal banner image URL"
                  placeholder="assets/deal_home.jpg"
                />
              </div>

              {/* Start date */}
              <InputField
                label="Start date & time"
                type="datetime-local"
                defaultValue="2026-08-20T16:19"
              />

              {/* End date */}
              <InputField
                label="End date & time"
                type="datetime-local"
                defaultValue="2026-08-20T17:19"
              />

              {/* Registration fee */}
              <InputField
                label="Registration fee (₹)"
                defaultValue="1"
              />

              {/* Reservation */}
              <InputField
                label="Cart reservation (minutes)"
                defaultValue="10"
              />

              {/* Minimum order */}
              <InputField
                label="Minimum order value (₹)"
                defaultValue="5000"
              />

              {/* Minimum products */}
              <InputField
                label="Minimum number of products"
                defaultValue="2"
              />
            </div>
          </section>

          {/* TERMS */}
          <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-3">
              <h2 className="text-lg font-bold text-gray-800">
                Terms shown to shoppers
              </h2>

              <p className="text-sm text-gray-500">
                Eligibility, purchase requirements, reservation &
                cancellation policy.
              </p>
            </div>

            <textarea
              defaultValue="Minimum order value of ₹5,000, or 2 products totalling ₹5,000, is required. Cart items are reserved for 10 minutes. Unpaid reservations return to stock automatically. Registration fee is non-refundable."
              rows={3}
              className="
                w-full
                resize-none
                rounded-lg
                border
                border-gray-200
                bg-gray-50
                px-3
                py-2.5
                text-xs
                font-semibold
                text-gray-700
                outline-none
                transition
                focus:border-violet-400
                focus:ring-2
                focus:ring-violet-100
              "
            />
          </section>

          {/* PRODUCT SELECTION */}
          <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-3">
              <h2 className="text-lg font-bold text-gray-800">
                Product selection
              </h2>

              <p className="text-sm text-gray-500">
                Pick products from the catalog to include in this
                deal.
              </p>
            </div>

            {/* Selected products */}
            <div>
              <p className="mb-1.5 text-[14px] font-bold text-gray-700">
                Selected products ({selectedProducts.length})
              </p>

              <div className="space-y-1.5">
                {selectedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="
                      flex
                      items-center
                      justify-between
                      rounded-lg
                      border
                      border-gray-200
                      bg-white
                      px-2
                      py-1.5
                    "
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-gray-100">
                        <ImageIcon
                          size={14}
                          className="text-gray-400"
                        />
                      </div>

                      <span className="truncate text-xs font-semibold text-gray-700">
                        {product.name}
                      </span>
                    </div>

                    <div className="ml-3 flex shrink-0 items-center gap-3">
                      <span className="text-xs font-bold text-gray-700">
                        {product.price}
                      </span>

                      <button
                        type="button"
                        onClick={() => toggleProduct(product)}
                        className="
                          flex
                          h-7
                          w-7
                          items-center
                          justify-center
                          rounded-md
                          bg-red-50
                          text-red-500
                          transition
                          hover:bg-red-100
                        "
                      >
                        <X size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          {/* SCHEDULE */}
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-50 bg-gray-50/50 px-6 py-4 flex items-center gap-2">
              <Calendar size={18} className="text-gray-400" />
              <h2 className="text-base font-semibold text-gray-800">Schedule Configuration</h2>
            </div>
            <div className="space-y-6 px-6 py-6">

              {/* Registration Window */}
              <div className="rounded-xl border border-gray-100 p-4 bg-gray-50/30">
                <div className="mb-4 flex items-center gap-2">
                  <Clock size={16} className="text-violet-500" />
                  <h3 className="text-sm font-semibold text-gray-800">Registration Window</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500">Starts</label>
                    <input
                      type="datetime-local"
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-violet-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500">Ends</label>
                    <input
                      type="datetime-local"
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-violet-500"
                    />
                  </div>
                </div>
            {/* Catalog */}
            <div className="mt-4">
              <p className="mb-1.5 text-[14px] font-bold text-gray-700">
                Add from catalog
              </p>

              <div className="max-h-[220px] overflow-y-auto rounded-lg border border-gray-100">
                {products.map((product) => {
                  const selected = selectedProducts.some(
                    (item) => item.id === product.id
                  );

                  return (
                    <div
                      key={product.id}
                      className="
                        flex
                        items-center
                        justify-between
                        border-b
                        border-gray-100
                        px-2
                        py-1.5
                        last:border-b-0
                      "
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-gray-100">
                          <ImageIcon
                            size={14}
                            className="text-gray-400"
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-gray-700">
                            {product.name}
                          </p>

                          <p className="text-[10px] text-gray-400">
                            {product.price} • Electronics
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        disabled={selected}
                        onClick={() => toggleProduct(product)}
                        className={`
                          flex
                          h-8
                          min-w-[48px]
                          items-center
                          justify-center
                          gap-1
                          rounded-full
                          border
                          px-3
                          text-[10px]
                          font-bold
                          transition
                          ${
                            selected
                              ? "border-gray-100 bg-gray-50 text-gray-300"
                              : "border-violet-100 bg-violet-50 text-violet-600 hover:bg-violet-100"
                          }
                        `}
                      >
                        {selected ? (
                          "Added"
                        ) : (
                          <>
                            <Plus size={12} />
                            Add
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}

              </div>
            </div>
          </section>
        </div>

        {/*  RIGHT PREVIEW */}
        <div className="xl:sticky xl:top-5 xl:self-start">
          {/* Preview tabs */}
          <div
            className="
              mb-4
              flex
              h-11
              overflow-hidden
              rounded-xl
              border
              border-gray-200
              bg-white
              shadow-sm
            "
          >
            <button
              type="button"
              onClick={() => setPreviewMode("desktop")}
              className={`
                flex
                flex-1
                items-center
                justify-center
                gap-2
                text-sm
                font-semibold
                transition
                ${
                  previewMode === "desktop"
                    ? "border-b-2 border-violet-500 text-violet-600"
                    : "text-gray-500 hover:text-gray-700"
                }
              `}
            >
              <Monitor size={15} />
              Desktop preview
            </button>


              {/* Dummy Selected Product */}
              <div className="rounded-xl border border-gray-100 p-3 flex items-start gap-3">
                <div className="h-12 w-12 shrink-0 rounded-lg bg-gray-100 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=120&q=80" alt="Product" className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">UltraSound 65" 4K Smart TV</p>
                  <p className="text-xs text-gray-500">MRP: ₹89,999</p>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-gray-400">Flash Price</label>
                      <input type="text" defaultValue="52999" className="w-full text-xs border border-gray-200 rounded px-2 py-1 mt-0.5 outline-none focus:border-violet-500" />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-gray-400">Allocated</label>
                      <input type="number" defaultValue="40" className="w-full text-xs border border-gray-200 rounded px-2 py-1 mt-0.5 outline-none focus:border-violet-500" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <button
              type="button"
              onClick={() => setPreviewMode("mobile")}
              className={`
                flex
                flex-1
                items-center
                justify-center
                gap-2
                text-sm
                font-semibold
                transition
                ${
                  previewMode === "mobile"
                    ? "border-b-2 border-violet-500 text-violet-600"
                    : "text-gray-500 hover:text-gray-700"
                }
              `}
            >
              <Smartphone size={15} />
              Mobile preview
            </button>
          </div>

          {/* Preview area */}
          <div
            className={`
              flex
              min-h-[650px]
              items-start
              justify-center
              overflow-hidden
              rounded-2xl
              border
              border-gray-200
              bg-[#f4f4f9]
              p-6
              transition-all
              duration-300
              ${
                previewMode === "desktop"
                  ? "items-start"
                  : "items-start"
              }
            `}
          >
            {previewMode === "desktop" ? (
              <DesktopPreview
                title={dealTitle}
                subtitle={dealSubtitle}
                products={selectedProducts}
              />
            ) : (
              <MobilePreview
                title={dealTitle}
                subtitle={dealSubtitle}
                products={selectedProducts}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   INPUT COMPONENT
============================================================ */

function InputField({
  label,
  placeholder,
  value,
  onChange,
  defaultValue,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-[11px] font-bold text-gray-700">
        {label}
      </label>

      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={(e) => onChange?.(e.target.value)}
          className="
            h-9
            w-full
            rounded-lg
            border
            border-gray-200
            bg-white
            px-3
            text-xs
            text-gray-700
            outline-none
            transition
            placeholder:text-gray-400
            focus:border-violet-400
            focus:ring-2
            focus:ring-violet-100
          "
        />

        {type === "datetime-local" && (
          <CalendarDays
            size={14}
            className="
              pointer-events-none
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />
        )}
      </div>
    </div>
  );
}

/* ============================================================
   DESKTOP PREVIEW
============================================================ */

function DesktopPreview({
  title,
  subtitle,
  products,
}: {
  title: string;
  subtitle: string;
  products: {
    id: number;
    name: string;
    price: string;
  }[];
}) {
  return (
    <div
      className="
        w-full
        max-w-[620px]
        overflow-hidden
        rounded-2xl
        bg-white
        shadow-[0_15px_50px_rgba(30,20,80,0.15)]
      "
    >
      {/* Header */}
      <div className="border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400">
              FLASH DEAL
            </p>

            <h2 className="mt-1 text-lg font-extrabold text-gray-900">
              {title || "Untitled deal"}
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              {subtitle || "Limited time offer"}
            </p>
          </div>

          <div className="flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-[10px] font-bold text-yellow-700">
            <Clock3 size={11} />
            STARTING SOON
          </div>
        </div>
      </div>

      {/* Banner */}
      <div className="m-5 flex h-[190px] items-center justify-center rounded-xl bg-gradient-to-br from-[#1794ad] via-[#1d668c] to-[#2d386f]">
        <div className="text-center text-white">
          <p className="text-xs font-bold uppercase tracking-widest opacity-80">
            Home appliances
          </p>

          <p className="mt-2 text-5xl font-extrabold">
            H
          </p>
        </div>
      </div>

      {/* Countdown */}
      <div className="grid grid-cols-3 gap-3 px-5">
        {[
          ["01", "DAY"],
          ["14", "HR"],
          ["32", "MIN"],
        ].map(([number, label]) => (
          <div
            key={label}
            className="
              rounded-xl
              bg-gray-950
              px-3
              py-3
              text-center
              text-white
            "
          >
            <p className="text-xl font-extrabold text-yellow-400">
              {number}
            </p>

            <p className="text-[9px] text-gray-400">
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* Details */}
      <div className="px-5 py-5">
        <div className="grid grid-cols-4 gap-4 border-b border-gray-100 pb-5">
          <PreviewInfo label="REG. FEE" value="₹1" />
          <PreviewInfo label="MIN. ORDER" value="₹5,000" />
          <PreviewInfo label="RESERVATION" value="10 min" />
          <PreviewInfo label="MAX / ITEM" value="3" />
        </div>

        {/* Products */}
        <div className="mt-5">
          <p className="mb-3 text-xs font-bold text-gray-800">
            PRODUCTS ({products.length})
          </p>

          <div className="grid grid-cols-2 gap-3">
            {products.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="rounded-xl border border-gray-200 p-3"
              >
                <div className="flex h-24 items-center justify-center rounded-lg bg-gray-100">
                  <ImageIcon
                    size={28}
                    className="text-gray-400"
                  />
                </div>

                <p className="mt-2 line-clamp-2 text-xs font-bold text-gray-700">
                  {product.name}
                </p>

                <p className="mt-1 text-sm font-extrabold text-violet-600">
                  {product.price}
                </p>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="
            mt-5
            w-full
            rounded-xl
            bg-gradient-to-r
            from-[#6631e8]
            to-[#5120d3]
            py-3
            text-sm
            font-bold
            text-white
            shadow-lg
          "
        >
          Register for ₹1
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   MOBILE PREVIEW
============================================================ */

function MobilePreview({
  title,
  subtitle,
  products,
}: {
  title: string;
  subtitle: string;
  products: {
    id: number;
    name: string;
    price: string;
  }[];
}) {
  return (
    <div
      className="
        w-[290px]
        overflow-hidden
        rounded-[30px]
        border-[7px]
        border-[#17171d]
        bg-white
        shadow-[0_20px_50px_rgba(0,0,0,0.25)]
      "
    >
      {/* Phone top */}
      <div className="flex h-6 items-center justify-center bg-[#17171d]">
        <div className="h-1.5 w-14 rounded-full bg-gray-700" />
      </div>

      {/* App */}
      <div className="bg-white">
        {/* Banner */}
        <div className="p-4">
          <div className="mb-3 inline-flex rounded-full bg-yellow-400 px-3 py-1 text-[8px] font-extrabold text-gray-900">
            ● STARTING SOON
          </div>

          <div className="flex h-[105px] items-center justify-between overflow-hidden rounded-xl bg-gradient-to-br from-[#1596af] via-[#20688c] to-[#283b73] px-4 text-white">
            <div>
              <p className="text-[9px] font-extrabold uppercase leading-tight">
                HOME
                <br />
                APPLIANCES
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-2xl font-extrabold">
              H
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="px-4">
          <h2 className="text-lg font-extrabold text-gray-900">
            {title || "Untitled deal"}
          </h2>

          <p className="mt-1 text-[10px] text-gray-500">
            {subtitle || "Limited time offer"}
          </p>
        </div>

        {/* Countdown */}
        <div className="mt-4 grid grid-cols-3 gap-2 bg-gray-950 px-4 py-3">
          {[
            ["01", "DAY"],
            ["14", "HR"],
            ["32", "MIN"],
          ].map(([number, label]) => (
            <div
              key={label}
              className="text-center"
            >
              <p className="text-lg font-extrabold text-yellow-400">
                {number}
              </p>

              <p className="text-[7px] text-gray-400">
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Deal details */}
        <div className="px-4 py-4">
          <div className="grid grid-cols-2 gap-x-5 gap-y-4">
            <PreviewInfo
              label="REG. FEE"
              value="₹1"
            />

            <PreviewInfo
              label="MIN. ORDER"
              value="₹5,000"
            />

            <PreviewInfo
              label="RESERVATION"
              value="10 min"
            />

            <PreviewInfo
              label="MAX / ITEM"
              value="3"
            />
          </div>

          {/* Products */}
          <div className="mt-5">
            <p className="mb-3 text-xs font-bold text-gray-700">
              PRODUCTS ({products.length})
            </p>

            <div className="grid grid-cols-2 gap-2">
              {products.slice(0, 2).map((product) => (
                <div
                  key={product.id}
                  className="
                    rounded-lg
                    border
                    border-gray-200
                    p-2
                  "
                >
                  <div className="flex h-20 items-center justify-center rounded-md bg-gray-100">
                    <ImageIcon
                      size={23}
                      className="text-gray-400"
                    />
                  </div>

                  <p className="mt-2 line-clamp-2 text-[9px] font-bold leading-tight text-gray-700">
                    {product.name}
                  </p>

                  <p className="mt-1 text-[10px] font-extrabold text-violet-600">
                    {product.price}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Register */}
          <button
            type="button"
            className="
              mt-4
              w-full
              rounded-full
              bg-gradient-to-r
              from-[#6631e8]
              to-[#5120d3]
              py-2.5
              text-xs
              font-extrabold
              text-white
            "
          >
            Register for ₹1
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PREVIEW INFO
============================================================ */

function PreviewInfo({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[8px] font-bold uppercase text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-xs font-extrabold text-gray-800">
        {value}
      </p>
    </div>
  );
}