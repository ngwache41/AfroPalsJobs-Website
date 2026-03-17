import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Globe2, ShieldCheck, Users, BriefcaseBusiness, Award } from "lucide-react";
import { Link } from "react-router";
import Seo from "../components/Seo";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Seo
        title="About AfroPals Jobs | Recruitment, Visa Processing Experience & Founder Story"
        description="Learn about AfroPals Jobs, the founder’s 10+ years of visa processing experience, 4+ years in recruitment, and the mission to connect candidates with verified employers in Russia."
      />

      <Header />

      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl mb-6">
                About AfroPals Jobs
              </h1>

              <p className="text-lg text-gray-600 mb-6">
                AfroPals Jobs is a professional recruitment and support platform
                created to connect job seekers with verified employers and
                genuine work opportunities in Russia.
              </p>

              <p className="text-gray-600 mb-8">
                Built on trust, transparency, and practical guidance, the
                platform supports both employers and international candidates
                through a more structured and professional recruitment process.
              </p>

              <div className="flex gap-4 flex-wrap">
                <Link to="/jobs">
                  <Button size="lg">Explore Jobs</Button>
                </Link>

                <a
                  href="https://wa.me/79332742692?text=Hello%20AfroPals%20Jobs%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20platform."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" variant="outline">
                    Contact Us
                  </Button>
                </a>
              </div>
            </div>

            <div>
              <img
                src="/founder-afropals.jpg"
                alt="Founder of AfroPals Jobs"
                className="rounded-2xl shadow-xl w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-sm border">
              <CardContent className="pt-8 pb-8 text-center">
                <Award className="mx-auto mb-4 h-10 w-10 text-blue-600" />
                <h3 className="text-3xl mb-2">10+ Years</h3>
                <p className="text-gray-600">
                  Experience in visa processing and international documentation support.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm border">
              <CardContent className="pt-8 pb-8 text-center">
                <BriefcaseBusiness className="mx-auto mb-4 h-10 w-10 text-blue-600" />
                <h3 className="text-3xl mb-2">4+ Years</h3>
                <p className="text-gray-600">
                  Experience in recruitment, talent support, and opportunity placement.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm border">
              <CardContent className="pt-8 pb-8 text-center">
                <Globe2 className="mx-auto mb-4 h-10 w-10 text-blue-600" />
                <h3 className="text-3xl mb-2">Global Reach</h3>
                <p className="text-gray-600">
                  Supporting candidates from Africa, Asia, Europe, Australia, New Zealand, and beyond.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl mb-6 text-center">Founder’s Vision</h2>

          <Card>
            <CardContent className="pt-8 pb-8 px-8">
              <p className="text-gray-700 leading-8 mb-6">
                AfroPals Jobs was founded with a clear vision: to build a
                trusted bridge between international job seekers and legitimate
                employers in Russia. Many candidates search for work abroad with
                hope and ambition, yet often face confusion, lack of direction,
                and unreliable channels.
              </p>

              <p className="text-gray-700 leading-8 mb-6">
                With more than 10 years of experience in visa processing and
                over 4 years of recruiting experience, the founder brings both
                practical knowledge and industry insight into the platform.
                This combination allows AfroPals Jobs to offer more than job
                listings — it offers guidance, structure, and confidence.
              </p>

              <p className="text-gray-700 leading-8 mb-6">
                The platform is designed to support employers, private families,
                and organizations looking for serious candidates in areas such
                as education, household support, hospitality, construction,
                warehouse operations, and other essential sectors.
              </p>

              <p className="text-gray-700 leading-8">
                AfroPals Jobs stands for professionalism, transparency, and real
                opportunity. It exists to help candidates move forward with
                better information and to help employers connect with people
                they can trust.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">Our Core Principles</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              AfroPals Jobs is built around trust, access, opportunity,
              and international collaboration.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardContent className="pt-8 text-center">
                <ShieldCheck className="mx-auto mb-4 h-10 w-10 text-blue-600" />
                <h3 className="text-xl mb-2">Trust</h3>
                <p className="text-gray-600">
                  Promoting verified and transparent job opportunities.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-8 text-center">
                <Users className="mx-auto mb-4 h-10 w-10 text-blue-600" />
                <h3 className="text-xl mb-2">Access</h3>
                <p className="text-gray-600">
                  Opening doors for international candidates seeking meaningful work.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-8 text-center">
                <BriefcaseBusiness className="mx-auto mb-4 h-10 w-10 text-blue-600" />
                <h3 className="text-xl mb-2">Opportunity</h3>
                <p className="text-gray-600">
                  Connecting employers with motivated and qualified applicants.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-8 text-center">
                <Globe2 className="mx-auto mb-4 h-10 w-10 text-blue-600" />
                <h3 className="text-xl mb-2">Guidance</h3>
                <p className="text-gray-600">
                  Supporting relocation pathways through invitation and visa assistance guidance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <Card>
            <CardContent className="pt-8 pb-8">
              <h2 className="text-2xl mb-3">Registered Business Information</h2>
              <p className="text-gray-600 mb-2">
                AfroPals Jobs operates as a professional recruitment and support platform.
              </p>
              <p className="font-semibold">ОГРНИП: 325774600487744</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}