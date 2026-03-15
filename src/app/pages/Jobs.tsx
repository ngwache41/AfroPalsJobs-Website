import { useMemo, useState } from "react";
import { Search, Filter, ShieldCheck, BriefcaseBusiness, Globe2, BadgeCheck } from "lucide-react";
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

const categories = [
  "All Jobs",
  "Education",
  "Household",
  "Hospitality",
  "Warehouse",
  "Construction",
];

function categoryToTags(category: string) {
  switch (category) {
    case "Education":
      return ["Education", "English", "Children"];
    case "Household":
      return ["Childcare", "Family", "Private household"];
    case "Hospitality":
      return ["Hospitality", "Hotel", "Restaurant", "Service", "Cleaning", "Dishwashing"];
    case "Warehouse":
      return ["Warehouse", "Logistics", "Packing", "Loading"];
    case "Construction":
      return ["Construction", "Handyman", "Labor", "Maintenance"];
    default:
      return [];
  }
}

export default function Jobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Jobs");

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        searchTerm === "" ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesLocation =
        locationFilter === "" ||
        locationFilter === "all" ||
        job.location.includes(locationFilter);

      const matchesType =
        typeFilter === "" || typeFilter === "all" || job.type === typeFilter;

      const categoryTags = categoryToTags(categoryFilter);
      const matchesCategory =
        categoryFilter === "All Jobs" ||
        job.tags.some((tag) => categoryTags.includes(tag));

      return matchesSearch && matchesLocation && matchesType && matchesCategory;
    });
  }, [searchTerm, locationFilter, typeFilter, categoryFilter]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Page Hero */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-5xl mb-4">
              Verified Job Opportunities in Russia
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl">
              Discover trusted openings in education, household services,
              hospitality, warehouse operations, and construction through
              AfroPals Jobs.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium">Verified Employers</p>
                <p className="text-gray-600">Opportunities reviewed before listing.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <BriefcaseBusiness className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium">Transparent Recruitment</p>
                <p className="text-gray-600">Clearer hiring process, less confusion.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Globe2 className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium">International Support</p>
                <p className="text-gray-600">Open to applicants worldwide.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <BadgeCheck className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium">Guidance Available</p>
                <p className="text-gray-600">Invitation and visa support when needed.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Bar */}
      <section className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const active = categoryFilter === category;
              return (
                <button
                  key={category}
                  onClick={() => setCategoryFilter(category)}
                  className={
                    active
                      ? "px-4 py-2 rounded-full bg-blue-600 text-white text-sm"
                      : "px-4 py-2 rounded-full bg-white border text-sm text-gray-700 hover:border-blue-300 hover:text-blue-600"
                  }
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl border shadow-sm p-4 md:p-5">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by job title, keyword, or employer"
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
                  <SelectItem value="Moscow">Moscow</SelectItem>
                  <SelectItem value="Saint Petersburg">Saint Petersburg</SelectItem>
                  <SelectItem value="Kazan">Kazan</SelectItem>
                  <SelectItem value="Yekaterinburg">Yekaterinburg</SelectItem>
                  <SelectItem value="Novosibirsk">Novosibirsk</SelectItem>
                  <SelectItem value="Russia">Across Russia</SelectItem>
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

      {/* Results */}
      <section className="py-6 flex-1 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
            <div>
              <p className="text-gray-600">
                Showing <span className="font-semibold">{filteredJobs.length}</span> verified job opportunities
              </p>
              <p className="text-sm text-gray-500 mt-1">
                All listings are displayed for informational and recruitment support purposes.
              </p>
            </div>

            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>

          {filteredJobs.length > 0 ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border rounded-xl bg-gray-50">
              <p className="text-gray-700 text-lg">
                No jobs found matching your search.
              </p>
              <p className="text-gray-500 mt-2">
                Try adjusting your keywords, category, location, or job type.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}