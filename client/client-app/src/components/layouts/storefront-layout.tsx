import { Outlet } from '@tanstack/react-router';
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ErpLogo, UserAvatar } from "@/assets/images";

export function StorefrontLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      {/* Header matching user design specs */}
      <Header
        logoSrc={ErpLogo}
        navLinks={[
          { label: "Home", href: "/" },
          { label: "Flash Deals", href: "/flash-deals" },
          { label: "Categories", href: "/categories" },
          { label: "How it Works", href: "/how-it-works" },
        ]}
        userName="John"
        userAvatar={UserAvatar}
        notificationCount={3}
        cartCount={2}
      />

      {/* Page Content */}
      <main className="flex-1">
        {children ? children : <Outlet />}
      </main>

      {/* Footer matching user design specs */}
      <Footer />
    </div>
  );
}
