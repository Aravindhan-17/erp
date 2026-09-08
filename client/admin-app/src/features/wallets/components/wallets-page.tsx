import { Search, Wallet, IndianRupee, ArrowUpRight, ArrowDownRight, MoreHorizontal } from "lucide-react";

export function WalletsPage() {
  const wallets = [
    { id: "W-501", customer: "John Doe", balance: 1250.00, lastTransaction: "CREDIT", lastTransactionDate: "2 hours ago" },
    { id: "W-502", customer: "Jane Smith", balance: 450.50, lastTransaction: "DEBIT", lastTransactionDate: "1 day ago" },
    { id: "W-503", customer: "Alice Johnson", balance: 0.00, lastTransaction: "DEBIT", lastTransactionDate: "5 days ago" },
  ];

  return (
    <div className="font-poppins min-w-0">
      <div className="mb-7 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">Customer Wallets</h1>
          <p className="mt-1 text-sm text-gray-500">Manage customer wallet balances and transactions.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-primary hover:bg-primary-hover flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all active:scale-[0.98]">
            <IndianRupee size={16} strokeWidth={2.5} />
            Credit Wallet
          </button>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex h-11 w-full flex-1 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 shadow-sm transition-colors focus-within:border-primary sm:max-w-md">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search wallets by customer..."
            className="h-full w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_4px_20px_rgba(30,20,80,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/80 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-6 py-4">Wallet ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4 text-right">Balance</th>
                <th className="px-6 py-4">Last Transaction</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {wallets.map((wallet) => (
                <tr key={wallet.id} className="group transition-colors hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <Wallet size={16} />
                      </div>
                      <span className="font-medium text-gray-900">{wallet.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">{wallet.customer}</td>
                  <td className="px-6 py-4 text-right font-bold text-gray-900">
                    ₹{wallet.balance.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`flex h-6 w-6 items-center justify-center rounded-full ${
                        wallet.lastTransaction === 'CREDIT' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {wallet.lastTransaction === 'CREDIT' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                      </span>
                      <span className="text-xs text-gray-500">{wallet.lastTransactionDate}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="inline-flex items-center justify-center rounded-lg bg-gray-100 p-2 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700">
                      <MoreHorizontal size={18} />
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
