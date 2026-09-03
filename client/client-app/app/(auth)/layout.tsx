import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className="bg-background text-foreground flex min-h-screen flex-col">{children}</div>;
}
