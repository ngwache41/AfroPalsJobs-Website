import { createBrowserRouter } from "react-router";
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
        path: "visa-invitations",
        Component: VisaApplicationPage,
      },
      {
        path: "admin-dashboard",
        Component: AdminDashboardPage,
      },
      {
        path: "jobs/:id",
        Component: JobDetails,
      },
      {
        path: "terms",
        Component: Terms,
      },
      {
        path: "privacy",
        Component: Privacy,
      },
      {
        path: "employer-agreement",
        Component: EmployerAgreement,
      },
      {
        path: "candidate-consent",
        Component: CandidateConsent,
      },
    ],
  },
]);