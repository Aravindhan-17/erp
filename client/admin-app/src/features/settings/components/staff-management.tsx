import { useState } from "react";
import { Search, Plus, MoreHorizontal, Mail, Shield, ShieldAlert, CheckCircle2, XCircle } from "lucide-react";

export function StaffManagement() {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  // Mock data for now, ideally fetched from backend
  const staffMembers = [
    { id: "1", email: "admin@erpflashdeal.com", role: "SUPER_ADMIN", status: "Active", lastLogin: "2 hours ago" },
    { id: "2", email: "manager@erpflashdeal.com", role: "MANAGER", status: "Active", lastLogin: "1 day ago" },
    { id: "3", email: "oldstaff@erpflashdeal.com", role: "MANAGER", status: "Inactive", lastLogin: "2 months ago" },
  ];

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Staff Management</h2>
        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="bg-primary hover:bg-primary-hover flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all active:scale-[0.98]"
        >
          <Plus size={16} strokeWidth={2.5} />
          Invite Staff
        </button>
      </div>

      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-full max-w-sm items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 shadow-sm transition-colors focus-within:border-primary">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search staff by email..."
            className="h-full w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/50 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Login</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {staffMembers.map((staff) => (
                <tr key={staff.id} className="transition-colors hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                        {staff.email[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{staff.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium ${
                      staff.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {staff.role === 'SUPER_ADMIN' ? <ShieldAlert size={14} /> : <Shield size={14} />}
                      {staff.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium ${
                      staff.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {staff.status === 'Active' ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                      {staff.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{staff.lastLogin}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal Placeholder */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="mb-1 text-xl font-bold text-gray-900">Invite new staff</h3>
            <p className="mb-6 text-sm text-gray-500">Send an invitation to join the admin panel.</p>

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700">Email Address</label>
                <div className="flex items-center rounded-xl border border-gray-200 bg-white px-3 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary h-11">
                  <Mail size={16} className="text-gray-400 mr-2" />
                  <input type="email" placeholder="colleague@example.com" className="h-full w-full outline-none text-sm" />
                </div>
              </div>
              
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700">Role</label>
                <select className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                  <option value="MANAGER">Manager</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                </select>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button 
                onClick={() => setIsInviteModalOpen(false)}
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-100"
              >
                Cancel
              </button>
              <button className="bg-primary rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:opacity-90">
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
