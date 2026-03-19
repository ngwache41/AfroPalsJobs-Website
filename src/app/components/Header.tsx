import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 min-w-0"
          onClick={closeMobileMenu}
        >
          <img
            src="/logo.png"
            alt="AfroPals Jobs logo"
            className="h-11 w-auto shrink-0"
          />
          <div className="leading-tight">
            <div className="text-xl md:text-2xl font-semibold text-blue-700">
              AfroPals Jobs
            </div>
            <div className="hidden md:block text-xs text-gray-500">
              Verified jobs, recruitment and guidance
            </div>
          </div>
        </Link>

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
          <Link to="/sign-in">
            <Button variant="outline">Sign In</Button>
          </Link>

          <Link to="/post-job">
            <Button>Post a Job</Button>
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden text-gray-700"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X className="h-7 w-7" />
          ) : (
            <Menu className="h-7 w-7" />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-3">
          <Link
            to="/"
            className="block text-gray-700 hover:text-blue-600 transition-colors"
            onClick={closeMobileMenu}
          >
            Home
          </Link>

          <Link
            to="/jobs"
            className="block text-gray-700 hover:text-blue-600 transition-colors"
            onClick={closeMobileMenu}
          >
            Jobs
          </Link>

          <Link
            to="/services"
            className="block text-gray-700 hover:text-blue-600 transition-colors"
            onClick={closeMobileMenu}
          >
            Services
          </Link>

          <Link
            to="/about"
            className="block text-gray-700 hover:text-blue-600 transition-colors"
            onClick={closeMobileMenu}
          >
            About
          </Link>

          <Link
            to="/contact"
            className="block text-gray-700 hover:text-blue-600 transition-colors"
            onClick={closeMobileMenu}
          >
            Contact
          </Link>

          <div className="pt-3 flex flex-col gap-3">
            <Link to="/sign-in" onClick={closeMobileMenu}>
              <Button variant="outline" className="w-full">
                Sign In
              </Button>
            </Link>

            <Link to="/post-job" onClick={closeMobileMenu}>
              <Button className="w-full">Post a Job</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}