import { useParams, useNavigate } from "react-router";
import {
  MapPin,
  DollarSign,
  Clock,
  Briefcase,
  Building,
  Share2,
  Bookmark,
  ArrowLeft,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { jobs } from "../data/jobs";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = jobs.find((j) => j.id === id);

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl mb-4">Job not found</h2>
            <Button onClick={() => navigate("/jobs")}>Back to Jobs</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/jobs")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Button>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-gray-100 w-16 h-16 rounded-lg flex items-center justify-center shrink-0">
                    <Building className="h-8 w-8 text-gray-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl mb-2">{job.title}</h1>
                    <p className="text-lg text-gray-600">{job.company}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Briefcase className="h-4 w-4" />
                    <span className="text-sm">{job.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-sm">{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{job.postedDate}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex md:flex-col gap-3">
                <Button size="lg" className="flex-1">
                  Apply Now
                </Button>
                <Button variant="outline" size="lg">
                  <Bookmark className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Details */}
      <section className="py-12 flex-1">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl mb-4">Job Description</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {job.description}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl mb-4">Requirements</h2>
                  <ul className="space-y-2">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="flex gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span className="text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl mb-4">Responsibilities</h2>
                  <ul className="space-y-2">
                    {job.responsibilities.map((resp, index) => (
                      <li key={index} className="flex gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span className="text-gray-700">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl mb-4">Benefits</h2>
                  <ul className="space-y-2">
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className="flex gap-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">About {job.company}</h3>
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1758873268631-fa944fc5cad2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwY29ycG9yYXRlJTIwcHJvZmVzc2lvbmFsc3xlbnwxfHx8fDE3NzMyNjU5ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Company culture"
                    className="rounded-lg w-full h-40 object-cover mb-4"
                  />
                  <p className="text-sm text-gray-600 mb-4">
                    A leading technology company focused on innovation and creating amazing products that make a difference in people's lives.
                  </p>
                  <Separator className="my-4" />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Industry</span>
                      <span>Technology</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Company Size</span>
                      <span>500-1000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Founded</span>
                      <span>2015</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View Company Profile
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Quick Apply</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Ready to take the next step? Apply now and we'll review your application within 48 hours.
                  </p>
                  <Button className="w-full" size="lg">
                    Apply for this Position
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Share this Job</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      Share on LinkedIn
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Share on Twitter
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Copy Link
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
