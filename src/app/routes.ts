import { createBrowserRouter } from "react-router";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import ApplyForm from "./pages/ApplyForm";
import PostJob from "./pages/PostJob";
import EmployerDashboard from "./pages/EmployerDashboard";
import CandidateDashboard from "./pages/CandidateDashboard";
import CandidateProfile from "./pages/CandidateProfile";
import ResumePage from "./pages/ResumePage";
import SavedJobs from "./pages/SavedJobs";
import Applications from "./pages/Applications";
import JobManagement from "./pages/JobManagement";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import EmployerAgreement from "./pages/EmployerAgreement";
import CandidateConsent from "./pages/CandidateConsent";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/about",
    Component: About,
  },
  {
    path: "/services",
    Component: Services,
  },
  {
    path: "/contact",
    Component: Contact,
  },
  {
    path: "/sign-in",
    Component: SignIn,
  },
  {
    path: "/jobs",
    Component: Jobs,
  },
  {
    path: "/jobs/:id",
    Component: JobDetails,
  },
  {
    path: "/jobs/:id/apply",
    Component: ApplyForm,
  },
  {
    path: "/post-job",
    Component: PostJob,
  },
  {
    path: "/employer-dashboard",
    Component: EmployerDashboard,
  },
  {
    path: "/candidate-dashboard",
    Component: CandidateDashboard,
  },
  {
    path: "/candidate-profile",
    Component: CandidateProfile,
  },
  {
    path: "/resume",
    Component: ResumePage,
  },
  {
    path: "/saved-jobs",
    Component: SavedJobs,
  },
  {
    path: "/applications",
    Component: Applications,
  },
  {
    path: "/job-management",
    Component: JobManagement,
  },
  {
    path: "/terms",
    Component: Terms,
  },
  {
    path: "/privacy",
    Component: Privacy,
  },
  {
    path: "/employer-agreement",
    Component: EmployerAgreement,
  },
  {
    path: "/candidate-consent",
    Component: CandidateConsent,
  },
]);