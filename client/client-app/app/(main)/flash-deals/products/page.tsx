import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  Heart,
  Share2,
  Star,
  CheckCircle2,
  ShieldCheck,
  Package,
  Clock,
  Truck,
  Users,
} from "lucide-react";
import { FeaturesBanner } from "../../../components/features-banner";

import { products } from "./lib/product-data";

import { ProductImageCarousel } from "./components/product-image-carousel";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;

  const product = products.find((item) => item.id.toString() === resolvedParams.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="font-poppins relative mx-auto w-full max-w-[1920px] px-4 py-6 md:px-8 xl:px-10">
      {/* Breadcrumb */}

      <div className="mb-8 flex items-center justify-between">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-black">
            Home
          </Link>

          <ChevronRight size={14} />

          <Link href="/flash-deals" className="hover:text-black">
            Flash Deals
          </Link>

          <ChevronRight size={14} />

          <span className="font-semibold text-gray-900">{product.name}</span>
        </nav>

        <div className="flex gap-3">
          <button
            className="
            flex items-center gap-2 
            rounded-xl border border-gray-200
            px-4 py-2 text-sm font-semibold
            hover:bg-gray-50
            "
          >
            <Heart size={18} />
            Wishlist
          </button>

          <button
            className="
            flex items-center gap-2 
            rounded-xl border border-gray-200
            px-4 py-2 text-sm font-semibold
            hover:bg-gray-50
            "
          >
            <Share2 size={18} />
            Share
          </button>
        </div>
      </div>

      {/* Main Product Section */}

      <section
        className="
        mb-10 
        grid
        grid-cols-1
        gap-8
        xl:grid-cols-12
        "
      >
        {/* IMAGE */}

        <div className="xl:col-span-5">
          <ProductImageCarousel images={product.images} title={product.name} />
        </div>

        {/* PRODUCT DETAILS */}

        <div
          className="
          flex flex-col
          xl:col-span-4
          "
        >
          <span
            className="
            text-primary
            mb-4
            w-fit
            rounded-md
            bg-purple-50 px-3
            py-1
            text-xs
            font-bold
            "
          >
            {product.category}
          </span>

          <h1
            className="
            mb-3
            text-3xl
            font-extrabold
            leading-tight
            text-gray-900
            "
          >
            {product.name}
          </h1>

          <p
            className="
            mb-5
            text-sm
            text-gray-500
            "
          >
            {product.shortDescription}
          </p>

          {/* Rating */}

          <div
            className="
            mb-5
            flex items-center gap-3
            "
          >
            <div
              className="
              flex items-center gap-1
              rounded-lg
              bg-green-50
              px-3 py-1
              text-sm
              font-bold
              text-green-600
              "
            >
              <Star size={14} fill="currentColor" />

              {product.rating}
            </div>

            <span className="text-sm text-gray-500">{product.reviews} Reviews</span>

            <span className="text-sm text-gray-500">{product.sold}+ sold</span>
          </div>

          {/* PRICE CARD */}

          <div
            className="
            mb-6
            rounded-2xl
            bg-gray-50
            p-5
            "
          >
            <div
              className="
              mb-2
              text-sm
              text-gray-400
              line-through
              "
            >
              ₹{product.originalPrice.toLocaleString()}
            </div>

            <div
              className="
              flex items-center gap-3
              "
            >
              <h2
                className="
                text-3xl
                font-extrabold
                text-gray-900
                "
              >
                ₹{product.flashPrice.toLocaleString()}
              </h2>

              <span
                className="
                rounded-md
                bg-red-50
                px-2 py-1
                text-xs
                font-bold
                text-red-500
                "
              >
                {product.discount}% OFF
              </span>
            </div>

            <p
              className="
              mt-2
              text-sm
              font-medium
              text-green-600
              "
            >
              You save ₹{product.saveAmount.toLocaleString()}
            </p>
          </div>

          {/* STOCK */}

          <div
            className="
            mb-6
            grid
            grid-cols-2
            gap-4
            "
          >
            <div
              className="
              rounded-xl
              border
              p-4
              "
            >
              <p className="text-xs text-gray-400">Available Quantity</p>

              <p className="mt-1 font-bold">{product.stock}</p>
            </div>

            <div
              className="
              rounded-xl
              border
              p-4
              "
            >
              <p className="text-xs text-gray-400">Max Quantity</p>

              <p className="mt-1 font-bold">{product.maxQty}</p>
            </div>
          </div>

          {/* FEATURES */}

          <div>
            <h3
              className="
              mb-3
              font-bold
              text-gray-900
              "
            >
              Key Features
            </h3>

            <ul className="space-y-3">
              {product.features.map((feature, index) => (
                <li
                  key={index}
                  className="
                    flex
                    items-center
                    gap-3
                    text-sm
                    text-gray-600
                    "
                >
                  <CheckCircle2 size={17} className="text-green-500" />

                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* RIGHT DEAL SIDEBAR */}

        <div
          className="
          flex flex-col gap-5
          xl:col-span-3
          "
        >
          {/* Register Card */}

          <div
            className="
            rounded-[1.25rem]
            border
            border-purple-100
            bg-purple-50
            p-5
            "
          >
            <div
              className="
              mb-4
              flex
              items-center
              gap-3
              "
            >
              <div
                className="
                text-primary
                rounded-xl
                bg-white
                p-3
                shadow-sm
                "
              >
                <ShieldCheck size={24} />
              </div>

              <div>
                <h3
                  className="
                  font-bold
                  text-gray-900
                  "
                >
                  Flash Deal
                </h3>

                <p
                  className="
                  text-xs
                  text-gray-500
                  "
                >
                  Register early access
                </p>
              </div>
            </div>

            <div
              className="
              mb-5
              rounded-xl
              bg-white
              p-4
              "
            >
              <p
                className="
                text-xs
                text-gray-400
                "
              >
                Registration Fee
              </p>

              <h2
                className="
                text-3xl
                font-extrabold
                "
              >
                ₹1
              </h2>
            </div>

            <button
              className="
              bg-primary
              w-full
              rounded-xl
              py-3
              text-sm
              font-bold
              text-white
              hover:opacity-90
              "
            >
              Register for ₹1
            </button>
          </div>

          {/* Deal Highlights */}

          <div
            className="
            rounded-[1.25rem]
            border
            bg-white
            p-5
            "
          >
            <h3
              className="
              mb-5
              font-bold
              text-gray-900
              "
            >
              Deal Highlights
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span
                  className="
                  flex gap-2
                  text-sm
                  text-gray-500
                  "
                >
                  <Package size={16} />
                  Minimum Order
                </span>

                <b>₹5000</b>
              </div>

              <div className="flex justify-between">
                <span
                  className="
                  flex gap-2
                  text-sm
                  text-gray-500
                  "
                >
                  <Clock size={16} />
                  Cart Hold
                </span>

                <b>10 Min</b>
              </div>

              <div className="flex justify-between">
                <span
                  className="
                  flex gap-2
                  text-sm
                  text-gray-500
                  "
                >
                  <Users size={16} />
                  Registered
                </span>

                <b>1250</b>
              </div>
            </div>
          </div>

          {/* Delivery */}

          <div
            className="
            rounded-[1.25rem]
            border
            bg-white
            p-5
            "
          >
            <h3
              className="
              mb-4
              font-bold
              "
            >
              Delivery Details
            </h3>

            <div
              className="
              space-y-4
              text-sm
              text-gray-600
              "
            >
              <p className="flex gap-3">
                <Truck size={18} />

                {product.delivery}
              </p>

              <p className="flex gap-3">
                <ShieldCheck size={18} />

                {product.warranty}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INFORMATION SECTION */}

      <section
        className="
        mb-10
        grid
        grid-cols-1
        gap-6
        lg:grid-cols-2
        "
      >
        <div
          className="
          rounded-2xl
          border
          bg-white
          p-6
          "
        >
          <h2
            className="
            mb-4
            font-bold
            "
          >
            About Product
          </h2>

          <p
            className="
            text-sm
            leading-relaxed
            text-gray-600
            "
          >
            {product.description}
          </p>
        </div>

        <div
          className="
          rounded-2xl
          border
          bg-white
          p-6
          "
        >
          <h2
            className="
            mb-4
            font-bold
            "
          >
            Specifications
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Brand</span>

              <b>{product.brand}</b>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Model</span>

              <b>{product.model}</b>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Display</span>

              <b>{product.display}</b>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Storage</span>

              <b>{product.storage}</b>
            </div>
          </div>
        </div>
      </section>

      {/* Features Banner */}
      <div className="relative mb-10">
        <FeaturesBanner />
      </div>

      {/* STICKY BOTTOM BAR */}

      <div
        className="
        fixed
        bottom-0
        left-0
        right-0
        z-50
        border-t
        bg-white
        shadow-lg
        "
      >
        <div
          className="
          mx-auto
          flex
          max-w-[1920px]
          items-center
          justify-between
          gap-5
          px-4
          py-4
          md:px-10
          "
        >
          <div>
            <h3
              className="
              font-bold
              "
            >
              Register now for ₹1
            </h3>

            <p
              className="
              text-sm
              text-gray-500
              "
            >
              Get early access to this deal
            </p>
          </div>

          <div
            className="
            flex
            gap-3
            "
          >
            <button
              className="
              rounded-xl
              border
              px-5
              py-3
              "
            >
              <Heart size={18} />
            </button>

            <button
              className="
              bg-primary
              rounded-xl
              px-8
              py-3
              font-bold
              text-white
              "
            >
              Register ₹1
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
