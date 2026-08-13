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

export function NotificationDropdown({ isOpen, onClose, onCountChange }: NotificationDropdownProps) {
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
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case "order": return <Package size={16} className="text-blue-500" />;
      case "promo": return <Tag size={16} className="text-green-500" />;
      case "alert": return <AlertCircle size={16} className="text-red-500" />;
      default: return <Info size={16} className="text-gray-500" />;
    }
  };

  return (
    <div 
      ref={dropdownRef}
      className="fixed left-4 right-4 top-20 sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-3 w-auto sm:w-96 rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 z-50 flex flex-col max-h-[85vh] overflow-hidden font-poppins"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4 bg-gray-50/50">
        <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
          <Bell size={18} />
          Notifications
        </h3>
        {notifications.some(n => !n.isRead) && (
          <button 
            onClick={markAllAsRead}
            className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
          >
            <Check size={14} />
            Mark all as read
          </button>
        )}
      </div>

      {/* List */}
      <div className="overflow-y-auto flex-1 p-2 space-y-1">
        {notifications.length === 0 ? (
          <div className="py-8 text-center text-gray-500 text-sm">
            No new notifications
          </div>
        ) : (
          notifications.map((notification) => (
            <div 
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              className={`relative flex items-start gap-4 p-3 rounded-xl transition-colors cursor-pointer ${
                notification.isRead ? "hover:bg-gray-50" : "bg-purple-50/40 hover:bg-purple-50/70"
              }`}
            >
              <div className="mt-1 shrink-0 bg-white p-2 rounded-full shadow-sm border border-gray-100">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0 pr-6">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <p className={`text-sm font-semibold truncate ${notification.isRead ? "text-gray-700" : "text-gray-900"}`}>
                    {notification.title}
                  </p>
                  <span className="text-[10px] font-medium text-gray-400 whitespace-nowrap">
                    {notification.time}
                  </span>
                </div>
                <p className={`text-xs line-clamp-2 ${notification.isRead ? "text-gray-500" : "text-gray-700 font-medium"}`}>
                  {notification.message}
                </p>
              </div>
              {!notification.isRead && (
                <div className="absolute top-1/2 -translate-y-1/2 right-3 w-2 h-2 rounded-full bg-primary" />
              )}
            </div>
          ))
        )}
      </div>
      
      {/* Footer */}
      <div className="border-t border-gray-100 p-3 text-center">
        <button className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">
          View all notifications
        </button>
      </div>
    </div>
  );
}
