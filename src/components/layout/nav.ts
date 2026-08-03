import { LayoutGrid, Package, Receipt, Users, BarChart3 } from "lucide-react";

export const NAV = [
  { href: "/billing", label: "Bill", fullLabel: "New Bill", icon: Receipt },
  { href: "/items", label: "Items", fullLabel: "Items", icon: Package },
  { href: "/invoices", label: "Invoices", fullLabel: "Invoices", icon: LayoutGrid },
  { href: "/customers", label: "Customers", fullLabel: "Customers", icon: Users },
  { href: "/reports", label: "Reports", fullLabel: "Reports", icon: BarChart3 },
];
