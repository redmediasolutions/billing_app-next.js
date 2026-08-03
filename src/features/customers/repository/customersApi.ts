import { api } from "@/lib/apiClient";
import { Customer, CustomerInput } from "../types";

export const customersApi = {
  list: (): Promise<Customer[]> => api.get("/customers"),
  walkIn: (): Promise<Customer> => api.get("/customers/walk-in"),
  create: (input: CustomerInput): Promise<Customer> => api.post("/customers", input),
  update: (id: number, input: CustomerInput): Promise<Customer> => api.put(`/customers/${id}`, input),
  remove: (id: number): Promise<void> => api.delete(`/customers/${id}`),
};
