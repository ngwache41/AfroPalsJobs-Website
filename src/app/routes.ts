import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import JobsPage from "./pages/JobsPage";
import VisaApplicationPage from "./pages/VisaApplicationPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: JobsPage,
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
    ],
  },
]);