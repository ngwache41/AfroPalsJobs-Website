import { Search, TrendingUp, Users, Award, ArrowRight, Building, Clock, DollarSign } from "lucide-react";
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

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl mb-6">
                Find Verified Jobs & Visas Assistance in Russia
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Connect with verified employers,visas facilitators, discover real opportunities, and apply with confidence through AfroPals Jobs.
              </p>

              <div className="flex gap-2 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search jobs, skills,visas or keywords"
                    className="pl-10 h-12"
                  />
                </div>
                <Button size="lg" className="px-8">
                  Search
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-600">Popular:</span>
                <button className="text-sm text-blue-600 hover:underline">English Teacher/ Governor/ Governess</button>
                <button className="text-sm text-blue-600 hover:underline">Nanny/ Manny</button>
                <button className="text-sm text-blue-600 hover:underline">Warehouse/ Loader/ Offloader</button>
                <button className="text-sm text-blue-600 hover:underline">Construction Workers/ Handyman/ Laborer</button>
                <button className="text-sm text-blue-600 hover:underline">Dishwasher/ Hotpot Washer/ Cleaner</button>
                <button className="text-sm text-blue-600 hover:underline">Tourist Visa/ Private Visa/ Study Visa/ Employment Visa</button>
              </div>
            </div>

            <div className="hidden md:block">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758518732175-5d608ba3abdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHRlYW0lMjBtZWV0aW5nfGVufDF8fHx8MTc3MzIxNzUwM3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Professional team meeting"
                className="rounded-lg shadow-2xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
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
              <div className="text-gray-600">Companies</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="bg-green-100 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="text-3xl mb-1">15,000+</div>
              <div className="text-gray-600">Open Positions</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="text-3xl mb-1">50,000+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="bg-orange-100 p-3 rounded-full">
                  <Award className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <div className="text-3xl mb-1">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl mb-2">Featured Jobs</h2>
              <p className="text-gray-600">Hand-picked opportunities from top companies</p>
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

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get started with your job search in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-blue-600">1</span>
                </div>
                <h3 className="text-xl mb-2">Create Your Profile</h3>
                <p className="text-gray-600">
                  Sign up and build your professional profile to showcase your skills and experience.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-green-600">2</span>
                </div>
                <h3 className="text-xl mb-2">Search & Apply</h3>
                <p className="text-gray-600">
                  Browse thousands of job listings and apply to positions that match your skills.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-purple-600">3</span>
                </div>
                <h3 className="text-xl mb-2">Get Hired</h3>
                <p className="text-gray-600">
                  Connect with employers, ace your interviews, and land your dream job.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzczMjQwNjA3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Modern office workspace"
                className="rounded-lg shadow-xl w-full h-[400px] object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl mb-6">About TalentHub</h2>
              <p className="text-gray-300 mb-6">
                We're on a mission to connect talented professionals with opportunities that match their skills, ambitions, and values. Since 2020, we've helped over 50,000 people find their dream jobs.
              </p>
              <p className="text-gray-300 mb-8">
                Our platform uses advanced matching algorithms and personalized recommendations to ensure you find the right fit. Whether you're a recent graduate or an experienced professional, we're here to support your career journey.
              </p>
              <Button variant="secondary" size="lg">
                Learn More About Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of professionals who found their dream jobs through TalentHub
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Create Free Account
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
              Contact Our Team
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}