import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="py-12 flex-1">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl mb-8">Privacy Policy</h1>
          
          <div className="prose max-w-none space-y-6 text-gray-700">
            <p className="text-sm text-gray-500">
              Last Updated: March 11, 2026
            </p>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">1. Introduction</h2>
              <p>
                Afro-Personala ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                information when you use our recruitment platform at afropalsjobs.ru.
              </p>
              <p className="mt-4">
                We comply with the General Data Protection Regulation (GDPR), Russian Federal 
                Law on Personal Data, and other applicable privacy regulations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">2. Information We Collect</h2>
              
              <h3 className="text-xl mb-2 text-gray-800">2.1 Information You Provide</h3>
              <p><strong>Candidates:</strong></p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Name, email address, phone number</li>
                <li>Resume/CV and work history</li>
                <li>Education and qualifications</li>
                <li>Skills and professional profile</li>
                <li>Cover letters and application materials</li>
                <li>Location and job preferences</li>
              </ul>

              <p className="mt-4"><strong>Employers:</strong></p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Company name and contact information</li>
                <li>Business registration details</li>
                <li>Job posting information</li>
                <li>Payment and billing information</li>
                <li>Communication with candidates</li>
              </ul>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">2.2 Automatically Collected Information</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Pages viewed and time spent on platform</li>
                <li>Referring website and navigation patterns</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">2.3 Third-Party Information</h3>
              <p>
                We may receive information from third-party services you connect to your account, 
                such as LinkedIn profiles (with your permission).
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">3. How We Use Your Information</h2>
              <p>We use collected information for:</p>
              
              <h3 className="text-xl mb-2 text-gray-800">3.1 Platform Operations</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>Creating and managing user accounts</li>
                <li>Processing job applications and matching candidates with employers</li>
                <li>Facilitating communication between users</li>
                <li>Processing payments and managing subscriptions</li>
                <li>Providing customer support</li>
              </ul>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">3.2 Improvements and Analytics</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>Analyzing platform usage and performance</li>
                <li>Improving features and user experience</li>
                <li>Developing new services</li>
                <li>Conducting research and analytics</li>
              </ul>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">3.3 Marketing and Communications</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>Sending job alerts and notifications</li>
                <li>Platform updates and announcements</li>
                <li>Promotional emails (with consent, unsubscribe anytime)</li>
                <li>Personalized job recommendations</li>
              </ul>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">3.4 Legal and Security</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>Preventing fraud and abuse</li>
                <li>Enforcing our Terms of Service</li>
                <li>Complying with legal obligations</li>
                <li>Protecting user safety and security</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">4. Information Sharing and Disclosure</h2>
              
              <h3 className="text-xl mb-2 text-gray-800">4.1 With Other Users</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>Candidate profiles are visible to verified employers</li>
                <li>Applications are shared with relevant employers</li>
                <li>Job postings are publicly visible on the platform</li>
                <li>Employers can see candidate responses to their postings</li>
              </ul>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">4.2 Service Providers</h3>
              <p>We share data with trusted third parties who help us operate:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Cloud hosting providers (secure data storage)</li>
                <li>Payment processors (Stripe, YooMoney)</li>
                <li>Email service providers</li>
                <li>Analytics services (Google Analytics, Yandex Metrica)</li>
                <li>Customer support tools</li>
              </ul>
              <p className="mt-2 italic">
                All service providers are contractually bound to protect your data.
              </p>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">4.3 Legal Requirements</h3>
              <p>We may disclose information when required by law or to:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Comply with legal processes or government requests</li>
                <li>Enforce our policies and protect our rights</li>
                <li>Prevent fraud or illegal activities</li>
                <li>Protect user safety in emergencies</li>
              </ul>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">4.4 Business Transfers</h3>
              <p>
                If we are involved in a merger, acquisition, or sale of assets, your information 
                may be transferred. We will notify you before your data is transferred and becomes 
                subject to different privacy practices.
              </p>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">4.5 What We Don't Do</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>We do NOT sell your personal data to third parties</strong></li>
                <li>We do NOT share your data with recruitment agents</li>
                <li>We do NOT provide your contact information to marketing companies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">5. Data Security</h2>
              <p>We implement industry-standard security measures:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Encrypted data storage</li>
                <li>Secure authentication (password hashing)</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and monitoring</li>
                <li>Secure file storage on Cloudflare R2</li>
              </ul>
              <p className="mt-4">
                While we strive to protect your data, no method of transmission over the Internet 
                is 100% secure. You are responsible for keeping your password confidential.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">6. Your Rights and Choices</h2>
              <p>Under GDPR and applicable laws, you have the right to:</p>

              <h3 className="text-xl mb-2 text-gray-800">6.1 Access and Portability</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>Access your personal data we hold</li>
                <li>Request a copy of your data in portable format</li>
                <li>Download your resume and application history</li>
              </ul>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">6.2 Correction and Update</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>Update your profile information anytime</li>
                <li>Correct inaccurate data</li>
                <li>Modify your job preferences and settings</li>
              </ul>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">6.3 Deletion and Restriction</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>Delete your account and associated data</li>
                <li>Request deletion of specific information</li>
                <li>Restrict processing of your data</li>
                <li>Object to certain data uses</li>
              </ul>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">6.4 Communication Preferences</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>Opt-out of marketing emails (unsubscribe link provided)</li>
                <li>Control job alert frequency</li>
                <li>Manage notification settings</li>
              </ul>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">6.5 Withdraw Consent</h3>
              <p>
                You can withdraw consent for data processing at any time. This does not affect 
                the lawfulness of processing before withdrawal.
              </p>

              <p className="mt-4">
                <strong>To exercise your rights:</strong> Contact privacy@afropalsjobs.ru
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">7. Cookies and Tracking</h2>
              
              <h3 className="text-xl mb-2 text-gray-800">7.1 What We Use</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for platform functionality</li>
                <li><strong>Analytics Cookies:</strong> Track usage and performance</li>
                <li><strong>Preference Cookies:</strong> Remember your settings</li>
                <li><strong>Marketing Cookies:</strong> Personalize ads (with consent)</li>
              </ul>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">7.2 Your Control</h3>
              <p>
                You can control cookies through your browser settings or our cookie consent banner. 
                Disabling certain cookies may affect platform functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">8. Data Retention</h2>
              <p>We retain your data for as long as:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Your account is active</li>
                <li>Necessary to provide services</li>
                <li>Required by law or for legal purposes</li>
                <li>Needed to resolve disputes</li>
              </ul>
              <p className="mt-4">
                When you delete your account, we remove personal data within 90 days, except 
                where retention is legally required (e.g., financial records, legal disputes).
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">9. International Data Transfers</h2>
              <p>
                Your data may be transferred and stored in countries outside your residence. 
                We ensure appropriate safeguards are in place for such transfers, including:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Standard contractual clauses</li>
                <li>Adequacy decisions by regulatory authorities</li>
                <li>Server locations in secure jurisdictions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">10. Children's Privacy</h2>
              <p>
                Our platform is not intended for users under 16 years of age. We do not knowingly 
                collect data from children. If we learn we have collected a child's information, 
                we will delete it immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">11. Third-Party Links</h2>
              <p>
                Our platform may contain links to third-party websites. We are not responsible 
                for their privacy practices. Please review their privacy policies separately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">12. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of 
                significant changes via email or platform notification. The "Last Updated" 
                date at the top indicates the most recent version.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">13. Contact Us</h2>
              <p>For privacy-related questions or requests:</p>
              <p className="mt-2">
                <strong>Email:</strong> privacy@afropalsjobs.ru<br />
                <strong>Data Protection Officer:</strong> dpo@afropalsjobs.ru<br />
                <strong>Website:</strong> afropalsjobs.ru
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">14. Regulatory Authority</h2>
              <p>
                If you have concerns about our data practices, you have the right to lodge a 
                complaint with the relevant data protection authority in your jurisdiction.
              </p>
              <p className="mt-2">
                <strong>Russia:</strong> Federal Service for Supervision of Communications, 
                Information Technology and Mass Media (Roskomnadzor)
              </p>
            </section>

            <div className="border-t pt-6 mt-8">
              <p className="text-sm text-gray-500">
                By using Afro-Personala, you acknowledge that you have read and understood this 
                Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
