"use client";
import { Pencil, Trash2, Users } from "lucide-react";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Customer } from "../types";

export function CustomersTable({
  customers, loading, onEdit, onDelete,
}: {
  customers: Customer[];
  loading: boolean;
  onEdit: (c: Customer) => void;
  onDelete: (c: Customer) => void;
}) {
  if (loading) {
    return <div className="flex flex-col gap-2">{[...Array(5)].map((_, i) => <Skeleton key={i} style={{ height: 50, borderRadius: 10 }} />)}</div>;
  }
  if (customers.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon"><Users size={18} /></div>
        <div className="empty-state-title">No customers yet</div>
        <p className="text-sm">Walk-in orders use an auto-created "Walk-in Customer" record.</p>
      </div>
    );
  }
  return (
    <Table>
      <THead>
        <TR>
          <TH>Name</TH>
          <TH>Contact</TH>
          <TH>Business</TH>
          <TH>GSTIN</TH>
          <TH></TH>
        </TR>
      </THead>
      <TBody>
        {customers.map((c) => (
          <TR key={c.id}>
            <TD>
              <div className="font-medium">{c.customer_name}</div>
              {c.customer_name === "Walk-in Customer" && <Badge variant="outline" className="text-xs">Default</Badge>}
            </TD>
            <TD>
              <div className="text-sm">{c.customer_phone || "—"}</div>
              <div className="text-xs text-faint">{c.customer_email || "—"}</div>
            </TD>
            <TD className="text-sm">{c.customer_business_name || "—"}</TD>
            <TD className="mono text-sm">{c.customer_gst || "—"}</TD>
            <TD>
              <div className="flex items-center gap-1 justify-end">
                <Button variant="ghost" size="icon" onClick={() => onEdit(c)}><Pencil size={14} /></Button>
                <Button variant="ghost" size="icon" onClick={() => onDelete(c)}><Trash2 size={14} /></Button>
              </div>
            </TD>
          </TR>
        ))}
      </TBody>
    </Table>
  );
}
