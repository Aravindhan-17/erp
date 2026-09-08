import React, { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { Modal } from "@/components/modal";

export function AddressesPage() {
  const [addresses, setAddresses] = useState([
    {
      id: "addr_1",
      name: "Home",
      fullName: "John Doe",
      phone: "+1 (555) 123-4567",
      addressLine1: "123 E-commerce St",
      addressLine2: "Suite 100",
      city: "San Francisco",
      state: "CA",
      zip: "94107",
      country: "United States",
      deliveryInstructions: "Please leave package at the front desk.",
      isDefaultShipping: true,
      isDefaultBilling: true,
    },
  ]);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setAddresses([
      ...addresses,
      {
        id: `addr_${Date.now()}`,
        name: "Work",
        fullName: "John Doe",
        phone: "+1 (555) 987-6543",
        addressLine1: "456 Tech Boulevard",
        addressLine2: "",
        city: "San Jose",
        state: "CA",
        zip: "95112",
        country: "United States",
        deliveryInstructions: "",
        isDefaultShipping: false,
        isDefaultBilling: false,
      },
    ]);
    setIsAddressModalOpen(false);
  };

  const setDefaultAddress = (id: string, type: "shipping" | "billing") => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefaultShipping: type === "shipping" ? addr.id === id : addr.isDefaultShipping,
        isDefaultBilling: type === "billing" ? addr.id === id : addr.isDefaultBilling,
      }))
    );
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-6 border-b border-gray-200 pb-6 md:flex-row md:items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Your Addresses</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your shipping and billing addresses for faster checkout.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Add Address Card */}
        <button
          onClick={() => setIsAddressModalOpen(true)}
          className="hover:border-secondary hover:text-secondary hover:bg-secondary/5 min-h-70 flex h-full flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-6 text-gray-500 transition-all"
        >
          <div className="rounded-full border border-gray-100 bg-white p-3 shadow-sm">
            <Plus size={32} />
          </div>
          <span className="text-lg font-bold">Add Address</span>
        </button>

        {/* Existing Addresses */}
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="relative flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900">{addr.name}</span>
                  {(addr.isDefaultShipping || addr.isDefaultBilling) && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {addr.isDefaultShipping && (
                        <span className="text-secondary inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-xs font-medium ring-1 ring-inset ring-orange-500/20">
                          Default Shipping
                        </span>
                      )}
                      {addr.isDefaultBilling && (
                        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                          Default Billing
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <p className="mb-2 font-semibold text-gray-900">{addr.fullName}</p>
              <div className="space-y-1 text-sm text-gray-600">
                <p>{addr.addressLine1}</p>
                {addr.addressLine2 && <p>{addr.addressLine2}</p>}
                <p>
                  {addr.city}, {addr.state} {addr.zip}
                </p>
                <p>{addr.country}</p>
                <p className="pt-2">Phone number: {addr.phone}</p>
              </div>
              {addr.deliveryInstructions && (
                <div className="mt-4 rounded-lg border border-gray-100 bg-gray-50 p-3 text-xs text-gray-600">
                  <span className="mb-1 block font-semibold text-gray-900">
                    Delivery Instructions:
                  </span>
                  {addr.deliveryInstructions}
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-3 border-t border-gray-100 pt-4">
              <div className="flex items-center gap-4">
                <button className="text-secondary flex items-center gap-1 text-sm font-medium hover:underline">
                  <Edit2 size={14} /> Edit
                </button>
                <span className="text-gray-300">|</span>
                <button
                  onClick={() => setAddresses(addresses.filter((a) => a.id !== addr.id))}
                  className="flex items-center gap-1 text-sm font-medium text-red-500 hover:underline"
                >
                  <Trash2 size={14} /> Remove
                </button>
              </div>

              <div className="mt-2 flex flex-col gap-2">
                {!addr.isDefaultShipping && (
                  <button
                    onClick={() => setDefaultAddress(addr.id, "shipping")}
                    className="text-left text-sm text-gray-500 hover:text-gray-900"
                  >
                    Set as Default Shipping
                  </button>
                )}
                {!addr.isDefaultBilling && (
                  <button
                    onClick={() => setDefaultAddress(addr.id, "billing")}
                    className="text-left text-sm text-gray-500 hover:text-gray-900"
                  >
                    Set as Default Billing
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Address Modal */}
      <Modal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        title="Add a new address"
        maxWidth="lg"
        footer={
          <button
            form="add-address-form"
            type="submit"
            className="bg-primary w-full rounded-xl py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Save Address
          </button>
        }
      >
        <form id="add-address-form" onSubmit={handleAddAddress} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-5">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Save address as (e.g., Home, Work)
              </label>
              <input
                required
                type="text"
                className="focus:border-secondary focus:ring-secondary w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:ring-1"
                placeholder="Home"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Full Name</label>
              <input
                required
                type="text"
                className="focus:border-secondary focus:ring-secondary w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:ring-1"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                required
                type="tel"
                className="focus:border-secondary focus:ring-secondary w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:ring-1"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Address Line 1</label>
              <input
                required
                type="text"
                className="focus:border-secondary focus:ring-secondary w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:ring-1"
                placeholder="Street address, P.O. box, company name, c/o"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Address Line 2 (Optional)
              </label>
              <input
                type="text"
                className="focus:border-secondary focus:ring-secondary w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:ring-1"
                placeholder="Apartment, suite, unit, building, floor, etc."
              />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">City</label>
                <input
                  required
                  type="text"
                  className="focus:border-secondary focus:ring-secondary w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:ring-1"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  State / Province
                </label>
                <input
                  required
                  type="text"
                  className="focus:border-secondary focus:ring-secondary w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:ring-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  ZIP / Postal Code
                </label>
                <input
                  required
                  type="text"
                  className="focus:border-secondary focus:ring-secondary w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:ring-1"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Country / Region
                </label>
                <select
                  required
                  className="focus:border-secondary focus:ring-secondary w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:ring-1"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Delivery Instructions (Optional)
              </label>
              <textarea
                className="focus:border-secondary focus:ring-secondary h-24 w-full resize-none rounded-xl border border-gray-200 p-3 text-sm outline-none focus:ring-1"
                placeholder="Notes about finding your home, gate codes, or leaving packages."
              ></textarea>
            </div>

            <div className="flex flex-col gap-2">
              <label className="flex cursor-pointer items-center gap-2">
                <input type="checkbox" className="text-secondary focus:ring-secondary rounded" />
                <span className="text-sm text-gray-700">Make this my default shipping address</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <input type="checkbox" className="text-secondary focus:ring-secondary rounded" />
                <span className="text-sm text-gray-700">Make this my default billing address</span>
              </label>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
