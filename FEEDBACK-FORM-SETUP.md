# Program Feedback Form - Complete Setup Guide

## 📋 Overview

A multi-step customer feedback form that collects feedback from both **parents** and **students** about your robotics programs. Form submissions are sent via email to `feedback@braineatingmachines.com` using Resend API and Cloudflare Workers.

### What Was Built

**Frontend (Jekyll Site):**
- `/program-feedback/` - Multi-step form with 4 steps and progress bar
- `/program-feedback-thank-you/` - Thank you page after submission
- `assets/css/feedback-form.css` - Form styling
- `assets/js/feedback-form.js` - Form logic and submission handler

**Backend (Cloudflare Worker):**
- `_cloudflare-worker/feedback-worker.js` - Serverless function to send emails
- Runs on Cloudflare's free tier (100,000 requests/day)

### Form Structure

**Step 1:** Introduction (reminds parents to have kids nearby)

**Step 2:** Parent Feedback (18 questions)
- Communication satisfaction
- Schedule and location convenience
- Child's enjoyment and engagement
- Learning outcomes
- Value and recommendations
- Preferences for future programs

**Step 3:** Student Feedback (14 questions)
- Program enjoyment (with star ratings ⭐)
- Difficulty level
- Favorite/least favorite parts
- Skills learned
- Instructor evaluation
- Interest in continuing

**Step 4:** Additional Feedback & Contact
- Open-ended suggestions
- Permission to use feedback
- Optional contact info for testimonials

---

## 🚀 Quick Start Deployment

### Prerequisites

1. **Cloudflare Account** (Free) - https://dash.cloudflare.com/sign-up
2. **Resend API Key** - Get from https://resend.com/api-keys
   - Should look like: `re_xxxxxxxxxxxxx`

---

## Step-by-Step Setup

### STEP 1: Deploy Cloudflare Worker

1. **Go to Cloudflare Dashboard**
   - Visit: https://dash.cloudflare.com/
   - Log in or create free account

2. **Create New Worker**
   - Click **Workers & Pages** in left sidebar
   - Click **Create Application** button
   - Select **Create Worker**
   - Name it: `feedback-form-handler`
   - Click **Deploy**

3. **Add Worker Code**
   - Click **Edit Code** button
   - Delete ALL existing code in the editor
   - Open: `_cloudflare-worker/feedback-worker.js`
   - Copy entire contents and paste into worker editor
   - Click **Save and Deploy**

4. **Add Resend API Key (Environment Variable)**
   - Go back to worker overview page
   - Click **Settings** tab
   - Scroll down to **Environment Variables** section
   - Click **Add variable**
   - Enter:
     - **Variable name:** `RESEND_API_KEY`
     - **Value:** Your Resend API key (starts with `re_`)
     - **Type:** Select **Encrypt** (important for security!)
   - Click **Save**

5. **Get Your Worker URL**
   - Your worker URL will be shown at the top
   - Format: `https://feedback-form-handler.YOUR-SUBDOMAIN.workers.dev`
   - **COPY THIS URL** - you'll need it next!

---

### STEP 2: Update JavaScript File

1. **Open the JavaScript file:**
   ```
   assets/js/feedback-form.js
   ```

2. **Find line 8 (near the top):**
   ```javascript
   const CLOUDFLARE_WORKER_URL = 'YOUR_CLOUDFLARE_WORKER_URL';
   ```

3. **Replace with your actual worker URL:**
   ```javascript
   const CLOUDFLARE_WORKER_URL = 'https://feedback-form-handler.YOUR-SUBDOMAIN.workers.dev';
   ```

4. **Save the file**

5. **Commit and push to GitHub:**
   ```bash
   git add assets/js/feedback-form.js
   git commit -m "Configure feedback form worker URL"
   git push
   ```

---

### STEP 3: Configure CORS (For Production)

**For security, restrict which domains can submit to your worker:**

1. Open `_cloudflare-worker/feedback-worker.js` in the Cloudflare editor

2. Find line 16:
   ```javascript
   'Access-Control-Allow-Origin': '*',
   ```

3. Change `'*'` to your domain:
   ```javascript
   'Access-Control-Allow-Origin': 'https://braineatingmachines.com',
   ```

4. Click **Save and Deploy**

---

### STEP 4: Verify Resend Configuration

Make sure your Resend account is properly configured:

1. **Go to Resend Dashboard:** https://resend.com/domains
2. **Verify that `feedback@braineatingmachines.com` can send emails:**
   - Your domain must be verified
   - OR use Resend's test domain for initial testing

3. **Check API Key Permissions:**
   - Go to https://resend.com/api-keys
   - Make sure your key has "Sending access" enabled

---

## 🧪 Testing

### Test the Form

1. **Visit your feedback form:**
   ```
   http://localhost:4000/program-feedback/
   ```
   Or on live site:
   ```
   https://braineatingmachines.com/program-feedback/
   ```

2. **Fill out the form:**
   - Step through all 4 steps
   - Fill in required fields (marked with *)
   - Submit the form

3. **Verify success:**
   - Should redirect to `/program-feedback-thank-you/`
   - Check `feedback@braineatingmachines.com` inbox for email
   - Email should be formatted with all responses

### Troubleshooting

**Form submission fails:**
- Open browser console (F12) and check for errors
- Verify worker URL is correct in `feedback-form.js`
- Check Cloudflare worker logs (see Monitoring section below)

**No email received:**
- Check Resend dashboard for delivery logs
- Verify API key is correctly set in Cloudflare environment variables
- Make sure domain is verified in Resend
- Check spam folder

**CORS errors in console:**
- Make sure CORS origin is set correctly in worker
- If testing locally, use `'*'` for development, then change to your domain for production

---

## 📊 Monitoring & Logs

### View Worker Logs

1. Go to Cloudflare dashboard
2. Navigate to **Workers & Pages**
3. Click on your `feedback-form-handler` worker
4. Click **Logs** tab
5. Enable **Real-time logs** to see live submissions

### Check Email Delivery

1. Go to Resend dashboard: https://resend.com/emails
2. View all sent emails and delivery status
3. Click on any email to see details

---

## 💰 Free Tier Limits

### Cloudflare Workers (Free Tier)
- ✅ 100,000 requests per day
- ✅ 10ms CPU time per request
- ✅ More than enough for feedback forms!

### Resend (Free Tier)
- ✅ 100 emails per day
- ✅ 3,000 emails per month
- ✅ Perfect for feedback submissions

---

## 🔒 Security Features

✅ **API Key Protection:** Resend API key is encrypted in Cloudflare environment variables, never exposed in client code

✅ **CORS Protection:** Configure worker to only accept requests from your domain

✅ **No Database:** No persistent storage of sensitive data - everything sent directly via email

✅ **HTTPS Only:** All communication encrypted via HTTPS

✅ **Input Validation:** Form validates all required fields before submission

---

## 📝 Email Format

Submissions are sent as **formatted HTML emails** with:
- Professional styling with your brand colors
- Clearly organized sections (Parent, Student, Additional)
- All questions and answers formatted for easy reading
- Plain text fallback for email clients that don't support HTML
- Timestamp of submission

---

## 🎨 Customization

### Change Form Styling

Edit `assets/css/feedback-form.css` to customize:
- Colors (currently uses LEGO blue: #0055BF)
- Button styles
- Progress bar appearance
- Form question spacing

### Modify Questions

Edit `program-feedback.html` to:
- Add/remove questions
- Change question text
- Modify answer options
- Adjust validation requirements

### Update Email Template

Edit `_cloudflare-worker/feedback-worker.js` functions:
- `formatEmailHtml()` - HTML email template
- `formatEmailText()` - Plain text fallback

---

## 📂 File Structure

```
braineatingmachines.github.io/
├── program-feedback.html               # Main form page
├── program-feedback-thank-you.html     # Thank you page
├── assets/
│   ├── css/
│   │   └── feedback-form.css          # Form styling
│   └── js/
│       └── feedback-form.js           # Form logic & submission
└── _cloudflare-worker/
    ├── feedback-worker.js             # Backend code (deploy to Cloudflare)
    └── README.md                      # Worker-specific docs
```

---

## 🆘 Support & Resources

### Documentation
- **Cloudflare Workers:** https://developers.cloudflare.com/workers/
- **Resend API:** https://resend.com/docs/
- **Jekyll:** https://jekyllrb.com/docs/

### Need Help?
- Check Cloudflare worker logs for errors
- Review Resend delivery logs
- Test with browser console open (F12)

---

## ✅ Deployment Checklist

- [ ] Cloudflare account created
- [ ] Worker deployed with feedback-worker.js code
- [ ] RESEND_API_KEY environment variable added (encrypted)
- [ ] Worker URL copied
- [ ] assets/js/feedback-form.js updated with worker URL
- [ ] Changes committed and pushed to GitHub
- [ ] CORS configured for production domain
- [ ] Resend domain verified
- [ ] Test submission completed successfully
- [ ] Email received at feedback@braineatingmachines.com
- [ ] Worker logs reviewed

---

## 🎯 What to Provide When You Return

When you're ready to finalize setup, you'll need to provide:

1. **Your Resend API Key** (starts with `re_`)
   - Get from: https://resend.com/api-keys

2. **Your Cloudflare Worker URL** (after deployment)
   - Format: `https://feedback-form-handler.xxx.workers.dev`

Then I can update the JavaScript file with the correct worker URL!

---

**Created:** January 2026
**Last Updated:** January 2026
**Status:** Ready for deployment

