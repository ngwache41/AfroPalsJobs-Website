import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Mail, Phone, FileText, UserCircle2 } from "lucide-react";

export default function Applications() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl mb-4">Application Management</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Review candidate applications, track statuses, and manage hiring
            progress through AfroPals Jobs.
          </p>
        </div>
      </section>

      {/* APPLICATION LIST */}
      <section className="py-12 flex-1">
        <div className="container mx-auto px-4 space-y-6">

          <Card className="shadow-sm border">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <UserCircle2 className="h-8 w-8 text-blue-600" />
                    <div>
                      <h2 className="text-2xl">Leonel N.</h2>
                      <p className="text-gray-600">Applied for English Teacher / Governess</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>candidate@example.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>+7 (933) 274-26-92</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>7 years teaching experience</span>
                    </div>
                    <div>
                      <span>Nationality: Cameroonian</span>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-7 mb-4">
                    Experienced educator with strong communication skills,
                    classroom confidence, and a background in supporting children
                    through structured English learning.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <Badge>English</Badge>
                    <Badge>Teaching</Badge>
                    <Badge>Childcare</Badge>
                    <Badge>Governess</Badge>
                  </div>
                </div>

                <div className="lg:w-64 space-y-3">
                  <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                    Under Review
                  </Badge>

                  <Button className="w-full">Shortlist Candidate</Button>
                  <Button variant="outline" className="w-full">Request Interview</Button>
                  <Button variant="outline" className="w-full">Contact Candidate</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <UserCircle2 className="h-8 w-8 text-blue-600" />
                    <div>
                      <h2 className="text-2xl">Ama K.</h2>
                      <p className="text-gray-600">Applied for Restaurant / Hotel Staff</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>applicant@example.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>+7 (900) 000-00-00</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>4 years hospitality experience</span>
                    </div>
                    <div>
                      <span>Nationality: Ghanaian</span>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-7 mb-4">
                    Hospitality-focused candidate with restaurant and hotel
                    experience, good customer service skills, and a professional attitude.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <Badge>Hospitality</Badge>
                    <Badge>Service</Badge>
                    <Badge>Hotel</Badge>
                    <Badge>Customer Care</Badge>
                  </div>
                </div>

                <div className="lg:w-64 space-y-3">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    Shortlisted
                  </Badge>

                  <Button className="w-full">Schedule Interview</Button>
                  <Button variant="outline" className="w-full">Contact Candidate</Button>
                  <Button variant="outline" className="w-full">View Full Profile</Button>
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