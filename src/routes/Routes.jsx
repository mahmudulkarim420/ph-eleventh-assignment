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
import PrivateRoute from './PrivateRoute.jsx';

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

 
  // Catch All
  {
    path: "*",
    Component: ErrorPage,
  },
]);
