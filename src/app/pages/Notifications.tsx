import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Bell, BriefcaseBusiness, FileText, CheckCircle2, MessageCircle } from "lucide-react";

export default function Notifications() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl mb-4">Notifications</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Stay updated on job applications, saved opportunities, employer
            activity, and important account messages.
          </p>
        </div>
      </section>

      {/* NOTIFICATION LIST */}
      <section className="py-12 flex-1">
        <div className="container mx-auto px-4 space-y-4">

          <Card className="shadow-sm border">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-8 w-8 text-green-600 mt-1" />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <h2 className="text-xl">Application Submitted Successfully</h2>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      New
                    </Badge>
                  </div>
                  <p className="text-gray-700 mb-2">
                    Your application for <strong>English Teacher / Governess</strong> has been submitted successfully.
                  </p>
                  <p className="text-sm text-gray-500">Today • 10:35 AM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <BriefcaseBusiness className="h-8 w-8 text-blue-600 mt-1" />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <h2 className="text-xl">New Job Matches Available</h2>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                      Job Alert
                    </Badge>
                  </div>
                  <p className="text-gray-700 mb-2">
                    New opportunities have been added that match your interests in hospitality and warehouse roles.
                  </p>
                  <p className="text-sm text-gray-500">Today • 8:10 AM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <FileText className="h-8 w-8 text-purple-600 mt-1" />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <h2 className="text-xl">Profile Completion Reminder</h2>
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                      Reminder
                    </Badge>
                  </div>
                  <p className="text-gray-700 mb-2">
                    Your profile is 85% complete. Add more details to improve visibility with employers.
                  </p>
                  <p className="text-sm text-gray-500">Yesterday • 6:20 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <MessageCircle className="h-8 w-8 text-orange-600 mt-1" />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <h2 className="text-xl">Support Message Available</h2>
                    <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
                      Support
                    </Badge>
                  </div>
                  <p className="text-gray-700 mb-2">
                    AfroPals Jobs has sent you an update regarding your account support request.
                  </p>
                  <p className="text-sm text-gray-500">Yesterday • 2:45 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Bell className="h-8 w-8 text-gray-600 mt-1" />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <h2 className="text-xl">Saved Job Reminder</h2>
                    <Badge variant="secondary">
                      Saved Jobs
                    </Badge>
                  </div>
                  <p className="text-gray-700 mb-2">
                    You have saved opportunities waiting for review. Return to your saved jobs list and continue applying.
                  </p>
                  <p className="text-sm text-gray-500">2 days ago • 11:00 AM</p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </section>

      <Footer />
    </div>
  );
}