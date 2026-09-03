"use client";

import React, { useState, useEffect, useRef } from "react";
import { Bell, Check, Package, Tag, Info, AlertCircle } from "lucide-react";

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onCountChange?: (count: number) => void;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: "order" | "promo" | "alert" | "info";
}

const mockNotifications: Notification[] = [
  {
    id: "n1",
    title: "Order Shipped",
    message: "Your order #FE-84920491 has been shipped and is on its way.",
    time: "2 hours ago",
    isRead: false,
    type: "order",
  },
  {
    id: "n2",
    title: "New Flash Deal!",
    message: "Don't miss out on the latest electronics flash deal starting now.",
    time: "5 hours ago",
    isRead: false,
    type: "promo",
  },
  {
    id: "n3",
    title: "Payment Successful",
    message: "Your payment for order #FE-12938475 was successful.",
    time: "1 day ago",
    isRead: true,
    type: "info",
  },
  {
    id: "n4",
    title: "Action Required",
    message: "Please update your shipping address for pending deliveries.",
    time: "2 days ago",
    isRead: true,
    type: "alert",
  },
];

export function NotificationDropdown({
  isOpen,
  onClose,
  onCountChange,
}: NotificationDropdownProps) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Inform parent of unread count
  useEffect(() => {
    const unreadCount = notifications.filter((n) => !n.isRead).length;
    onCountChange?.(unreadCount);
  }, [notifications, onCountChange]);

  // Handle click outside to close
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      // If clicking inside the dropdown, do nothing
      if (dropdownRef.current && dropdownRef.current.contains(event.target as Node)) {
        return;
      }

      onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case "order":
        return <Package size={16} className="text-blue-500" />;
      case "promo":
        return <Tag size={16} className="text-green-500" />;
      case "alert":
        return <AlertCircle size={16} className="text-red-500" />;
      default:
        return <Info size={16} className="text-gray-500" />;
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="font-poppins fixed left-4 right-4 top-20 z-50 flex max-h-[85vh] w-auto flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-3 sm:w-96"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-4 py-4">
        <h3 className="flex items-center gap-2 text-base font-bold text-gray-900">
          <Bell size={18} />
          Notifications
        </h3>
        {notifications.some((n) => !n.isRead) && (
          <button
            onClick={markAllAsRead}
            className="text-primary hover:text-primary/80 flex items-center gap-1 text-xs font-semibold transition-colors"
          >
            <Check size={14} />
            Mark all as read
          </button>
        )}
      </div>

      {/* List */}
      <div className="flex-1 space-y-1 overflow-y-auto p-2">
        {notifications.length === 0 ? (
          <div className="py-8 text-center text-sm text-gray-500">No new notifications</div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              className={`relative flex cursor-pointer items-start gap-4 rounded-xl p-3 transition-colors ${
                notification.isRead ? "hover:bg-gray-50" : "bg-purple-50/40 hover:bg-purple-50/70"
              }`}
            >
              <div className="mt-1 shrink-0 rounded-full border border-gray-100 bg-white p-2 shadow-sm">
                {getIcon(notification.type)}
              </div>
              <div className="min-w-0 flex-1 pr-6">
                <div className="mb-1 flex items-start justify-between gap-2">
                  <p
                    className={`truncate text-sm font-semibold ${notification.isRead ? "text-gray-700" : "text-gray-900"}`}
                  >
                    {notification.title}
                  </p>
                  <span className="whitespace-nowrap text-[10px] font-medium text-gray-400">
                    {notification.time}
                  </span>
                </div>
                <p
                  className={`line-clamp-2 text-xs ${notification.isRead ? "text-gray-500" : "font-medium text-gray-700"}`}
                >
                  {notification.message}
                </p>
              </div>
              {!notification.isRead && (
                <div className="bg-primary absolute right-3 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full" />
              )}
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 p-3 text-center">
        <button className="text-sm font-semibold text-gray-500 transition-colors hover:text-gray-900">
          View all notifications
        </button>
      </div>
    </div>
  );
}
