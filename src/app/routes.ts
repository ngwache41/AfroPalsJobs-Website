import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import JobsPage from "./pages/JobsPage";
import VisaApplicationPage from "./pages/VisaApplicationPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <JobsPage />,
      },
      {
        path: "/jobs",
        element: <JobsPage />,
      },
      {
        path: "/visa",
        element: <VisaApplicationPage />,
      },
      {
        path: "/admin",
        element: <AdminDashboardPage />,
      },
    ],
  },
]);