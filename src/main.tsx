import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import FilterPage, { loader } from "./FilterPage"; // pakai komponen filter
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FilterPage />, // wajib ada komponen
    loader: loader, // panggil loader
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);