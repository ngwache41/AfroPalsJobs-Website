import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { UserCircle2, FileText, BriefcaseBusiness, GraduationCap } from "lucide-react";

export default function CandidateProfile() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl mb-4">Candidate Profile</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Build a strong profile to improve visibility, strengthen applications,
            and present your experience more professionally to employers.
          </p>
        </div>
      </section>

      {/* PROFILE COMPLETION */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <Card className="shadow-sm border">
            <CardContent className="pt-6 pb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl mb-2">Profile Completion</h2>
                  <p className="text-gray-600">
                    Complete your profile to improve your chances of being noticed by employers.
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-semibold text-blue-600">85%</div>
                  <p className="text-sm text-gray-500">Profile strength</p>
                </div>
              </div>

              <div className="mt-4 w-full bg-gray-200 rounded-full h-3">
                <div className="bg-blue-600 h-3 rounded-full w-[85%]"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FORM AREA */}
      <section className="pb-16">
        <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-8">
          {/* MAIN FORM */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-sm border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-6">
                  <UserCircle2 className="h-7 w-7 text-blue-600" />
                  <h2 className="text-2xl">Personal Information</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="Full Name" />
                  <Input placeholder="Email Address" />
                  <Input placeholder="Phone / WhatsApp Number" />
                  <Input placeholder="Nationality" />
                  <Input placeholder="Current Location" />
                  <Input placeholder="Preferred Job Role" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-6">
                  <BriefcaseBusiness className="h-7 w-7 text-blue-600" />
                  <h2 className="text-2xl">Work Experience</h2>
                </div>

                <div className="space-y-4">
                  <Input placeholder="Years of Experience" />
                  <Input placeholder="Most Recent Job Title" />
                  <Input placeholder="Previous Employer / Workplace" />
                  <Textarea
                    placeholder="Describe your main work experience"
                    rows={5}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-6">
                  <GraduationCap className="h-7 w-7 text-blue-600" />
                  <h2 className="text-2xl">Skills & Qualifications</h2>
                </div>

                <div className="space-y-4">
                  <Textarea
                    placeholder="List your relevant skills"
                    rows={4}
                  />
                  <Textarea
                    placeholder="Education, certificates, or qualifications"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="h-7 w-7 text-blue-600" />
                  <h2 className="text-2xl">CV / Professional Summary</h2>
                </div>

                <div className="space-y-4">
                  <Input placeholder="CV or Resume Link" />
                  <Textarea
                    placeholder="Short professional summary"
                    rows={5}
                  />
                  <Button className="w-full" size="lg">
                    Save Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* SIDE PANEL */}
          <div className="space-y-6">
            <Card className="shadow-sm border">
              <CardContent className="pt-6">
                <h2 className="text-2xl mb-4">Quick Actions</h2>

                <div className="space-y-3">
                  <Button className="w-full">Update Profile</Button>
                  <Button variant="outline" className="w-full">
                    Upload CV
                  </Button>
                  <Button variant="outline" className="w-full">
                    View Applications
                  </Button>
                  <Button variant="outline" className="w-full">
                    Browse Jobs
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border">
              <CardContent className="pt-6">
                <h2 className="text-2xl mb-4">Support</h2>
                <p className="text-gray-600 mb-4">
                  Need help completing your profile or improving your application?
                </p>

                <a
                  href="https://wa.me/79332742692?text=Hello%20AfroPals%20Jobs%2C%20I%20need%20help%20with%20my%20candidate%20profile."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full">Chat on WhatsApp</Button>
                </a>
              </CardContent>
            </Card>

            <Card className="shadow-sm border">
              <CardContent className="pt-6">
                <h2 className="text-2xl mb-4">Profile Tips</h2>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Add a clear professional summary</li>
                  <li>• Include accurate work experience</li>
                  <li>• Highlight strong practical skills</li>
                  <li>• Keep your contact details up to date</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}