"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Store } from "lucide-react";
import { NAV } from "./nav";
import "./Sidebar.css";

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-brand-mark"><Store size={16} /></span>
        <div>
          <div className="sidebar-brand-name">Billing ERP</div>
          <div className="sidebar-brand-sub">Console</div>
        </div>
      </div>
      <nav className="sidebar-nav">
        {NAV.map(({ href, fullLabel, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link key={href} href={href} className={`sidebar-link ${active ? "sidebar-link-active" : ""}`}>
              <Icon size={16} strokeWidth={2} />
              {fullLabel}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
