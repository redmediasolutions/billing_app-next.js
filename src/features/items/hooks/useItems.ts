"use client";
import { useCallback, useEffect, useState } from "react";
import { itemsApi } from "../repository/itemsApi";
import { Item, ItemInput } from "../types";
import { useToast } from "@/components/ui/toast";

export function useItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await itemsApi.list();
      setItems(data);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load items");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const create = useCallback(
    async (input: ItemInput) => {
      const created = await itemsApi.create(input);
      setItems((prev) => [created, ...prev]);
      toast.success("Item created");
      return created;
    },
    [toast]
  );

  const update = useCallback(
    async (id: number, input: ItemInput) => {
      const updated = await itemsApi.update(id, input);
      setItems((prev) => prev.map((it) => (it.id === id ? updated : it)));
      toast.success("Item updated");
      return updated;
    },
    [toast]
  );

  const remove = useCallback(
    async (id: number) => {
      await itemsApi.remove(id);
      setItems((prev) => prev.filter((it) => it.id !== id));
      toast.success("Item deleted");
    },
    [toast]
  );

  return { items, loading, error, load, create, update, remove };
}
