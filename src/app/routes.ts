import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent } from "../components/ui/card";
import { BadgeCheck, BriefcaseBusiness, ShieldCheck, Users } from "lucide-react";

export default function PostJob() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-3xl md:text-5xl mb-4">
                Post a Verified Job Opportunity
              </h1>

              <p className="text-lg text-gray-600 mb-6">
                AfroPals Jobs helps employers, families, and organizations
                connect with international candidates for genuine job
                opportunities in Russia.
              </p>

              <p className="text-gray-600 mb-8">
                Submit your vacancy for review and publication. We aim to
                promote transparent recruitment and help serious employers
                reach qualified applicants worldwide.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm">
                  <BadgeCheck className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium">Verified Listings</p>
                    <p className="text-sm text-gray-600">
                      Job opportunities are reviewed before publication.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm">
                  <ShieldCheck className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium">Transparent Process</p>
                    <p className="text-sm text-gray-600">
                      Built to reduce confusion and improve hiring trust.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm">
                  <Users className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium">International Reach</p>
                    <p className="text-sm text-gray-600">
                      Connect with candidates from around the world.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm">
                  <BriefcaseBusiness className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium">Employer Support</p>
                    <p className="text-sm text-gray-600">
                      Suitable for companies, families, and private employers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Card className="overflow-hidden shadow-xl border-0">
                <img
                  src="/founder-afropals.jpg"
                  alt="AfroPals Jobs founder"
                  className="w-full h-[420px] object-cover"
                />
                <CardContent className="pt-6">
                  <h2 className="text-2xl mb-3">Professional Employer Intake</h2>
                  <p className="text-gray-600 mb-4">
                    Submit your job vacancy and AfroPals Jobs will review the
                    listing before publication to support serious and transparent recruitment.
                  </p>
                  <p className="text-sm text-gray-500">
                    AfroPals Jobs is committed to building a trusted bridge
                    between employers and international talent.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 flex-1">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl mb-3">Employer Job Submission Form</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Complete the form below to submit a vacancy. Your listing will be
              reviewed before it is published on AfroPals Jobs.
            </p>
          </div>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 p-8 rounded-xl text-center shadow-sm">
              <h3 className="text-2xl mb-3">Submission received</h3>
              <p className="text-gray-600 mb-2">
                Thank you for submitting your job opportunity.
              </p>
              <p className="text-gray-600">
                Our team will review the vacancy before publication and contact
                you if additional information is needed.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-xl shadow-sm border space-y-6"
            >
              <Input placeholder="Company or Employer Name" required />
              <Input placeholder="Job Title" required />
              <Input placeholder="Location (Example: Moscow, Russia)" required />
              <Input placeholder="Salary Range (Example: From 120,000 RUB / month)" />
              <Textarea placeholder="Job Description" rows={5} required />
              <Textarea placeholder="Requirements" rows={4} />
              <Textarea placeholder="Responsibilities" rows={4} />
              <Input placeholder="Contact Email" required />
              <Input placeholder="Phone or WhatsApp Number" />
              <Button className="w-full" size="lg">
                Submit Job for Review
              </Button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}