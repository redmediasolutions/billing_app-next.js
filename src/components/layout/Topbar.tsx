"use client";
import { LogOut } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";
import "./Topbar.css";

export function Topbar({ title }: { title?: string }) {
  const { user, logout } = useAuth();
  const initials = (user?.email ?? "U").slice(0, 2).toUpperCase();

  return (
    <header className="topbar">
      <div className="topbar-title">{title}</div>
      <div className="topbar-actions">
        <div className="topbar-user">
          <span className="topbar-avatar">{initials}</span>
          <span className="topbar-email text-sm text-muted">{user?.email}</span>
        </div>
        <button className="topbar-logout" onClick={logout} aria-label="Sign out">
          <LogOut size={15} />
        </button>
      </div>
    </header>
  );
}
