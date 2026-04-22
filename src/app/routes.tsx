import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import JobsPage from "./pages/JobsPage";
import VisaApplicationPage from "./pages/VisaApplicationPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import EmployerLoginPage from "./pages/EmployerLoginPage";
import EmployerDashboardPage from "./pages/EmployerDashboardPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/jobs", element: <JobsPage /> },
      { path: "/visa", element: <VisaApplicationPage /> },
      { path: "/admin", element: <AdminDashboardPage /> },
      { path: "/admin-login", element: <AdminLoginPage /> },
      { path: "/employer-login", element: <EmployerLoginPage /> },
      { path: "/employer-dashboard", element: <EmployerDashboardPage /> },
    ],
  },
]);