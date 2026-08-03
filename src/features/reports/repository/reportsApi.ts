import { api } from "@/lib/apiClient";
import { ReportSummary, Timeseries } from "../types";

export const reportsApi = {
  summary: (): Promise<ReportSummary> => api.get("/reports/summary"),
  timeseries: (period: "week" | "month"): Promise<Timeseries> => api.get(`/reports/timeseries?period=${period}`),
};
