import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { BriefcaseBusiness, Eye, Pencil, Users, PlusCircle } from "lucide-react";
import { Link } from "react-router";

export default function JobManagement() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl mb-4">Job Management</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Manage your job listings, review responses, and keep your vacancies
            organized through AfroPals Jobs.
          </p>
        </div>
      </section>

      {/* SUMMARY CARDS */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="shadow-sm border">
              <CardContent className="pt-6 pb-6">
                <h2 className="text-3xl mb-2">6</h2>
                <p className="text-gray-600">Total Job Listings</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm border">
              <CardContent className="pt-6 pb-6">
                <h2 className="text-3xl mb-2">4</h2>
                <p className="text-gray-600">Active Listings</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm border">
              <CardContent className="pt-6 pb-6">
                <h2 className="text-3xl mb-2">24</h2>
                <p className="text-gray-600">Applications Received</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* JOB LIST */}
      <section className="pb-16 flex-1">
        <div className="container mx-auto px-4">
          <Card className="shadow-sm border">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h2 className="text-2xl">Manage Listings</h2>

                <Link to="/post-job">
                  <Button>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Post New Job
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">

                <div className="border rounded-lg p-4 bg-white">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <BriefcaseBusiness className="h-5 w-5 text-blue-600" />
                        <h3 className="text-xl">English Teacher / Governess</h3>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          Active
                        </Badge>
                      </div>

                      <p className="text-gray-600 mb-2">Moscow, Russia</p>
                      <p className="text-sm text-gray-500">
                        Posted 3 days ago • 8 applications received
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>

                      <Button variant="outline" size="sm">
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </Button>

                      <Link to="/applications">
                        <Button variant="outline" size="sm">
                          <Users className="h-4 w-4 mr-2" />
                          Applications
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-white">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <BriefcaseBusiness className="h-5 w-5 text-blue-600" />
                        <h3 className="text-xl">Warehouse Worker</h3>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          Active
                        </Badge>
                      </div>

                      <p className="text-gray-600 mb-2">Yekaterinburg, Russia</p>
                      <p className="text-sm text-gray-500">
                        Posted 5 days ago • 6 applications received
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>

                      <Button variant="outline" size="sm">
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </Button>

                      <Link to="/applications">
                        <Button variant="outline" size="sm">
                          <Users className="h-4 w-4 mr-2" />
                          Applications
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-white">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <BriefcaseBusiness className="h-5 w-5 text-blue-600" />
                        <h3 className="text-xl">Restaurant / Hotel Staff</h3>
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                          Draft
                        </Badge>
                      </div>

                      <p className="text-gray-600 mb-2">Saint Petersburg, Russia</p>
                      <p className="text-sm text-gray-500">
                        Last updated 1 day ago • 0 applications yet
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>

                      <Button variant="outline" size="sm">
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </Button>

                      <Button variant="outline" size="sm">
                        Publish
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-white">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <BriefcaseBusiness className="h-5 w-5 text-blue-600" />
                        <h3 className="text-xl">Construction / Handyman</h3>
                        <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                          Closed
                        </Badge>
                      </div>

                      <p className="text-gray-600 mb-2">Novosibirsk, Russia</p>
                      <p className="text-sm text-gray-500">
                        Closed • 10 applications received
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>

                      <Button variant="outline" size="sm">
                        Reopen
                      </Button>
                    </div>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}