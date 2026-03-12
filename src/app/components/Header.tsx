import { Link, useLocation } from "react-router";
import { Button } from "./ui/button";
import { Menu, X, Briefcase } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-blue-600" />
            <span className="font-semibold text-xl">TalentHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`transition-colors ${
                isActive("/")
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Home
            </Link>
            <Link
              to="/jobs"
              className={`transition-colors ${
                isActive("/jobs")
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Browse Jobs
            </Link>
            <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
              About Us
            </a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">
              Contact
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost">Sign In</Button>
            <Button>Post a Job</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4 border-t pt-4">
            <Link
              to="/"
              className={`transition-colors ${
                isActive("/") ? "text-blue-600" : "text-gray-600"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/jobs"
              className={`transition-colors ${
                isActive("/jobs") ? "text-blue-600" : "text-gray-600"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Browse Jobs
            </Link>
            <a href="#about" className="text-gray-600" onClick={() => setMobileMenuOpen(false)}>
              About Us
            </a>
            <a href="#contact" className="text-gray-600" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </a>
            <div className="flex flex-col gap-2 mt-2">
              <Button variant="outline" className="w-full">Sign In</Button>
              <Button className="w-full">Post a Job</Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
