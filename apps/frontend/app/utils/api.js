import axios from "axios";

export const getBaseUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return process.env.NEXT_PUBLIC_BACKEND_LOCAL_URL + "/api";
  }
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_SERVER_URL ||
    process.env.NEXT_PUBLIC_BACKEND_LOCAL_URL;
  const cleanUrl = backendUrl.replace(/\/$/, "");
  return `${cleanUrl}/api`;
};

export const API_BASE_URL = getBaseUrl();

export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

const createCRUDEndpoints = (resource) => ({
  list: (params) => api.get(resource, { params }),
  getOne: (id) => api.get(`${resource}/${id}`),
  create: (data) => api.post(resource, data),
  update: (id, data) => api.put(`${resource}/${id}`, data),
  remove: (id) => api.delete(`${resource}/${id}`),
});

export const authAPI = {
  login: (data) => api.post("/auth/login", data),
  register: (data) => api.post("/auth/register", data),
  profile: () => api.get("/auth/me"),
  updateProfile: (data) => api.put("/auth/update", data),
};

export const addressAPI = {
  ...createCRUDEndpoints("/address"),
  setDefault: (id) => api.patch(`/address/${id}/default`),
};

export const productAPI = {
  list: (params) => api.get("/products", { params }),
  getOne: (id) => api.get(`/products/${id}`),
};

export const cartAPI = {
  get: () => api.get("/cart"),
  add: (data) => api.post("/cart/add", data),
  update: (data) => api.put("/cart/update", data),
  remove: (id) => api.delete(`/cart/item/${id}`),
  clear: () => api.delete("/cart/clear"),
};

export const adminProductAPI = {
  ...createCRUDEndpoints("/products"),
  list: (params = {}) =>
    api.get("/products", {
      params: {
        ...params,
        showHidden: "true",
      },
    }),
};

export const categoryAPI = createCRUDEndpoints("/categories");
