"use client";

import { Calendar, Receipt, FileText } from "lucide-react";
import Link from "next/link";
import { Product } from "../../../products/lib/product-data";
import Image from "next/image";

interface SuccessViewProps {
  product: Product;
  orderId: string;
}

export function SuccessView({ product, orderId }: SuccessViewProps) {
  const successAnimationStyles = `
  .success-circle-wrapper {
    animation: scaleCircle 0.3s ease-in-out 0.8s both;
  }
  
  .success-circle {
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    animation: drawCircle 0.4s cubic-bezier(0.65, 0, 0.45, 1) forwards, fillGreen 0.3s ease-in-out 0.4s forwards;
  }
  
  .success-checkmark {
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    animation: drawCheck 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.5s forwards;
  }
  
  @keyframes drawCircle {
    100% { stroke-dashoffset: 0; }
  }
  
  @keyframes fillGreen {
    100% { fill: #22c55e; } /* Tailwind green-500 */
  }
  
  @keyframes drawCheck {
    100% { stroke-dashoffset: 0; }
  }
  
  @keyframes scaleCircle {
    0%, 100% { transform: none; }
    50% { transform: scale3d(1.1, 1.1, 1); }
  }
`;

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
      <style>{successAnimationStyles}</style>
      {/* Big Green Checkmark */}
      <div className="success-circle-wrapper mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-green-100">
        <svg className="h-20 w-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle
            className="success-circle"
            cx="26"
            cy="26"
            r="25"
            fill="none"
            stroke="#22c55e"
            strokeWidth="3"
          />
          <path
            className="success-checkmark"
            fill="none"
            stroke="#ffffff"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
          />
        </svg>
      </div>

      <h1 className="mb-2 text-3xl font-extrabold text-gray-900 md:text-4xl">
        Registration Successful!
      </h1>
      <p className="mb-10 text-lg text-gray-600">You&apos;re all set for the deal.</p>

      {/* Details Card */}
      <div className="mb-8 w-full rounded-2xl border border-gray-200 bg-gray-50/50 p-6 text-left sm:p-8">
        <div className="text-center">
          <p className="text-sm text-gray-500">You have successfully registered for</p>
          <h2 className="text-primary mt-2 text-2xl font-bold">{product.name} Flash Sale</h2>
        </div>

        <div className="my-6 border-t border-gray-200" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <div className="mb-1 flex items-center gap-2 text-gray-500">
              <Calendar size={16} />
              <p className="text-xs">Starts On</p>
            </div>
            <p className="font-bold text-gray-900">15 May 2025, 12:00 PM</p>
          </div>

          <div>
            <div className="mb-1 flex items-center gap-2 text-gray-500">
              <Receipt size={16} />
              <p className="text-xs">Registration Fee Paid</p>
            </div>
            <p className="font-bold text-gray-900">₹{product.registrationFee ?? 1}</p>
          </div>

          <div>
            <div className="mb-1 flex items-center gap-2 text-gray-500">
              <FileText size={16} />
              <p className="text-xs">Order ID</p>
            </div>
            <p className="font-bold text-gray-900">{orderId}</p>
          </div>
        </div>
      </div>

      <p className="mb-8 font-medium text-gray-600">
        We&apos;ll notify you when the deal goes live.
      </p>

      {/* Action Buttons */}
      <div className="mb-12 flex w-full flex-col gap-4 sm:flex-row">
        <button className="bg-primary flex-1 rounded-xl py-4 text-base font-bold text-white transition-opacity hover:opacity-90">
          View Registered Deals
        </button>
        <Link
          href="/"
          className="border-primary text-primary flex flex-1 items-center justify-center rounded-xl border py-4 text-base font-bold transition-colors hover:bg-purple-50"
        >
          Back to Home
        </Link>
      </div>

      {/* Promotional Banner */}
      <div className="relative flex w-full flex-col items-center justify-between overflow-hidden rounded-2xl bg-purple-50 p-8 sm:flex-row sm:text-left">
        <div className="relative z-10">
          <h3 className="mb-2 text-xl font-bold text-gray-900">Get Ready for the Deal!</h3>
          <p className="max-w-70 mb-6 text-sm text-gray-600">
            Add products to wishlist and be ready to shop when it goes live.
          </p>
          <Link
            href={`/categories/${product.category.toLowerCase()}`}
            className="bg-primary inline-flex rounded-xl px-8 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            Explore Deals
          </Link>
        </div>

        {/* We use product image as generic promo image for now since it's contextual */}
        <div className="relative z-10 mt-8 h-48 w-48 sm:mt-0 sm:h-56 sm:w-56">
          <Image
            src={product.image}
            alt="Promotional bags"
            fill
            className="object-contain drop-shadow-2xl"
          />
        </div>

        {/* Decorative Confetti Background elements */}
        <div className="absolute left-1/4 top-4 h-3 w-3 rotate-12 rounded-sm bg-pink-400 opacity-60"></div>
        <div className="absolute bottom-8 left-1/3 h-4 w-4 rounded-full bg-yellow-400 opacity-60"></div>
        <div className="absolute right-1/4 top-12 h-3 w-3 rotate-45 rounded-sm bg-purple-400 opacity-60"></div>
        <div className="absolute bottom-1/3 right-12 h-2 w-2 rounded-full bg-green-400 opacity-60"></div>
      </div>
    </div>
  );
}
