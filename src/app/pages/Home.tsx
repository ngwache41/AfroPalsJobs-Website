export default function Home() {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>Welcome to AfroPals Jobs</h1>

      <p style={{ maxWidth: "600px", margin: "20px auto" }}>
        We connect African talents with opportunities abroad and assist with visa
        applications and invitations.
      </p>

      {/* YOUR PHOTO */}
      <img
        src="/your-photo.jpg"
        alt="Founder"
        style={{
          width: "200px",
          borderRadius: "12px",
          marginTop: "20px",
        }}
      />

      {/* OFFICE IMAGE */}
      <div style={{ marginTop: "30px" }}>
        <img
          src="/office.jpg"
          alt="Office"
          style={{
            width: "90%",
            maxWidth: "800px",
            borderRadius: "12px",
          }}
        />
      </div>

      {/* CTA */}
      <div style={{ marginTop: "30px" }}>
        <a
          href="https://wa.me/234000000000"
          target="_blank"
          style={{
            background: "#25D366",
            padding: "14px 24px",
            borderRadius: "10px",
            color: "#fff",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Contact us on WhatsApp
        </a>
      </div>
    </div>
  );
}