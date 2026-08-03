"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCustomers } from "@/features/customers/hooks/useCustomers";
import { CustomersTable } from "@/features/customers/components/CustomersTable";
import { CustomerForm } from "@/features/customers/components/CustomerForm";
import { Customer, CustomerInput } from "@/features/customers/types";

export default function CustomersPage() {
  const { customers, loading, create, update, remove } = useCustomers();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Customer | null>(null);

  async function handleSubmit(input: CustomerInput) {
    if (editing) await update(editing.id, input);
    else await create(input);
  }

  async function handleDelete(c: Customer) {
    if (!confirm(`Delete "${c.customer_name}"?`)) return;
    await remove(c.id);
  }

  return (
    <div className="container-page">
      <div className="page-header">
        <div>
          <div className="eyebrow">Directory</div>
          <h1 className="page-title">Customers</h1>
          <p className="page-subtitle">{customers.length} customer{customers.length === 1 ? "" : "s"} on record</p>
        </div>
        <Button onClick={() => { setEditing(null); setFormOpen(true); }}><Plus size={15} /> Add customer</Button>
      </div>
      <CustomersTable customers={customers} loading={loading} onEdit={(c) => { setEditing(c); setFormOpen(true); }} onDelete={handleDelete} />
      <CustomerForm open={formOpen} onClose={() => setFormOpen(false)} onSubmit={handleSubmit} editing={editing} />
    </div>
  );
}
