import { createBrowserRouter } from "react-router";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import SignIn from "./pages/SignIn";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import PostJob from "./pages/PostJob";
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
    path: "/post-job",
    Component: PostJob,
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