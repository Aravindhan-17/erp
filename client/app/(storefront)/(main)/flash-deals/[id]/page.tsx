import { deals } from "@/lib/dummy-data";
import { FeaturesBanner } from "../../../components/features-banner";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Product1, Product2, Product3, Product4 } from "@/assets/images";
import { DealImageCarousel } from "./components/deal-image-carousel";
import { DealProductsCarousel } from "./components/deal-products-carousel";
import {
  Heart,
  Share2,
  ChevronRight,
  Filter,
  ChevronDown,
  CheckCircle2,
  Clock,
  Package,
  Calendar,
  Users,
  ShieldCheck,
} from "lucide-react";

export default async function FlashDealDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const deal = deals.find((d) => d.id.toString() === resolvedParams.id);

  if (!deal) {
    notFound();
  }

  // Mock products for the grid matching the screenshot layout
  const mockProducts = [
    {
      id: 1,
      name: "Apple AirPods Pro 2",
      category: "Earbuds",
      image: Product1,
      originalPrice: 24900,
      discountPrice: 18990,
      discount: "24% OFF",
    },
    {
      id: 2,
      name: "Sony WH-1000XM5",
      category: "Headphones",
      image: Product2,
      originalPrice: 29900,
      discountPrice: 22990,
      discount: "23% OFF",
    },
    {
      id: 3,
      name: "Dell XPS 13 Laptop",
      category: "Laptops",
      image: Product3,
      originalPrice: 119000,
      discountPrice: 89990,
      discount: "25% OFF",
    },
    {
      id: 4,
      name: "iPhone 15 (128GB)",
      category: "Smartphones",
      image: Product4,
      originalPrice: 79900,
      discountPrice: 62990,
      discount: "21% OFF",
    },
    {
      id: 5,
      name: "boAt Airdopes 161",
      category: "Earbuds",
      image: Product1,
      originalPrice: 2490,
      discountPrice: 1699,
      discount: "32% OFF",
    },
    {
      id: 6,
      name: "Samsung Galaxy S24 Ultra",
      category: "Smartphones",
      image: Product4,
      originalPrice: 129999,
      discountPrice: 114999,
      discount: "12% OFF",
    },
    {
      id: 7,
      name: "MacBook Air M3",
      category: "Laptops",
      image: Product3,
      originalPrice: 114900,
      discountPrice: 99990,
      discount: "13% OFF",
    },
    {
      id: 8,
      name: "Bose QuietComfort Ultra",
      category: "Headphones",
      image: Product2,
      originalPrice: 35900,
      discountPrice: 28990,
      discount: "19% OFF",
    },
    {
      id: 9,
      name: "Nothing Ear (2)",
      category: "Earbuds",
      image: Product1,
      originalPrice: 9999,
      discountPrice: 7499,
      discount: "25% OFF",
    },
    {
      id: 10,
      name: "HP Envy x360",
      category: "Laptops",
      image: Product3,
      originalPrice: 85999,
      discountPrice: 72990,
      discount: "15% OFF",
    },
  ];

  return (
    <div className="font-poppins relative mx-auto w-full max-w-[1920px] px-4 py-6 md:px-8 xl:px-10">
      {/* Header / Breadcrumbs */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link href="/flash-deals" className="hover:text-black">
            Flash Deals
          </Link>
          <ChevronRight size={14} />
          <span className="font-medium text-black">{deal.title}</span>
        </nav>
        <div className="flex w-full flex-wrap items-center gap-2 sm:gap-3 md:w-auto">
          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium transition hover:bg-gray-50 sm:flex-none">
            <Heart size={18} /> Add to Wishlist
          </button>
          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium transition hover:bg-gray-50 sm:flex-none">
            <Share2 size={18} /> Share
          </button>
        </div>
      </div>

      {/* Hero Section Grid */}
      <section className="mb-10 grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-12">
        {/* Left: Image Overlay Carousel */}
        <DealImageCarousel images={[deal.image, Product2, Product3, Product4]} title={deal.title} />

        {/* Center: Info & Countdown */}
        <div className="flex flex-col justify-center lg:col-span-1 xl:col-span-4">
          <span className="text-primary mb-4 w-fit rounded bg-purple-50 px-3 py-1 text-xs font-bold">
            Electronics
          </span>
          <h1 className="font-poppins mb-3 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 lg:text-[2.5rem]">
            {deal.title}
          </h1>
          <p className="mb-8 text-[15px] text-gray-500">{deal.description}</p>

          {/* Timer Box */}
          <div className="mb-6 rounded-2xl bg-gray-50/80 p-6">
            <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
              Ends In
            </div>
            <div className="flex items-start gap-2 text-3xl font-bold leading-none text-gray-900 sm:gap-4 sm:text-[2.5rem]">
              <div className="flex flex-col items-center">
                <span>05</span>
                <span className="mt-2 text-[10px] font-medium tracking-widest text-gray-400">
                  DAYS
                </span>
              </div>
              <span className="mt-1 font-normal text-gray-400">:</span>
              <div className="flex flex-col items-center">
                <span>12</span>
                <span className="mt-2 text-[10px] font-medium tracking-widest text-gray-400">
                  HRS
                </span>
              </div>
              <span className="mt-1 font-normal text-gray-400">:</span>
              <div className="flex flex-col items-center">
                <span>45</span>
                <span className="mt-2 text-[10px] font-medium tracking-widest text-gray-400">
                  MINS
                </span>
              </div>
              <span className="mt-1 font-normal text-gray-400">:</span>
              <div className="flex flex-col items-center">
                <span>30</span>
                <span className="mt-2 text-[10px] font-medium tracking-widest text-gray-400">
                  SECS
                </span>
              </div>
            </div>
          </div>

          {/* Registration Box */}
          <div className="mb-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-purple-100 bg-purple-50 p-4 sm:flex-row">
            <div className="flex items-start gap-3">
              <div className="text-primary mt-1 shrink-0 rounded-xl bg-white p-2 shadow-sm">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Register for this deal</h4>
                <p className="mt-0.5 text-xs leading-relaxed text-gray-500">
                  Pay just ₹1 to get early access and shop when it goes live.
                </p>
              </div>
            </div>
            <Link href={`/flash-deals/register/${deal.id}`} className="bg-primary shadow-primary/20 w-full whitespace-nowrap rounded-xl px-6 py-3 text-sm font-bold text-white shadow-md transition hover:opacity-90 sm:w-auto flex items-center justify-center">
              Register for ₹1
            </Link>
          </div>

          <div className="flex items-center gap-6 text-[13px] font-medium text-gray-600">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-gray-400" />{" "}
              <span className="font-bold text-gray-800">1,250</span> people have already registered
            </div>
            <div className="flex items-center gap-2">
              <Package size={16} className="text-gray-400" />{" "}
              <span className="font-bold text-gray-800">120</span> Products
            </div>
          </div>
        </div>

        {/* Right: Deal Highlights & Schedule */}
        <div className="flex flex-col gap-5 md:flex-row lg:col-span-2 xl:col-span-3 xl:flex-col">
          <div className="flex-1 rounded-[1.25rem] border border-gray-200 bg-white p-5">
            <h3 className="mb-4 text-[15px] font-bold text-gray-900">Deal Highlights</h3>
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3 text-[12px] font-medium text-gray-600">
                  <div className="text-primary rounded-md bg-purple-50 p-1.5">
                    <CheckCircle2 size={14} />
                  </div>
                  Registration Fee
                </div>
                <div className="whitespace-nowrap text-right text-[12px] font-bold">
                  ₹1{" "}
                  <span className="block text-[10px] font-normal text-gray-400">
                    (One-time & non-refundable)
                  </span>
                </div>
              </div>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3 text-[12px] font-medium text-gray-600">
                  <div className="text-primary rounded-md bg-purple-50 p-1.5">
                    <Package size={14} />
                  </div>
                  Min. Order Value
                </div>
                <div className="text-[12px] font-bold">₹5,000</div>
              </div>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3 text-[12px] font-medium text-gray-600">
                  <div className="text-primary rounded-md bg-purple-50 p-1.5">
                    <Package size={14} />
                  </div>
                  Min. Products Required
                </div>
                <div className="text-[12px] font-bold">2 Products</div>
              </div>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3 text-[12px] font-medium text-gray-600">
                  <div className="text-primary rounded-md bg-purple-50 p-1.5">
                    <Clock size={14} />
                  </div>
                  Cart Reservation
                </div>
                <div className="text-[12px] font-bold">10 Minutes</div>
              </div>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3 text-[12px] font-medium text-gray-600">
                  <div className="text-primary rounded-md bg-purple-50 p-1.5">
                    <CheckCircle2 size={14} />
                  </div>
                  Max Quantity per Customer
                </div>
                <div className="text-right text-[12px] font-bold">5 Units per product</div>
              </div>
            </div>
          </div>

          <div className="flex-1 rounded-[1.25rem] border border-gray-200 bg-white p-5">
            <h3 className="mb-4 text-[15px] font-bold text-gray-900">Deal Schedule</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-[12px] font-medium text-gray-600">
                  <div className="text-primary rounded-md bg-purple-50 p-1.5">
                    <Calendar size={14} />
                  </div>
                  Starts On
                </div>
                <div className="text-[12px] font-bold">15 May 2025, 12:00 PM</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-[12px] font-medium text-gray-600">
                  <div className="text-primary rounded-md bg-purple-50 p-1.5">
                    <Calendar size={14} />
                  </div>
                  Ends On
                </div>
                <div className="text-[12px] font-bold">18 May 2025, 11:59 PM</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Banner */}
      <div className="relative mb-10">
        <FeaturesBanner />
      </div>

      {/* Info Cards Row */}
      <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        {/* About This Deal */}
        <div className="flex flex-col rounded-[1.25rem] border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-[16px] font-bold text-gray-900">About This Deal</h3>
          <p className="mb-6 text-[13px] leading-relaxed text-gray-600">
            Get ready for the biggest electronics sale of the season! Explore amazing discounts on
            laptops, smartphones, home audio, wearables and more from top brands.
          </p>
          <ul className="mt-auto space-y-3 text-[13px] font-medium text-gray-700">
            <li className="flex items-start gap-3">
              <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-green-500" /> Best prices on
              the latest electronics
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-green-500" /> Limited time
              offer – don&apos;t miss out
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-green-500" /> Register now and
              be ready to shop
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-green-500" /> Hurry! Limited
              quantities available
            </li>
          </ul>
        </div>

        {/* Terms & Conditions */}
        <div className="flex flex-col rounded-[1.25rem] border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-[16px] font-bold text-gray-900">Terms & Conditions</h3>
          <ul className="space-y-4 text-[13px] font-medium text-gray-600">
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1 text-[10px]">▶</span> Registration fee of ₹1 is
              non-refundable.
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1 text-[10px]">▶</span> Products are reserved in cart
              for 10 minutes only.
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1 text-[10px]">▶</span> Minimum order value ₹5,000 or
              at least 2 products.
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1 text-[10px]">▶</span> 5 units per product can be
              purchased.
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1 text-[10px]">▶</span> All sales are final. No
              returns or exchanges.
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content (Products Grid) */}
      <div className="w-full">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="text-[18px] font-bold text-gray-900">
            Products in this Deal <span className="font-medium text-gray-400">(120)</span>
          </h2>
          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:gap-3">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[13px] font-semibold transition hover:bg-gray-50 sm:flex-none">
              <Filter size={14} /> Filter
            </button>
            <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[13px] font-semibold transition hover:bg-gray-50 sm:flex-none">
              Sort by: Featured <ChevronDown size={14} className="text-gray-400" />
            </button>
          </div>
        </div>

        <DealProductsCarousel products={mockProducts} />

        {/* Sticky Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-50 translate-y-0 transform border-t border-gray-200 bg-white shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] transition-transform duration-300">
          <div className="mx-auto flex max-w-[1920px] flex-col items-center justify-between gap-4 px-4 py-4 md:flex-row md:px-8 xl:px-10">
            <div className="flex items-center gap-4">
              <div className="text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-50">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-gray-900">
                  Don&apos;t miss out! Register now for just ₹1
                </h3>
                <p className="text-sm font-medium text-black/50">
                  Get early access and be ready to shop when the deal goes live.
                </p>
              </div>
            </div>
            <div className="mt-4 flex w-full items-center gap-2 sm:gap-3 md:mt-0 md:w-auto">
              <Link href={`/flash-deals/register/${deal.id}`} className="bg-primary shadow-primary/20 flex flex-1 items-center justify-center whitespace-nowrap rounded-xl px-2 py-3.5 text-[13px] font-bold text-white shadow-md transition hover:opacity-90 sm:px-8 sm:text-sm md:flex-none">
                Register <span className="hidden sm:inline">&nbsp;for ₹1</span>
              </Link>
              <button
                className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-gray-200 bg-white px-2 py-3.5 text-[13px] font-semibold text-gray-700 transition hover:bg-gray-50 sm:px-5 sm:text-sm md:flex-none"
                aria-label="Add to Wishlist"
              >
                <Heart size={18} /> <span className="hidden xl:inline">Add to Wishlist</span>
              </button>
              <button
                className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-gray-200 bg-white px-2 py-3.5 text-[13px] font-semibold text-gray-700 transition hover:bg-gray-50 sm:px-5 sm:text-sm md:flex-none"
                aria-label="Share Deal"
              >
                <Share2 size={18} /> <span className="hidden xl:inline">Share Deal</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
