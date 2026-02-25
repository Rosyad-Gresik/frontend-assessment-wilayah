import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import { regions } from "./data/regions";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: async () => {
      return regions;
    },
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);