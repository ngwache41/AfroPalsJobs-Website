import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Mail, MessageCircle, Phone } from "lucide-react";
import Seo from "../components/Seo";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Seo
        title="Contact AfroPals Jobs | Recruitment Help, Visa Guidance and Employer Support"
        description="Contact AfroPals Jobs for recruitment support, visa guidance, invitation support, employer help, and candidate assistance in Russia."
      />

      <Header />

      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl mb-6">Contact Us</h1>
          <p className="text-lg text-gray-600">
            Reach out to AfroPals Jobs for professional support, recruitment
            inquiries, and visa guidance information.
          </p>
        </div>
      </section>

      <section className="py-16 flex-1">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
          <Card className="shadow-sm border">
            <CardContent className="pt-8 text-center">
              <Phone className="mx-auto mb-4 h-10 w-10 text-blue-600" />
              <h2 className="text-2xl mb-3">Phone</h2>
              <p className="text-gray-600">+7 933 274 2692</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm border">
            <CardContent className="pt-8 text-center">
              <Mail className="mx-auto mb-4 h-10 w-10 text-blue-600" />
              <h2 className="text-2xl mb-3">Email</h2>
              <p className="text-gray-600">info@afropalsjobs.ru</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm border">
            <CardContent className="pt-8 text-center">
              <MessageCircle className="mx-auto mb-4 h-10 w-10 text-blue-600" />
              <h2 className="text-2xl mb-3">WhatsApp</h2>
              <p className="text-gray-600">Fast support and inquiries</p>
            </CardContent>
          </Card>
        </div>

        <div className="container mx-auto px-4 text-center mt-12">
          <a
            href="https://wa.me/79332742692?text=Hello%20AfroPals%20Jobs%2C%20I%20would%20like%20to%20contact%20you."
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg">Chat on WhatsApp</Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}