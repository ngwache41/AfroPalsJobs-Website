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
        title="Jobs in Russia for Foreigners & Africans | AfroPals Jobs"
        description="Find verified jobs in Russia for foreigners and Africans. AfroPals Jobs connects job seekers with trusted employers and provides recruitment, invitation support, and visa guidance."
      />

      <LaunchBanner />
      <Header />

      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          
          <div>
            <h1 className="text-4xl md:text-6xl leading-tight mb-6">
              Jobs in Russia for Foreigners & Africans – Verified Opportunities & Visa Guidance
            </h1>

            <p className="text-lg text-gray-600 mb-6">
              AfroPals Jobs helps foreigners and African job seekers find verified jobs in Russia,
              connect with trusted employers, and access real employment opportunities with clear
              guidance on recruitment, invitation support, and visa processes.
            </p>

            <p className="text-gray-600 mb-8">
              With over <strong>10 years of visa processing experience</strong> and more than{" "}
              <strong>4 years in recruitment</strong>, we provide reliable support for your journey.
            </p>

            {/* SEARCH */}
           <div className="flex gap-2 mb-8 items-stretch">
  <div className="relative flex-1">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

    <Input
      type="text"
      placeholder="Search jobs, skills, or keywords"
      className="pl-10 h-12"
    />
  </div>

  <Button size="lg" className="h-12 px-6">
    Search
  </Button>
</div>

            {/* POPULAR */}
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

      {/* STATS */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          
          <div>
            <Building className="mx-auto mb-3 text-blue-600" />
            <div className="text-3xl">2,500+</div>
            <div className="text-gray-600">Employers</div>
          </div>

          <div>
            <TrendingUp className="mx-auto mb-3 text-green-600" />
            <div className="text-3xl">15,000+</div>
            <div className="text-gray-600">Open Jobs</div>
          </div>

          <div>
            <Users className="mx-auto mb-3 text-purple-600" />
            <div className="text-3xl">50,000+</div>
            <div className="text-gray-600">Job Seekers</div>
          </div>

          <div>
            <Award className="mx-auto mb-3 text-orange-600" />
            <div className="text-3xl">95%</div>
            <div className="text-gray-600">Placement Success</div>
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

      {/* SEO CONTENT */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">

          <h2 className="text-2xl md:text-3xl mb-6">
            Work Opportunities in Russia for Foreigners
          </h2>

          <p className="text-gray-700 mb-4 leading-7">
            AfroPals Jobs provides access to verified job opportunities in Russia for
            foreigners and African applicants seeking reliable employment pathways.
          </p>

          <p className="text-gray-700 mb-4 leading-7">
            We connect candidates with employers in sectors such as teaching,
            hospitality, domestic services, construction, and warehouse jobs.
          </p>

          <p className="text-gray-700 leading-7">
            In addition to recruitment, we also provide guidance on invitations,
            documentation, and visa processes to help candidates relocate with confidence.
          </p>

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <h2 className="text-3xl mb-4">
          Start Your Journey Today
        </h2>

        <p className="mb-6">
          Join AfroPals Jobs and explore verified job opportunities in Russia.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Button size="lg" variant="secondary">
            Create Account
          </Button>

          <a href="https://wa.me/79332742692" target="_blank">
            <Button variant="outline" className="border-white text-white">
              Chat on WhatsApp
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}