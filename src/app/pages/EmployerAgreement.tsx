import Header from "../components/Header";
import Footer from "../components/Footer";

export default function EmployerAgreement() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="py-12 flex-1">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl mb-8">Employer Agreement</h1>
          
          <div className="prose max-w-none space-y-6 text-gray-700">
            <p className="text-sm text-gray-500">
              Last Updated: March 11, 2026
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="text-xl text-blue-900 mb-2">No Agent Policy</h3>
              <p className="text-blue-800">
                Afro-Personala is a <strong>direct recruitment platform</strong>. Employers must 
                hire candidates directly without using agents or intermediaries. Any employer 
                found using agents will have their account terminated immediately.
              </p>
            </div>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">1. Agreement Overview</h2>
              <p>
                This Employer Agreement ("Agreement") is entered into between Afro-Personala 
                ("Platform") and the employer ("Employer," "you," or "your"). By registering 
                as an employer, you agree to these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">2. Employer Verification</h2>
              
              <h3 className="text-xl mb-2 text-gray-800">2.1 Required Documentation</h3>
              <p>To verify your employer account, you must provide:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Company registration certificate</li>
                <li>Tax identification number (INN/TIN)</li>
                <li>Business license (if applicable)</li>
                <li>Authorized representative ID</li>
                <li>Company address verification</li>
                <li>Contact information verification</li>
              </ul>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">2.2 Verification Process</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>Submit documents through secure upload portal</li>
                <li>Verification typically completes within 2-3 business days</li>
                <li>You will receive email notification of verification status</li>
                <li>Rejected applications will include reason for rejection</li>
              </ul>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">2.3 Ongoing Verification</h3>
              <p>
                We reserve the right to re-verify employer accounts periodically or if 
                suspicious activity is detected.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">3. Subscription Plans and Pricing</h2>
              
              <h3 className="text-xl mb-2 text-gray-800">3.1 Available Plans</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900">Basic Plan - ₽5,000/month</h4>
                  <ul className="list-disc ml-6 mt-2">
                    <li>Up to 3 active job postings</li>
                    <li>Access to candidate database</li>
                    <li>Basic application tracking</li>
                    <li>Email support</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Professional Plan - ₽15,000/month</h4>
                  <ul className="list-disc ml-6 mt-2">
                    <li>Up to 10 active job postings</li>
                    <li>Featured job listings</li>
                    <li>Advanced filtering and search</li>
                    <li>Priority support</li>
                    <li>Analytics dashboard</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Enterprise Plan - ₽40,000/month</h4>
                  <ul className="list-disc ml-6 mt-2">
                    <li>Unlimited job postings</li>
                    <li>Dedicated account manager</li>
                    <li>API access</li>
                    <li>Custom branding</li>
                    <li>Advanced analytics and reporting</li>
                    <li>24/7 priority support</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">3.2 Payment Terms</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>Payments are due monthly in advance</li>
                <li>Annual subscriptions receive 15% discount</li>
                <li>Auto-renewal unless cancelled 7 days before renewal date</li>
                <li>Accepted payment methods: Bank transfer, Stripe, YooMoney</li>
                <li>All prices include applicable VAT</li>
              </ul>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">3.3 Invoicing</h3>
              <p>
                Invoices are generated automatically and sent to your registered email. 
                Invoices include:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Invoice number and date</li>
                <li>Service description and period</li>
                <li>Amount and tax breakdown</li>
                <li>Company details</li>
                <li>Payment instructions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">4. Job Posting Requirements</h2>
              
              <h3 className="text-xl mb-2 text-gray-800">4.1 Mandatory Information</h3>
              <p>All job postings must include:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Accurate job title and description</li>
                <li>Complete list of requirements and qualifications</li>
                <li>Salary range (transparency required)</li>
                <li>Employment type (full-time, part-time, contract)</li>
                <li>Location (remote, hybrid, on-site)</li>
                <li>Application deadline (if applicable)</li>
                <li>Company benefits and perks</li>
              </ul>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">4.2 Prohibited Content</h3>
              <p>Job postings must NOT:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Contain discriminatory language or requirements</li>
                <li>Request payment or fees from applicants</li>
                <li>Include misleading or false information</li>
                <li>Advertise pyramid schemes or MLM opportunities</li>
                <li>Require illegal activities</li>
                <li>Mention agent or intermediary involvement</li>
              </ul>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">4.3 Job Post Approval</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>All jobs are reviewed before publication</li>
                <li>Approval typically within 4 hours during business hours</li>
                <li>We may request clarification or modifications</li>
                <li>We reserve the right to reject any job posting</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">5. Direct Hiring Commitment</h2>
              
              <h3 className="text-xl mb-2 text-gray-800">5.1 No Agent Policy</h3>
              <p className="font-semibold text-red-700">
                Employers MUST hire candidates directly without using agents, brokers, or intermediaries.
              </p>
              <p className="mt-2">This means:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Direct communication with candidates only</li>
                <li>Employment contracts directly between employer and employee</li>
                <li>Salary payments directly from employer to employee</li>
                <li>No third-party recruitment fees charged to candidates</li>
                <li>No outsourcing of hiring process to agencies</li>
              </ul>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">5.2 Verification and Monitoring</h3>
              <p>We actively monitor for agent involvement through:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Candidate feedback and reporting</li>
                <li>Communication pattern analysis</li>
                <li>Complaint investigations</li>
                <li>Random audits of hiring practices</li>
              </ul>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">5.3 Penalties for Violations</h3>
              <p>Using agents results in:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Immediate account termination (no refund)</li>
                <li>Permanent ban from platform</li>
                <li>Public disclosure of violation</li>
                <li>Possible legal action</li>
                <li>Reporting to relevant authorities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">6. Candidate Interaction Guidelines</h2>
              
              <h3 className="text-xl mb-2 text-gray-800">6.1 Professional Conduct</h3>
              <p>Employers must:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Respond to applications within 7 business days</li>
                <li>Communicate professionally and respectfully</li>
                <li>Provide clear feedback when rejecting candidates</li>
                <li>Honor interview commitments and schedules</li>
                <li>Maintain confidentiality of candidate information</li>
              </ul>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">6.2 Prohibited Actions</h3>
              <p>Employers must NOT:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Harass or discriminate against candidates</li>
                <li>Request inappropriate personal information</li>
                <li>Use candidate data for purposes other than recruitment</li>
                <li>Share candidate information with third parties without consent</li>
                <li>Spam or send unsolicited communications</li>
              </ul>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">6.3 Data Protection</h3>
              <p>
                Employers must comply with GDPR and data protection laws when handling 
                candidate information. This includes:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Processing data only for stated recruitment purposes</li>
                <li>Securing candidate data appropriately</li>
                <li>Deleting data when no longer needed</li>
                <li>Responding to candidate data requests promptly</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">7. Employment Practices</h2>
              
              <h3 className="text-xl mb-2 text-gray-800">7.1 Legal Compliance</h3>
              <p>Employers must:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Comply with all labor laws and regulations</li>
                <li>Provide written employment contracts</li>
                <li>Honor salary and benefits promised in job postings</li>
                <li>Maintain proper employment records</li>
                <li>Follow fair hiring practices</li>
              </ul>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">7.2 Anti-Discrimination</h3>
              <p>
                Employers must not discriminate based on:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Race, ethnicity, or national origin</li>
                <li>Gender or gender identity</li>
                <li>Age</li>
                <li>Religion or beliefs</li>
                <li>Disability</li>
                <li>Sexual orientation</li>
                <li>Marital or family status</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">8. Account Management</h2>
              
              <h3 className="text-xl mb-2 text-gray-800">8.1 Account Access</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>One account per company/organization</li>
                <li>Multiple authorized users can be added</li>
                <li>Maintain account security and confidentiality</li>
                <li>Report unauthorized access immediately</li>
              </ul>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">8.2 Subscription Management</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>Upgrade or downgrade plans anytime</li>
                <li>Cancellation requires 7 days notice</li>
                <li>Access continues until end of billing period</li>
                <li>No refunds for partial periods</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">9. Platform Rules and Enforcement</h2>
              
              <h3 className="text-xl mb-2 text-gray-800">9.1 Violation Consequences</h3>
              <p>Violations may result in:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Warning and required corrective action</li>
                <li>Temporary account suspension</li>
                <li>Permanent account termination</li>
                <li>Legal action if applicable</li>
              </ul>

              <h3 className="text-xl mb-2 mt-4 text-gray-800">9.2 Appeals Process</h3>
              <p>
                If your account is suspended or terminated, you may appeal by contacting 
                appeals@afropalsjobs.ru within 14 days with supporting documentation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">10. Intellectual Property</h2>
              <p>
                You retain rights to your job postings and company information. By posting 
                content, you grant us a license to display it on the platform.
              </p>
              <p className="mt-4">
                You may not use our platform name, logo, or branding without written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">11. Limitation of Liability</h2>
              <p>
                Afro-Personala is a platform facilitating connections. We are not responsible for:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Quality or suitability of candidates</li>
                <li>Employment outcomes or relationships</li>
                <li>Candidate claims or disputes</li>
                <li>Third-party actions or services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">12. Agreement Changes</h2>
              <p>
                We may update this Agreement with 30 days notice. Continued use after changes 
                constitutes acceptance. Significant changes will be communicated via email.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">13. Contact Information</h2>
              <p>
                For questions about this Employer Agreement:
              </p>
              <p className="mt-2">
                <strong>Email:</strong> employers@afropalsjobs.ru<br />
                <strong>Support:</strong> support@afropalsjobs.ru<br />
                <strong>Website:</strong> afropalsjobs.ru
              </p>
            </section>

            <div className="border-t pt-6 mt-8 bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl text-yellow-900 mb-3">Employer Acknowledgment</h3>
              <p className="text-yellow-800">
                By registering as an employer on Afro-Personala, you acknowledge that you have 
                read, understood, and agree to comply with this Employer Agreement, including 
                the <strong>strict no-agent policy</strong>. You understand that violations may 
                result in immediate account termination without refund.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
