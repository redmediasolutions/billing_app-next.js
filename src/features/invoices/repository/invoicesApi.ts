import { api } from "@/lib/apiClient";
import { CreateInvoiceInput, Invoice } from "../types";

export const invoicesApi = {
  list: (): Promise<Invoice[]> => api.get("/invoices"),
  get: (id: number): Promise<Invoice> => api.get(`/invoices/${id}`),
  create: (input: CreateInvoiceInput): Promise<Invoice> => api.post("/invoices", input),
  remove: (id: number): Promise<void> => api.delete(`/invoices/${id}`),
};

/** Generates a friendly, unique-enough invoice number for the counter. */
export function generateInvoiceNumber(prefix = "INV"): string {
  const now = new Date();
  const y = now.getFullYear().toString().slice(-2);
  const m = (now.getMonth() + 1).toString().padStart(2, "0");
  const d = now.getDate().toString().padStart(2, "0");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${y}${m}${d}-${rand}`;
}
