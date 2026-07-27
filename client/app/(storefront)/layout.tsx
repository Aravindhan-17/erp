import Header from "@/components/header";
import Footer from "@/components/footer";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header matching user design specs */}
      <Header
        logoSrc="/images/erp-logo.svg"
        navLinks={[
          { label: "Home", href: "/", active: true },
          { label: "Flash Deals", href: "/flash-deals" },
          { label: "Categories", href: "/categories" },
          { label: "How it Works", href: "#how-it-works" },
        ]}
        userName="John"
        userAvatar="/images/user.png"
        notificationCount={3}
        cartCount={2}
      />

      {/* Page Content */}
      <main className="flex-1">{children}</main>

      {/* Footer matching user design specs */}
      <Footer />
    </div>
  );
}
