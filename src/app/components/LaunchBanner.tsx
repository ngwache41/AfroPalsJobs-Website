import { X, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function LaunchBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <CheckCircle className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm md:text-base">
              <strong>Afro-Personala is now live!</strong>
              <span className="hidden sm:inline"> — Verified jobs. Transparent recruitment. No agents.</span>
            </p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="flex-shrink-0 hover:bg-white/10 rounded p-1 transition-colors"
            aria-label="Close banner"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
