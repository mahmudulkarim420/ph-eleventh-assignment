import React from 'react';
import { createBrowserRouter } from "react-router-dom";

// Layouts
import Root from '../layouts/MainLayout.jsx';
import DashBoardLayout from '../layouts/DashBoardLayout.jsx';

// Pages
import Home from '../pages/Home/Home.jsx';
import Register from '../pages/Auth/Register.jsx';
import Login from '../pages/Auth/Login.jsx';
import ErrorPage from '../components/Shared/Error/ErrorPage.jsx';
import MyBookings from '../pages/Dashboard/User/MyBookings.jsx';
import Services from '../pages/Services/Services.jsx';
import About from '../pages/About/About.jsx';
import Contact from '../pages/Contact/Contact.jsx';
import ServiceDetails from '../pages/Services/ServiceDetails.jsx';

// Protected Route
import PrivateRoute from '../routes/PrivateRoute.jsx';
import DashboardLayout from '../layouts/DashBoardLayout.jsx';

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
      <DashBoardLayout />
    </PrivateRoute>
  ),
  children: [
    { index: true, element: <DashboardLayout /> }, // /dashboard এর জন্য
    { path: "my-bookings", element: <MyBookings /> },
  ]
}
,

  {
    path: "*",
    element: <ErrorPage />,
  },
]);
