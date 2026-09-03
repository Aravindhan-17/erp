"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { products } from "../../products/lib/product-data";
import { PaymentForm } from "./components/payment-form";
import { ProcessingView } from "./components/processing-view";
import { SuccessView } from "./components/success-view";
import { FailedView } from "./components/failed-view";

export type RegistrationState = "payment" | "processing" | "success" | "failed";

export default function FlashDealRegisterPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const product = products.find((p) => p.id.toString() === id);
  const [currentState, setCurrentState] = useState<RegistrationState>("payment");
  const [orderId, setOrderId] = useState<string | null>(null);

  // If product not found, redirect back
  useEffect(() => {
    if (!product) {
      router.push("/flash-deals");
    }
  }, [product, router]);

  if (!product) return null;

  return (
    <div className="font-poppins relative mx-auto w-full max-w-[1920px] px-4 py-10 md:px-8 xl:px-10">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link href="/flash-deals" className="hover:text-primary transition-colors">
            Flash Deals
          </Link>
          <ChevronRight size={14} />
          <span className="font-medium text-black">Register</span>
        </nav>
      </div>

      {currentState === "payment" && (
        <PaymentForm product={product} onPay={() => setCurrentState("processing")} />
      )}

      {currentState === "processing" && (
        <ProcessingView
          onSuccess={(id) => {
            setOrderId(id);
            setCurrentState("success");
          }}
          onFail={() => setCurrentState("failed")}
        />
      )}

      {currentState === "success" && <SuccessView product={product} orderId={orderId!} />}

      {currentState === "failed" && <FailedView onRetry={() => setCurrentState("payment")} />}
    </div>
  );
}
