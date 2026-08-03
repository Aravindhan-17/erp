import { products } from "../lib/product-data";
import { notFound } from "next/navigation";

import { ProductImageCarousel } from "../components/product-image-carousel";
import ProductTabs from "../components/product-tabs";
import {
  Heart,
  Share2,
  ShieldCheck,
  CheckCircle2,
  Truck,
  Boxes,
  Star,
  MessageCircle,
  Clock3,
  CalendarClock,
  BadgeIndianRupee,
  ChevronRight,
  Link as LinkIcon,
  XIcon,
  MapPin,
  RotateCcw,
} from "lucide-react";
import { FeaturesBanner } from "@/app/(storefront)/components/features-banner";
import Link from "next/link";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const product = products.find((item) => item.id.toString() === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="font-poppins relative mx-auto w-full max-w-[1920px] px-4 py-6 md:px-8 xl:px-10">
      {/* Breadcrumb & Actions */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="transition-colors hover:text-black">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link href="/flash-deals" className="transition-colors hover:text-black">
            Flash Deals
          </Link>
          <ChevronRight size={14} />
          <span className="font-semibold text-gray-900">{product.name}</span>
        </nav>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold transition-colors hover:bg-gray-50">
            <Heart size={18} />
            Wishlist
          </button>
          <button className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold transition-colors hover:bg-gray-50">
            <Share2 size={18} />
            Share
          </button>
        </div>
      </div>

      {/* MAIN */}

      <div className="grid grid-cols-12 gap-6 xl:gap-6">
        {/* IMAGE */}
        <div className="col-span-12 lg:col-span-5">
          <ProductImageCarousel images={product.images} title={""} />
        </div>

        {/* CENTER INFO */}
        <div className="col-span-12 lg:col-span-7 xl:col-span-4">
          <span className="text-primary mb-4 inline-block w-fit rounded-md bg-purple-50 px-3 py-1 text-xs font-bold">
            {product.category}
          </span>

          <h1 className="mb-3 text-3xl font-extrabold leading-tight text-gray-900 md:text-4xl">
            {product.name}
          </h1>

          <div className="mb-5 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 rounded-lg bg-green-50 px-3 py-1 text-sm font-bold text-green-600">
              <Star size={14} fill="currentColor" />
              {product.rating}
            </div>

            <span className="text-sm text-gray-500">{product.reviews} Reviews</span>

            <span className="text-gray-300">|</span>

            <span className="text-sm text-gray-500">{product.sold.toLocaleString()}+ sold</span>
          </div>

          <p className="mb-5 text-sm text-gray-500">{product.shortDescription}</p>

          <div className="mb-6 rounded-2xl bg-gray-50 p-5">
            <div className="mb-2 text-sm text-gray-400 line-through">
              ₹{product.originalPrice.toLocaleString()}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
                ₹{product.flashPrice.toLocaleString()}
              </h2>

              <span className="rounded-md bg-red-50 px-2 py-1 text-xs font-bold text-red-500">
                {product.discount}% OFF
              </span>
            </div>

            <p className="mt-2 text-sm font-medium text-green-600">
              You save ₹{product.saveAmount.toLocaleString()}
            </p>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-400">Available Quantity</p>
              <p className="mt-1 font-bold text-gray-900">{product.stock}</p>
            </div>

            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-400">Max Qty</p>
              <p className="mt-1 font-bold text-gray-900">{product.maxQty}</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="mb-3 font-bold text-gray-900">Key Features</h3>

            <ul className="space-y-3">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle2 size={17} className="text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT BOX */}

        <div className="col-span-12 flex flex-col gap-5 xl:col-span-3">
          <div className="rounded-[1.25rem] border border-purple-100 bg-purple-50 p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="text-primary rounded-xl bg-white p-3 shadow-sm">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Flash Deal</h3>
                <p className="text-xs text-gray-500">Register early access</p>
              </div>
            </div>

            <div className="mb-5 rounded-xl bg-white p-4">
              <p className="text-xs text-gray-400">Registration Fee</p>
              <h2 className="text-3xl font-extrabold text-gray-900">
                ₹{product.registrationFee ?? 1}
              </h2>
            </div>

            <button className="bg-primary w-full rounded-xl py-3 text-sm font-bold text-white transition-opacity hover:opacity-90">
              Register for ₹{product.registrationFee ?? 1}
            </button>
          </div>

          <div className="rounded-[1.25rem] border border-gray-200 bg-white p-5">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BadgeIndianRupee size={18} className="text-gray-500" />

                  <span className="text-gray-600">Minimum Order Value</span>
                </div>

                <span className="font-semibold">₹{product.minimumOrderValue.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Boxes size={18} className="text-gray-500" />

                  <span className="text-gray-600">Minimum Products Required</span>
                </div>

                <span className="font-semibold">{product.minimumProducts} Products</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CalendarClock size={18} className="text-gray-500" />

                  <span className="text-gray-600">Cart Reservation</span>
                </div>

                <span className="font-semibold">{product.cartReservation} Minutes</span>
              </div>

              {/* Countdown */}

              <div>
                <div className="mb-3 flex items-center gap-3">
                  <Clock3 size={18} className="text-gray-500" />

                  <span className="font-medium text-gray-500">Deal Starts In</span>
                </div>

                <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-gray-200 bg-gray-200 sm:grid-cols-4">
                  {[
                    {
                      value: "05",
                      label: "DAYS",
                    },
                    {
                      value: "12",
                      label: "HRS",
                    },
                    {
                      value: "45",
                      label: "MINS",
                    },
                    {
                      value: "30",
                      label: "SECS",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="bg-purple-50 py-4 text-center"
                    >
                      <h3 className="text-primary text-3xl font-bold">{item.value}</h3>

                      <p className="text-primary mt-1 text-xs font-semibold">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Share */}

            <div className="border-t border-gray-200 px-5 py-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-medium">Share this product</span>

                <div className="flex gap-3">
                  <button className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white">
                    <MessageCircle size={18} />
                  </button>

                  <button className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
                    <XIcon size={18} />
                  </button>

                  <button className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                    <XIcon size={18} />
                  </button>

                  <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200">
                    <LinkIcon size={18} className="text-gray-700" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Banner */}

      <div className="relative my-8 md:my-10">
        <FeaturesBanner />
      </div>

      {/* DESCRIPTION */}

      <div className="mt-10 grid grid-cols-12 gap-6">
        {/* LEFT CARD */}
        <div className="col-span-12 lg:col-span-6">
          <ProductTabs product={product} />
        </div>

        {/* SPECIFICATION CARD */}
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <div className="h-full rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="mb-5 text-lg font-semibold">Specifications</h2>

            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Brand</span>
                <span>{product.brand}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Model</span>
                <span>{product.model}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Storage</span>
                <span>{product.storage || "-"}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Display</span>
                <span>{product.display || "-"}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Rear Camera</span>
                <span>{product.rearCamera || "-"}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Front Camera</span>
                <span>{product.frontCamera || "-"}</span>
              </div>
            </div>

            <button className="text-primary hover:text-primary-hover mt-6 text-sm font-semibold transition-colors">
              View all specifications
            </button>
          </div>
        </div>

        {/* DELIVERY CARD */}

        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            {/* Top */}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-0">
              {/* Free Delivery */}

              <div className="relative flex flex-col items-center">
                <Truck size={26} className="text-gray-600" />

                <p className="mt-3 text-[11px] font-semibold text-gray-800">Free Delivery</p>

                <p className="text-xs text-gray-500">3-5 days</p>
              </div>

              {/* Divider */}

              <div className="relative flex flex-col items-center">
                <span className="absolute bottom-2 left-0 top-2 hidden w-px bg-gray-200 sm:block"></span>

                <RotateCcw size={26} className="text-gray-600" />

                <p className="mt-3 text-[11px] font-semibold text-gray-800">7 Days Return</p>

                <p className="text-xs text-gray-500">Easy returns</p>
              </div>

              {/* Warranty */}

              <div className="relative flex flex-col items-center">
                <span className="absolute bottom-2 left-0 top-2 hidden w-px bg-gray-200 sm:block"></span>

                <ShieldCheck size={26} className="text-gray-600" />

                <p className="mt-3 text-[11px] font-semibold text-gray-800">1 Year Warranty</p>

                <p className="text-xs text-gray-500">Brand warranty</p>
              </div>
            </div>

            {/* Divider */}

            <div className="my-6 border-t border-gray-200"></div>

            {/* Delivery */}

            <div className="flex items-center justify-between">
              <div>
                <p className="mb-2 text-sm font-medium text-gray-600">Delivery to</p>

                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-gray-500" />

                  <span className="font-semibold">560001</span>
                </div>
              </div>

              <button className="text-primary text-sm font-semibold hover:underline">Change</button>
            </div>

            {/* Bottom */}

            <div className="mt-8 flex items-end justify-between">
              <div>
                <p className="mb-2 text-sm text-gray-500">Estimated Delivery</p>

                <p className="font-semibold text-gray-900">17 - 19 May 2025</p>
              </div>

              <span className="font-semibold text-green-600">In Stock</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
