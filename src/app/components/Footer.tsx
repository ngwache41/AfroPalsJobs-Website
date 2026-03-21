import { Link } from "react-router";
import { Mail, Phone, MessageCircle, Globe2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.png"
                alt="AfroPals Jobs logo"
                className="h-10 w-auto"
              />
              <div>
                <h2 className="text-xl font-semibold">AfroPals Jobs</h2>
                <p className="text-sm text-gray-400">
                  Verified jobs, recruitment and guidance
                </p>
              </div>
            </div>

            <p className="text-gray-300 leading-7">
              AfroPals Jobs connects international job seekers with verified
              employers in Russia and provides recruitment support, invitation
              support, and visa guidance.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-3 text-gray-300">
              <Link to="/" className="block hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/jobs" className="block hover:text-white transition-colors">
                Jobs
              </Link>
              <Link to="/about" className="block hover:text-white transition-colors">
                About
              </Link>
              <Link to="/services" className="block hover:text-white transition-colors">
                Services
              </Link>
              <Link to="/faq" className="block hover:text-white transition-colors">
                FAQ
              </Link>
              <Link to="/contact" className="block hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">For Users</h3>
            <div className="space-y-3 text-gray-300">
              <Link to="/post-job" className="block hover:text-white transition-colors">
                Post a Job
              </Link>
              <Link to="/sign-in" className="block hover:text-white transition-colors">
                Sign In
              </Link>
              <Link to="/candidate-dashboard" className="block hover:text-white transition-colors">
                Candidate Dashboard
              </Link>
              <Link to="/employer-dashboard" className="block hover:text-white transition-colors">
                Employer Dashboard
              </Link>
              <Link to="/privacy" className="block hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="block hover:text-white transition-colors">
                Terms and Conditions
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact & Trust</h3>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start gap-3">
                <MessageCircle className="h-5 w-5 mt-1 text-blue-400" />
                <a
                  href="https://wa.me/79332742692?text=Hello%20AfroPals%20Jobs%2C%20I%20would%20like%20to%20make%20an%20inquiry."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp Support
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 mt-1 text-blue-400" />
                <a
                  href="tel:+79332742692"
                  className="hover:text-white transition-colors"
                >
                  +7 (933) 274-26-92
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 mt-1 text-blue-400" />
                <a
                  href="mailto:info@afropalsjobs.ru"
                  className="hover:text-white transition-colors"
                >
                  info@afropalsjobs.ru
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Globe2 className="h-5 w-5 mt-1 text-blue-400" />
                <a
                  href="https://afropalsjobs.ru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  www.afropalsjobs.ru
                </a>
              </div>

              <div className="pt-2 text-sm text-gray-400">
                Registered Information: ОГРНИП 325774600487744
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between text-sm text-gray-400">
          <p>© {new Date().getFullYear()} AfroPals Jobs. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link to="/employer-agreement" className="hover:text-white transition-colors">
              Employer Agreement
            </Link>
            <Link to="/candidate-consent" className="hover:text-white transition-colors">
              Candidate Consent
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}