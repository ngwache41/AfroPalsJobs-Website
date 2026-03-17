import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { BriefcaseBusiness, FileText, UserCircle2, Bookmark, Bell } from "lucide-react";
import { Link } from "react-router";

export default function CandidateDashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl mb-4">Candidate Dashboard</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Track your applications, manage your profile, and stay connected
            with verified job opportunities through AfroPals Jobs.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-sm border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <BriefcaseBusiness className="h-8 w-8 text-blue-600" />
                  <span className="text-sm text-gray-500">Current</span>
                </div>
                <h2 className="text-3xl mb-2">6</h2>
                <p className="text-gray-600">Applications Sent</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <Bookmark className="h-8 w-8 text-green-600" />
                  <span className="text-sm text-gray-500">Saved</span>
                </div>
                <h2 className="text-3xl mb-2">4</h2>
                <p className="text-gray-600">Saved Jobs</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <FileText className="h-8 w-8 text-purple-600" />
                  <span className="text-sm text-gray-500">Profile</span>
                </div>
                <h2 className="text-3xl mb-2">85%</h2>
                <p className="text-gray-600">Profile Completion</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <Bell className="h-8 w-8 text-orange-600" />
                  <span className="text-sm text-gray-500">New</span>
                </div>
                <h2 className="text-3xl mb-2">3</h2>
                <p className="text-gray-600">New Opportunities</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 shadow-sm border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl">Recent Applications</h2>
                  <Link to="/jobs">
                    <Button>Browse More Jobs</Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  <div className="border rounded-lg p-4 bg-white">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div>
                        <h3 className="text-lg">English Teacher / Governess</h3>
                        <p className="text-gray-600">Private Family Placement — Moscow, Russia</p>
                      </div>
                      <div className="text-sm text-green-600">Application Sent</div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 bg-white">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div>
                        <h3 className="text-lg">Restaurant / Hotel Staff</h3>
                        <p className="text-gray-600">Hospitality Partner Group — Saint Petersburg, Russia</p>
                      </div>
                      <div className="text-sm text-yellow-600">Under Review</div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 bg-white">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div>
                        <h3 className="text-lg">Warehouse Worker</h3>
                        <p className="text-gray-600">Logistics and Supply Co. — Yekaterinburg, Russia</p>
                      </div>
                      <div className="text-sm text-blue-600">Awaiting Response</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <UserCircle2 className="h-8 w-8 text-blue-600" />
                  <h2 className="text-2xl">My Profile</h2>
                </div>

                <p className="text-gray-600 mb-6">
                  Keep your candidate profile updated to improve visibility
                  and application success.
                </p>

                <div className="space-y-3">
                  <Link to="/candidate-profile">
                    <Button className="w-full">Update Profile</Button>
                  </Link>

                  <Link to="/saved-jobs">
                    <Button variant="outline" className="w-full">
                      Saved Jobs
                    </Button>
                  </Link>

                  <Button variant="outline" className="w-full">
                    Upload CV
                  </Button>
                </div>

                <div className="mt-8 p-4 rounded-lg bg-blue-50 border border-blue-100">
                  <h3 className="font-medium mb-2">Need Assistance?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Contact AfroPals Jobs for application guidance and support.
                  </p>

                  <a
                    href="https://wa.me/79332742692?text=Hello%20AfroPals%20Jobs%2C%20I%20need%20help%20with%20my%20candidate%20dashboard."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" className="w-full">
                      Chat on WhatsApp
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}