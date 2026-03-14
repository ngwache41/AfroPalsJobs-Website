import { Search, TrendingUp, Users, Award, ArrowRight, Building } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LaunchBanner from "../components/LaunchBanner";
import JobCard from "../components/JobCard";
import { jobs } from "../data/jobs";
import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function Home() {
  const featuredJobs = jobs.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">

      <LaunchBanner />
      <Header />

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 md:py-32">
        <div className="container mx-auto px-4">

          <div className="grid md:grid-cols-2 gap-12 items-center">

            <div>

              <h1 className="text-4xl md:text-6xl mb-6">
                Find Verified Jobs in Russia
              </h1>

              <p className="text-lg md:text-xl text-gray-600 mb-8">
                AfroPals Jobs connects job seekers from Africa, Asia, Europe,
                Australia, New Zealand and the rest of the world with verified
                employers and legitimate job opportunities in Russia.
              </p>

              {/* SEARCH */}
              <div className="flex gap-2 mb-8">

                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

                  <Input
                    type="text"
                    placeholder="Search jobs, skills, or keywords"
                    className="pl-10 h-12"
                  />

                </div>

                <Button size="lg" className="px-8">
                  Search
                </Button>

              </div>


              {/* POPULAR JOBS */}
              <div className="flex flex-wrap gap-2">

                <span className="text-sm text-gray-600">Popular:</span>

                <button className="text-sm text-blue-600 hover:underline">
                  English Teacher / Governess
                </button>

                <button className="text-sm text-blue-600 hover:underline">
                  Nanny / Manny
                </button>

                <button className="text-sm text-blue-600 hover:underline">
                  Restaurant / Hotel
                </button>

                <button className="text-sm text-blue-600 hover:underline">
                  Cleaner / Dishwasher
                </button>

                <button className="text-sm text-blue-600 hover:underline">
                  Warehouse
                </button>

                <button className="text-sm text-blue-600 hover:underline">
                  Construction / Handyman
                </button>

                <button className="text-sm text-blue-600 hover:underline">
                  Hospitality
                </button>

              </div>

            </div>


            <div className="hidden md:block">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1718220216044-006f43e3a9b1"
                alt="Professional workplace"
                className="rounded-lg shadow-2xl w-full h-[400px] object-cover"
              />
            </div>

          </div>
        </div>
      </section>



      {/* PLATFORM STATS */}
      <section className="py-16 bg-white">

        <div className="container mx-auto px-4">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">


            <div className="text-center">

              <div className="flex justify-center mb-3">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Building className="h-6 w-6 text-blue-600" />
                </div>
              </div>

              <div className="text-3xl mb-1">2,500+</div>
              <div className="text-gray-600">Employers</div>

            </div>


            <div className="text-center">

              <div className="flex justify-center mb-3">
                <div className="bg-green-100 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>

              <div className="text-3xl mb-1">15,000+</div>
              <div className="text-gray-600">Open Jobs</div>

            </div>


            <div className="text-center">

              <div className="flex justify-center mb-3">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>

              <div className="text-3xl mb-1">50,000+</div>
              <div className="text-gray-600">Job Seekers</div>

            </div>


            <div className="text-center">

              <div className="flex justify-center mb-3">
                <div className="bg-orange-100 p-3 rounded-full">
                  <Award className="h-6 w-6 text-orange-600" />
                </div>
              </div>

              <div className="text-3xl mb-1">95%</div>
              <div className="text-gray-600">Placement Success</div>

            </div>

          </div>

        </div>

      </section>



      {/* FEATURED JOBS */}
      <section className="py-16 bg-gray-50">

        <div className="container mx-auto px-4">

          <div className="flex justify-between items-center mb-8">

            <div>
              <h2 className="text-3xl mb-2">Featured Jobs</h2>
              <p className="text-gray-600">
                Verified job opportunities from trusted employers
              </p>
            </div>

            <Link to="/jobs">
              <Button variant="outline">
                View All Jobs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {featuredJobs.map((job) => (
              <JobCard key={job.id} {...job} />
            ))}

          </div>

        </div>

      </section>



      {/* ABOUT SECTION */}
      <section id="about" className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">

        <div className="container mx-auto px-4">

          <div className="grid md:grid-cols-2 gap-12 items-center">


            <div>

              <ImageWithFallback
                src="https://images.unsplash.com/photo-1718220216044-006f43e3a9b1"
                alt="Modern office"
                className="rounded-lg shadow-xl w-full h-[400px] object-cover"
              />

            </div>


            <div>

              <h2 className="text-3xl md:text-4xl mb-6">
                About AfroPals Jobs
              </h2>


              <p className="text-gray-300 mb-6">
                AfroPals Jobs is an international recruitment and support
                platform connecting job seekers with verified employers
                and legitimate opportunities in Russia.
              </p>


              <p className="text-gray-300 mb-6">
                Our platform welcomes professionals from Africa, Asia,
                Europe, Australia, New Zealand and other regions of the
                world who are seeking reliable employment opportunities.
              </p>


              <p className="text-gray-300 mb-6">
                In addition to job placement services, we also provide
                support for obtaining official invitations including
                tourist invitations, private invitations, business
                invitations and student invitations depending on the
                applicant’s purpose of travel.
              </p>


              <p className="text-gray-300 mb-6">
                Where required, we also provide visa assistance and
                documentation guidance to help applicants navigate
                the visa application process more smoothly.
              </p>


              <p className="text-gray-400 text-sm mt-6">
                Registered Entrepreneur — OGRNIP: 325774600487744 / INN: 774351876800
              </p>


              <Button variant="secondary" size="lg" className="mt-6">
                Learn More
              </Button>

            </div>


          </div>

        </div>

      </section>



      {/* SERVICES SECTION */}
<section id="services" className="py-16 bg-white">
  <div className="container mx-auto px-4">

    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl mb-4">Our Services</h2>
      <p className="text-gray-600 max-w-3xl mx-auto">
        AfroPals Jobs provides professional support for job seekers,
        employers, and international applicants seeking reliable
        recruitment, invitation support, and visa guidance.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-xl mb-3">Job Recruitment</h3>
          <p className="text-gray-600">
            We connect candidates with verified employers and help job seekers
            find genuine employment opportunities across different sectors in Russia.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-xl mb-3">Employer Hiring Support</h3>
          <p className="text-gray-600">
            We assist employers in finding qualified workers and simplifying
            the recruitment process through trusted candidate sourcing.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-xl mb-3">Invitation Support</h3>
          <p className="text-gray-600">
            We provide support for different types of invitations including
            tourist, private, business, and student invitations depending on the purpose of travel.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-xl mb-3">Visa Assistance</h3>
          <p className="text-gray-600">
            Where required, we help applicants understand the visa process,
            prepare necessary documentation, and proceed with better clarity and confidence.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-xl mb-3">International Applicant Guidance</h3>
          <p className="text-gray-600">
            We support applicants from Africa, Asia, Europe, Australia,
            New Zealand, and other parts of the world seeking opportunities in Russia.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-xl mb-3">Transparent Process</h3>
          <p className="text-gray-600">
            Our goal is to promote direct, reliable, and transparent recruitment
            by reducing fake intermediaries and improving trust in the hiring process.
          </p>
        </CardContent>
      </Card>

    </div>
  </div>
</section>


{/* TRUST & VERIFICATION */}
<section className="py-16 bg-gray-50">
  <div className="container mx-auto px-4">

    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl mb-4">Trust & Transparency</h2>
      <p className="text-gray-600 max-w-3xl mx-auto">
        AfroPals Jobs is committed to creating a safe and transparent
        recruitment environment for both job seekers and employers.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">

      <div className="text-center">
        <h3 className="text-xl mb-2">Verified Employers</h3>
        <p className="text-gray-600">
          We work with verified companies and legitimate employers
          to ensure job seekers apply only to genuine opportunities.
        </p>
      </div>

      <div className="text-center">
        <h3 className="text-xl mb-2">No Hidden Agents</h3>
        <p className="text-gray-600">
          Our platform promotes direct communication between
          employers and applicants without unnecessary intermediaries.
        </p>
      </div>

      <div className="text-center">
        <h3 className="text-xl mb-2">Transparent Recruitment</h3>
        <p className="text-gray-600">
          AfroPals Jobs promotes honest recruitment practices
          and clear hiring processes for international job seekers.
        </p>
      </div>

    </div>

  </div>
</section>



      {/* CTA */}
      <section id="contact" className="py-20 bg-blue-600 text-white">

        <div className="container mx-auto px-4 text-center">

          <h2 className="text-3xl md:text-4xl mb-4">
            Ready to Start Your Journey?
          </h2>

          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join AfroPals Jobs today and discover verified employment
            opportunities together with professional relocation support.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            <Button size="lg" variant="secondary">
              Create Free Account
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white/10"
            >
              Contact Our Team
            </Button>

          </div>

        </div>

      </section>


      <Footer />

    </div>
  );
}