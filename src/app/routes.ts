import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import JobsPage from "./pages/JobsPage";
import VisaApplicationPage from "./pages/VisaApplicationPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminLoginPage from "./pages/AdminLoginPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "jobs",
        Component: JobsPage,
      },
      {
        path: "visa",
        Component: VisaApplicationPage,
      },
      {
        path: "admin",
        Component: AdminDashboardPage,
      },
      {
        path: "admin-login",
        Component: AdminLoginPage,
      },
    ],
  },
]);