import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  BriefcaseBusiness,
  FileCheck,
  Globe2,
  ShieldCheck,
  Users,
  BadgeHelp,
} from "lucide-react";

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl mb-6">Our Services</h1>
          <p className="text-lg text-gray-600 mb-6">
            AfroPals Jobs provides professional recruitment and support
            services for candidates, employers, private families, and
            organizations seeking trusted international opportunities and
            structured hiring support in Russia.
          </p>
          <p className="text-gray-600">
            Our approach is built around transparency, guidance, experience,
            and practical support at every important stage of the process.
          </p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-sm border">
              <CardContent className="pt-8">
                <BriefcaseBusiness className="h-10 w-10 text-blue-600 mb-4" />
                <h2 className="text-2xl mb-3">Recruitment Support</h2>
                <p className="text-gray-600 leading-7">
                  We help connect verified employers with motivated candidates
                  across different sectors including education, household
                  support, hospitality, warehouse, construction, and more.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm border">
              <CardContent className="pt-8">
                <FileCheck className="h-10 w-10 text-blue-600 mb-4" />
                <h2 className="text-2xl mb-3">Invitation Support</h2>
                <p className="text-gray-600 leading-7">
                  We provide guidance for invitation-related processes where
                  required, including tourist, private, business, and student
                  invitation support pathways depending on the applicant’s needs.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm border">
              <CardContent className="pt-8">
                <Globe2 className="h-10 w-10 text-blue-600 mb-4" />
                <h2 className="text-2xl mb-3">Visa Assistance Guidance</h2>
                <p className="text-gray-600 leading-7">
                  With more than 10 years of visa processing experience, we
                  provide practical assistance and professional guidance to help
                  applicants better understand documentation and processing steps.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm border">
              <CardContent className="pt-8">
                <Users className="h-10 w-10 text-blue-600 mb-4" />
                <h2 className="text-2xl mb-3">Candidate Support</h2>
                <p className="text-gray-600 leading-7">
                  We support candidates from Africa, Asia, Europe, Australia,
                  New Zealand, and the world at large by helping them navigate
                  opportunities with greater confidence and clarity.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm border">
              <CardContent className="pt-8">
                <ShieldCheck className="h-10 w-10 text-blue-600 mb-4" />
                <h2 className="text-2xl mb-3">Employer Support</h2>
                <p className="text-gray-600 leading-7">
                  Employers, families, and organizations can use AfroPals Jobs
                  to reach serious candidates and promote opportunities through
                  a more professional and transparent process.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm border">
              <CardContent className="pt-8">
                <BadgeHelp className="h-10 w-10 text-blue-600 mb-4" />
                <h2 className="text-2xl mb-3">Professional Guidance</h2>
                <p className="text-gray-600 leading-7">
                  Beyond listings, we aim to provide structured information and
                  guidance that helps both employers and applicants make more
                  informed and reliable decisions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* EXPERIENCE STRIP */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <Card className="shadow-sm border">
              <CardContent className="pt-8 pb-8">
                <h3 className="text-3xl mb-2">10+ Years</h3>
                <p className="text-gray-600">
                  Visa processing and documentation guidance experience.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm border">
              <CardContent className="pt-8 pb-8">
                <h3 className="text-3xl mb-2">4+ Years</h3>
                <p className="text-gray-600">
                  Recruitment and candidate placement experience.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm border">
              <CardContent className="pt-8 pb-8">
                <h3 className="text-3xl mb-2">Global Reach</h3>
                <p className="text-gray-600">
                  Serving applicants and employers across multiple regions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl mb-4">
            Let’s Help You Move Forward Professionally
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Whether you are looking for a trusted opportunity, professional
            visa-related guidance, or support with recruitment, AfroPals Jobs
            is ready to assist.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/79332742692?text=Hello%20AfroPals%20Jobs%2C%20I%20would%20like%20to%20ask%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" size="lg">
                Contact on WhatsApp
              </Button>
            </a>

            <a href="mailto:info@afropalsjobs.ru">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white/10"
              >
                Email Us
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}