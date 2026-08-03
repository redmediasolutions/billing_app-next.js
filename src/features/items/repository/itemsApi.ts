import { api } from "@/lib/apiClient";
import { Item, ItemInput } from "../types";

export const itemsApi = {
  list: (search?: string): Promise<Item[]> =>
    api.get(search ? `/items?search=${encodeURIComponent(search)}` : "/items"),
  create: (input: ItemInput): Promise<Item> => api.post("/items", input),
  update: (id: number, input: ItemInput): Promise<Item> => api.put(`/items/${id}`, input),
  remove: (id: number): Promise<void> => api.delete(`/items/${id}`),
};
