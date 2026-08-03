"use client";
import { useEffect, useMemo, useState } from "react";
import { Plus, Store } from "lucide-react";
import { Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCustomers } from "@/features/customers/hooks/useCustomers";
import { CustomerForm } from "@/features/customers/components/CustomerForm";
import { useCart } from "../hooks/useCart";
import { customersApi } from "@/features/customers/repository/customersApi";

export function CustomerPicker() {
  const { channel, customerId, setCustomerId, setCustomerLabel } = useCart();
  const { customers, create } = useCustomers();
  const [formOpen, setFormOpen] = useState(false);
  const [walkInLoading, setWalkInLoading] = useState(false);

  const cloudCustomers = useMemo(
    () => customers.filter((c) => c.customer_name !== "Walk-in Customer"),
    [customers]
  );

  useEffect(() => {
    if (channel !== "walk_in") return;
    let cancelled = false;
    setWalkInLoading(true);
    customersApi
      .walkIn()
      .then((c) => {
        if (!cancelled) {
          setCustomerId(c.id);
          setCustomerLabel(c.customer_name);
        }
      })
      .catch(() => {})
      .finally(() => !cancelled && setWalkInLoading(false));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel]);

  if (channel === "walk_in") {
    return (
      <div className="customer-chip">
        <Store size={14} />
        <span>{walkInLoading ? "Loading…" : "Walk-in Customer"}</span>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <Select
        value={customerId ?? ""}
        onChange={(e) => {
          const id = Number(e.target.value) || null;
          setCustomerId(id);
          const c = cloudCustomers.find((x) => x.id === id);
          setCustomerLabel(c?.customer_name ?? "");
        }}
        className="flex-1"
      >
        <option value="">Select customer…</option>
        {cloudCustomers.map((c) => (
          <option key={c.id} value={c.id}>{c.customer_name}{c.customer_phone ? ` · ${c.customer_phone}` : ""}</option>
        ))}
      </Select>
      <Button type="button" variant="outline" size="icon" onClick={() => setFormOpen(true)} aria-label="Add customer">
        <Plus size={15} />
      </Button>
      <CustomerForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={async (input) => {
          const c = await create(input);
          setCustomerId(c.id);
          setCustomerLabel(c.customer_name);
        }}
      />
    </div>
  );
}
