import React from "react";
import { createBrowserRouter } from "react-router";

// Layouts
import Root from "../layouts/MainLayout.jsx";

// Pages
import Home from "../pages/Home/Home.jsx";
import Register from "../pages/Auth/Register.jsx";
import Login from "../pages/Auth/Login.jsx";
import ErrorPage from "../components/Shared/Error/ErrorPage.jsx";
import MyBookings from "../pages/Dashboard/User/MyBookings.jsx";
import Services from "../pages/Services/Services.jsx";
import About from "../pages/About/About.jsx";
import Contact from "../pages/Contact/Contact.jsx";
import ServiceDetails from "../pages/Services/ServiceDetails.jsx";

// Dashboard
import DashboardLayout from "../pages/Dashboard/DashBoardLayout.jsx";
import AdminPanel from "../pages/Dashboard/Admin/AdminPanel.jsx";

// Routes protection
import PrivateRoute from "../routes/PrivateRoute.jsx";
import RoleProtectedRoute from "../routes/RoleProtectedRoute.jsx";
import Unauthorized from "../pages/Unauthorized.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "services", element: <Services /> },
      { path: "services/:id", element: <ServiceDetails /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <div>Welcome to Dashboard</div> },
      { path: "my-bookings", element: <MyBookings /> },

      // ===== Admin panel route =====
      {
        element: <RoleProtectedRoute allowedRoles={["admin"]} />,
        children: [{ path: "admin-panel", element: <AdminPanel /> }],
      },
    ],
  },

  { path: "/unauthorized", element: <Unauthorized /> },

  { path: "*", element: <ErrorPage /> },
]);
