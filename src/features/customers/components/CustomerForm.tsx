"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FieldGroup, Label, Input } from "@/components/ui/input";
import { Customer, CustomerInput } from "../types";

const EMPTY: CustomerInput = {
  customer_name: "", customer_phone: "", customer_email: "", customer_gst: "",
  customer_business_name: "", customer_billing_address: "", customer_shipping_address: "",
  customer_gst_state: "", customer_gst_state_code: "",
};

export function CustomerForm({
  open, onClose, onSubmit, editing,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (input: CustomerInput) => Promise<void>;
  editing?: Customer | null;
}) {
  const [form, setForm] = useState<CustomerInput>(EMPTY);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editing) {
      const { id, reference, created_at, ...rest } = editing as any;
      setForm(rest);
    } else {
      setForm(EMPTY);
    }
  }, [editing, open]);

  function set<K extends keyof CustomerInput>(key: K, value: CustomerInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await onSubmit(form);
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onClose={onClose} title={editing ? "Edit customer" : "Add customer"} width={520}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-3">
          <FieldGroup className="flex-1">
            <Label>Customer name</Label>
            <Input required value={form.customer_name} onChange={(e) => set("customer_name", e.target.value)} />
          </FieldGroup>
          <FieldGroup className="flex-1">
            <Label>Phone</Label>
            <Input value={form.customer_phone} onChange={(e) => set("customer_phone", e.target.value)} />
          </FieldGroup>
        </div>
        <div className="flex gap-3">
          <FieldGroup className="flex-1">
            <Label>Email</Label>
            <Input type="email" value={form.customer_email} onChange={(e) => set("customer_email", e.target.value)} />
          </FieldGroup>
          <FieldGroup className="flex-1">
            <Label>Business name</Label>
            <Input value={form.customer_business_name} onChange={(e) => set("customer_business_name", e.target.value)} />
          </FieldGroup>
        </div>
        <div className="flex gap-3">
          <FieldGroup className="flex-1">
            <Label>GSTIN</Label>
            <Input value={form.customer_gst} onChange={(e) => set("customer_gst", e.target.value)} />
          </FieldGroup>
          <FieldGroup className="flex-1">
            <Label>GST state</Label>
            <Input value={form.customer_gst_state} onChange={(e) => set("customer_gst_state", e.target.value)} />
          </FieldGroup>
          <FieldGroup style={{ width: 110 }}>
            <Label>State code</Label>
            <Input value={form.customer_gst_state_code} onChange={(e) => set("customer_gst_state_code", e.target.value)} />
          </FieldGroup>
        </div>
        <FieldGroup>
          <Label>Billing address</Label>
          <Input value={form.customer_billing_address} onChange={(e) => set("customer_billing_address", e.target.value)} />
        </FieldGroup>
        <FieldGroup>
          <Label>Shipping address</Label>
          <Input value={form.customer_shipping_address} onChange={(e) => set("customer_shipping_address", e.target.value)} />
        </FieldGroup>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" loading={saving}>{editing ? "Save changes" : "Add customer"}</Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
