import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Mail, Phone, MessageCircle, Globe2, MapPin } from "lucide-react";
import Seo from "../components/Seo";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Seo
        title="Contact AfroPals Jobs | Recruitment Help, Employer Support and Visa Guidance"
        description="Contact AfroPals Jobs for recruitment support, employer assistance, invitation support, and visa guidance related to work opportunities in Russia."
      />

      <Header />

      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl mb-6">Contact Us</h1>
          <p className="text-lg text-gray-600 mb-6">
            AfroPals Jobs is available to support employers, candidates,
            private families, and organizations seeking recruitment,
            invitation support, and visa-related guidance.
          </p>
          <p className="text-gray-600">
            Reach out through WhatsApp, email, or direct contact details below.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="shadow-sm border">
              <CardContent className="pt-8 pb-8 text-center">
                <MessageCircle className="h-10 w-10 text-blue-600 mx-auto mb-4" />
                <h2 className="text-2xl mb-3">WhatsApp</h2>
                <p className="text-gray-600 mb-6">
                  Chat directly for quick support and inquiries.
                </p>
                <a
                  href="https://wa.me/79332742692?text=Hello%20AfroPals%20Jobs%2C%20I%20would%20like%20to%20make%20an%20inquiry."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full">Open WhatsApp</Button>
                </a>
              </CardContent>
            </Card>

            <Card className="shadow-sm border">
              <CardContent className="pt-8 pb-8 text-center">
                <Mail className="h-10 w-10 text-blue-600 mx-auto mb-4" />
                <h2 className="text-2xl mb-3">Email</h2>
                <p className="text-gray-600 mb-6">
                  Send detailed questions and professional requests.
                </p>
                <a href="mailto:info@afropalsjobs.ru">
                  <Button className="w-full" variant="outline">
                    info@afropalsjobs.ru
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card className="shadow-sm border">
              <CardContent className="pt-8 pb-8 text-center">
                <Phone className="h-10 w-10 text-blue-600 mx-auto mb-4" />
                <h2 className="text-2xl mb-3">Phone</h2>
                <p className="text-gray-600 mb-6">
                  Call or message for direct communication.
                </p>
                <a href="tel:+79332742692">
                  <Button className="w-full" variant="outline">
                    +7 (933) 274-26-92
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card className="shadow-sm border">
              <CardContent className="pt-8 pb-8 text-center">
                <Globe2 className="h-10 w-10 text-blue-600 mx-auto mb-4" />
                <h2 className="text-2xl mb-3">Website</h2>
                <p className="text-gray-600 mb-6">
                  Visit our platform for jobs and services.
                </p>
                <a
                  href="https://afropalsjobs.ru"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full" variant="outline">
                    afropalsjobs.ru
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="shadow-sm border">
            <CardContent className="pt-8 pb-8 px-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl mb-3">Business Information</h2>
                <p className="text-gray-600">
                  Professional recruitment and support services with international reach.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium">Service Area</p>
                      <p className="text-gray-600">
                        Russia and international candidate support
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600">info@afropalsjobs.ru</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium">Phone / WhatsApp</p>
                      <p className="text-gray-600">+7 (933) 274-26-92</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Globe2 className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium">Website</p>
                      <p className="text-gray-600">www.afropalsjobs.ru</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MessageCircle className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium">Support Type</p>
                      <p className="text-gray-600">
                        Recruitment, invitations, visa guidance, and employer support
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium">Registered Information</p>
                      <p className="text-gray-600">ОГРНИП: 325774600487744</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl mb-6">
            Contact AfroPals Jobs for Recruitment and Visa Guidance
          </h2>

          <p className="text-gray-700 mb-4 leading-7">
            AfroPals Jobs supports candidates, employers, and private families
            seeking professional guidance related to recruitment, invitations,
            visa-related questions, and work opportunities in Russia.
          </p>

          <p className="text-gray-700 mb-4 leading-7">
            Whether you are an employer looking for international candidates or
            an applicant seeking trusted information, our contact channels are
            available to help you move forward with more clarity.
          </p>

          <p className="text-gray-700 leading-7">
            For faster support, WhatsApp is the best direct communication option.
          </p>
        </div>
      </section>

      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl mb-4">
            We’re Ready to Assist You
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Whether you are seeking recruitment support, invitation guidance,
            visa-related assistance, or job opportunities, AfroPals Jobs is here to help.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/79332742692?text=Hello%20AfroPals%20Jobs%2C%20I%20would%20like%20to%20contact%20you."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" size="lg">
                Contact on WhatsApp
              </Button>
            </a>

            <a href="mailto:info@afropalsjobs.ru">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white/10"
              >
                Send Email
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}