import axios from "axios";

/* ================= BASE URL ================= */

export const getBaseUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return (
      (process.env.NEXT_PUBLIC_BACKEND_LOCAL_URL || "http://localhost:5001") +
      "/api"
    );
  }

  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_SERVER_URL ||
    process.env.NEXT_PUBLIC_BACKEND_LOCAL_URL ||
    "http://localhost:5001";

  // Remove trailing slash if present
  const cleanUrl = backendUrl.replace(/\/$/, "");

  return `${cleanUrl}/api`;
};

export const API_BASE_URL = getBaseUrl();

/* ================= TOKEN ================= */

export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

/* ================= AXIOS INSTANCE ================= */

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================= AUTH INTERCEPTOR ================= */

api.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ================= GLOBAL RESPONSE HANDLER ================= */

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Auto logout on invalid/expired token
    if (
      error?.response?.status === 401 &&
      typeof window !== "undefined"
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

/* ================= API HELPERS ================= */

export const authAPI = {
  login: (data) => api.post("/auth/login", data),
  register: (data) => api.post("/auth/register", data),
  profile: () => api.get("/auth/profile"),
};

export const addressAPI = {
  list: () => api.get("/address"),
  create: (data) => api.post("/address", data),
  update: (id, data) => api.put(`/address/${id}`, data),
  remove: (id) => api.delete(`/address/${id}`),
  setDefault: (id) => api.patch(`/address/${id}/default`),
};

export const productAPI = {
  list: () => api.get("/products"),
  getOne: (id) => api.get(`/products/${id}`),
};

export const cartAPI = {
  get: () => api.get("/cart"),
  add: (data) => api.post("/cart/add", data),
  update: (data) => api.put("/cart/update", data),
  remove: (id) => api.delete(`/cart/remove/${id}`),
  clear: () => api.delete("/cart/clear"),
};

export const adminProductAPI = {
  list: (params = {}) =>
    api.get("/products", {
      params: {
        ...params,
        showHidden: "true", // admin only
      },
    }),

  create: (data) => api.post("/products", data),

  update: (id, data) => api.put(`/products/${id}`, data),

  remove: (id) => api.delete(`/products/${id}`),
};

export const categoryAPI = {
  list: () => api.get("/categories"),
  getOne: (id) => api.get(`/categories/${id}`),
  create: (data) => api.post("/categories", data),
  update: (id, data) => api.put(`/categories/${id}`, data),
  remove: (id) => api.delete(`/categories/${id}`),
};
