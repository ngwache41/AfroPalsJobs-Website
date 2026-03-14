import { createBrowserRouter } from "react-router-dom";
import React from "react";

import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import EmployerAgreement from "./pages/EmployerAgreement";
import CandidateConsent from "./pages/CandidateConsent";

export const router = createBrowserRouter([
  {
    path: "/",
    element: React.createElement(Home),
  },
  {
    path: "/jobs",
    element: React.createElement(Jobs),
  },
  {
    path: "/jobs/:id",
    element: React.createElement(JobDetails),
  },
  {
    path: "/terms",
    element: React.createElement(Terms),
  },
  {
    path: "/privacy",
    element: React.createElement(Privacy),
  },
  {
    path: "/employer-agreement",
    element: React.createElement(EmployerAgreement),
  },
  {
    path: "/candidate-consent",
    element: React.createElement(CandidateConsent),
  },
]);