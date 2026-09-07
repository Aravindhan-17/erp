import { Link } from "@tanstack/react-router";
import { ChevronRight, Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { products } from '@/features/flash-deals/products/lib/product-data';



export default function Cart() {
  // Use dummy items for the cart based on the products data
  const cartItems = [
    { ...products[0], quantity: 1 },
    { ...products[1], quantity: 2 },
  ];

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.flashPrice || item.originalPrice) * item.quantity,
    0
  );

  const shipping = 50; // Flat dummy shipping fee
  const total = subtotal + shipping;

  return (
    <div className="font-poppins relative mx-auto w-full max-w-[1920px] px-4 py-10 md:px-8 xl:px-10">
      {/* Breadcrumbs */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-black">
            Home
          </Link>
          <ChevronRight size={14} />
          <span className="font-medium text-black">Shopping Cart</span>
        </nav>
      </div>

      <h1 className="mb-8 text-3xl font-extrabold text-gray-900 md:text-4xl">Shopping Cart</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Cart Items */}
        <div className="lg:col-span-8">
          <div className="rounded-2xl border border-gray-200 bg-white">
            <div className="hidden border-b border-gray-100 p-6 md:grid md:grid-cols-12 md:gap-4">
              <div className="col-span-6 text-sm font-semibold text-gray-500">Product</div>
              <div className="col-span-2 text-center text-sm font-semibold text-gray-500">
                Price
              </div>
              <div className="col-span-2 text-center text-sm font-semibold text-gray-500">
                Quantity
              </div>
              <div className="col-span-2 text-right text-sm font-semibold text-gray-500">Total</div>
            </div>

            <div className="divide-y divide-gray-100">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 items-center gap-4 p-6 md:grid-cols-12"
                >
                  {/* Product Info */}
                  <div className="col-span-6 flex gap-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-50 md:h-24 md:w-24">
                      <img src={item.image} alt={item.name} className="object-contain p-2" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <Link
                        to="/"
                        className="hover:text-primary line-clamp-2 font-semibold text-gray-900"
                      >
                        {item.name}
                      </Link>
                      <p className="mt-1 text-xs text-gray-500">{item.category}</p>
                      {/* Mobile price */}
                      <p className="mt-2 font-bold text-gray-900 md:hidden">
                        ₹{(item.flashPrice || item.originalPrice).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-2 hidden text-center font-semibold text-gray-900 md:block">
                    ₹{(item.flashPrice || item.originalPrice).toLocaleString()}
                  </div>

                  {/* Quantity */}
                  <div className="col-span-2 flex items-center justify-between md:justify-center">
                    <div className="flex h-10 w-28 items-center justify-between overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                      <button className="flex h-full w-8 items-center justify-center hover:bg-gray-100">
                        <Minus size={14} />
                      </button>
                      <span className="font-semibold text-gray-900">{item.quantity}</span>
                      <button className="flex h-full w-8 items-center justify-center hover:bg-gray-100">
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="col-span-2 flex items-center justify-between md:justify-end">
                    <span className="font-bold text-gray-900">
                      ₹{((item.flashPrice || item.originalPrice) * item.quantity).toLocaleString()}
                    </span>
                    <button className="text-gray-400 hover:text-red-500 md:ml-4">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <h2 className="mb-6 text-xl font-bold text-gray-900">Order Summary</h2>

            <div className="space-y-4 border-b border-gray-200 pb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Estimated Shipping</span>
                <span className="font-medium text-gray-900">₹{shipping.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Taxes</span>
                <span className="font-medium text-gray-900">Calculated at checkout</span>
              </div>
            </div>

            <div className="flex justify-between py-6">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-2xl font-extrabold text-gray-900">
                ₹{total.toLocaleString()}
              </span>
            </div>

            <Link
              to="/checkout"
              className="bg-primary flex w-full items-center justify-center gap-2 rounded-xl py-4 font-bold text-white transition-opacity hover:opacity-90"
            >
              Proceed to Checkout
              <ArrowRight size={18} />
            </Link>

            <div className="mt-4 text-center">
              <Link
                to="/"
                className="text-sm font-semibold text-gray-500 hover:text-gray-900 hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
