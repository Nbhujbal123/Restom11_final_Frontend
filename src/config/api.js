// Centralized API configuration for RestoM
// Use environment variables for production (VITE_ prefix required for Vite)
// Fallback to localhost for development

// export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
// export const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173";

export const API_BASE_URL = import.meta.env.VITE_API_URL;
