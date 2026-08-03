import { products } from "../lib/product-data";
import { notFound } from "next/navigation";

import { ProductImageCarousel } from "../components/product-image-carousel";
import ProductTabs from "../components/product-tabs";
import {
  Heart,
  Share2,
  ShieldCheck,
  Package,
  CheckCircle2,
  Truck,
  Check,
  CircleCheck,
  Boxes,
  CircleGauge,
  StarHalf,
  Star,
  CircleX,
  MessageCircle,
  Clock3,
  CalendarClock,
  BadgeIndianRupee,
  ChevronRight,
  Link,
  XIcon,
  MapPin,
  RotateCcw,
} from "lucide-react";
import { FeaturesBanner } from "@/app/(storefront)/components/features-banner";
import { FacebookIcon } from "@/assets/images";


export default async function ProductDetailPage({
  params,
}:{
  params: Promise<{id:string}>
}){

const {id}=await params;


const product = products.find(
(item)=>item.id.toString()===id
);


if(!product){
 notFound();
}



return (

<div className="font-poppins relative mx-auto w-full max-w-[1920px] px-4 py-6 md:px-8 xl:px-10">


{/* Breadcrumb */}

<div className="mb-6 text-sm text-gray-500">

Home 
<span className="mx-2">›</span>

Flash Deals

<span className="mx-2">›</span>

{product.name}

</div>



{/* MAIN */}

<div className="grid grid-cols-12 gap-6 xl:gap-6">

{/* IMAGE */}
<div className="col-span-12 lg:col-span-5">

<ProductImageCarousel
                    images={product.images} title={""}/>

</div>





{/* CENTER INFO */}
<div className="col-span-12 lg:col-span-7 xl:col-span-4">

<span className="rounded bg-purple-100 px-3 py-1 text-xs font-bold text-primary">

Electronics

</span>



<h1 className="mt-4 text-2xl md:text-3xl font-semibold leading-tight">

{product.name}

</h1>



<div className="mt-3 flex flex-wrap items-center gap-2 text-sm">

  {/* Stars */}
  <div className="flex items-center text-[#F59E0B]">

    {[1,2,3,4].map((star)=>(
      <Star
        key={star}
        size={18}
        className="fill-[#F59E0B] stroke-[#F59E0B]"
      />
    ))}

    <StarHalf
      size={18}
      className="fill-[#F59E0B] stroke-[#F59E0B]"
    />

  </div>

  <span className="ml-3 text-gray-600">
    {product.rating} ({product.reviews} Reviews)
  </span>

  <span className="mx-4 text-gray-300">|</span>

  <span className="text-gray-600">
    {product.sold.toLocaleString()} sold in this deal
  </span>

</div>



<p className="mt-4 text-black/50 font-medium text-md">

{product.shortDescription}

</p>




<div className="mt-6">

<p className="text-sm font-semibold mb-4">MRP  
<span className="text-sm text-gray-400 font-medium line-through pl-4">
  
₹{product.originalPrice.toLocaleString()}

</span>
</p>


<div className="text-lg font-semibold">Flash Deal Price</div>
<div className="flex flex-wrap items-center gap-3">

<h2 className="text-3xl md:text-4xl font-semibold">

₹{product.flashPrice.toLocaleString()}

</h2>


<span className="rounded font-semibold bg-red-100 px-3 py-1 text-secondary">

{product.discount}% OFF

</span>


</div>



<p className="mt-2 text-black font-semibold text-md">
You save
<span className="mt-2 text-green-600"> ₹{product.saveAmount}</span>

</p>


</div>


<div className="mt-8 rounded-2xl border border-gray-200 bg-white">

  <div className="grid grid-cols-3 gap-3 text-center">

    <div className="flex items-center gap-4 p-5">

      <CircleGauge
        size={28}
        className="text-gray-500"
      />

      <div>

        <p className="text-xs text-gray-500">
          Available Quantity
        </p>

        <h4 className="text-md font-semibold">
          {product.stock} Units
        </h4>

      </div>

    </div>

   <div className="flex items-center gap-4 p-5 sm:border-l border-gray-200 sm:my-4">

      <Boxes
        size={28}
        className="text-gray-500"
      />

      <div>

        <p className="text-xs text-gray-500">
          Max Qty per Customer
        </p>

        <h4 className="text-md font-semibold">
          {product.maxQty} Units
        </h4>

      </div>

    </div>

    <div className="flex items-center gap-4 p-5  border-l border-gray-200 my-4">

      <CircleCheck
        size={28}
        className="text-gray-500"
      />

      <div>

        <p className="text-xs text-gray-500">
          Stock Status
        </p>

        <h4 className="text-md font-semibold text-green-600">
          In Stock
        </h4>

      </div>

    </div>

  </div>

</div>


<div className="mt-8 ">


<h3 className="font-bold">

Key Features

</h3>


<ul className="mt-4 space-y-3">

{
product.features.map(
(feature)=>(
<li
key={feature}
className="flex gap-2 text-sm"
>

<Check
size={18}
className="text-purple-600"
/>

{feature}


</li>
)
)
}

</ul>


</div>


</div>





{/* RIGHT BOX */}

<div className="col-span-12 xl:col-span-3">

  <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

    {/* Header */}
    <div className="bg-gradient-to-b from-[#F7F2FF] to-[#FDFBFF] px-5 py-4 border-b border-gray-200">

      <p className="text-xs font-medium text-primary">
        This product is part of
      </p>

      <div className="mt-1 flex items-center justify-between">

        <h3 className="text-xl font-semibold text-primary">
          Summer Electronics Flash Sale
        </h3>

        <button className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
          View Deal
          <ChevronRight size={16} />
        </button>

      </div>

    </div>

    {/* Register Card */}

    <div className="m-5 rounded-xl bg-[#FAF7FF] p-5">

      <div className="flex items-start gap-4">

        <div className="flex h-12 w-22 items-center justify-center rounded-full bg-purple-100">

          <ShieldCheck
            size={24}
            className="text-primary"
          />

        </div>

        <div>

          <h4 className="text-lg font-semibold">
            You must register for this deal to shop
          </h4>

          <p className="mt-1 text-sm text-gray-500">
            Pay just ₹1 and shop when the deal goes live.
          </p>

        </div>

      </div>

      <button
        className="
          mt-6
          w-full
          rounded-lg
          bg-primary
          py-3
          text-lg
          font-semibold
          text-white
          transition
          hover:opacity-90
        "
      >
        Register for ₹1
      </button>

    </div>

    {/* Deal Details */}

    <div className="space-y-5 px-5 pb-5">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <BadgeIndianRupee
            size={18}
            className="text-gray-500"
          />

          <span className="text-gray-600">
            Minimum Order Value
          </span>

        </div>

        <span className="font-semibold">
          ₹{product.minimumOrderValue.toLocaleString()}
        </span>

      </div>

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <Boxes
            size={18}
            className="text-gray-500"
          />

          <span className="text-gray-600">
            Minimum Products Required
          </span>

        </div>

        <span className="font-semibold">
          {product.minimumProducts} Products
        </span>

      </div>

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <CalendarClock
            size={18}
            className="text-gray-500"
          />

          <span className="text-gray-600">
            Cart Reservation
          </span>

        </div>

        <span className="font-semibold">
          {product.cartReservation} Minutes
        </span>

      </div>

      {/* Countdown */}

      <div>

        <div className="mb-3 flex items-center gap-3">

          <Clock3
            size={18}
            className="text-gray-500"
          />

          <span className="font-medium text-gray-500">
            Deal Starts In
          </span>

        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 overflow-hidden rounded-xl border border-gray-200">

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
          ].map((item, index) => (

            <div
              key={item.label}
              className={`py-4 text-center bg-purple-100 ${
                index !== 3 ? "border-r border-gray-200" : ""
              }`}
            >

              <h3 className="text-3xl font-bold text-primary">
                {item.value}
              </h3>

              <p className="mt-1 text-xs font-semibold text-primary">
                {item.label}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>

    {/* Share */}

    <div className="border-t border-gray-200 px-5 py-5">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <span className="font-medium">
          Share this product
        </span>

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

          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
            <Link  size={18}
              className="text-gray-700"
            />
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

      <h2 className="mb-5 text-lg font-semibold">
        Specifications
      </h2>

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

      <button
        className="mt-6 text-sm font-semibold text-purple-600"
      >
        View all specifications
      </button>

    </div>

  </div>

{/* DELIVERY CARD */}

<div className="col-span-12 md:col-span-6 lg:col-span-3">

  <div className="rounded-2xl border border-gray-200 bg-white p-6">

    {/* Top */}

    <div className="grid grid-cols-1 sm:grid-cols-3">

      {/* Free Delivery */}

      <div className="relative flex flex-col items-center">

        <Truck
          size={26}
          className="text-gray-600"
        />

        <p className="mt-3 text-[11px] font-semibold text-gray-800">
          Free Delivery
        </p>

        <p className="text-xs text-gray-500">
          3-5 days
        </p>

      </div>

      {/* Divider */}

      <div className="relative flex flex-col items-center">

        <span className="absolute left-0 top-2 bottom-2 w-px bg-gray-200"></span>

        <RotateCcw
          size={26}
          className="text-gray-600"
        />

        <p className="mt-3 text-[11px] font-semibold text-gray-800">
          7 Days Return
        </p>

        <p className="text-xs text-gray-500">
          Easy returns
        </p>

      </div>

      {/* Warranty */}

      <div className="relative flex flex-col items-center">

        <span className="absolute left-0 top-2 bottom-2 w-px bg-gray-200"></span>

        <ShieldCheck
          size={26}
          className="text-gray-600"
        />

        <p className="mt-3 text-[11px] font-semibold text-gray-800">
          1 Year Warranty
        </p>

        <p className="text-xs text-gray-500">
          Brand warranty
        </p>

      </div>

    </div>

    {/* Divider */}

    <div className="my-6 border-t border-gray-200"></div>

    {/* Delivery */}

    <div className="flex items-center justify-between">

      <div>

        <p className="mb-2 text-sm font-medium text-gray-600">
          Delivery to
        </p>

        <div className="flex items-center gap-2">

          <MapPin
            size={18}
            className="text-gray-500"
          />

          <span className="font-semibold">
            560001
          </span>

        </div>

      </div>

      <button className="text-sm font-semibold text-primary hover:underline">
        Change
      </button>

    </div>

    {/* Bottom */}

    <div className="mt-8 flex items-end justify-between">

      <div>

        <p className="mb-2 text-sm text-gray-500">
          Estimated Delivery
        </p>

        <p className="font-semibold text-gray-900">
          17 - 19 May 2025
        </p>

      </div>

      <span className="font-semibold text-green-600">
        In Stock
      </span>

    </div>

  </div>

</div>

</div>

</div>

)

}