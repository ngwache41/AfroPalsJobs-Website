import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router";

export default function Header() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMenu = () => setMobileOpen(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="text-2xl font-semibold text-blue-700"
            onClick={closeMenu}
          >
            AfroPals Jobs
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          <Link to="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>

          <Link to="/jobs" className="hover:text-blue-600 transition-colors">
            Jobs
          </Link>

          <Link to="/services" className="hover:text-blue-600 transition-colors">
            Services
          </Link>

          <Link to="/about" className="hover:text-blue-600 transition-colors">
            About
          </Link>

          <Link to="/contact" className="hover:text-blue-600 transition-colors">
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" onClick={() => navigate("/sign-in")}>
            Sign In
          </Button>

          <Button onClick={() => navigate("/post-job")}>
            Post a Job
          </Button>
        </div>

        <button
          className="md:hidden text-gray-700"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4 text-sm text-gray-700">
            <Link
              to="/"
              className="hover:text-blue-600 transition-colors"
              onClick={closeMenu}
            >
              Home
            </Link>

            <Link
              to="/jobs"
              className="hover:text-blue-600 transition-colors"
              onClick={closeMenu}
            >
              Jobs
            </Link>

            <Link
              to="/services"
              className="hover:text-blue-600 transition-colors"
              onClick={closeMenu}
            >
              Services
            </Link>

            <Link
              to="/about"
              className="hover:text-blue-600 transition-colors"
              onClick={closeMenu}
            >
              About
            </Link>

            <Link
              to="/contact"
              className="hover:text-blue-600 transition-colors"
              onClick={closeMenu}
            >
              Contact
            </Link>

            <div className="flex flex-col gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  closeMenu();
                  navigate("/sign-in");
                }}
              >
                Sign In
              </Button>

              <Button
                onClick={() => {
                  closeMenu();
                  navigate("/post-job");
                }}
              >
                Post a Job
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}