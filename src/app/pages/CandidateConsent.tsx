import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CandidateConsent() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="py-12 flex-1">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl mb-8">Candidate Consent & Data Use</h1>
          
          <div className="prose max-w-none space-y-6 text-gray-700">
            <p className="text-sm text-gray-500">
              Last Updated: March 11, 2026
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <h3 className="text-xl text-green-900 mb-2">Your Rights Are Protected</h3>
              <p className="text-green-800">
                Afro-Personala is committed to protecting your personal information and giving 
                you full control over how your data is used. This document explains what data 
                we collect, how it's used, and your rights.
              </p>
            </div>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">1. Introduction</h2>
              <p>
                This Candidate Consent document explains how Afro-Personala processes your 
                personal information when you use our recruitment platform. By creating an 
                account and using our services, you consent to the practices described here.
              </p>
              <p className="mt-4">
                <strong>You have full control</strong> over your data and can withdraw consent 
                at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">2. What Data We Collect</h2>
              
              <h3 className="text-xl mb-2 text-gray-800">2.1 Profile Information</h3>
              <p>When you create a candidate account, we collect:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Basic Details:</strong> Name, email, phone number</li>
                <li><strong>Professional Info:</strong> Current position, experience level</li>
                <li><strong>Location:</strong> City/region for job matching</li>
                <li><strong>Job Preferences:</strong> Desired roles, industries, salary expectations</li>
              </ul>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">2.2 Application Documents</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>Resume/CV (PDF or Word format)</li>
                <li>Cover letters</li>
                <li>Portfolio links</li>
                <li>Certificates and qualifications</li>
              </ul>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">2.3 Activity Data</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>Jobs you view and apply to</li>
                <li>Search queries and filters</li>
                <li>Login history and device information</li>
                <li>Communication with employers</li>
              </ul>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">2.4 Optional Information</h3>
              <p>You may choose to provide:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>LinkedIn profile</li>
                <li>Professional references</li>
                <li>Availability and start date</li>
                <li>Additional skills and languages</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">3. How We Use Your Data</h2>
              
              <h3 className="text-xl mb-2 text-gray-800">3.1 Job Matching</h3>
              <p>We use your profile to:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Show you relevant job opportunities</li>
                <li>Send personalized job alerts</li>
                <li>Recommend positions matching your skills</li>
                <li>Help employers find suitable candidates</li>
              </ul>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">3.2 Application Processing</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>Submit your applications to employers</li>
                <li>Track application status and history</li>
                <li>Facilitate communication with hiring managers</li>
                <li>Schedule interviews and follow-ups</li>
              </ul>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">3.3 Platform Improvement</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>Analyze usage patterns to improve features</li>
                <li>Enhance search and matching algorithms</li>
                <li>Provide better job recommendations</li>
                <li>Improve user experience</li>
              </ul>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">3.4 Communication</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>Send job alerts based on your preferences</li>
                <li>Notify you of application updates</li>
                <li>Share platform updates and features</li>
                <li>Respond to support requests</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">4. Who Can See Your Information</h2>
              
              <h3 className="text-xl mb-2 text-gray-800">4.1 Verified Employers</h3>
              <p>When you apply for a job, the employer receives:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Your full name and contact information</li>
                <li>Resume and cover letter</li>
                <li>Relevant profile information</li>
                <li>Application date and status</li>
              </ul>
              <p className="mt-2 italic text-sm">
                <strong>Important:</strong> Employers must be verified before accessing candidate data. 
                We verify all employers to prevent fraud.
              </p>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">4.2 Profile Visibility Settings</h3>
              <p>You control your profile visibility:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Public:</strong> All verified employers can find you</li>
                <li><strong>Limited:</strong> Only employers you apply to see full profile</li>
                <li><strong>Private:</strong> Not searchable, apply to specific jobs only</li>
              </ul>
              <p className="mt-2">
                Change your visibility settings anytime in your account preferences.
              </p>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">4.3 What Employers Cannot See</h3>
              <p>The following information is always private:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Password and login credentials</li>
                <li>Payment information (if applicable)</li>
                <li>Other jobs you've applied to</li>
                <li>Personal notes and saved searches</li>
                <li>Account activity outside of their job postings</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">5. Data Sharing and Third Parties</h2>
              
              <h3 className="text-xl mb-2 text-gray-800">5.1 What We Share</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Employers:</strong> Application data when you apply to their jobs</li>
                <li><strong>Service Providers:</strong> Hosting, email, analytics (secure and limited)</li>
                <li><strong>Legal Requirements:</strong> If required by law or to prevent fraud</li>
              </ul>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">5.2 What We NEVER Do</h3>
              <ul className="list-disc ml-6 space-y-2 font-semibold text-red-700">
                <li>We do NOT sell your data to third parties</li>
                <li>We do NOT share your resume with recruitment agents</li>
                <li>We do NOT provide your contact info to marketers</li>
                <li>We do NOT use your data for purposes unrelated to recruitment</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">6. Your Rights and Control</h2>
              
              <h3 className="text-xl mb-2 text-gray-800">6.1 Access Your Data</h3>
              <p>You can:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>View all data we have about you</li>
                <li>Download your profile and applications</li>
                <li>Request a copy of your data in portable format</li>
                <li>Review your application history</li>
              </ul>
              <p className="mt-2 italic">Access your data anytime in Account Settings.</p>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">6.2 Update Your Information</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>Edit your profile anytime</li>
                <li>Update resume and documents</li>
                <li>Change contact information</li>
                <li>Modify job preferences</li>
              </ul>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">6.3 Delete Your Data</h3>
              <p>You have the right to:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Delete your account and all associated data</li>
                <li>Remove specific documents or information</li>
                <li>Withdraw applications</li>
                <li>Request deletion of data held by employers you applied to</li>
              </ul>
              <p className="mt-2 bg-yellow-50 p-3 rounded border border-yellow-200 text-sm">
                <strong>Note:</strong> Some data may be retained for legal or accounting purposes 
                (e.g., if you had a contract or dispute). We'll inform you what can't be deleted.
              </p>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">6.4 Control Communications</h3>
              <p>Manage what emails you receive:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Unsubscribe from job alerts (keep essential notifications)</li>
                <li>Pause all non-essential emails</li>
                <li>Choose frequency of updates</li>
                <li>Select types of jobs you want alerts for</li>
              </ul>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">6.5 Withdraw Consent</h3>
              <p>
                You can withdraw consent for data processing at any time by:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Deleting your account</li>
                <li>Emailing privacy@afropalsjobs.ru</li>
                <li>Adjusting privacy settings</li>
              </ul>
              <p className="mt-2 italic text-sm">
                Withdrawing consent may limit your ability to use certain platform features.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">7. Data Security</h2>
              <p>We protect your data through:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Encryption:</strong> SSL/TLS for data transmission</li>
                <li><strong>Secure Storage:</strong> Encrypted databases and file storage</li>
                <li><strong>Access Controls:</strong> Limited employee access with logging</li>
                <li><strong>Regular Audits:</strong> Security reviews and updates</li>
                <li><strong>Verified Employers:</strong> All employers must pass verification</li>
              </ul>
              <p className="mt-4">
                <strong>Your responsibility:</strong> Keep your password secure. Don't share 
                your account access with anyone.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">8. Data Retention</h2>
              <p>We keep your data as long as:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Your account is active</li>
                <li>You haven't requested deletion</li>
                <li>It's needed to provide services</li>
                <li>Required by law (e.g., tax records)</li>
              </ul>
              <p className="mt-4">
                <strong>After account deletion:</strong> Most data is removed within 30 days. 
                Some records (e.g., transaction history) may be kept for up to 7 years for 
                legal compliance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">9. Special Protections</h2>
              
              <h3 className="text-xl mb-2 text-gray-800">9.1 Sensitive Data</h3>
              <p>
                We do NOT collect or require sensitive personal data such as:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Race or ethnicity</li>
                <li>Religious beliefs</li>
                <li>Health information</li>
                <li>Political opinions</li>
                <li>Sexual orientation</li>
                <li>Biometric data</li>
              </ul>
              <p className="mt-2 text-sm italic">
                If you include such information in your resume, consider removing it. 
                Employers should not request this information.
              </p>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">9.2 Protection from Discrimination</h3>
              <p>
                If an employer requests inappropriate information or discriminates against 
                you, report it immediately to abuse@afropalsjobs.ru. We take all reports 
                seriously and will investigate.
              </p>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">9.3 Fraud Protection</h3>
              <p>We protect you from scams by:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Verifying all employers before they can contact you</li>
                <li>Monitoring for suspicious job postings</li>
                <li>Investigating reported fraud immediately</li>
                <li>Never asking you to pay for job applications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">10. International Data Transfers</h2>
              <p>
                Your data may be stored and processed in different countries. We ensure 
                appropriate safeguards are in place through:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>GDPR-compliant data processing agreements</li>
                <li>Standard contractual clauses</li>
                <li>Secure data centers with encryption</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">11. Your Legal Rights (GDPR)</h2>
              <p>Under GDPR and applicable laws, you have the right to:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Right to Access:</strong> Get a copy of your data</li>
                <li><strong>Right to Rectification:</strong> Correct inaccurate data</li>
                <li><strong>Right to Erasure:</strong> Delete your data ("right to be forgotten")</li>
                <li><strong>Right to Restrict Processing:</strong> Limit how we use your data</li>
                <li><strong>Right to Data Portability:</strong> Move your data to another service</li>
                <li><strong>Right to Object:</strong> Object to certain processing activities</li>
                <li><strong>Right to Withdraw Consent:</strong> Stop data processing based on consent</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, contact privacy@afropalsjobs.ru or use your account settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">12. Contact and Complaints</h2>
              
              <h3 className="text-xl mb-2 text-gray-800">12.1 Contact Us</h3>
              <p>For data-related questions or requests:</p>
              <p className="mt-2">
                <strong>Email:</strong> privacy@afropalsjobs.ru<br />
                <strong>Data Protection Officer:</strong> dpo@afropalsjobs.ru<br />
                <strong>General Support:</strong> support@afropalsjobs.ru
              </p>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">12.2 File a Complaint</h3>
              <p>
                If you're unhappy with how we handle your data, you can:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Contact our Data Protection Officer first</li>
                <li>File a complaint with your local data protection authority</li>
                <li>Contact Roskomnadzor (Russia) if applicable</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">13. Changes to This Consent</h2>
              <p>
                We may update this document from time to time. We'll notify you of significant 
                changes via email and give you the option to review and accept new terms.
              </p>
              <p className="mt-2">
                You can always find the latest version at afropalsjobs.ru/candidate-consent
              </p>
            </section>

            <div className="border-t pt-6 mt-8 bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl text-blue-900 mb-3">Your Acknowledgment</h3>
              <p className="text-blue-800 mb-4">
                By creating a candidate account on Afro-Personala, you acknowledge that:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-blue-800">
                <li>You have read and understood this Candidate Consent document</li>
                <li>You consent to the collection and use of your data as described</li>
                <li>You understand your rights and how to exercise them</li>
                <li>You can withdraw consent and delete your account at any time</li>
              </ul>
            </div>

            <div className="border-t pt-6 mt-8">
              <h3 className="text-lg text-gray-900 mb-2">Questions or Concerns?</h3>
              <p className="text-sm text-gray-600">
                We're here to help. Contact privacy@afropalsjobs.ru with any questions about 
                your data or privacy rights.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
