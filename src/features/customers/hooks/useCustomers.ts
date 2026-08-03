"use client";
import { useCallback, useEffect, useState } from "react";
import { customersApi } from "../repository/customersApi";
import { Customer, CustomerInput } from "../types";
import { useToast } from "@/components/ui/toast";

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setCustomers(await customersApi.list());
    } catch (e: any) {
      setError(e?.message ?? "Failed to load customers");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const create = useCallback(async (input: CustomerInput) => {
    const created = await customersApi.create(input);
    setCustomers((prev) => [created, ...prev]);
    toast.success("Customer added");
    return created;
  }, [toast]);

  const update = useCallback(async (id: number, input: CustomerInput) => {
    const updated = await customersApi.update(id, input);
    setCustomers((prev) => prev.map((c) => (c.id === id ? updated : c)));
    toast.success("Customer updated");
    return updated;
  }, [toast]);

  const remove = useCallback(async (id: number) => {
    await customersApi.remove(id);
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    toast.success("Customer deleted");
  }, [toast]);

  return { customers, loading, error, load, create, update, remove };
}
