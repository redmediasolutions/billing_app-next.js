import { auth } from "./firebase";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export class ApiException extends Error {
  statusCode?: number;
  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = "ApiException";
    this.statusCode = statusCode;
  }
}

async function authHeader(): Promise<Record<string, string>> {
  const user = auth.currentUser;
  if (!user) return {};
  const token = await user.getIdToken();
  return { Authorization: `Bearer ${token}` };
}

async function unwrap(res: Response) {
  let body: any = null;
  try {
    body = await res.json();
  } catch {
    // no body
  }
  if (res.ok && body?.success) return body.data;
  throw new ApiException(body?.message ?? `Request failed (${res.status})`, res.status);
}

async function request(path: string, init: RequestInit = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(await authHeader()),
    ...(init.headers ?? {}),
  };
  const res = await fetch(`${BASE_URL}${path}`, { ...init, headers, cache: "no-store" });
  return unwrap(res);
}

export const api = {
  get: (path: string) => request(path, { method: "GET" }),
  post: (path: string, data?: unknown) =>
    request(path, { method: "POST", body: data ? JSON.stringify(data) : undefined }),
  put: (path: string, data?: unknown) =>
    request(path, { method: "PUT", body: data ? JSON.stringify(data) : undefined }),
  patch: (path: string, data?: unknown) =>
    request(path, { method: "PATCH", body: data ? JSON.stringify(data) : undefined }),
  delete: (path: string) => request(path, { method: "DELETE" }),
};
