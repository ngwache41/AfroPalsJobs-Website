import Header from "../components/Header";
import Footer from "../components/Footer";
import JobCard from "../components/JobCard";
import { jobs } from "../data/jobs";
import Seo from "../components/Seo";

export default function Jobs() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Seo
        title="Jobs in Russia | AfroPals Jobs Verified Opportunities for Foreigners and Africans"
        description="Browse verified jobs in Russia for foreigners and Africans. Explore teaching, hospitality, warehouse, construction, and other opportunities through AfroPals Jobs."
      />

      <Header />

      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl mb-4">Verified Jobs in Russia</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Explore legitimate job opportunities from verified employers across
            different sectors in Russia.
          </p>
        </div>
      </section>

      <section className="py-12 flex-1">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} {...job} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}