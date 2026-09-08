import { createFileRoute, Outlet } from '@tanstack/react-router';
export const Route = createFileRoute('/auth')({
  component: AuthLayout,
});


import { useEffect } from 'react';
import {  useNavigate  } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/auth-store";

function AuthLayout({}: {  }) {
  const navigate = useNavigate();
  const { token, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && token) {
      // Redirect already authenticated users to profile instead of root
      navigate({ to: "/profile" });
    }
  }, [isLoading, token, navigate]);

  // Don't flash the auth pages while initializing
  if (isLoading) {
    return null;
  }

  return <div className="bg-background text-foreground flex min-h-screen flex-col"><Outlet /></div>;
}
