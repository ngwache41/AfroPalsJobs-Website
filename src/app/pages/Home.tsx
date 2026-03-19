import { Search, TrendingUp, Users, Award, ArrowRight, Building } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LaunchBanner from "../components/LaunchBanner";
import JobCard from "../components/JobCard";
import { jobs } from "../data/jobs";
import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import Seo from "../components/Seo";

export default function Home() {
  const featuredJobs = jobs.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Seo
        title="AfroPals Jobs | Jobs in Russia for Foreigners, Africans, Recruitment & Visa Guidance"
        description="AfroPals Jobs connects foreigners and African job seekers with verified employers in Russia. Explore jobs, recruitment support, invitation support, and visa guidance."
      />

      <LaunchBanner />
      <Header />

      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl leading-tight mb-6">
              Verified Jobs & Visa Guidance Platform
            </h1>

            <p className="text-lg text-gray-600 mb-6">
              AfroPals Jobs connects international job seekers with verified
              employers and legitimate employment opportunities in Russia.
            </p>

            <p className="text-gray-600 mb-8">
              With over <strong>10 years of visa processing experience</strong> and
              more than <strong>4 years in recruitment</strong>, we help applicants
              navigate opportunities with clarity and confidence.
            </p>

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

            <div className="flex flex-wrap gap-2 text-sm">
              <span className="text-gray-600">Popular:</span>

              <button className="text-blue-600 hover:underline">
                English Teacher / Governess
              </button>

              <button className="text-blue-600 hover:underline">
                Nanny / Manny
              </button>

              <button className="text-blue-600 hover:underline">
                Restaurant / Hotel
              </button>

              <button className="text-blue-600 hover:underline">
                Cleaner / Dishwasher
              </button>

              <button className="text-blue-600 hover:underline">
                Warehouse
              </button>

              <button className="text-blue-600 hover:underline">
                Construction / Handyman
              </button>
            </div>
          </div>

          <div className="hidden md:block">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1718220216044-006f43e3a9b1"
              alt="Professional workplace"
              className="rounded-xl shadow-2xl w-full h-[420px] object-cover"
            />
          </div>
        </div>
      </section>

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

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="/founder-afropals.jpg"
              alt="Founder of AfroPals Jobs"
              className="rounded-2xl shadow-xl w-full h-[500px] object-cover"
            />
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl mb-6">
              Founder’s Experience & Vision
            </h2>

            <p className="text-gray-700 mb-6 leading-8">
              AfroPals Jobs was built to create a more transparent and
              professional path for international job seekers and employers
              looking for serious opportunities in Russia.
            </p>

            <p className="text-gray-700 mb-6 leading-8">
              With more than <strong>10 years of experience in visa processing</strong>
              and over <strong>4 years of recruitment experience</strong>, the
              platform is guided by real practical knowledge, not guesswork.
            </p>

            <p className="text-gray-700 mb-6 leading-8">
              The goal is simple: connect genuine candidates with verified
              employers while also offering helpful guidance related to
              invitations, documentation, and visa-related processes where required.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/about">
                <Button size="lg">Read Full Story</Button>
              </Link>

              <Link to="/services">
                <Button size="lg" variant="outline">
                  View Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1718220216044-006f43e3a9b1"
            alt="Modern office"
            className="rounded-xl shadow-xl w-full h-[420px] object-cover"
          />

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
              In addition to recruitment services, we also support applicants
              with invitation processes including tourist, private, business,
              and student invitations depending on travel purpose.
            </p>

            <p className="text-gray-300 mb-6">
              Where required, we also provide visa assistance and documentation
              guidance to help applicants navigate the visa process smoothly.
            </p>

            <p className="text-gray-400 text-sm">
              Registered Entrepreneur — ОГРНИП: 325774600487744
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-4">
            Ready to Start Your Journey?
          </h2>

          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Discover verified job opportunities and professional relocation guidance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Create Free Account
            </Button>

            <a
              href="https://wa.me/79332742692"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white/10"
              >
                Chat on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}