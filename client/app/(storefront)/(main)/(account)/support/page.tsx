"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LifeBuoy,
  MessageSquare,
  Search,
  Plus,
  ExternalLink,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Modal } from "../../../components/modal";

export default function SupportPage() {
  const [tickets] = useState([
    {
      id: "TIC-8492",
      topic: "Return Request",
      orderId: "ORD-1192-3029",
      status: "Open",
      lastUpdated: "Aug 11, 2026 - 14:30",
      messages: 3,
    },
    {
      id: "TIC-7311",
      topic: "Where is my order?",
      orderId: "ORD-9932-1102",
      status: "Resolved",
      lastUpdated: "Jul 28, 2026 - 09:15",
      messages: 5,
    },
    {
      id: "TIC-6204",
      topic: "Product Question",
      orderId: null,
      status: "Resolved",
      lastUpdated: "Jun 15, 2026 - 11:45",
      messages: 2,
    },
  ]);

  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    if (status === "Open") {
      return (
        <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
          <Clock size={12} /> Open
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
        <CheckCircle2 size={12} /> Resolved
      </span>
    );
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTicketModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-6 border-b border-gray-200 pb-6 md:flex-row md:items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Support Center</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your support tickets and get help with your orders.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="group relative hidden sm:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search tickets"
              className="focus:border-primary focus:ring-primary w-full rounded-xl border border-gray-200 py-2 pl-10 pr-4 text-sm outline-none transition-all focus:ring-1 sm:w-64"
            />
          </div>
          <button
            onClick={() => setIsTicketModalOpen(true)}
            className="bg-primary hover:bg-primary/90 flex items-center justify-center gap-2 whitespace-nowrap rounded-xl px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all"
          >
            <Plus size={18} />
            Open New Ticket
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-50 p-3 text-blue-600">
              <LifeBuoy size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">1</p>
              <p className="text-sm font-medium text-gray-500">Open Tickets</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-green-50 p-3 text-green-600">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">2</p>
              <p className="text-sm font-medium text-gray-500">Resolved Tickets</p>
            </div>
          </div>
        </div>
        <a
          href="#"
          className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-900 p-6 text-white shadow-sm transition-colors hover:bg-gray-800"
        >
          <div>
            <p className="font-bold">Help & FAQs</p>
            <p className="mt-1 text-sm text-gray-300">Browse our knowledge base</p>
          </div>
          <ExternalLink size={20} className="text-gray-400" />
        </a>
      </div>

      {/* Ticket List */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
          <h2 className="text-lg font-bold text-gray-900">Your Tickets</h2>
        </div>

        {tickets.length === 0 ? (
          <div className="p-12 text-center">
            <div className="mb-4 inline-flex rounded-full bg-gray-50 p-4 text-gray-400">
              <MessageSquare size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No support tickets</h3>
            <p className="mt-1 text-sm text-gray-500">
              You haven&apos;t opened any support tickets yet.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {tickets.map((ticket) => (
              <Link
                href={`/support/${ticket.id}`}
                key={ticket.id}
                className="flex flex-col justify-between gap-4 p-6 transition-colors hover:bg-gray-50 sm:flex-row sm:items-center"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 rounded-full bg-gray-100 p-2.5 text-gray-500">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center gap-3">
                      <h3 className="font-bold text-gray-900">{ticket.topic}</h3>
                      {getStatusBadge(ticket.status)}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
                      <span>Ticket #{ticket.id}</span>
                      {ticket.orderId && (
                        <>
                          <span className="hidden text-gray-300 sm:inline">•</span>
                          <span>Order {ticket.orderId}</span>
                        </>
                      )}
                      <span className="hidden text-gray-300 sm:inline">•</span>
                      <span>{ticket.messages} Messages</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start text-sm text-gray-500 sm:items-end">
                  <span className="hidden sm:inline-block">Last Updated</span>
                  <span>{ticket.lastUpdated}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Create Ticket Modal */}
      <Modal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
        title="Open New Support Ticket"
        maxWidth="lg"
        footer={
          <button
            form="create-ticket-form"
            type="submit"
            className="bg-primary w-full rounded-xl py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Submit Ticket
          </button>
        }
      >
        <form id="create-ticket-form" onSubmit={handleCreateTicket} className="flex flex-col gap-5">
          <p className="mb-2 text-sm text-gray-500">
            We typically reply within 24 hours. Please provide as much detail as possible so we can
            help you faster.
          </p>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Topic</label>
            <select
              required
              className="focus:border-secondary focus:ring-secondary w-full rounded-xl border border-gray-200 bg-white p-3 text-sm outline-none focus:ring-1"
            >
              <option value="" disabled selected>
                Select a topic
              </option>
              <option value="Where is my order?">Where is my order?</option>
              <option value="Returns & Refunds">Returns & Refunds</option>
              <option value="Product Question">Product Question</option>
              <option value="Payment Issue">Payment Issue</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Order Number (Optional)
            </label>
            <select className="focus:border-secondary focus:ring-secondary w-full rounded-xl border border-gray-200 bg-white p-3 text-sm outline-none focus:ring-1">
              <option value="">I am not asking about a specific order</option>
              <option value="ORD-1192-3029">ORD-1192-3029 (Aug 10, 2026)</option>
              <option value="ORD-9932-1102">ORD-9932-1102 (Jul 25, 2026)</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Message</label>
            <textarea
              required
              rows={5}
              placeholder="Describe your issue..."
              className="focus:border-secondary focus:ring-secondary w-full resize-none rounded-xl border border-gray-200 p-3 text-sm outline-none focus:ring-1"
            ></textarea>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Attachments (Optional)
            </label>
            <div className="flex w-full items-center justify-center">
              <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 5MB)</p>
                </div>
                <input type="file" className="hidden" />
              </label>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
