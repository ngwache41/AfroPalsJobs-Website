import { useState } from "react";
import { useParams, Link } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent } from "../components/ui/card";
import { jobs } from "../data/jobs";

export default function ApplyForm() {
  const { id } = useParams();
  const job = jobs.find((j) => j.id === id);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-3xl mb-4">Application Page Not Found</h1>
            <p className="text-gray-600 mb-6">
              The job you are trying to apply for could not be found.
            </p>
            <Link to="/jobs">
              <Button>Back to Jobs</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl mb-4">Apply for This Opportunity</h1>
          <p className="text-lg text-gray-600 mb-6">
            Complete the application form below to apply for the position.
          </p>

          <Card className="shadow-sm border">
            <CardContent className="pt-6">
              <h2 className="text-2xl mb-2">{job.title}</h2>
              <p className="text-gray-600 mb-2">{job.company}</p>
              <p className="text-gray-500">
                {job.location} • {job.type} • {job.salary}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FORM */}
      <section className="py-16 bg-gray-50 flex-1">
        <div className="container mx-auto px-4 max-w-3xl">
          {submitted ? (
            <Card className="shadow-sm border">
              <CardContent className="pt-8 pb-8 text-center">
                <h2 className="text-3xl mb-4">Application Submitted</h2>
                <p className="text-gray-600 mb-3">
                  Thank you for applying for <strong>{job.title}</strong>.
                </p>
                <p className="text-gray-600 mb-6">
                  AfroPals Jobs will review your application and contact you if
                  additional information is required.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/jobs">
                    <Button>Browse More Jobs</Button>
                  </Link>

                  <a
                    href={`https://wa.me/79332742692?text=${encodeURIComponent(
                      `Hello AfroPals Jobs, I have submitted my application for ${job.title} at ${job.company}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline">Chat on WhatsApp</Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-xl shadow-sm border space-y-6"
            >
              <div>
                <h2 className="text-3xl mb-2">Candidate Application Form</h2>
                <p className="text-gray-600">
                  Please provide accurate details to support your application.
                </p>
              </div>

              <Input placeholder="Full Name" required />

              <Input type="email" placeholder="Email Address" required />

              <Input placeholder="Phone or WhatsApp Number" required />

              <Input placeholder="Nationality" />

              <Input placeholder="Current Location" />

              <Input placeholder="Years of Experience" />

              <Textarea
                placeholder="Short Professional Summary"
                rows={4}
              />

              <Textarea
                placeholder="Relevant Skills / Qualifications"
                rows={4}
              />

              <Textarea
                placeholder="Cover Note / Why are you interested in this role?"
                rows={5}
              />

              <Input placeholder="CV / Resume Link (optional)" />

              <div className="flex flex-col sm:flex-row gap-4">
                <Button type="submit" className="w-full" size="lg">
                  Submit Application
                </Button>

                <a
                  href={`https://wa.me/79332742692?text=${encodeURIComponent(
                    `Hello AfroPals Jobs, I want to apply for ${job.title} at ${job.company}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button type="button" variant="outline" className="w-full" size="lg">
                    Apply via WhatsApp
                  </Button>
                </a>
              </div>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}