import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent } from "../components/ui/card";
import Seo from "../components/Seo";

export default function FAQ() {
  const faqs = [
    {
      question: "What is AfroPals Jobs?",
      answer:
        "AfroPals Jobs is a platform that connects international job seekers, including African applicants and other foreigners, with verified employers and job opportunities in Russia.",
    },
    {
      question: "Does AfroPals Jobs provide jobs directly?",
      answer:
        "AfroPals Jobs is a recruitment and support platform. We help candidates discover opportunities and help employers reach serious applicants, while also providing guidance related to invitations and visa processes where required.",
    },
    {
      question: "Can foreigners apply for jobs in Russia through this website?",
      answer:
        "Yes. The platform is designed to support foreigners seeking legitimate work opportunities in Russia, while helping them better understand the hiring and relocation process.",
    },
    {
      question: "Does AfroPals Jobs help with visa guidance?",
      answer:
        "Yes. AfroPals Jobs provides guidance related to visa processes, invitations, and documentation support, based on practical experience in visa processing.",
    },
    {
      question: "What kind of jobs are available?",
      answer:
        "Job categories may include teaching, governess positions, hospitality, warehouse jobs, construction, domestic support, and other opportunities depending on employer demand.",
    },
    {
      question: "How do employers post jobs?",
      answer:
        "Employers, families, and organizations can use the Post a Job page to submit vacancies for review before publication.",
    },
    {
      question: "Are the employers verified?",
      answer:
        "AfroPals Jobs is built around transparent recruitment and aims to feature verified and trusted opportunities to reduce confusion and fake intermediaries.",
    },
    {
      question: "How can I contact AfroPals Jobs?",
      answer:
        "You can contact AfroPals Jobs through WhatsApp, email, phone, or the Contact page on the website.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Seo
        title="FAQ | AfroPals Jobs Questions About Jobs in Russia, Visa Guidance and Recruitment"
        description="Read frequently asked questions about AfroPals Jobs, verified jobs in Russia, visa guidance, recruitment support, employer listings, and international opportunities."
      />

      <Header />

      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600">
            Find answers to common questions about jobs in Russia, recruitment
            support, invitations, visa guidance, and how AfroPals Jobs works.
          </p>
        </div>
      </section>

      <section className="py-16 flex-1 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl space-y-6">
          {faqs.map((faq, index) => (
            <Card key={index} className="shadow-sm border">
              <CardContent className="pt-6">
                <h2 className="text-xl md:text-2xl mb-3">{faq.question}</h2>
                <p className="text-gray-600 leading-7">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl mb-6">
            Need More Help?
          </h2>

          <p className="text-gray-700 mb-4 leading-7">
            If your question is not answered here, you can contact AfroPals Jobs
            directly for more guidance about jobs in Russia, recruitment support,
            employer services, invitations, and visa-related processes.
          </p>

          <p className="text-gray-700 leading-7">
            For faster communication, WhatsApp is usually the easiest direct option.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}