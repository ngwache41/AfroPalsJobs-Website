import { Mail, Globe, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">

          <div>
            <h3 className="text-2xl mb-4">AfroPals Jobs</h3>
            <p className="text-gray-400 mb-4">
              A global recruitment and support platform connecting job seekers
              with verified employers and legitimate opportunities in Russia.
            </p>
            <p className="text-gray-500 text-sm">
              ОГРНИП: 325774600487744
            </p>
          </div>

          <div>
            <h4 className="text-lg mb-4">Contact</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@afropalsjobs.ru</span>
                <span>Tell/ Whatsapp:+7(933) 274-26-92 </span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>www.afropalsjobs.ru</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg mb-4">Trust & Legal</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 mt-1" />
                <span>
                  We support transparent recruitment, verified opportunities,
                  and guidance for invitations and visa-related documentation.
                </span>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
          © 2026 AfroPals Jobs. All rights reserved.
        </div>
      </div>
    </footer>
  );
}