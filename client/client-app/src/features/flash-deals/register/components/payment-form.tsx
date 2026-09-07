
import type { Product } from "../../products/lib/product-data";
import { Lock, Circle, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface PaymentFormProps {
  product: Product;
  onPay: () => void;
}

export function PaymentForm({ product, onPay }: PaymentFormProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>("upi");

  const paymentMethods = [
    {
      id: "upi",
      title: "UPI",
      subtitle: "Pay using any UPI app",
      icon: "UPI",
    },
    {
      id: "card",
      title: "Credit / Debit Card",
      subtitle: "Visa, Mastercard, Rupay",
      icon: "CARD",
    },
    {
      id: "netbanking",
      title: "Net Banking",
      subtitle: "All major banks supported",
      icon: "BANK",
    },
    {
      id: "wallet",
      title: "Wallets",
      subtitle: "Paytm, PhonePe, Amazon Pay & more",
      icon: "WALLET",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        {/* Left Column: Deal Summary */}
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 lg:col-span-5 xl:p-8">
          <h2 className="mb-6 text-xl font-bold text-gray-900">Deal Summary</h2>

          <div className="mb-6 flex items-center gap-4">
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-white p-1 shadow-sm">
              <img src={product.image} alt={product.name} className="object-contain" />
            </div>
            <div>
              <h3 className="line-clamp-2 font-bold text-gray-900">{product.name}</h3>
              <p className="text-sm font-medium text-gray-500">{product.category}</p>
            </div>
          </div>

          <div className="my-6 border-t border-gray-200"></div>

          <div className="space-y-5">
            <div>
              <p className="text-sm text-gray-500">Starts on</p>
              <p className="mt-1 font-bold text-gray-900">15 May 2025, 12:00 PM</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Registration Fee</p>
              <p className="mt-1 font-bold text-gray-900">₹{product.registrationFee ?? 1}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Min. Order Value</p>
              <p className="mt-1 font-bold text-gray-900">
                ₹{product.minimumOrderValue.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Min. Products Required</p>
              <p className="mt-1 font-bold text-gray-900">{product.minimumProducts} Products</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Cart Reservation</p>
              <p className="mt-1 font-bold text-gray-900">{product.cartReservation} Minutes</p>
            </div>
          </div>
        </div>

        {/* Right Column: Payment */}
        <div className="lg:col-span-7">
          <h2 className="text-xl font-bold text-gray-900">Complete Your Registration</h2>
          <p className="mt-1 text-sm text-gray-500">
            Pay just ₹{product.registrationFee ?? 1} to confirm your spot
          </p>

          <div className="mt-8 flex items-center justify-between rounded-xl bg-purple-50 p-6">
            <div>
              <p className="text-sm font-semibold text-gray-900">Amount to Pay</p>
              <p className="mt-1 text-4xl font-extrabold text-gray-900">
                ₹{product.registrationFee ?? 1}
              </p>
            </div>
            <button className="text-primary text-sm font-bold hover:underline">View Details</button>
          </div>

          <div className="mt-8">
            <h3 className="mb-4 font-bold text-gray-900">Select Payment Method</h3>

            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-colors ${
                    selectedMethod === method.id
                      ? "border-primary bg-purple-50/30"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {selectedMethod === method.id ? (
                      <CheckCircle2 size={24} className="text-primary fill-primary/20" />
                    ) : (
                      <Circle size={24} className="text-gray-300" />
                    )}
                    <div>
                      <p
                        className={`font-bold ${selectedMethod === method.id ? "text-primary" : "text-gray-900"}`}
                      >
                        {method.title}
                      </p>
                      <p className="text-xs text-gray-500">{method.subtitle}</p>
                    </div>
                  </div>

                  {/* Mock Icons - In a real app these would be images */}
                  <div className="rounded bg-gray-100 px-2 py-1 text-xs font-bold text-gray-400">
                    {method.icon}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
            <Lock size={20} className="text-gray-500" />
            <div>
              <p className="text-sm font-bold text-gray-900">Secure Payment</p>
              <p className="text-xs text-gray-500">Your payment details are 100% secure</p>
            </div>
          </div>

          <button
            onClick={onPay}
            className="bg-primary mt-6 w-full rounded-xl py-4 text-lg font-bold text-white transition-opacity hover:opacity-90"
          >
            Pay ₹{product.registrationFee ?? 1} Now
          </button>

          <p className="mt-4 text-center text-xs text-gray-500">
            By proceeding, you agree to our{" "}
            <span className="text-primary cursor-pointer font-bold hover:underline">
              Terms & Conditions
            </span>{" "}
            and{" "}
            <span className="text-primary cursor-pointer font-bold hover:underline">
              Privacy Policy
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
