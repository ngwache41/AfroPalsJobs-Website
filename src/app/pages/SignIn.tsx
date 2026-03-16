import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Lock, Mail, UserCircle2, BriefcaseBusiness } from "lucide-react";
import { Link } from "react-router";

export default function SignIn() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-14 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl mb-4">
              Sign In to AfroPals Jobs
            </h1>
            <p className="text-lg text-gray-600">
              Access your account to manage applications, review vacancies,
              and continue your recruitment journey through AfroPals Jobs.
            </p>
          </div>
        </div>
      </section>

      {/* SIGN IN OPTIONS */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8">

            {/* Candidate Sign In */}
            <Card className="shadow-sm border">
              <CardContent className="pt-8 px-8 pb-8">
                <div className="flex items-center gap-3 mb-4">
                  <UserCircle2 className="h-7 w-7 text-blue-600" />
                  <h2 className="text-2xl">Candidate Access</h2>
                </div>

                <p className="text-gray-600 mb-6">
                  Sign in to view applications, saved jobs, and candidate profile tools.
                </p>

                <div className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="Email address"
                      className="pl-10"
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="password"
                      placeholder="Password"
                      className="pl-10"
                    />
                  </div>

                  <Link to="/candidate-dashboard">
                    <Button className="w-full" size="lg">
                      Sign In as Candidate
                    </Button>
                  </Link>
                </div>

                <div className="mt-6 text-sm text-gray-500">
                  Don’t have an account yet? Contact AfroPals Jobs for assistance.
                </div>
              </CardContent>
            </Card>

            {/* Employer Sign In */}
            <Card className="shadow-sm border">
              <CardContent className="pt-8 px-8 pb-8">
                <div className="flex items-center gap-3 mb-4">
                  <BriefcaseBusiness className="h-7 w-7 text-blue-600" />
                  <h2 className="text-2xl">Employer Access</h2>
                </div>

                <p className="text-gray-600 mb-6">
                  Sign in to manage job postings, review applications, and monitor hiring activity.
                </p>

                <div className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="Business email"
                      className="pl-10"
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="password"
                      placeholder="Password"
                      className="pl-10"
                    />
                  </div>

                  <Link to="/employer-dashboard">
                    <Button className="w-full" size="lg">
                      Sign In as Employer
                    </Button>
                  </Link>
                </div>

                <div className="mt-6 text-sm text-gray-500">
                  Need an employer account? Use the Post a Job page or contact our team.
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* SUPPORT SECTION */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl mb-4">Need Help Accessing Your Account?</h2>
          <p className="text-gray-600 mb-8">
            If you need support with sign in, account setup, or dashboard access,
            AfroPals Jobs is available to assist you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/79332742692?text=Hello%20AfroPals%20Jobs%2C%20I%20need%20help%20with%20sign%20in%20or%20account%20access."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg">Chat on WhatsApp</Button>
            </a>

            <a href="mailto:info@afropalsjobs.ru">
              <Button size="lg" variant="outline">
                Email Support
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}