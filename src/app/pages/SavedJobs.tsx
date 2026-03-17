import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Bookmark, MapPin, BriefcaseBusiness, DollarSign, ArrowRight } from "lucide-react";
import { Link } from "react-router";

export default function SavedJobs() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl mb-4">Saved Jobs</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Keep track of promising opportunities and return to them when you are
            ready to apply.
          </p>
        </div>
      </section>

      {/* SAVED JOBS LIST */}
      <section className="py-12 flex-1">
        <div className="container mx-auto px-4 space-y-6">

          <Card className="shadow-sm border">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Bookmark className="h-6 w-6 text-blue-600" />
                    <div>
                      <h2 className="text-2xl">English Teacher / Governess</h2>
                      <p className="text-gray-600">Private Family Placement</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>Moscow, Russia</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <BriefcaseBusiness className="h-4 w-4" />
                      <span>Full-time</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      <span>From 180,000 RUB / month</span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">
                    Professional family placement opportunity for an experienced
                    educator or governess supporting children’s English development.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <Badge>Education</Badge>
                    <Badge>Children</Badge>
                    <Badge>English</Badge>
                    <Badge>Live-in optional</Badge>
                  </div>
                </div>

                <div className="flex flex-col gap-3 lg:w-52">
                  <Link to="/jobs/1">
                    <Button className="w-full">
                      View Job
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>

                  <Link to="/jobs/1/apply">
                    <Button variant="outline" className="w-full">
                      Apply Now
                    </Button>
                  </Link>

                  <Button variant="outline" className="w-full">
                    Remove
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Bookmark className="h-6 w-6 text-blue-600" />
                    <div>
                      <h2 className="text-2xl">Warehouse Worker</h2>
                      <p className="text-gray-600">Logistics and Supply Co.</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>Yekaterinburg, Russia</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <BriefcaseBusiness className="h-4 w-4" />
                      <span>Full-time</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      <span>From 100,000 RUB / month</span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">
                    Stable logistics opportunity for candidates interested in warehouse,
                    loading, packing, and goods handling.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <Badge>Warehouse</Badge>
                    <Badge>Logistics</Badge>
                    <Badge>Packing</Badge>
                    <Badge>Loading</Badge>
                  </div>
                </div>

                <div className="flex flex-col gap-3 lg:w-52">
                  <Link to="/jobs/5">
                    <Button className="w-full">
                      View Job
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>

                  <Link to="/jobs/5/apply">
                    <Button variant="outline" className="w-full">
                      Apply Now
                    </Button>
                  </Link>

                  <Button variant="outline" className="w-full">
                    Remove
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Bookmark className="h-6 w-6 text-blue-600" />
                    <div>
                      <h2 className="text-2xl">Restaurant / Hotel Staff</h2>
                      <p className="text-gray-600">Hospitality Partner Group</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>Saint Petersburg, Russia</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <BriefcaseBusiness className="h-4 w-4" />
                      <span>Full-time</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      <span>From 95,000 RUB / month</span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">
                    Hospitality vacancy for service-minded candidates interested
                    in restaurant and hotel operations.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <Badge>Hospitality</Badge>
                    <Badge>Hotel</Badge>
                    <Badge>Restaurant</Badge>
                    <Badge>Service</Badge>
                  </div>
                </div>

                <div className="flex flex-col gap-3 lg:w-52">
                  <Link to="/jobs/3">
                    <Button className="w-full">
                      View Job
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>

                  <Link to="/jobs/3/apply">
                    <Button variant="outline" className="w-full">
                      Apply Now
                    </Button>
                  </Link>

                  <Button variant="outline" className="w-full">
                    Remove
                  </Button>
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