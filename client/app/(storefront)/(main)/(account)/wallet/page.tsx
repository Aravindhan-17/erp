"use client";

import React, { useState } from "react";
import { CreditCard, Wallet, Plus, Trash2, ShieldCheck, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Modal } from "../../../components/modal";

export default function WalletPage() {
  const [walletBalance, setWalletBalance] = useState(120.50);
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
    }
  ]);

  const [transactions] = useState([
    { id: "trx_1", type: "deposit", amount: 50.00, date: "Aug 10, 2026", description: "Store Credit Top-up" },
    { id: "trx_2", type: "purchase", amount: -29.50, date: "Jul 25, 2026", description: "Order #ORD-7392-4821" },
    { id: "trx_3", type: "refund", amount: 100.00, date: "Jul 15, 2026", description: "Refund for Order #ORD-2941-8573" },
  ]);

  const handleTopUp = (e: React.FormEvent) => {
    e.preventDefault();
    setWalletBalance(prev => prev + 50);
    setIsWalletModalOpen(false);
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    setCards([...cards, {
      id: `card_${Date.now()}`,
      last4: "8899",
      brand: "Mastercard",
      expMonth: "08",
      expYear: "28",
      nameOnCard: "John Doe",
      isDefault: false,
    }]);
    setIsCardModalOpen(false);
  };

  const setDefaultCard = (id: string) => {
    setCards(cards.map(card => ({ ...card, isDefault: card.id === id })));
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment & Wallet</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your payment methods and store credit balance safely.</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column: Wallet & Transactions */}
        <div className="flex flex-col gap-8 lg:col-span-2">
          
          {/* Store Credit Balance */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="rounded-full bg-green-50 p-4 text-green-600">
                <Wallet size={32} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Available Store Credit</p>
                <p className="text-4xl font-bold text-gray-900">${walletBalance.toFixed(2)}</p>
              </div>
            </div>
            <button 
              onClick={() => setIsWalletModalOpen(true)}
              className="w-full sm:w-auto rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 shadow-sm"
            >
              Top Up Balance
            </button>
          </div>

          {/* Transaction History */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h2 className="text-lg font-bold text-gray-900">Wallet Transaction History</h2>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-4">
                {transactions.map(trx => (
                  <div key={trx.id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-4">
                      <div className={`rounded-full p-2 ${trx.type === 'purchase' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>
                        {trx.type === 'purchase' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{trx.description}</p>
                        <p className="text-xs text-gray-500">{trx.date}</p>
                      </div>
                    </div>
                    <div className={`font-bold ${trx.type === 'purchase' ? 'text-gray-900' : 'text-green-600'}`}>
                      {trx.type === 'purchase' ? '' : '+'}${Math.abs(trx.amount).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Payment Methods */}
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Saved Cards</h2>
              <ShieldCheck size={20} className="text-green-600" />
            </div>
            <div className="p-6 flex flex-col gap-4">
              {cards.map(card => (
                <div key={card.id} className="rounded-xl border border-gray-200 p-4 transition-all hover:border-primary">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-12 rounded bg-gray-100 border border-gray-200 flex items-center justify-center">
                        <CreditCard size={18} className="text-gray-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-gray-900 capitalize">{card.brand} ending in {card.last4}</p>
                          {card.isDefault && (
                            <span className="inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-orange-500/20">Default</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">Expires {card.expMonth}/{card.expYear}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                    <p className="text-xs text-gray-600 font-medium">{card.nameOnCard}</p>
                    <div className="flex items-center gap-3">
                      {!card.isDefault && (
                        <button onClick={() => setDefaultCard(card.id)} className="text-xs font-medium text-gray-500 hover:text-gray-900">
                          Set Default
                        </button>
                      )}
                      <button 
                        onClick={() => setCards(cards.filter(c => c.id !== card.id))}
                        className="text-xs font-medium text-red-500 hover:underline flex items-center gap-1"
                      >
                        <Trash2 size={12} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <button 
                onClick={() => setIsCardModalOpen(true)}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 p-4 text-sm font-medium text-gray-500 hover:border-primary hover:text-primary transition-all"
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
          <button form="top-up-form" type="submit" className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity">
            Confirm & Pay
          </button>
        }
      >
        <div className="flex flex-col gap-6">
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-6 text-center">
            <p className="text-sm text-gray-500">Current Balance</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">${walletBalance.toFixed(2)}</p>
          </div>
          
          <form id="top-up-form" onSubmit={handleTopUp} className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Top Up Amount</label>
              <div className="mt-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input 
                  type="number" 
                  defaultValue={50}
                  className="w-full rounded-xl border border-gray-200 py-2 pl-8 pr-4 outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
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
          <button form="add-card-form" type="submit" className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity">
            Save Card
          </button>
        }
      >
        <form id="add-card-form" onSubmit={handleAddCard} className="flex flex-col gap-5">
          <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800 flex items-start gap-3">
            <ShieldCheck size={20} className="shrink-0 mt-0.5" />
            <p>Your payment information is encrypted and securely stored. We never store your full card number or CVC.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name on card</label>
            <input required type="text" className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Card number</label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input required type="text" placeholder="0000 0000 0000 0000" className="w-full rounded-xl border border-gray-200 p-3 pl-10 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiration date</label>
              <input required type="text" placeholder="MM/YY" className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Security code (CVC)</label>
              <input required type="text" placeholder="123" className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer mt-2">
            <input type="checkbox" className="rounded text-secondary focus:ring-secondary" defaultChecked />
            <span className="text-sm text-gray-700">Set as default payment method</span>
          </label>
        </form>
      </Modal>
    </div>
  );
}
