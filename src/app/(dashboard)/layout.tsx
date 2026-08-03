import { AuthGuard } from "@/components/auth/AuthGuard";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { MobileTabBar } from "@/components/layout/MobileTabBar";
import { CartProvider } from "@/features/invoices/hooks/useCart";
import "./dashboard.css";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <CartProvider>
        <div className="dashboard-shell">
          <Sidebar />
          <div className="dashboard-main">
            <Topbar />
            <main>{children}</main>
          </div>
        </div>
        <MobileTabBar />
      </CartProvider>
    </AuthGuard>
  );
}
