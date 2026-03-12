# 🚀 QUICK START GUIDE - Afro-Personala

## Go Live in 30 Minutes!

This guide will get your recruiting platform live ASAP.

---

## ✅ PRE-LAUNCH CHECKLIST

### 1. Accounts You Need (Create These First)

- [ ] **GitHub Account** - To host code (free)
- [ ] **Render Account** - https://render.com (free tier available)
- [ ] **MongoDB Atlas** - https://cloud.mongodb.com (free M0 cluster)
- [ ] **Cloudflare Account** - https://cloudflare.com (for R2 storage)
- [ ] **Gmail Account** - For sending emails (or use existing)

**Optional (for payments):**
- [ ] **Stripe Account** - https://stripe.com
- [ ] **YooMoney Account** - https://yoomoney.ru

---

## 📝 STEP-BY-STEP DEPLOYMENT

### STEP 1: MongoDB Atlas (5 minutes)

1. Go to https://cloud.mongodb.com
2. Click "Build a Database" → Choose FREE "M0" tier
3. Select region: **Frankfurt** (or closest to Russia)
4. Create database user:
   - Username: `afropersonala_user`
   - Password: **SAVE THIS PASSWORD**
5. Network Access → "Allow Access from Anywhere" (0.0.0.0/0)
6. Get connection string:
   - Click "Connect" → "Connect your application"
   - Copy string, it looks like:
   ```
   mongodb+srv://afropersonala_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   - Replace `<password>` with your actual password
   - Add database name at the end: `/afropersonala`
   - Final string:
   ```
   mongodb+srv://afropersonala_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/afropersonala?retryWrites=true&w=majority
   ```

✅ **Save this string - you'll need it for Render**

---

### STEP 2: Cloudflare R2 (5 minutes)

1. Go to Cloudflare Dashboard → R2
2. Create bucket:
   - Name: `afropersonala`
   - Location: Automatic
3. Get R2 credentials:
   - R2 → Manage R2 API Tokens
   - Create API Token
   - Permissions: Admin Read & Write
   - Copy:
     - Access Key ID
     - Secret Access Key
     - Endpoint URL (like: `https://xxxxxxxxxxxx.r2.cloudflarestorage.com`)

✅ **Save these credentials**

---

### STEP 3: Gmail SMTP (3 minutes)

1. Enable 2-Factor Authentication on your Google Account
2. Go to: https://myaccount.google.com/apppasswords
3. Select: "Mail" and "Other (Custom name)"
4. Name it: "Afro-Personala"
5. Click "Generate"
6. **Copy the 16-character password** (remove spaces)

✅ **Save this app password**

---

### STEP 4: Deploy Backend to Render (10 minutes)

1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect your Git repository (or use "Deploy from GitHub")
4. Configure:
   ```
   Name: afropalsjobs-api
   Region: Frankfurt (EU)
   Branch: main
   Root Directory: backend
   Runtime: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT
   ```

5. **Environment Variables** - Click "Advanced" and add these:

```env
APP_ENV=production
DOMAIN=afropalsjobs.ru

# Generate this with: python -c "import secrets; print(secrets.token_urlsafe(32))"
JWT_SECRET=GENERATE_A_RANDOM_STRING_HERE

JWT_EXPIRY=86400

# From MongoDB Atlas Step 1
MONGO_URI=mongodb+srv://afropersonala_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/afropersonala?retryWrites=true&w=majority

# From Cloudflare R2 Step 2
S3_ENDPOINT=https://xxxxxxxxxxxx.r2.cloudflarestorage.com
S3_ACCESS_KEY=your_r2_access_key
S3_SECRET_KEY=your_r2_secret_key
S3_BUCKET=afropersonala

# From Gmail Step 3
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your_16_char_app_password
```

6. Click "Create Web Service"
7. **Wait 3-5 minutes** for deployment
8. Once deployed, you'll get a URL like: `https://afropalsjobs-api.onrender.com`

✅ **Test it:** Go to `https://afropalsjobs-api.onrender.com/docs`

---

### STEP 5: Deploy Frontend to Render (5 minutes)

1. In Render Dashboard, click "New +" → "Static Site"
2. Connect the same repository
3. Configure:
   ```
   Name: afropalsjobs-frontend
   Branch: main
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```

4. **Environment Variable:**
   ```env
   VITE_API_URL=https://afropalsjobs-api.onrender.com
   ```
   *(Use your actual backend URL from Step 4)*

5. Click "Create Static Site"
6. **Wait 2-3 minutes** for build
7. You'll get a URL like: `https://afropalsjobs-frontend.onrender.com`

✅ **Test it:** Visit the URL and browse the website

---

### STEP 6: Connect Custom Domain (5 minutes)

#### If you own `afropalsjobs.ru`:

1. In Render Static Site settings → "Custom Domain"
2. Add: `afropalsjobs.ru`
3. Render will show DNS instructions:
   ```
   Type: CNAME
   Name: @
   Value: afropalsjobs-frontend.onrender.com
   ```

4. Go to your domain registrar (e.g., Namecheap, GoDaddy)
5. Add the DNS record as shown
6. Wait 5-60 minutes for DNS propagation

✅ **Your site will be live at: https://afropalsjobs.ru**

---

## 🧪 TESTING YOUR DEPLOYMENT

### 1. Test Backend API

Visit: `https://afropalsjobs-api.onrender.com/docs`

You should see FastAPI Swagger documentation.

Try these endpoints:
- `GET /` - Should return `{"message": "TalentHub API"}`
- `GET /health` - Should return `{"status": "healthy"}`

### 2. Test Frontend

Visit: `https://afropalsjobs.ru` (or your Render URL)

Check:
- [ ] Homepage loads
- [ ] Navigate to /jobs
- [ ] View a job detail
- [ ] Legal pages: /terms, /privacy, /employer-agreement, /candidate-consent
- [ ] Launch banner appears

### 3. Test API Integration

Open browser console on frontend and check for:
- No CORS errors
- API requests working (check Network tab)

---

## 🔍 SUBMIT TO SEARCH ENGINES

### Google Search Console

1. Go to: https://search.google.com/search-console
2. Add property: `afropalsjobs.ru`
3. Verify ownership (DNS or HTML tag)
4. Submit sitemap: `https://afropalsjobs.ru/sitemap.xml`

### Yandex Webmaster

1. Go to: https://webmaster.yandex.ru
2. Add site: `afropalsjobs.ru`
3. Verify ownership
4. Submit sitemap: `https://afropalsjobs.ru/sitemap.xml`
5. Set region: Russia

---

## 🎉 YOU'RE LIVE!

### Announcement Template

**Post this on social media:**

```
🎉 Afro-Personala is now LIVE! 🎉

Transparent recruitment platform connecting job seekers 
with verified employers - NO AGENTS, NO FEES.

✅ Verified employers only
✅ Transparent salary ranges
✅ Direct communication
✅ GDPR compliant

Visit: afropalsjobs.ru

#Jobs #Recruitment #Hiring #CareerOpportunities
```

---

## 📧 IMPORTANT EMAILS TO SET UP

Create these email accounts for your domain:

- `info@afropalsjobs.ru` - General inquiries
- `support@afropalsjobs.ru` - User support
- `employers@afropalsjobs.ru` - Employer support
- `legal@afropalsjobs.ru` - Legal matters
- `privacy@afropalsjobs.ru` - Privacy requests
- `no-reply@afropalsjobs.ru` - Automated emails (already configured)

---

## 🔒 SECURITY CHECKLIST

- [ ] JWT_SECRET is a strong random string (not "your_secret")
- [ ] All passwords are unique and strong
- [ ] SMTP_PASS is an app password, not your main Gmail password
- [ ] MongoDB allows connections only from Render IPs (or 0.0.0.0/0 for now)
- [ ] SSL certificates are active (Render does this automatically)
- [ ] Environment variables are set in Render, not in code

---

## 🐛 TROUBLESHOOTING

### Backend won't start?
- Check Render logs for errors
- Verify all environment variables are set correctly
- Test MongoDB connection string locally first

### Frontend shows blank page?
- Check browser console for errors
- Verify VITE_API_URL is correct
- Check CORS settings in backend

### Can't connect to API?
- Verify backend is deployed and running
- Check CORS_ORIGINS includes your frontend domain
- Test API directly at `/docs` endpoint

### Emails not sending?
- Verify Gmail app password is correct
- Check SMTP settings match Gmail requirements
- Look for errors in Render backend logs

---

## 📈 NEXT STEPS (After Launch)

### Week 1
- [ ] Monitor user signups
- [ ] Test all user flows
- [ ] Fix any reported bugs
- [ ] Add first employer accounts manually

### Week 2
- [ ] Set up payment processing (Stripe/YooMoney)
- [ ] Create pricing page
- [ ] Add employer onboarding flow
- [ ] Create admin dashboard

### Month 1
- [ ] Add analytics (Google Analytics, Yandex Metrica)
- [ ] Implement job alerts
- [ ] Add resume parser
- [ ] Create mobile app (optional)

---

## 💡 TIPS FOR SUCCESS

1. **Start Small:** Manually verify first 10-20 employers
2. **Get Feedback:** Ask early users for feedback
3. **Monitor Logs:** Check Render logs daily for errors
4. **Update Content:** Add real job postings ASAP
5. **SEO Matters:** Write blog posts about job hunting
6. **Be Responsive:** Reply to support emails within 24 hours
7. **No Agents:** Strictly enforce the no-agent policy

---

## 🆘 NEED HELP?

### Resources
- **Render Docs:** https://render.com/docs
- **FastAPI Docs:** https://fastapi.tiangolo.com
- **React Router:** https://reactrouter.com
- **MongoDB Atlas:** https://docs.atlas.mongodb.com

### Support
If you encounter issues during deployment:
1. Check Render logs first
2. Review environment variables
3. Test each component separately
4. Check DNS propagation status

---

## 🎊 CONGRATULATIONS!

You now have a production-ready recruiting platform!

**Your platform includes:**
- ✅ Modern, responsive frontend
- ✅ Secure backend API
- ✅ Database for storing data
- ✅ File storage for resumes
- ✅ Email notifications
- ✅ Legal compliance pages
- ✅ SEO optimization
- ✅ Ready for payments

**Start onboarding employers and candidates!**

---

**Questions? Contact: info@afropalsjobs.ru**

**Good luck with your launch! 🚀**
