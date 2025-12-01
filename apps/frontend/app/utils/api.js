export const getBaseUrl = () => {
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_SERVER_URL ||
    process.env.NEXT_PUBLIC_BACKEND_LOCAL_URL ||
    "http://localhost:5001";

  // Remove trailing slash if present
  const cleanUrl = backendUrl.replace(/\/$/, "");

  return `${cleanUrl}/api`;
};

export const API_BASE_URL = getBaseUrl();
