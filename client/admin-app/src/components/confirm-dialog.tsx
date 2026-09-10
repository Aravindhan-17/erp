import React from 'react';
import { X } from 'lucide-react';

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  desc: React.ReactNode;
  confirmText?: string;
  handleConfirm: () => void;
  destructive?: boolean;
  className?: string;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  desc,
  confirmText = 'Confirm',
  handleConfirm,
  destructive = false,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl animate-in zoom-in-95">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <button 
            onClick={() => onOpenChange(false)}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="mb-6 text-sm text-gray-600">
          {desc}
        </div>
        <div className="flex justify-end gap-3">
          <button 
            onClick={() => onOpenChange(false)}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleConfirm}
            className={`rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors ${
              destructive ? 'bg-red-600 hover:bg-red-700' : 'bg-primary hover:bg-primary-hover'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
