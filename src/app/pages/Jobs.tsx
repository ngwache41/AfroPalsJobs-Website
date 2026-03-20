import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import Header from "../components/Header";
import Footer from "../components/Footer";
import JobCard from "../components/JobCard";
import { jobs } from "../data/jobs";
import Seo from "../components/Seo";

export default function Jobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      searchTerm === "" ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesLocation =
      locationFilter === "all" || job.location.includes(locationFilter);

    const matchesType =
      typeFilter === "all" || job.type === typeFilter;

    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Seo
        title="Jobs in Russia | Verified Jobs for Foreigners and Africans | AfroPals Jobs"
        description="Browse verified jobs in Russia for foreigners and Africans. Explore teaching, hospitality, warehouse, construction, and other trusted work opportunities through AfroPals Jobs."
      />

      <Header />

      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-4xl md:text-5xl mb-4">
            Verified Jobs in Russia for Foreigners and Africans
          </h1>
          <p className="text-lg text-gray-600">
            Explore trusted job opportunities in Russia across education,
            hospitality, domestic support, logistics, construction, and more.
          </p>
        </div>
      </section>

      {/* SEARCH / FILTER */}
      <section className="py-10 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search jobs, skills, or company"
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="San Francisco">San Francisco</SelectItem>
                  <SelectItem value="New York">New York</SelectItem>
                  <SelectItem value="Austin">Austin</SelectItem>
                  <SelectItem value="Boston">Boston</SelectItem>
                  <SelectItem value="Seattle">Seattle</SelectItem>
                  <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* JOB RESULTS */}
      <section className="py-12 flex-1">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl mb-2">Available Opportunities</h2>
              <p className="text-gray-600">
                Showing <span className="font-semibold">{filteredJobs.length}</span> verified jobs
              </p>
            </div>

            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter Results
            </Button>
          </div>

          {filteredJobs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border shadow-sm">
              <h3 className="text-2xl mb-3">No jobs found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filters to discover more opportunities.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* SEO TEXT */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl mb-6">
            Trusted Work Opportunities in Russia
          </h2>

          <p className="text-gray-700 mb-4 leading-7">
            AfroPals Jobs helps international candidates explore trusted work
            opportunities in Russia through a more transparent and structured
            recruitment process. Our platform is designed to support foreigners
            and African applicants seeking verified employers and clearer access
            to real employment opportunities.
          </p>

          <p className="text-gray-700 mb-4 leading-7">
            Job seekers can browse opportunities in teaching, hospitality,
            logistics, warehouse roles, construction, domestic support, and
            other sectors where serious candidates are needed.
          </p>

          <p className="text-gray-700 leading-7">
            We also support better decision-making by combining recruitment
            access with practical guidance related to invitations, documents,
            and visa-related procedures where required.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}