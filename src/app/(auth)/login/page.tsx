"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Store } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { FieldGroup, Label, Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import "./login.css";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(email, password);
      router.replace("/billing");
    } catch (err: any) {
      toast.error(err?.message?.replace("Firebase: ", "") ?? "Sign in failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-mark"><Store size={20} /></div>
        <h1 className="login-title">Billing ERP</h1>
        <p className="login-sub">Sign in to manage items, billing and reports.</p>

        <form onSubmit={onSubmit} className="login-form">
          <FieldGroup>
            <Label htmlFor="email">Work email</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@business.com" autoFocus />
          </FieldGroup>
          <FieldGroup>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </FieldGroup>
          <Button type="submit" size="lg" className="w-full" loading={submitting}>
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}
