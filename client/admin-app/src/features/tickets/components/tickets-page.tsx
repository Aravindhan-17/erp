import { Search, Filter, MessageSquare, AlertCircle, Clock, CheckCircle2 } from "lucide-react";

export function TicketsPage() {
  const tickets = [
    { id: "T-1001", customer: "John Doe", subject: "Order not received", status: "OPEN", priority: "HIGH", date: "2 hours ago" },
    { id: "T-1002", customer: "Jane Smith", subject: "Refund request", status: "IN_PROGRESS", priority: "MEDIUM", date: "1 day ago" },
    { id: "T-1003", customer: "Alice Johnson", subject: "Account login issue", status: "RESOLVED", priority: "LOW", date: "3 days ago" },
  ];

  return (
    <div className="font-poppins min-w-0">
      <div className="mb-7 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">Support Tickets</h1>
          <p className="mt-1 text-sm text-gray-500">Manage customer inquiries and issues.</p>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex h-11 w-full flex-1 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 shadow-sm transition-colors focus-within:border-primary sm:max-w-md">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search tickets by ID or customer..."
            className="h-full w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
          />
        </div>
        <button className="flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50">
          <Filter size={18} />
          Filter
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_4px_20px_rgba(30,20,80,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/80 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-6 py-4">Ticket ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4">Created</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="group transition-colors hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-medium text-gray-900">{ticket.id}</td>
                  <td className="px-6 py-4">{ticket.customer}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">{ticket.subject}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium ${
                      ticket.status === 'OPEN' ? 'bg-yellow-100 text-yellow-800' :
                      ticket.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {ticket.status === 'OPEN' && <AlertCircle size={14} />}
                      {ticket.status === 'IN_PROGRESS' && <Clock size={14} />}
                      {ticket.status === 'RESOLVED' && <CheckCircle2 size={14} />}
                      {ticket.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ${
                      ticket.priority === 'HIGH' ? 'bg-red-100 text-red-800' :
                      ticket.priority === 'MEDIUM' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{ticket.date}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="inline-flex items-center justify-center rounded-lg bg-gray-100 p-2 text-gray-500 transition-colors hover:bg-primary hover:text-white">
                      <MessageSquare size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
