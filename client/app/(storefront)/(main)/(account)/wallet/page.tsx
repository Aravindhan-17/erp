"use client";

import React, { useState } from "react";
import {
  CreditCard,
  Wallet,
  Plus,
  Trash2,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";
import { Modal } from "../../../components/modal";

export default function WalletPage() {
  const [walletBalance, setWalletBalance] = useState(120.5);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);

  const [cards, setCards] = useState([
    {
      id: "card_1",
      last4: "4242",
      brand: "Visa",
      expMonth: "12",
      expYear: "24",
      nameOnCard: "John Doe",
      isDefault: true,
    },
  ]);

  const [transactions] = useState([
    {
      id: "trx_1",
      type: "deposit",
      amount: 50.0,
      date: "Aug 10, 2026",
      description: "Store Credit Top-up",
    },
    {
      id: "trx_2",
      type: "purchase",
      amount: -29.5,
      date: "Jul 25, 2026",
      description: "Order #ORD-7392-4821",
    },
    {
      id: "trx_3",
      type: "refund",
      amount: 100.0,
      date: "Jul 15, 2026",
      description: "Refund for Order #ORD-2941-8573",
    },
  ]);

  const handleTopUp = (e: React.FormEvent) => {
    e.preventDefault();
    setWalletBalance((prev) => prev + 50);
    setIsWalletModalOpen(false);
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    setCards([
      ...cards,
      {
        id: `card_${Date.now()}`,
        last4: "8899",
        brand: "Mastercard",
        expMonth: "08",
        expYear: "28",
        nameOnCard: "John Doe",
        isDefault: false,
      },
    ]);
    setIsCardModalOpen(false);
  };

  const setDefaultCard = (id: string) => {
    setCards(cards.map((card) => ({ ...card, isDefault: card.id === id })));
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-6 border-b border-gray-200 pb-6 md:flex-row md:items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment & Wallet</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your payment methods and store credit balance safely.
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column: Wallet & Transactions */}
        <div className="flex flex-col gap-8 lg:col-span-2">
          {/* Store Credit Balance */}
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:flex-row">
            <div className="flex items-center gap-6">
              <div className="rounded-full bg-green-50 p-4 text-green-600">
                <Wallet size={32} />
              </div>
              <div>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-gray-500">
                  Available Store Credit
                </p>
                <p className="text-4xl font-bold text-gray-900">${walletBalance.toFixed(2)}</p>
              </div>
            </div>
            <button
              onClick={() => setIsWalletModalOpen(true)}
              className="bg-primary w-full rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 sm:w-auto"
            >
              Top Up Balance
            </button>
          </div>

          {/* Transaction History */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h2 className="text-lg font-bold text-gray-900">Wallet Transaction History</h2>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-4">
                {transactions.map((trx) => (
                  <div
                    key={trx.id}
                    className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`rounded-full p-2 ${trx.type === "purchase" ? "bg-red-50 text-red-500" : "bg-green-50 text-green-500"}`}
                      >
                        {trx.type === "purchase" ? (
                          <ArrowDownLeft size={16} />
                        ) : (
                          <ArrowUpRight size={16} />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{trx.description}</p>
                        <p className="text-xs text-gray-500">{trx.date}</p>
                      </div>
                    </div>
                    <div
                      className={`font-bold ${trx.type === "purchase" ? "text-gray-900" : "text-green-600"}`}
                    >
                      {trx.type === "purchase" ? "" : "+"}${Math.abs(trx.amount).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Payment Methods */}
        <div className="flex flex-col gap-6">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h2 className="text-lg font-bold text-gray-900">Saved Cards</h2>
              <ShieldCheck size={20} className="text-green-600" />
            </div>
            <div className="flex flex-col gap-4 p-6">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="hover:border-primary rounded-xl border border-gray-200 p-4 transition-all"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-12 items-center justify-center rounded border border-gray-200 bg-gray-100">
                        <CreditCard size={18} className="text-gray-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold capitalize text-gray-900">
                            {card.brand} ending in {card.last4}
                          </p>
                          {card.isDefault && (
                            <span className="text-primary inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-xs font-medium ring-1 ring-inset ring-orange-500/20">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-xs text-gray-500">
                          Expires {card.expMonth}/{card.expYear}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                    <p className="text-xs font-medium text-gray-600">{card.nameOnCard}</p>
                    <div className="flex items-center gap-3">
                      {!card.isDefault && (
                        <button
                          onClick={() => setDefaultCard(card.id)}
                          className="text-xs font-medium text-gray-500 hover:text-gray-900"
                        >
                          Set Default
                        </button>
                      )}
                      <button
                        onClick={() => setCards(cards.filter((c) => c.id !== card.id))}
                        className="flex items-center gap-1 text-xs font-medium text-red-500 hover:underline"
                      >
                        <Trash2 size={12} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={() => setIsCardModalOpen(true)}
                className="hover:border-primary hover:text-primary mt-2 flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 p-4 text-sm font-medium text-gray-500 transition-all"
              >
                <Plus size={18} /> Add New Card
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Top Up Modal */}
      <Modal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        title="Top Up Wallet"
        maxWidth="md"
        footer={
          <button
            form="top-up-form"
            type="submit"
            className="bg-primary w-full rounded-xl py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Confirm & Pay
          </button>
        }
      >
        <div className="flex flex-col gap-6">
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-6 text-center">
            <p className="text-sm text-gray-500">Current Balance</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">${walletBalance.toFixed(2)}</p>
          </div>

          <form id="top-up-form" onSubmit={handleTopUp} className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Top Up Amount</label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  defaultValue={50}
                  className="focus:border-secondary focus:ring-secondary w-full rounded-xl border border-gray-200 py-2 pl-8 pr-4 outline-none focus:ring-1"
                />
              </div>
            </div>
          </form>
        </div>
      </Modal>

      {/* Add Card Modal */}
      <Modal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
        title="Add Payment Method"
        maxWidth="md"
        footer={
          <button
            form="add-card-form"
            type="submit"
            className="bg-primary w-full rounded-xl py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Save Card
          </button>
        }
      >
        <form id="add-card-form" onSubmit={handleAddCard} className="flex flex-col gap-5">
          <div className="flex items-start gap-3 rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
            <ShieldCheck size={20} className="mt-0.5 shrink-0" />
            <p>
              Your payment information is encrypted and securely stored. We never store your full
              card number or CVC.
            </p>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Name on card</label>
            <input
              required
              type="text"
              className="focus:border-secondary focus:ring-secondary w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:ring-1"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Card number</label>
            <div className="relative">
              <CreditCard
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                required
                type="text"
                placeholder="0000 0000 0000 0000"
                className="focus:border-secondary focus:ring-secondary w-full rounded-xl border border-gray-200 p-3 pl-10 text-sm outline-none focus:ring-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Expiration date
              </label>
              <input
                required
                type="text"
                placeholder="MM/YY"
                className="focus:border-secondary focus:ring-secondary w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:ring-1"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Security code (CVC)
              </label>
              <input
                required
                type="text"
                placeholder="123"
                className="focus:border-secondary focus:ring-secondary w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:ring-1"
              />
            </div>
          </div>

          <label className="mt-2 flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              className="text-secondary focus:ring-secondary rounded"
              defaultChecked
            />
            <span className="text-sm text-gray-700">Set as default payment method</span>
          </label>
        </form>
      </Modal>
    </div>
  );
}
