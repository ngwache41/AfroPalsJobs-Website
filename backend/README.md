# TalentHub Backend API

FastAPI backend for the TalentHub recruiting platform.

## Features

- **Authentication**: JWT-based authentication with role-based access control
- **Job Management**: Create, read, update, and delete job postings
- **Applications**: Apply for jobs, track application status
- **File Upload**: Resume upload to S3/Cloudflare R2
- **Email Notifications**: Automated emails for applications
- **MongoDB**: NoSQL database for flexible data storage

## Setup

### Local Development

1. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Copy `.env.example` to `.env` and fill in your values:
```bash
cp .env.example .env
```

4. Run the server:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`
API documentation at `http://localhost:8000/docs`

## Deployment to Render

### Prerequisites

1. MongoDB database (MongoDB Atlas recommended)
2. S3-compatible storage (Cloudflare R2 or AWS S3)
3. SMTP email service

### Render Configuration

**Service Type**: Web Service  
**Environment**: Python 3  
**Region**: Frankfurt (EU) or your preferred region

**Build Command**:
```
pip install -r requirements.txt
```

**Start Command**:
```
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

### Environment Variables

Add these in Render Dashboard → Environment:

```env
APP_ENV=production
DOMAIN=afropalsjobs.ru

JWT_SECRET=<generate_strong_random_string>
JWT_EXPIRY=86400

MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database

S3_ENDPOINT=https://<account_id>.r2.cloudflarestorage.com
S3_ACCESS_KEY=<your_r2_access_key>
S3_SECRET_KEY=<your_r2_secret_key>
S3_BUCKET=afropersonala

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=no-reply@afropalsjobs.ru
SMTP_PASS=<your_email_app_password>
```

### MongoDB Atlas Setup

1. Create cluster at https://cloud.mongodb.com
2. Create database user
3. Whitelist Render IPs or allow all (0.0.0.0/0)
4. Get connection string and add to `MONGO_URI`

### Cloudflare R2 Setup

1. Go to Cloudflare Dashboard → R2
2. Create bucket named `afropersonala`
3. Create API token with R2 permissions
4. Add credentials to environment variables

### Email Setup

For Gmail:
1. Enable 2FA on your Google account
2. Generate App Password
3. Use App Password in `SMTP_PASS`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Jobs
- `GET /api/jobs` - List all jobs (with filters)
- `GET /api/jobs/{id}` - Get job details
- `POST /api/jobs` - Create job (employers only)
- `PUT /api/jobs/{id}` - Update job
- `DELETE /api/jobs/{id}` - Delete job

### Applications
- `GET /api/applications` - List applications
- `GET /api/applications/{id}` - Get application details
- `POST /api/applications` - Apply for job
- `PUT /api/applications/{id}` - Update application status

### Upload
- `POST /api/upload/resume` - Upload resume

## Project Structure

```
backend/
├── app/
│   ├── api/
│   │   ├── auth.py          # Authentication endpoints
│   │   ├── jobs.py          # Job endpoints
│   │   ├── applications.py  # Application endpoints
│   │   └── upload.py        # File upload endpoints
│   ├── models/
│   │   ├── user.py          # User models
│   │   ├── job.py           # Job models
│   │   └── application.py   # Application models
│   ├── services/
│   │   ├── auth.py          # Authentication service
│   │   ├── s3.py            # S3/R2 service
│   │   └── email.py         # Email service
│   ├── config.py            # Configuration
│   ├── database.py          # Database connection
│   └── main.py              # FastAPI app
├── requirements.txt
├── .env.example
└── README.md
```

## Testing

Test API endpoints using the interactive docs at `/docs` or use curl:

```bash
# Register
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"pass123","full_name":"John Doe","role":"candidate"}'

# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"pass123"}'

# List jobs
curl http://localhost:8000/api/jobs
```

## License

MIT
