import React from 'react';
import { createBrowserRouter } from "react-router-dom";

// Layouts
import Root from '../layouts/MainLayout.jsx';


// Pages
import Home from '../pages/Home/Home.jsx';
import Register from '../pages/Auth/Register.jsx';
import Login from '../pages/Auth/Login.jsx';
import ErrorPage from '../components/Shared/Error/ErrorPage.jsx';



// Protected Route
import PrivateRoute from '../routes/PrivateRoute.jsx';
import DashBoardLayout from '../layouts/DashBoardLayout.jsx';
import MyBookings from '../pages/Dashboard/MyBookings/MyBookings.jsx';

export const router = createBrowserRouter([
  // Public Routes
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", index: true, Component: Home },
      { path: "/register", Component: Register },
      { path: "/login", Component: Login },
    ],
  },

  {
     path: "/dashboard",
  Component: PrivateRoute,
  children: [
    {
      index: true,
      Component: DashBoardLayout, // default dashboard page
    },
    {
      path: "my-bookings",
      Component: MyBookings,
    },
    ]
  },
 
  // Catch All
  {
    path: "*",
    Component: ErrorPage,
  },
]);
