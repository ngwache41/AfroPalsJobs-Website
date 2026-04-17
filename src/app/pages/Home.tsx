import { Link } from "react-router-dom";

function sectionStyle(): React.CSSProperties {
  return {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "72px 24px",
  };
}

function cardStyle(): React.CSSProperties {
  return {
    background: "#ffffff",
    borderRadius: "22px",
    padding: "28px",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
    border: "1px solid #e5e7eb",
  };
}

export default function Home() {
  return (
    <div>
      <section
        style={{
          background:
            "linear-gradient(180deg, #eef2ff 0%, #f8fafc 45%, #f5f7fb 100%)",
        }}
      >
        <div
          style={{
            ...sectionStyle(),
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "32px",
            alignItems: "center",
          }}
        >
          <div>
            <span
              style={{
                display: "inline-block",
                padding: "8px 14px",
                borderRadius: "999px",
                background: "#e0e7ff",
                color: "#3730a3",
                fontWeight: 700,
                fontSize: "13px",
                marginBottom: "18px",
              }}
            >
              Verified opportunities in Russia
            </span>

            <h1
              style={{
                margin: "0 0 18px 0",
                fontSize: "48px",
                lineHeight: 1.1,
                color: "#0f172a",
              }}
            >
              Jobs, visa support, and invitation assistance in one place
            </h1>

            <p
              style={{
                margin: "0 0 28px 0",
                fontSize: "18px",
                lineHeight: 1.7,
                color: "#475569",
                maxWidth: "720px",
              }}
            >
              AfroPals Jobs connects international candidates with verified job
              opportunities, invitation support, and visa application guidance.
              We make the process clearer, safer, and easier to follow.
            </p>

            <div
              style={{
                display: "flex",
                gap: "14px",
                flexWrap: "wrap",
              }}
            >
              <Link
                to="/jobs"
                style={{
                  background: "#111827",
                  color: "#fff",
                  textDecoration: "none",
                  padding: "14px 22px",
                  borderRadius: "12px",
                  fontWeight: 700,
                }}
              >
                Explore Jobs
              </Link>

              <Link
                to="/visa"
                style={{
                  background: "#fff",
                  color: "#111827",
                  textDecoration: "none",
                  padding: "14px 22px",
                  borderRadius: "12px",
                  fontWeight: 700,
                  border: "1px solid #d1d5db",
                }}
              >
                Apply for Visa Support
              </Link>

              <a
                href="https://wa.me/79332742692"
                target="_blank"
                rel="noreferrer"
                style={{
                  background: "#25D366",
                  color: "#fff",
                  textDecoration: "none",
                  padding: "14px 22px",
                  borderRadius: "12px",
                  fontWeight: 700,
                }}
              >
                WhatsApp Us
              </a>
            </div>
          </div>

          <div style={cardStyle()}>
            <h3 style={{ marginTop: 0, fontSize: "24px" }}>Why candidates trust us</h3>
            <div
              style={{
                display: "grid",
                gap: "16px",
              }}
            >
              <div>
                <strong>Verified opportunities</strong>
                <p style={{ margin: "8px 0 0 0", color: "#475569", lineHeight: 1.6 }}>
                  We focus on trusted job listings and practical guidance for
                  international applicants.
                </p>
              </div>

              <div>
                <strong>Visa and invitation support</strong>
                <p style={{ margin: "8px 0 0 0", color: "#475569", lineHeight: 1.6 }}>
                  We help users understand which path fits their purpose of
                  travel, work, study, business, or private visits.
                </p>
              </div>

              <div>
                <strong>Simple application flow</strong>
                <p style={{ margin: "8px 0 0 0", color: "#475569", lineHeight: 1.6 }}>
                  Our platform allows candidates to submit details online and be
                  reviewed through an admin dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" style={sectionStyle()}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <h2 style={{ margin: 0, fontSize: "36px" }}>Our Services</h2>
          <p style={{ color: "#475569", marginTop: "14px", fontSize: "17px" }}>
            Practical support for candidates, employers, and travelers.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "22px",
          }}
        >
          <div style={cardStyle()}>
            <h3 style={{ marginTop: 0 }}>Job Opportunities</h3>
            <p style={{ color: "#475569", lineHeight: 1.7 }}>
              Browse verified vacancies and submit interest through a cleaner,
              more organized hiring process.
            </p>
          </div>

          <div style={cardStyle()}>
            <h3 style={{ marginTop: 0 }}>Visa Assistance</h3>
            <p style={{ color: "#475569", lineHeight: 1.7 }}>
              Submit visa application details for work, study, tourist,
              business, and private visit support.
            </p>
          </div>

          <div style={cardStyle()}>
            <h3 style={{ marginTop: 0 }}>Invitation Support</h3>
            <p style={{ color: "#475569", lineHeight: 1.7 }}>
              Request help with invitation-related processes connected to your
              purpose of travel.
            </p>
          </div>

          <div style={cardStyle()}>
            <h3 style={{ marginTop: 0 }}>Application Review</h3>
            <p style={{ color: "#475569", lineHeight: 1.7 }}>
              Applications submitted through the site are organized for admin
              review and follow-up.
            </p>
          </div>
        </div>
      </section>

      <section id="about" style={{ ...sectionStyle(), paddingTop: "12px" }}>
        <div
          style={{
            ...cardStyle(),
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "28px",
          }}
        >
          <div>
            <h2 style={{ marginTop: 0, fontSize: "34px" }}>About AfroPals Jobs</h2>
            <p style={{ color: "#475569", lineHeight: 1.8 }}>
              AfroPals Jobs is built to support international job seekers and
              applicants who need trusted direction for work opportunities,
              invitation support, and visa-related processes in Russia.
            </p>
            <p style={{ color: "#475569", lineHeight: 1.8 }}>
              Our goal is to create a more transparent and organized journey
              from first inquiry to final submission.
            </p>
          </div>

          <div>
            <h3 style={{ marginTop: 0 }}>What makes us different</h3>
            <ul style={{ color: "#475569", lineHeight: 1.9, paddingLeft: "18px" }}>
              <li>Clear online application flow</li>
              <li>Centralized jobs and visa support</li>
              <li>Admin review system for better tracking</li>
              <li>Professional and scalable platform structure</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="faq" style={sectionStyle()}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <h2 style={{ margin: 0, fontSize: "36px" }}>Frequently Asked Questions</h2>
          <p style={{ color: "#475569", marginTop: "14px", fontSize: "17px" }}>
            Answers to common questions from applicants and visitors.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gap: "18px",
          }}
        >
          <div style={cardStyle()}>
            <h3 style={{ marginTop: 0 }}>Can I apply for a job directly from the website?</h3>
            <p style={{ color: "#475569", lineHeight: 1.7 }}>
              Yes. The website is designed to help organize opportunities and
              candidate submissions in one place.
            </p>
          </div>

          <div style={cardStyle()}>
            <h3 style={{ marginTop: 0 }}>Can I request visa or invitation support?</h3>
            <p style={{ color: "#475569", lineHeight: 1.7 }}>
              Yes. Use the Visa & Invitations page to submit the relevant
              information for your case.
            </p>
          </div>

          <div style={cardStyle()}>
            <h3 style={{ marginTop: 0 }}>How do you review applications?</h3>
            <p style={{ color: "#475569", lineHeight: 1.7 }}>
              Submitted entries are collected into the admin dashboard for
              internal review and status management.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" style={{ ...sectionStyle(), paddingTop: "12px" }}>
        <div
          style={{
            ...cardStyle(),
            textAlign: "center",
          }}
        >
          <h2 style={{ marginTop: 0, fontSize: "34px" }}>Contact Us</h2>
          <p
            style={{
              color: "#475569",
              lineHeight: 1.8,
              maxWidth: "760px",
              margin: "0 auto 20px auto",
            }}
          >
            Reach out for general inquiries, job-related questions, and visa or
            invitation support information.
          </p>

          <div
            style={{
              display: "grid",
              gap: "10px",
              color: "#111827",
              fontSize: "16px",
              marginBottom: "20px",
            }}
          >
            <div>
              <strong>Phone:</strong> +79332742692
            </div>
            <div>
              <strong>Email 1:</strong> info@afropalsjobs.ru
            </div>
            <div>
              <strong>Email 2:</strong> afropalsjobs@yandex.ru
            </div>
            <div>
              <strong>Website:</strong> www.afropalsjobs.ru
            </div>
          </div>

          <a
            href="https://wa.me/79332742692"
            target="_blank"
            rel="noreferrer"
            style={{
              background: "#25D366",
              padding: "14px 24px",
              borderRadius: "10px",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 700,
              display: "inline-block",
            }}
          >
            Contact us on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}