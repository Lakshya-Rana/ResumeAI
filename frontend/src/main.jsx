import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import App from "./App.jsx";
import "./index.css";
import MainLayout from "./layout/MainLayout.jsx";
import router from "./router/route.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router}>
      <MainLayout />
    </RouterProvider>
);