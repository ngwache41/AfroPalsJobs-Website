import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import JobsPage from "./pages/JobsPage";
import VisaApplicationPage from "./pages/VisaApplicationPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import JobDetails from "./pages/JobDetails";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import EmployerAgreement from "./pages/EmployerAgreement";
import CandidateConsent from "./pages/CandidateConsent";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "jobs",
        element: <JobsPage />,
      },
      {
        path: "visa-invitations",
        element: <VisaApplicationPage />,
      },
      {
        path: "admin-dashboard",
        element: <AdminDashboardPage />,
      },
      {
        path: "jobs/:id",
        element: <JobDetails />,
      },
      {
        path: "terms",
        element: <Terms />,
      },
      {
        path: "privacy",
        element: <Privacy />,
      },
      {
        path: "employer-agreement",
        element: <EmployerAgreement />,
      },
      {
        path: "candidate-consent",
        element: <CandidateConsent />,
      },
    ],
  },
]);