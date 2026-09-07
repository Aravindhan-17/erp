import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  ChevronRight,
  CreditCard,
  Lock,
  MapPin,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Package,
  XCircle,
  RefreshCcw,
  HeadphonesIcon,
  Check,
} from "lucide-react";
import { products } from '@/features/flash-deals/products/lib/product-data';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zip: z.string().min(5, "ZIP code is required"),
  cardNumber: z.string().regex(/^\d{16}$/, "Must be 16 digits"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Format MM/YY"),
  cvv: z.string().regex(/^\d{3,4}$/, "Must be 3 or 4 digits"),
  cardName: z.string().min(2, "Name on card is required"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

type CheckoutState = "checkout" | "processing" | "success" | "failed";

export default function Checkout() {
  const [currentState, setCurrentState] = useState<CheckoutState>("checkout");
  const [orderId, setOrderId] = useState<string | null>(null);

  const cartItems = [
    { ...products[0], quantity: 1 },
    { ...products[1], quantity: 2 },
  ];

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.flashPrice || item.originalPrice) * item.quantity,
    0
  );

  const shipping = 50;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = () => {
    setCurrentState("processing");
  };

  return (
    <div className="font-poppins relative mx-auto w-full max-w-[1920px] px-4 py-10 md:px-8 xl:px-10">
      {currentState === "checkout" && (
        <CheckoutFormView
          cartItems={cartItems}
          subtotal={subtotal}
          shipping={shipping}
          tax={tax}
          total={total}
          onPlaceOrder={handlePlaceOrder}
        />
      )}

      {currentState === "processing" && (
        <ProcessingView
          onSuccess={(id: string) => {
            setOrderId(id);
            setCurrentState("success");
          }}
          onFail={() => setCurrentState("failed")}
          total={total}
        />
      )}

      {currentState === "success" && (
        <SuccessView
          cartItems={cartItems}
          subtotal={subtotal}
          shipping={shipping}
          tax={tax}
          total={total}
          orderNumber={orderId || "FE-84920491"}
        />
      )}

      {currentState === "failed" && <FailedView onRetry={() => setCurrentState("checkout")} />}
    </div>
  );
}

// ---------------------------------------------------------
// Sub-Components (Kept in same file for Single-Page simplicity)
// ---------------------------------------------------------

interface CartItem {
  id: string | number;
  image: string;
  name: string;
  category: string;
  quantity: number;
  flashPrice?: number;
  originalPrice: number;
}

interface CheckoutFormViewProps {
  cartItems: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  onPlaceOrder: () => void;
}

function CheckoutFormView({
  cartItems,
  subtotal,
  shipping,
  tax,
  total,
  onPlaceOrder,
}: CheckoutFormViewProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = (_data: CheckoutFormData) => {
    onPlaceOrder();
  };

  return (
    <>
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link to="/cart" className="hover:text-primary transition-colors">
            Cart
          </Link>
          <ChevronRight size={14} />
          <span className="font-medium text-black">Checkout</span>
        </nav>
      </div>

      <section className="mb-10">
        <h1 className="font-poppins text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
          Checkout
        </h1>
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* LEFT: Forms */}
        <div className="lg:col-span-7 xl:col-span-8">
          <form
            id="checkout-form"
            className="space-y-6 xl:space-y-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Contact Info */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="mb-6 flex items-center gap-3 text-xl font-bold text-gray-900">
                <span className="bg-primary flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-white">
                  1
                </span>
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="firstName" className="text-sm font-semibold text-gray-700">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      {...register("firstName")}
                      type="text"
                      placeholder="John"
                      className={`rounded-xl border ${errors.firstName ? "border-red-500 ring-1 ring-red-500" : "focus:border-primary focus:ring-primary border-gray-200 focus:ring-1"} bg-gray-50 px-4 py-3.5 text-sm outline-none transition-colors focus:bg-white`}
                    />
                    {errors.firstName && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.firstName.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="lastName" className="text-sm font-semibold text-gray-700">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      {...register("lastName")}
                      type="text"
                      placeholder="Doe"
                      className={`rounded-xl border ${errors.lastName ? "border-red-500 ring-1 ring-red-500" : "focus:border-primary focus:ring-primary border-gray-200 focus:ring-1"} bg-gray-50 px-4 py-3.5 text-sm outline-none transition-colors focus:bg-white`}
                    />
                    {errors.lastName && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.lastName.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                      Email Address
                    </label>
                    <input
                      id="email"
                      {...register("email")}
                      type="email"
                      placeholder="john@example.com"
                      className={`rounded-xl border ${errors.email ? "border-red-500 ring-1 ring-red-500" : "focus:border-primary focus:ring-primary border-gray-200 focus:ring-1"} bg-gray-50 px-4 py-3.5 text-sm outline-none transition-colors focus:bg-white`}
                    />
                    {errors.email && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      {...register("phone")}
                      type="tel"
                      placeholder="+91 98765 43210"
                      className={`rounded-xl border ${errors.phone ? "border-red-500 ring-1 ring-red-500" : "focus:border-primary focus:ring-primary border-gray-200 focus:ring-1"} bg-gray-50 px-4 py-3.5 text-sm outline-none transition-colors focus:bg-white`}
                    />
                    {errors.phone && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.phone.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Shipping Address */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="mb-6 flex items-center gap-3 text-xl font-bold text-gray-900">
                <span className="bg-primary flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-white">
                  2
                </span>
                Shipping Address
              </h2>
              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="address" className="text-sm font-semibold text-gray-700">
                    Street Address
                  </label>
                  <input
                    id="address"
                    {...register("address")}
                    type="text"
                    placeholder="123 Main St, Apartment 4B"
                    className={`rounded-xl border ${errors.address ? "border-red-500 ring-1 ring-red-500" : "focus:border-primary focus:ring-primary border-gray-200 focus:ring-1"} bg-gray-50 px-4 py-3.5 text-sm outline-none transition-colors focus:bg-white`}
                  />
                  {errors.address && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.address.message}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="flex flex-col gap-1.5 md:col-span-1">
                    <label htmlFor="city" className="text-sm font-semibold text-gray-700">
                      City
                    </label>
                    <input
                      id="city"
                      {...register("city")}
                      type="text"
                      placeholder="Bangalore"
                      className={`rounded-xl border ${errors.city ? "border-red-500 ring-1 ring-red-500" : "focus:border-primary focus:ring-primary border-gray-200 focus:ring-1"} bg-gray-50 px-4 py-3.5 text-sm outline-none transition-colors focus:bg-white`}
                    />
                    {errors.city && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.city.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5 md:col-span-1">
                    <label htmlFor="state" className="text-sm font-semibold text-gray-700">
                      State
                    </label>
                    <select
                      id="state"
                      {...register("state")}
                      className={`rounded-xl border ${errors.state ? "border-red-500 ring-1 ring-red-500" : "focus:border-primary focus:ring-primary border-gray-200 focus:ring-1"} bg-gray-50 px-4 py-3.5 text-sm outline-none transition-colors focus:bg-white`}
                    >
                      <option value="">Select State</option>
                      <option value="karnataka">Karnataka</option>
                      <option value="maharashtra">Maharashtra</option>
                      <option value="delhi">Delhi</option>
                    </select>
                    {errors.state && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.state.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5 md:col-span-1">
                    <label htmlFor="zip" className="text-sm font-semibold text-gray-700">
                      ZIP / Postal Code
                    </label>
                    <input
                      id="zip"
                      {...register("zip")}
                      type="text"
                      placeholder="560001"
                      className={`rounded-xl border ${errors.zip ? "border-red-500 ring-1 ring-red-500" : "focus:border-primary focus:ring-primary border-gray-200 focus:ring-1"} bg-gray-50 px-4 py-3.5 text-sm outline-none transition-colors focus:bg-white`}
                    />
                    {errors.zip && (
                      <span className="text-xs font-medium text-red-500">{errors.zip.message}</span>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-3 rounded-xl border border-purple-100 bg-purple-50/50 p-4">
                  <div className="rounded-full bg-white p-2 shadow-sm">
                    <Truck size={18} className="text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    Standard Delivery (3-5 Business Days)
                  </span>
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
              <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <h2 className="flex items-center gap-3 text-xl font-bold text-gray-900">
                  <span className="bg-primary flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-white">
                    3
                  </span>
                  Payment Method
                </h2>
                <div className="flex items-center gap-1.5 text-xs font-bold text-green-600">
                  <Lock size={14} />
                  Secure Encryption
                </div>
              </div>

              <div className="space-y-4">
                <label className="border-primary flex cursor-pointer flex-col gap-4 rounded-xl border-2 bg-purple-50/20 p-5 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="border-primary flex h-5 w-5 items-center justify-center rounded-full border-[6px] bg-white"></div>
                      <span className="font-bold text-gray-900">Credit / Debit Card</span>
                    </div>
                    <CreditCard size={20} className="text-primary" />
                  </div>
                  <div className="space-y-4 pt-2">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="cardNumber"
                        className="text-xs font-semibold uppercase tracking-wide text-gray-500"
                      >
                        Card Number
                      </label>
                      <input
                        id="cardNumber"
                        {...register("cardNumber")}
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        className={`rounded-xl border ${errors.cardNumber ? "border-red-500 ring-1 ring-red-500" : "focus:border-primary focus:ring-primary border-gray-200 focus:ring-1"} bg-white px-4 py-3.5 text-sm font-medium outline-none transition-colors`}
                      />
                      {errors.cardNumber && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.cardNumber.message}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="expiry"
                          className="text-xs font-semibold uppercase tracking-wide text-gray-500"
                        >
                          Expiry Date
                        </label>
                        <input
                          id="expiry"
                          {...register("expiry")}
                          type="text"
                          placeholder="MM/YY"
                          className={`rounded-xl border ${errors.expiry ? "border-red-500 ring-1 ring-red-500" : "focus:border-primary focus:ring-primary border-gray-200 focus:ring-1"} bg-white px-4 py-3.5 text-sm font-medium outline-none transition-colors`}
                        />
                        {errors.expiry && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.expiry.message}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="cvv"
                          className="text-xs font-semibold uppercase tracking-wide text-gray-500"
                        >
                          CVV
                        </label>
                        <input
                          id="cvv"
                          {...register("cvv")}
                          type="text"
                          placeholder="123"
                          className={`rounded-xl border ${errors.cvv ? "border-red-500 ring-1 ring-red-500" : "focus:border-primary focus:ring-primary border-gray-200 focus:ring-1"} bg-white px-4 py-3.5 text-sm font-medium outline-none transition-colors`}
                        />
                        {errors.cvv && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.cvv.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="cardName"
                        className="text-xs font-semibold uppercase tracking-wide text-gray-500"
                      >
                        Name on Card
                      </label>
                      <input
                        id="cardName"
                        {...register("cardName")}
                        type="text"
                        placeholder="John Doe"
                        className={`rounded-xl border ${errors.cardName ? "border-red-500 ring-1 ring-red-500" : "focus:border-primary focus:ring-primary border-gray-200 focus:ring-1"} bg-white px-4 py-3.5 text-sm font-medium outline-none transition-colors`}
                      />
                      {errors.cardName && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.cardName.message}
                        </span>
                      )}
                    </div>
                  </div>
                </label>
              </div>
            </section>
          </form>
        </div>

        {/* RIGHT: Order Summary */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="sticky top-24 rounded-2xl border border-gray-200 bg-gray-50 p-6 xl:p-8">
            <h2 className="mb-6 text-xl font-bold text-gray-900">Order Summary</h2>
            <div className="mb-6 space-y-5 border-b border-gray-200 pb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative h-16 w-16 shrink-0">
                    <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                      <img
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="h-full w-full object-contain p-2"
                      />
                    </div>
                    <span className="bg-primary absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold text-white shadow-sm ring-2 ring-white">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="line-clamp-2 text-sm font-semibold text-gray-900">{item.name}</p>
                    <p className="mt-1 text-xs font-medium text-gray-500">{item.category}</p>
                  </div>
                  <div className="font-bold text-gray-900">
                    ₹{((item.flashPrice || item.originalPrice) * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t border-gray-200 pb-6 pt-6">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-600">Subtotal</span>
                <span className="font-bold text-gray-900">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-600">Shipping</span>
                <span className="font-bold text-gray-900">₹{shipping.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-600">Estimated Tax</span>
                <span className="font-bold text-gray-900">₹{tax.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-end justify-between border-t border-gray-200 pt-6">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-primary text-3xl font-extrabold">
                ₹{total.toLocaleString()}
              </span>
            </div>

            <button
              form="checkout-form"
              type="submit"
              className="bg-primary mt-8 flex w-full items-center justify-center gap-2 rounded-xl py-4 text-base font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              Place Order & Pay
            </button>

            <div className="mt-6 flex flex-col items-center justify-center gap-3 border-t border-gray-200 pt-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                <ShieldCheck size={16} className="text-primary" />
                Safe & Secure Payments
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface ProcessingViewProps {
  onSuccess: (orderId: string) => void;
  onFail: () => void;
  total: number;
}

function ProcessingView({ onSuccess, onFail, total }: ProcessingViewProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["Verifying Payment", "Processing", "Confirming Order"];

  useEffect(() => {
    const timers = [
      setTimeout(() => setCurrentStep(1), 1000),
      setTimeout(() => setCurrentStep(2), 2000),
      setTimeout(() => {
        if (Math.random() > 0.1) onSuccess(`FE-${Math.floor(Math.random() * 100000000)}`);
        else onFail();
      }, 3500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onSuccess, onFail]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#2d2a4a] p-4 sm:p-8">
      <div className="rounded-4xl relative w-full max-w-2xl bg-white p-8 pt-16 text-center shadow-2xl sm:p-12 sm:pt-20">
        <h1 className="mb-2 text-2xl font-extrabold text-gray-900 sm:text-3xl">
          Processing Your Order
        </h1>
        <p className="mb-12 text-gray-500">Please do not close or refresh this page.</p>

        <div className="relative mb-16 flex justify-between">
          <div className="absolute left-0 top-6 h-0.5 w-full bg-gray-200" />
          <div
            className="bg-primary absolute left-0 top-6 h-0.5 transition-all duration-500"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
          {steps.map((step, idx) => {
            const isCompleted = idx < currentStep;
            const isCurrent = idx === currentStep;
            return (
              <div key={step} className="relative z-10 flex flex-col items-center">
                <div
                  className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white transition-colors ${isCompleted ? "border-primary bg-primary text-white" : isCurrent ? "border-primary text-primary" : "border-gray-200 text-gray-300"}`}
                >
                  {isCompleted ? (
                    <Check size={20} strokeWidth={3} />
                  ) : (
                    <div
                      className={`h-3 w-3 rounded-full ${isCurrent ? "bg-primary" : "bg-gray-200"}`}
                    />
                  )}
                </div>
                <p
                  className={`text-sm font-semibold sm:text-base ${isCurrent || isCompleted ? "text-primary" : "text-gray-400"}`}
                >
                  {step}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mb-6 flex justify-center">
          <div className="border-t-primary h-16 w-16 animate-spin rounded-full border-4 border-gray-100" />
        </div>
        <p className="text-lg font-medium text-gray-600">This will only take a few seconds...</p>
        <p className="mt-2 text-xl font-bold text-gray-900">Total: ₹{total.toLocaleString()}</p>
      </div>
    </div>
  );
}

interface SuccessViewProps {
  cartItems: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  orderNumber: string;
}

function SuccessView({ cartItems, subtotal, shipping, tax, total, orderNumber }: SuccessViewProps) {
  return (
    <div className="mx-auto max-w-4xl py-6">
      <div className="mb-10 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 size={40} className="text-green-600" />
        </div>
        <h1 className="mb-3 text-3xl font-extrabold text-gray-900 md:text-4xl">
          Thank you for your order!
        </h1>
        <p className="text-base text-gray-500">
          Your order <span className="font-semibold text-gray-900">#{orderNumber}</span> has been
          successfully placed.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        <div className="md:col-span-7 xl:col-span-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-6 border-b border-gray-200 pb-4 text-xl font-bold text-gray-900">
              Order Items
            </h2>
            <div className="space-y-6">
              {(
                cartItems as {
                  id: string;
                  image: string;
                  name: string;
                  quantity: number;
                  flashPrice?: number;
                  originalPrice: number;
                }[]
              ).map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative h-16 w-16 shrink-0 rounded-xl border border-gray-100 bg-white p-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="h-full w-full object-contain"
                    />
                    <span className="bg-primary absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold text-white ring-2 ring-white">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="line-clamp-2 text-sm font-semibold text-gray-900">{item.name}</p>
                  </div>
                  <div className="font-bold text-gray-900">
                    ₹{((item.flashPrice || item.originalPrice) * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 space-y-4 border-t border-gray-200 pt-6 text-sm">
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Subtotal</span>
                <span className="font-bold text-gray-900">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Shipping</span>
                <span className="font-bold text-gray-900">₹{shipping.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Tax</span>
                <span className="font-bold text-gray-900">₹{tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-4">
                <span className="text-base font-bold text-gray-900">Total Paid</span>
                <span className="text-primary text-2xl font-extrabold">
                  ₹{total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6 md:col-span-5 xl:col-span-4">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-gray-900">
              <MapPin size={18} className="text-primary" />
              Shipping Address
            </h3>
            <div className="text-sm text-gray-600">
              <p className="font-semibold text-gray-900">John Doe</p>
              <p>123 Main St, Bangalore</p>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-gray-900">
              <Package size={18} className="text-primary" />
              Delivery Estimate
            </h3>
            <p className="text-sm font-bold text-gray-900">Standard Delivery</p>
          </div>
        </div>
      </div>
      <div className="mt-10 text-center">
        <Link
          to="/"
          className="bg-primary inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-bold text-white shadow-sm transition-opacity hover:opacity-90"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

interface FailedViewProps {
  onRetry: () => void;
}

function FailedView({ onRetry }: FailedViewProps) {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-center justify-center py-20 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
        <XCircle size={48} className="text-red-600" />
      </div>
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 md:text-4xl">Payment Failed</h1>
      <p className="mb-8 text-base text-gray-500">
        We couldn&apos;t process your payment. Please try again.
      </p>
      <div className="flex w-full flex-col justify-center gap-4 sm:flex-row">
        <button
          onClick={onRetry}
          className="bg-primary flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-base font-bold text-white shadow-sm transition-opacity hover:opacity-90"
        >
          <RefreshCcw size={18} />
          Try Again
        </button>
        <Link
          to="/"
          className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-8 py-4 text-base font-bold text-gray-700 transition-colors hover:bg-gray-50"
        >
          <HeadphonesIcon size={18} />
          Support
        </Link>
      </div>
    </div>
  );
}
