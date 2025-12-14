import { StrictMode } from "react";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/Routes.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
import { createRoot } from "react-dom/client";
import AuthProvider from "./context/AuthProvider.jsx";

// React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a QueryClient instance
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <ToastContainer position="top-right" autoClose={2000} />
      <Toaster position="top-right" toastOptions={{ duration: 2500 }} />
    </QueryClientProvider>
  </StrictMode>
);
