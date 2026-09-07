import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Providers } from "@/lib/providers";
import "@/index.css";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="flex min-h-full flex-col font-poppins">
      <Providers>
        <Outlet />
      </Providers>
    </div>
  );
}

