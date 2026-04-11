# Afro-Personala Deployment Guide

## 🚀 PRODUCTION DEPLOYMENT

### Frontend Hosting (Render Static Site)

#### Option A: Render Static Site (Recommended)

**Step 1: Build Your Frontend**
```bash
npm run build
```

**Step 2: Create Render Static Site**
- Go to https://render.com
- Click "New +" → "Static Site"
- Connect your Git repository (or upload manually)

**Render Static Site Settings:**
```
Name: afropalsjobs-frontend
Build Command: npm run build
Publish Directory: dist
Branch: main
```

**Environment Variables:**
```
VITE_API_URL=https://afropalsjobs-api.onrender.com
```

**Custom Domain Setup:**
- Go to Settings → Custom Domain
- Add: afropalsjobs.ru
- Follow DNS instructions

---

### Backend Hosting (Render Web Service)

**Step 1: Create Render Web Service**
- Go to https://render.com
- Click "New +" → "Web Service"
- Connect your backend repository

**Render Web Service Settings:**
```
Name: afropalsjobs-api
Environment: Python 3
Region: Frankfurt (EU)
Build Command: pip install -r requirements.txt
Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

**Environment Variables (CRITICAL):**
```env
APP_ENV=production
DOMAIN=afropalsjobs.ru

# JWT Security
JWT_SECRET=<GENERATE_STRONG_RANDOM_STRING_HERE>
JWT_EXPIRY=86400

# MongoDB (Get from MongoDB Atlas)
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/afropersonala

# Cloudflare R2 Storage
S3_ENDPOINT=https://<account_id>.r2.cloudflarestorage.com
S3_ACCESS_KEY=<your_r2_access_key>
S3_SECRET_KEY=<your_r2_secret_key>
S3_BUCKET=afropersonala

# Email (Gmail or other SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=no-reply@afropalsjobs.ru
SMTP_PASS=<your_app_password>

# CORS (add your frontend domain)
CORS_ORIGINS=["https://afropalsjobs.ru"]
```

**Generate JWT Secret:**
```python
import secrets
print(secrets.token_urlsafe(32))
```

---

### Database Setup (MongoDB Atlas)

**Step 1: Create MongoDB Cluster**
1. Go to https://cloud.mongodb.com
2. Create free cluster (M0)
3. Choose region: Frankfurt or nearest to Russia
4. Create database user
5. Whitelist IP: `0.0.0.0/0` (allow all for Render)

**Step 2: Get Connection String**
- Click "Connect" → "Connect your application"
- Copy connection string
- Replace `<username>`, `<password>`, and `<database>`
- Add to `MONGO_URI` in Render

---

### File Storage (Cloudflare R2)

**Step 1: Create R2 Bucket**
1. Go to Cloudflare Dashboard → R2
2. Create bucket: `afropersonala`
3. Enable public access if needed

**Step 2: Generate API Tokens**
1. R2 → Manage R2 API Tokens
2. Create API token with R2 permissions
3. Copy Access Key ID and Secret Access Key
4. Add to Render environment variables

**R2 Endpoint Format:**
```
https://<account_id>.r2.cloudflarestorage.com
```

---

### Email Setup (Gmail SMTP)

**Step 1: Enable 2FA on Gmail**
- Go to Google Account → Security
- Enable 2-Factor Authentication

**Step 2: Generate App Password**
- Google Account → Security → 2-Step Verification
- App passwords → Select "Mail" and "Other"
- Copy 16-character password
- Use as `SMTP_PASS` in Render

**Alternative: Use SendGrid or Mailgun for production**

---

## 🌐 DOMAIN SETUP

### DNS Configuration (Your Domain Registrar)

**For Frontend (afropalsjobs.ru):**
```
Type: A
Name: @
Value: <Render Static Site IP>
TTL: 3600

OR

Type: CNAME
Name: @
Value: <your-site>.onrender.com
TTL: 3600
```

**For API (api.afropalsjobs.ru) - Optional:**
```
Type: CNAME
Name: api
Value: <your-backend>.onrender.com
TTL: 3600
```

**SSL Certificate:**
- Render provides free SSL automatically
- Enable "Auto-Deploy" for continuous deployment

---

## 📄 LEGAL PAGES (LIVE URLs)

These pages are now available at:

- https://afropalsjobs.ru/terms
- https://afropalsjobs.ru/privacy
- https://afropalsjobs.ru/employer-agreement
- https://afropalsjobs.ru/candidate-consent

**Download as PDF:**
Use browser Print → Save as PDF for legal records.

---

## 💳 PAYMENT INTEGRATION

### Stripe Setup

**Step 1: Create Stripe Account**
1. Go to https://stripe.com
2. Register business account
3. Complete KYC verification

**Step 2: Get API Keys**
```env
STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**Step 3: Create Products**
- Basic Plan: ₽5,000/month
- Professional Plan: ₽15,000/month
- Enterprise Plan: ₽40,000/month

### YooMoney Setup (Russia)

**Step 1: Create YooMoney Account**
1. Go to https://yoomoney.ru
2. Register merchant account
3. Complete verification

**Step 2: Integration**
```env
YOOMONEY_SHOP_ID=<your_shop_id>
YOOMONEY_SECRET_KEY=<your_secret>
```

---

## 🔍 SEO & SEARCH ENGINE INDEXING

### Google Search Console

**Step 1: Verify Domain**
1. Go to https://search.google.com/search-console
2. Add property: afropalsjobs.ru
3. Verify via DNS TXT record or HTML file

**Step 2: Submit Sitemap**
```
URL: https://afropalsjobs.ru/sitemap.xml
```

**Step 3: Monitor**
- Check indexing status
- Fix coverage issues
- Monitor performance

### Yandex Webmaster

**Step 1: Verify Domain**
1. Go to https://webmaster.yandex.ru
2. Add site: afropalsjobs.ru
3. Verify via meta tag or file

**Step 2: Submit Sitemap**
```
URL: https://afropalsjobs.ru/sitemap.xml
```

**Step 3: Configure**
- Set region: Russia
- Add Yandex Metrica counter
- Enable Turbo pages (optional)

### robots.txt

Already created at `/public/robots.txt`
Accessible at: https://afropalsjobs.ru/robots.txt

### sitemap.xml

Already created at `/public/sitemap.xml`
Accessible at: https://afropalsjobs.ru/sitemap.xml

---

## 🎉 LAUNCH CHECKLIST

### Pre-Launch
- [ ] Backend deployed to Render
- [ ] Frontend deployed to Render
- [ ] MongoDB Atlas configured
- [ ] Cloudflare R2 bucket created
- [ ] Email SMTP configured
- [ ] DNS records updated
- [ ] SSL certificate active
- [ ] Test all API endpoints
- [ ] Test job posting flow
- [ ] Test application submission
- [ ] Verify email delivery

### SEO Setup
- [ ] Submit to Google Search Console
- [ ] Submit to Yandex Webmaster
- [ ] Upload sitemap.xml
- [ ] Verify robots.txt
- [ ] Add Google Analytics (optional)
- [ ] Add Yandex Metrica (optional)

### Legal & Compliance
- [ ] Terms of Service published
- [ ] Privacy Policy published
- [ ] Employer Agreement published
- [ ] Candidate Consent published
- [ ] Cookie consent banner (if needed)
- [ ] GDPR compliance verified

### Payment Setup (When Ready)
- [ ] Stripe account verified
- [ ] YooMoney account verified
- [ ] Payment plans configured
- [ ] Invoice generation working
- [ ] Test payment flow

### Marketing
- [ ] Social media accounts created
- [ ] Launch announcement prepared
- [ ] Email templates ready
- [ ] Contact information updated

---

## 🚨 POST-LAUNCH MONITORING

### Performance
- Monitor Render metrics
- Check API response times
- Monitor database performance
- Track error rates

### Security
- Enable security headers
- Monitor for suspicious activity
- Regular security audits
- Keep dependencies updated

### User Support
- Set up support email: support@afropalsjobs.ru
- Monitor user feedback
- Track common issues
- Create FAQ page

---

## 📞 SUPPORT CONTACTS

**Technical Issues:**
- Backend: backend@afropalsjobs.ru
- Frontend: frontend@afropalsjobs.ru

**Business Inquiries:**
- General: info@afropalsjobs.ru
- Legal: legal@afropalsjobs.ru
- Privacy: privacy@afropalsjobs.ru

**Employer Support:**
- employers@afropalsjobs.ru

**Candidate Support:**
- support@afropalsjobs.ru

---

## 🎊 OFFICIAL LAUNCH MESSAGE

```
🎉 Afro-Personala is now LIVE! 🎉

Verified jobs. Transparent recruitment. No agents.

✅ Direct employer-to-candidate connections
✅ No hidden fees or agent commissions
✅ Verified employers only
✅ Full transparency on salaries
✅ GDPR compliant and secure

Visit: afropalsjobs.ru
```

---

## 🔒 SECURITY NOTES

1. **Never commit secrets to Git**
2. **Use environment variables for all sensitive data**
3. **Rotate JWT secret regularly**
4. **Monitor for unauthorized access**
5. **Keep all dependencies updated**
6. **Enable 2FA on all admin accounts**
7. **Regular backups of MongoDB**
8. **Monitor error logs daily**

---

## 📈 SCALING CONSIDERATIONS

**When you grow:**
- Upgrade Render plan for more resources
- Consider CDN (Cloudflare) for static assets
- Implement caching (Redis)
- Add load balancing
- Optimize database queries
- Consider dedicated MongoDB cluster

---

**Good luck with your launch! 🚀**
