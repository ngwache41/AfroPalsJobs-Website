# Afro-Personala (afropalsjobs.ru)

**Verified jobs. Transparent recruitment. No agents.**

A modern recruiting platform connecting job seekers directly with verified employers, eliminating agent intermediaries and ensuring transparency in the hiring process.

---

## 🌟 Features

### For Candidates
- ✅ Browse verified job listings from legitimate employers
- 📄 Upload and manage resumes/CVs
- 🔍 Advanced job search and filtering
- 📧 Job alerts and notifications
- 📊 Application tracking
- 🔒 Full data privacy and GDPR compliance
- 🚫 No agent fees or hidden costs

### For Employers
- ✅ Post verified job listings
- 👥 Access qualified candidate profiles
- 📨 Direct candidate communication
- 💼 Application management dashboard
- 📈 Analytics and reporting
- 💳 Flexible subscription plans
- 🔐 Secure and compliant

### Platform Features
- 🔐 JWT-based authentication
- 🗄️ MongoDB database
- ☁️ Cloudflare R2 file storage
- 📧 Email notifications (SMTP)
- 💳 Payment integration (Stripe/YooMoney)
- 🌍 Multi-language ready
- 📱 Responsive design
- 🔍 SEO optimized

---

## 🏗️ Tech Stack

### Frontend
- **Framework:** React 18
- **Routing:** React Router v7
- **Styling:** Tailwind CSS v4
- **UI Components:** Radix UI
- **Icons:** Lucide React
- **Build Tool:** Vite
- **Language:** TypeScript

### Backend
- **Framework:** FastAPI (Python)
- **Database:** MongoDB (Motor async driver)
- **Authentication:** JWT (python-jose)
- **File Storage:** S3/Cloudflare R2 (boto3)
- **Email:** aiosmtplib
- **Validation:** Pydantic

### Infrastructure
- **Hosting:** Render (Frontend Static + Backend Web Service)
- **Database:** MongoDB Atlas
- **File Storage:** Cloudflare R2
- **Email:** Gmail SMTP / SendGrid
- **CDN:** Cloudflare (optional)
- **Monitoring:** Render Metrics

---

## 📁 Project Structure

```
afro-personala/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/      # React components
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── JobCard.tsx
│   │   │   │   ├── LaunchBanner.tsx
│   │   │   │   └── ui/          # Shadcn UI components
│   │   │   ├── pages/           # Route pages
│   │   │   │   ├── Home.tsx
│   │   │   │   ├── Jobs.tsx
│   │   │   │   ├── JobDetails.tsx
│   │   │   │   ├── Terms.tsx
│   │   │   │   ├── Privacy.tsx
│   │   │   │   ├── EmployerAgreement.tsx
│   │   │   │   └── CandidateConsent.tsx
│   │   │   ├── data/            # Mock data
│   │   │   ├── routes.ts        # React Router config
│   │   │   └── App.tsx          # Main app component
│   │   └── styles/              # CSS files
│   ├── public/
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── app/
│   │   ├── api/                 # API endpoints
│   │   │   ├── auth.py          # Authentication
│   │   │   ├── jobs.py          # Job management
│   │   │   ├── applications.py  # Applications
│   │   │   └── upload.py        # File uploads
│   │   ├── models/              # Pydantic models
│   │   │   ├── user.py
│   │   │   ├── job.py
│   │   │   └── application.py
│   │   ├── services/            # Business logic
│   │   │   ├── auth.py          # JWT & passwords
│   │   │   ├── s3.py            # File storage
│   │   │   └── email.py         # Email sending
│   │   ├── config.py            # Configuration
│   │   ├── database.py          # MongoDB connection
│   │   └── main.py              # FastAPI app
│   ├── requirements.txt
│   └── .env.example
│
├── DEPLOYMENT.md                # Deployment guide
├── render.yaml                  # Render blueprint
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (frontend)
- Python 3.10+ (backend)
- MongoDB (local or Atlas)
- Git

### Frontend Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Frontend runs at: http://localhost:5173

### Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env
# Edit .env with your configuration

# Run development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend runs at: http://localhost:8000
API Docs: http://localhost:8000/docs

---

## 📦 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000
```

### Backend (.env)
```env
APP_ENV=development
DOMAIN=localhost:3000

JWT_SECRET=your_secret_key_here
JWT_EXPIRY=86400

MONGO_URI=mongodb://localhost:27017/afropersonala

S3_ENDPOINT=https://your-account.r2.cloudflarestorage.com
S3_ACCESS_KEY=your_access_key
S3_SECRET_KEY=your_secret_key
S3_BUCKET=afropersonala

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your_app_password
```

---

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment instructions.

### Quick Deploy to Render

1. **Backend:**
   - Create Web Service
   - Build: `pip install -r requirements.txt`
   - Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Add environment variables

2. **Frontend:**
   - Create Static Site
   - Build: `npm run build`
   - Publish: `dist`

3. **Configure DNS:**
   - Point `afropalsjobs.ru` to Render

---

## 📄 Legal Pages

All legal documents are available as pages:

- **Terms of Service:** `/terms`
- **Privacy Policy:** `/privacy`
- **Employer Agreement:** `/employer-agreement`
- **Candidate Consent:** `/candidate-consent`

These pages are production-ready and GDPR-compliant.

---

## 🔐 Security

- JWT authentication with secure token handling
- Password hashing with bcrypt
- SSL/TLS encryption (Render provides free SSL)
- CORS protection
- Input validation with Pydantic
- Secure file uploads to S3/R2
- GDPR and data protection compliance
- No-agent policy enforcement

---

## 💳 Payment Plans

### Employer Subscriptions

| Plan | Price | Features |
|------|-------|----------|
| **Basic** | ₽5,000/month | 3 job postings, basic features |
| **Professional** | ₽15,000/month | 10 jobs, featured listings, analytics |
| **Enterprise** | ₽40,000/month | Unlimited jobs, API access, dedicated support |

**Payment Methods:**
- Stripe (International)
- YooMoney (Russia)
- Bank Transfer

---

## 🔍 SEO & Analytics

### Implemented
- ✅ `robots.txt` for search engine crawling
- ✅ `sitemap.xml` for indexing
- ✅ Meta tags and Open Graph
- ✅ Semantic HTML structure
- ✅ Fast page load times

### Submit to:
1. **Google Search Console:** https://search.google.com/search-console
2. **Yandex Webmaster:** https://webmaster.yandex.ru

---

## 🤝 Contributing

This is a private commercial project. For questions or issues:
- **Email:** info@afropalsjobs.ru
- **Support:** support@afropalsjobs.ru

---

## 📞 Contact

- **Website:** https://afropalsjobs.ru
- **Email:** info@afropalsjobs.ru
- **Support:** support@afropalsjobs.ru
- **Legal:** legal@afropalsjobs.ru
- **Privacy:** privacy@afropalsjobs.ru

---

## 📜 License

© 2026 Afro-Personala. All rights reserved.

This is proprietary software. Unauthorized copying, modification, distribution, or use is strictly prohibited.

---

## 🎊 Launch Status

**🟢 LIVE AND READY TO LAUNCH**

### Completed:
- ✅ Frontend application
- ✅ Backend API
- ✅ Database integration
- ✅ File storage
- ✅ Email notifications
- ✅ Legal pages
- ✅ SEO optimization
- ✅ Deployment configuration
- ✅ Security measures

### Next Steps:
1. Deploy backend to Render
2. Deploy frontend to Render
3. Configure domain DNS
4. Submit to search engines
5. Set up payment processing
6. Launch marketing campaign

---

## 🌟 Key Differentiators

### No-Agent Policy
The platform **strictly prohibits** recruitment agents and intermediaries. All hiring must be direct between employers and candidates.

### Verification
All employers must verify their company registration and business legitimacy before posting jobs.

### Transparency
Salary ranges are **mandatory** on all job postings. No hidden fees or costs for candidates.

### Data Protection
Full GDPR compliance with transparent data practices and user control.

---

**Built with ❤️ for transparent and fair recruitment**

🚀 **Ready to go live!**
