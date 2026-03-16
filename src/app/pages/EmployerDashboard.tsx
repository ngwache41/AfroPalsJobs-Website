import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { BriefcaseBusiness, Users, FileText, TrendingUp, PlusCircle } from "lucide-react";
import { Link } from "react-router";

export default function EmployerDashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl mb-4">Employer Dashboard</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Manage your vacancies, monitor applications, and organize your hiring
            process through AfroPals Jobs.
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
                  <span className="text-sm text-gray-500">Active</span>
                </div>
                <h2 className="text-3xl mb-2">6</h2>
                <p className="text-gray-600">Posted Jobs</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                  <span className="text-sm text-gray-500">Current</span>
                </div>
                <h2 className="text-3xl mb-2">24</h2>
                <p className="text-gray-600">Applications Received</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <FileText className="h-8 w-8 text-purple-600" />
                  <span className="text-sm text-gray-500">Pending</span>
                </div>
                <h2 className="text-3xl mb-2">8</h2>
                <p className="text-gray-600">Applications to Review</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                  <span className="text-sm text-gray-500">This Month</span>
                </div>
                <h2 className="text-3xl mb-2">3</h2>
                <p className="text-gray-600">Successful Placements</p>
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
                  <h2 className="text-2xl">Recent Job Listings</h2>
                  <Link to="/post-job">
                    <Button>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Post New Job
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  <div className="border rounded-lg p-4 bg-white">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div>
                        <h3 className="text-lg">English Teacher / Governess</h3>
                        <p className="text-gray-600">Moscow, Russia</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 bg-white">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div>
                        <h3 className="text-lg">Warehouse Worker</h3>
                        <p className="text-gray-600">Yekaterinburg, Russia</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 bg-white">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div>
                        <h3 className="text-lg">Restaurant / Hotel Staff</h3>
                        <p className="text-gray-600">Saint Petersburg, Russia</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border">
              <CardContent className="pt-6">
                <h2 className="text-2xl mb-4">Quick Actions</h2>

                <div className="space-y-3">
                  <Link to="/post-job" className="block">
                    <Button className="w-full">Post a New Job</Button>
                  </Link>

                  <Link to="/applications" className="block">
                    <Button variant="outline" className="w-full">
                      View Applications
                    </Button>
                  </Link>

                  <Link to="/job-management" className="block">
                    <Button variant="outline" className="w-full">
                      Manage Jobs
                    </Button>
                  </Link>

                  <Button variant="outline" className="w-full">
                    Contact Support
                  </Button>
                </div>

                <div className="mt-8 p-4 rounded-lg bg-blue-50 border border-blue-100">
                  <h3 className="font-medium mb-2">Employer Support</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Need help managing listings or candidate communication?
                  </p>

                  <a
                    href="https://wa.me/79332742692?text=Hello%20AfroPals%20Jobs%2C%20I%20need%20help%20with%20the%20employer%20dashboard."
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