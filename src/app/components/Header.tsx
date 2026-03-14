import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">

        <div className="flex items-center gap-2">
          <Link to="/" className="text-2xl font-semibold text-blue-700">
            AfroPals Jobs
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          <a href="/" className="hover:text-blue-600 transition-colors">Home</a>
          <a href="/jobs" className="hover:text-blue-600 transition-colors">Jobs</a>
          <a href="#services" className="hover:text-blue-600 transition-colors">Services</a>
          <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
          <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline">Sign In</Button>
          <Button>Post a Job</Button>
        </div>

        <button className="md:hidden text-gray-700">
          <Menu className="h-6 w-6" />
        </button>

      </div>
    </header>
  );
}