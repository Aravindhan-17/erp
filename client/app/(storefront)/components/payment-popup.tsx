"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  X,
  ShieldCheck,
  CheckCircle,
  Wallet,
  Landmark,
  CreditCard,
  ShieldKeyholeIcon,
  CalendarDays,
  IndianRupee,
  ReceiptText,
  CircleAlert,
  Headphones,
} from "lucide-react";

interface PaymentPopupProps {
  open: boolean;
  onClose: () => void;
}

export default function PaymentPopup({ open, onClose }: PaymentPopupProps) {
   const router = useRouter();
  const [paymentStatus, setPaymentStatus] = useState<
    "payment" | "processing" | "success" | "failed"
  >("payment");

  const handlePayment = () => {
    setPaymentStatus("processing");

    setTimeout(() => {
      // success
      setPaymentStatus("success");

      // failed test:
      // setPaymentStatus("failed");
    }, 4000);
  };

  if (!open) return null;

  return (
    <div
      className="
z-9999
fixed
inset-0
flex
items-center
justify-center
overflow-y-auto
bg-black/60
p-5

"
    >
      <div
        className="
scrollbar-hide
relative
inset-0
z-[9999]
max-h-[92vh]
w-full
max-w-[700px]
overflow-y-auto
rounded-[28px]
bg-white
shadow-[0_20px_60px_rgba(0,0,0,0.18)]
"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}

        <button
          onClick={onClose}
          className="
absolute
right-5
top-5
z-20
rounded-full
p-2
text-gray-500
hover:bg-gray-100
"
        >
          <X size={20} />
        </button>

        {/* ===========================
PAYMENT FORM
=========================== */}

        {paymentStatus === "payment" && (
          <>
            <div
              className="
            grid
            grid-cols-1
            lg:grid-cols-[300px_1fr]
          "
            >
              {/* LEFT SIDE */}

              <div
                className="
              border-r
              border-gray-200
              bg-[#fafafa]
              p-6

            "
              >
                <h2
                  className="
                mb-6
                text-[18px]
                font-bold
                text-gray-900
              "
                >
                  Deal Summary
                </h2>

                <div className="flex gap-3">
                  <img
                    src="/images/deals/electronics.jpg"
                    alt="deal"
                    className="
                  h-[55px]
                  w-[70px]
                  rounded-lg
                  object-cover
                "
                  />
                  <h3
                    className="
                  text-[13px]
                  font-bold
                  leading-5
                  text-gray-900
                "
                  >
                    Summer Electronics
                    <br />
                    Flash Sale
                  </h3>
                </div>

                <div className="border border-gray-200"></div>

                <div className="mt-7 space-y-6">
                  <div>
                    <p className="text-xs text-gray-500">Starts On</p>

                    <p className="mt-1 text-sm font-semibold">15 May 2025</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Registration Fee</p>

                    <p className="mt-1 text-sm font-bold">₹1</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Min Order Value</p>

                    <p className="mt-1 text-sm font-semibold">₹5,000</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Products Required</p>

                    <p className="mt-1 text-sm font-semibold">2 Products</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Cart Reservation</p>

                    <p className="mt-1 text-sm font-semibold">10 Minutes</p>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="p-7">
                <h2
                  className="
                text-[22px]
                font-bold
                text-gray-900
              "
                >
                  Complete Your Registration
                </h2>

                <p
                  className="
                mt-2
                text-sm
                text-gray-500
              "
                >
                  Pay just ₹1 to confirm your spot
                </p>

                {/* Amount */}

                <div
                  className="
                mt-6
                rounded-2xl
                border
                border-gray-200
                bg-[#f7f2ff]
                p-5
              "
                >
                  <p className="text-sm text-gray-500">Amount to Pay</p>

                  <h1
                    className="
                  mt-1
                  text-[42px]
                  font-extrabold
                  text-gray-900
                "
                  >
                    ₹1
                  </h1>
                </div>
                <h3
                  className="
                mb-4
                mt-7
                text-sm
                font-bold
              "
                >
                  Select Payment Method
                </h3>

                {/* UPI */}

                <label
                  className="
                border-primary
                flex
                cursor-pointer
                items-center
                justify-between
                rounded-xl
                border-2
                bg-purple-50/50
                p-4
              "
                >
                  <div className="flex items-center gap-3">
                    <input type="radio" className="accent-primary" />

                    <div>
                      <p className="text-sm font-bold">UPI</p>

                      <p className="text-xs text-gray-500">Google Pay, PhonePe, Paytm</p>
                    </div>
                  </div>

                  <span
                    className="
                  text-primary
                  rounded
                  bg-white
                  px-2
                  py-1
                  text-xs
                  font-bold
                "
                  >
                    UPI
                  </span>
                </label>

                {/* CARD */}

                <label
                  className="
                mt-3
                flex
                cursor-pointer
                items-center
                justify-between
                rounded-xl
                border
                border-gray-200
                p-4
                hover:bg-gray-50
              "
                >
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" className="accent-primary" />

                    <div className="flex gap-3">
                      <div>
                        <CreditCard size={25} className="text-black/50" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">Credit / Debit Card</p>
                        <p className="text-xs text-gray-500">Visa, Mastercard</p>
                      </div>
                    </div>
                  </div>
                  <CreditCard size={20} />
                </label>

                {/* NET BANKING */}

                <label
                  className="
                mt-3
                flex
                cursor-pointer
                items-center
                justify-between
                rounded-xl
                border
                border-gray-200
                p-4
                hover:bg-gray-50
              "
                >
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" className="accent-primary" />

                    <div className="flex gap-3">
                      <div>
                        <Landmark size={25} className="text-black/50" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">Net Banking</p>
                        <p className="text-xs text-gray-500">All major Bank supported</p>
                      </div>
                    </div>
                  </div>
                  <input type="checkbox" name="payment" className="accent"></input>
                </label>

                {/* WALLET */}

                <label
                  className="
                mt-3
                flex
                cursor-pointer
                items-center
                justify-between
                rounded-xl
                border
                border-gray-200
                p-4
                hover:bg-gray-50
              "
                >
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" className="accent-primary" />

                    <div className="flex gap-3">
                      <div>
                        <Wallet size={25} className="text-black/50" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">Wallets</p>
                        <p className="text-xs text-gray-500">Paytm, PhonePe, Amazon, Pay & more</p>
                      </div>
                    </div>
                  </div>
                  <input type="checkbox" name="payment" className="accent"></input>
                </label>

                {/* Secure */}

                <div className="mt-5 flex gap-3">
                  <div>
                    <Wallet size={25} className="text-black/50" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Secure Payment</p>
                    <p className="text-xs text-gray-500">Your payment details are 100% secure</p>
                  </div>
                </div>

                {/* Button */}

                <button
                  onClick={handlePayment}
                  className="
bg-primary
mt-6
w-full
rounded-xl
py-3.5
text-sm
font-bold
text-white
shadow-lg
shadow-purple-200
hover:opacity-90
"
                >
                  Pay ₹1 Now
                </button>

                <p className="mt-4 text-center text-sm font-medium text-gray-500">
                  By processing, you agree to you{" "}
                  <span className="text-primary">Term & conditon</span> and{" "}
                  <span className="text-primary">Privacy Policy</span>
                </p>
              </div>
            </div>
          </>
        )}

        {/* ===========================
        PROCESSING SCREEN
=========================== */}

        {paymentStatus === "processing" && (
          <div className="flex min-h-[650px] flex-col items-center justify-center bg-gradient-to-br from-[#241b4b] via-[#2f255d] to-[#1f1b3d] p-10">
            {/* Card */}
            <div className="relative mt-10 w-full max-w-[620px] rounded-[28px] bg-white px-8 pb-10 pt-16 text-center shadow-2xl">
              {/* Floating Icon */}
              <div className="absolute -top-14 left-1/2 -translate-x-1/2">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-purple-100 shadow-lg">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-200">
                    <ShieldCheck size={52} className="text-primary" />
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-gray-900">Processing Your Payment</h2>

              <p className="mt-2 text-gray-500">Please do not close or refresh this page.</p>

              {/* Progress Steps */}
              <div className="mt-15 flex w-full max-w-xl  justify-between">
                {/* Step 1: Completed */}
                <div className="relative flex flex-1 flex-col items-center">
                  {/* Line extending from center of Step 1 to Step 2 */}
                  <div className="bg-primary absolute left-1/2 top-[22px] h-[2px] w-full" />

                  <div className="bg-primary relative z-10 flex h-11 w-11 items-center justify-center rounded-full text-white">
                    <CheckCircle size={20} strokeWidth={2.5} />
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-[14px] font-semibold leading-tight text-gray-700">
                      Verifying
                    </p>
                    <p className="text-[14px] font-semibold leading-tight text-gray-700">Payment</p>
                  </div>
                </div>

                {/* Step 2: Active */}
                <div className="relative flex flex-1 flex-col items-center">
                  {/* Line extending from center of Step 2 to Step 3 */}
                  <div className="absolute left-1/2 top-[22px] h-[2px] w-full bg-gray-200" />

                  <div className="border-primary relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 bg-white shadow-[0_0_0_4px_rgba(91,33,246,0.15)]">
                    <ShieldCheck size={20} strokeWidth={2.5} className="text-primary" />
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-primary text-[14px] font-bold leading-tight">Processing</p>
                  </div>
                </div>

                {/* Step 3: Inactive */}
                <div className="relative flex flex-1 flex-col items-center">
                  {/* Line extending from center of Step 3 to Step 4 */}
                  <div className="absolute left-1/2 top-[22px] h-[2px] w-full bg-gray-200" />

                  <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 border-gray-300 bg-white" />
                  <div className="mt-3 text-center">
                    <p className="text-[14px] font-medium leading-tight text-gray-500">
                      Confirming
                    </p>
                  </div>
                </div>

                {/* Step 4: Inactive */}
                <div className="relative flex flex-1 flex-col items-center">
                  <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 border-gray-300 bg-white" />
                  <div className="mt-3 text-center">
                    <p className="text-[14px] font-medium leading-tight text-gray-500">
                      Finalizing
                    </p>
                  </div>
                </div>
              </div>
              {/* Loader */}

              <div className="mt-16 flex justify-center">
                <div className="relative h-16 w-16">
                  <div
                    className="
      border-primary
      absolute
      inset-0
      animate-spin
      rounded-full
      border-[5px]
      border-t-transparent
      "
                  />
                </div>
              </div>
              <p className="mt-8 text-gray-500">This will only take a few seconds...</p>

              <p className="mt-3 text-2xl font-bold">Amount: ₹1</p>
            </div>

            {/* Bottom Security */}

            <div className="mt-12 w-full max-w-[620px] rounded-2xl border border-white/20 bg-white/10 px-5 py-6 backdrop-blur-lg">
              <div className="grid grid-cols-3 divide-x divide-white/20">
                <div className="flex items-center justify-center gap-3">
                  <ShieldKeyholeIcon className="text-white" size={30} />
                  <div>
                    <p className="font-semibold text-white">Secure Payment</p>

                    <p className="text-sm text-white/70">100% Protected</p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <ShieldCheck className="text-white" size={30} />

                  <div>
                    <p className="font-semibold text-white">PCI DSS</p>

                    <p className="text-sm text-white/70">Certified</p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <ShieldCheck className="text-white" size={30} />

                  <div>
                    <p className="font-semibold text-white">RBI Compliant</p>

                    <p className="text-sm text-white/70">Safe & Secure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===========================
        SUCCESS SCREEN
=========================== */}

        {paymentStatus === "success" && (
          <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
            <div className="w-full max-w-3xl  p-2">
              <div className="flex justify-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-4xl text-white">
                    ✓
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <h1 className="text-3xl font-bold text-gray-900">Registration Successful!</h1>
                <p className="mt-2 text-lg text-gray-500">You&apos;re all set for the deal.</p>
              </div>

              <div className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-center text-gray-500">You have successfully registered for</p>

                <h2 className="text-primary mt-2 text-center text-2xl font-bold">
                  Summer Electronics Flash Sale
                </h2>

                <div className="mt-8 grid grid-cols-1 divide-y divide-gray-300 md:grid-cols-3 md:divide-x md:divide-y-0">
                  <div className="flex items-start gap-3 py-4 md:px-2">
                    <div className="text-primary flex shrink-0 items-center justify-center rounded-full">
                      <CalendarDays size={20} />
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Starts On</p>

                      <p className="mt-2 text-sm font-semibold text-gray-900">
                        15 May 2025, 12:00 PM
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 py-4 md:px-2">
                    <div className="text-primary flex shrink-0 items-center justify-center rounded-full">
                      <IndianRupee size={20} />
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Registration Fee Paid</p>

                      <p className="mt-2 text-sm font-semibold text-gray-900">₹1</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 py-4 md:px-2">
                    <div className="text-primary flex shrink-0 items-center justify-center rounded-full">
                      <ReceiptText size={20} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm text-gray-500">Order ID</p>

                      <p className="mt-2 break-all text-sm font-semibold text-gray-900">
                        RFG12S051S0001
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-center text-gray-500">
                We&apos;ll notify you when the deal goes live.
              </p>

              <div className="mt-8 flex flex-col gap-4 md:flex-row">
                <button className="bg-primary flex-1 rounded-xl py-3 font-semibold text-white transition hover:bg-purple-800">
                  View Registered Deals
                </button>

                <button
                  onClick={onClose}
                  className="border-primary text-primary flex-1 rounded-xl border-2 py-3 font-semibold transition hover:bg-purple-50"
                >
                  Back to Home
                </button>
              </div>

              <div className="mt-10 flex flex-col items-center justify-between rounded-2xl border border-gray-200 bg-gray-100 p-6 md:flex-row">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Get Ready for the Deal!</h3>

                  <p className="mt-2 text-gray-500">
                    Add products to wishlist and be ready to shop when it goes live.
                  </p>

                  <button className="bg-primary mt-5 rounded-xl px-8 py-3 font-semibold text-white hover:bg-purple-800">
                    Explore Deals
                  </button>
                </div>

                {/* <div className="mt-6 md:mt-0">
          <img
            src="/shopping-bags.png"
            alt="Shopping"
            className="h-44 object-contain"
          />
        </div> */}
              </div>
            </div>
          </div>
        )}

        {/* ===========================
        FAILED SCREEN
=========================== */}

        {paymentStatus === "failed" && (
          <div className="flex min-h-[600px] flex-col items-center justify-center bg-white px-6 py-10">
            <div className="relative flex items-center justify-center">
              <div className="absolute h-28 w-28 rounded-full bg-red-100" />

              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-red-600">
                <X size={52} strokeWidth={4} className="text-white" />
              </div>
            </div>

            <h2 className="mt-7 text-2xl font-bold text-gray-900">Registration Failed</h2>

            <p className="mt-1 text-base font-semibold text-black/50">
              Payment could not be completed
            </p>

            <div className="mt-6 w-full max-w-[550px] rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="text-secondary text-lg font-semibold">Payment Failed</h3>

              <p className="mt-2 text-[15px] font-semibold leading-5 text-black/50">
                We couldn&apos;t process your payment of{" "}
                <span className="text-secondary font-semibold">₹1</span>.
              </p>

              <p className="text-[15px]  font-semibold text-black/50">
                Please try again or use a different payment method.
              </p>

              <div className="my-4 border-t border-gray-100" />

              <h4 className="text-[15px]  font-bold text-gray-800">Possible Reasons</h4>

              <div className="mt-3 space-y-3">
                <div className="flex items-center gap-2">
                  <CircleAlert size={20} className="text-primary" />
                  <span className="text-[15px] font-semibold text-black/50">
                    Payment failed or was declined
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <CircleAlert size={20} className="text-primary" />
                  <span className="text-[15px] font-semibold text-black/50">
                    Insufficient balance in your account
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <CircleAlert size={20} className="text-primary" />
                  <span className="text-[15px] font-semibold text-black/50">
                    Network issue or server timeout
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <CircleAlert size={20} className="text-primary" />
                  <span className="text-[15px] font-semibold text-black/50">Payment cancelled</span>
                </div>
              </div>
            </div>

            <div className="mt-4 grid w-full max-w-[550px] grid-cols-2 gap-4">
              <button
                onClick={() => setPaymentStatus("payment")}
                className="
          bg-primary
          rounded-lg
          py-3
          text-sm
          font-semibold
          text-white
          shadow-sm
          transition
          hover:from-purple-800
          hover:to-purple-700
        "
              >
                Try Again
              </button>

              <button
                onClick={() => router.push("/deals")}
                className="
          border-primary
          text-primary
          rounded-lg
          border
          border-[2px]
          bg-white
          py-3
          text-sm
          font-semibold
          transition
          hover:bg-purple-50
        "
              >
                Back to Deals
              </button>
            </div>

            {/* Support */}
            <div className="mt-6 w-full max-w-[480px] border-t border-gray-100 pt-6 text-center">
              <p className="flex items-center justify-center gap-2 text-sm text-gray-700">
                <Headphones size={20} strokeWidth={2} className="text-primary" />

                <span className="font-semibold">Need help?</span>

                <button
                  onClick={() => {
                    // support action
                  }}
                  className="text-primary font-semibold hover:underline"
                >
                  Contact our support
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
