import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { FileText, Upload, CheckCircle2, Link as LinkIcon } from "lucide-react";

export default function ResumePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl mb-4">CV / Resume Management</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Keep your resume up to date so employers can better understand your
            experience, qualifications, and suitability for available roles.
          </p>
        </div>
      </section>

      {/* STATUS */}
      <section className="py-10">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-6">
          <Card className="shadow-sm border">
            <CardContent className="pt-6 pb-6 text-center">
              <FileText className="h-10 w-10 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl mb-2">1</h2>
              <p className="text-gray-600">Current Resume</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm border">
            <CardContent className="pt-6 pb-6 text-center">
              <CheckCircle2 className="h-10 w-10 text-green-600 mx-auto mb-4" />
              <h2 className="text-3xl mb-2">Updated</h2>
              <p className="text-gray-600">Profile Resume Status</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm border">
            <CardContent className="pt-6 pb-6 text-center">
              <Upload className="h-10 w-10 text-purple-600 mx-auto mb-4" />
              <h2 className="text-3xl mb-2">Ready</h2>
              <p className="text-gray-600">Application Use</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FORM AREA */}
      <section className="pb-16 flex-1">
        <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-sm border">
              <CardContent className="pt-6">
                <h2 className="text-2xl mb-6">Resume Details</h2>

                <div className="space-y-4">
                  <Input placeholder="Resume Title (Example: Leonel CV 2026)" />
                  <Input placeholder="Resume / CV Link" />
                  <Textarea
                    placeholder="Professional Summary"
                    rows={5}
                  />
                  <Textarea
                    placeholder="Key Skills"
                    rows={4}
                  />
                  <Textarea
                    placeholder="Work Experience Highlights"
                    rows={5}
                  />
                  <Textarea
                    placeholder="Education / Certifications"
                    rows={4}
                  />

                  <Button className="w-full" size="lg">
                    Save Resume Details
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border">
              <CardContent className="pt-6">
                <h2 className="text-2xl mb-6">Resume Upload Placeholder</h2>

                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-white">
                  <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg mb-2">Upload CV / Resume</p>
                  <p className="text-sm text-gray-500 mb-6">
                    This starter version prepares the page layout for future file upload support.
                  </p>

                  <Button variant="outline">Choose File</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-sm border">
              <CardContent className="pt-6">
                <h2 className="text-2xl mb-4">Quick Actions</h2>

                <div className="space-y-3">
                  <Button className="w-full">Save Resume</Button>
                  <Button variant="outline" className="w-full">
                    Update Profile
                  </Button>
                  <Button variant="outline" className="w-full">
                    View Saved Jobs
                  </Button>
                  <Button variant="outline" className="w-full">
                    Browse Jobs
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <LinkIcon className="h-6 w-6 text-blue-600" />
                  <h2 className="text-2xl">Resume Tips</h2>
                </div>

                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Keep your summary short and strong</li>
                  <li>• Highlight practical experience clearly</li>
                  <li>• Add relevant qualifications and skills</li>
                  <li>• Keep links updated and accessible</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-sm border">
              <CardContent className="pt-6">
                <h2 className="text-2xl mb-4">Need Help?</h2>
                <p className="text-gray-600 mb-4">
                  AfroPals Jobs can help you improve your profile and resume presentation.
                </p>

                <a
                  href="https://wa.me/79332742692?text=Hello%20AfroPals%20Jobs%2C%20I%20need%20help%20with%20my%20CV%20or%20resume."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full">Chat on WhatsApp</Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}