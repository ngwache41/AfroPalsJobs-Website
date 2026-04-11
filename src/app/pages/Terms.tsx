import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="py-12 flex-1">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl mb-8">Terms of Service</h1>
          
          <div className="prose max-w-none space-y-6 text-gray-700">
            <p className="text-sm text-gray-500">
              Last Updated: March 11, 2026
            </p>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">1. Introduction</h2>
              <p>
                Welcome to Afro-Personala (afropalsjobs.ru). By accessing or using our platform, 
                you agree to be bound by these Terms of Service. If you do not agree with any 
                part of these terms, you may not use our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">2. Services Provided</h2>
              <p>
                Afro-Personala is a transparent recruitment platform connecting job seekers with 
                employers directly, without intermediary agents. We provide:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Job posting and browsing services</li>
                <li>Direct communication between employers and candidates</li>
                <li>Application tracking and management tools</li>
                <li>Resume hosting and document management</li>
                <li>Verified employer profiles</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">3. User Accounts</h2>
              <h3 className="text-xl mb-2 text-gray-800">3.1 Registration</h3>
              <p>
                You must provide accurate, complete information when creating an account. 
                You are responsible for maintaining the confidentiality of your account credentials.
              </p>
              
              <h3 className="text-xl mb-2 mt-4 text-gray-800">3.2 Account Types</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Candidates:</strong> Free account for job seekers</li>
                <li><strong>Employers:</strong> Paid account for posting jobs and accessing candidates</li>
                <li><strong>Verification:</strong> All employer accounts must be verified before posting jobs</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">4. Employer Terms</h2>
              <h3 className="text-xl mb-2 text-gray-800">4.1 Job Postings</h3>
              <p>Employers agree to:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Post only legitimate, active job positions</li>
                <li>Provide accurate job descriptions and requirements</li>
                <li>Comply with all applicable employment laws</li>
                <li>Not discriminate based on race, gender, age, religion, or other protected characteristics</li>
                <li>Respond to applications in a timely manner</li>
                <li>Honor salary ranges and benefits stated in job postings</li>
              </ul>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">4.2 Prohibited Practices</h3>
              <p>Employers must NOT:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Post fake jobs or scam positions</li>
                <li>Request payment from candidates for job applications</li>
                <li>Collect personal data for purposes other than recruitment</li>
                <li>Use agent intermediaries (direct hiring only)</li>
                <li>Misrepresent company information or job details</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">5. Candidate Terms</h2>
              <h3 className="text-xl mb-2 text-gray-800">5.1 Application Guidelines</h3>
              <p>Candidates agree to:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Provide truthful information in applications and resumes</li>
                <li>Only apply for positions they are genuinely interested in</li>
                <li>Respond professionally to employer communications</li>
                <li>Not share login credentials or account access</li>
              </ul>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">5.2 Data Accuracy</h3>
              <p>
                You are responsible for ensuring all information in your profile and applications 
                is accurate, current, and truthful. False information may result in account termination.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">6. Payments and Subscriptions</h2>
              <h3 className="text-xl mb-2 text-gray-800">6.1 Employer Plans</h3>
              <p>
                Employers must purchase a subscription plan to post jobs and access candidate profiles. 
                Plans are billed monthly or annually.
              </p>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">6.2 Payment Terms</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>All payments are processed securely via Stripe or YooMoney</li>
                <li>Subscriptions auto-renew unless cancelled</li>
                <li>Refunds are provided only in accordance with our refund policy</li>
                <li>Prices may change with 30 days notice</li>
              </ul>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">6.3 Cancellation</h3>
              <p>
                You may cancel your subscription at any time. Access continues until the end 
                of the billing period. No refunds for partial periods.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">7. Content and Intellectual Property</h2>
              <h3 className="text-xl mb-2 text-gray-800">7.1 User Content</h3>
              <p>
                You retain ownership of content you submit (resumes, job postings, etc.). 
                By posting content, you grant us a license to display, distribute, and use 
                it for platform operations.
              </p>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">7.2 Platform Content</h3>
              <p>
                All platform design, code, features, and branding are owned by Afro-Personala 
                and protected by intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">8. Privacy and Data Protection</h2>
              <p>
                Your privacy is important to us. Please review our{" "}
                <a href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>{" "}
                to understand how we collect, use, and protect your data.
              </p>
              <p className="mt-4">
                We comply with GDPR and other applicable data protection regulations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">9. Prohibited Activities</h2>
              <p>You may not:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Use the platform for any illegal purpose</li>
                <li>Scrape, harvest, or collect user data without permission</li>
                <li>Attempt to gain unauthorized access to systems or accounts</li>
                <li>Upload viruses, malware, or harmful code</li>
                <li>Impersonate another person or entity</li>
                <li>Post spam, advertising, or promotional content unrelated to recruitment</li>
                <li>Harass, abuse, or harm other users</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">10. Limitation of Liability</h2>
              <p>
                Afro-Personala is a platform connecting employers and candidates. We do not:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Guarantee employment or hiring outcomes</li>
                <li>Verify all information provided by users</li>
                <li>Act as an employer or recruitment agency</li>
                <li>Take responsibility for employment relationships formed through the platform</li>
              </ul>
              <p className="mt-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE ARE NOT LIABLE FOR ANY INDIRECT, 
                INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING FROM YOUR USE OF THE PLATFORM.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">11. Termination</h2>
              <p>
                We reserve the right to suspend or terminate accounts that violate these terms 
                or engage in fraudulent, illegal, or harmful activities. Upon termination:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Your access to the platform will be revoked</li>
                <li>Active job postings will be removed</li>
                <li>No refund will be provided for remaining subscription time</li>
                <li>We may retain certain data as required by law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">12. Dispute Resolution</h2>
              <p>
                Any disputes arising from these terms or use of the platform shall be resolved 
                through binding arbitration in accordance with Russian Federation law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">13. Changes to Terms</h2>
              <p>
                We may update these Terms of Service from time to time. We will notify users 
                of significant changes via email or platform notification. Continued use after 
                changes constitutes acceptance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">14. Contact Information</h2>
              <p>
                For questions about these Terms of Service, contact us at:
              </p>
              <p className="mt-2">
                <strong>Email:</strong> legal@afropalsjobs.ru<br />
                <strong>Website:</strong> afropalsjobs.ru
              </p>
            </section>

            <div className="border-t pt-6 mt-8">
              <p className="text-sm text-gray-500">
                By using Afro-Personala, you acknowledge that you have read, understood, 
                and agree to be bound by these Terms of Service.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
