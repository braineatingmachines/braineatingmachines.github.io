# Program Feedback Form - Cloudflare Worker Setup

This guide will help you deploy the feedback form backend using Cloudflare Workers (free tier).

## Prerequisites

1. A Cloudflare account (free) - Sign up at https://dash.cloudflare.com/sign-up
2. Your Resend API key from resend.com

## Step 1: Create Cloudflare Worker

1. Go to https://dash.cloudflare.com/
2. Navigate to **Workers & Pages** in the left sidebar
3. Click **Create Application**
4. Select **Create Worker**
5. Give it a name like `feedback-form-handler`
6. Click **Deploy**

## Step 2: Add Worker Code

1. After deployment, click **Edit Code**
2. Delete all existing code in the editor
3. Copy the entire contents of `feedback-worker.js` from this directory
4. Paste it into the worker editor
5. Click **Save and Deploy**

## Step 3: Add Environment Variables

1. Go back to your worker overview page
2. Click on **Settings** tab
3. Scroll down to **Environment Variables**
4. Click **Add variable**
5. Add the following variable:
   - **Variable name:** `RESEND_API_KEY`
   - **Value:** Your Resend API key (it should start with `re_`)
   - **Type:** Select "Encrypt" to keep it secure
6. Click **Save**

## Step 4: Configure CORS (Important!)

In the worker code, find this line:

```javascript
'Access-Control-Allow-Origin': '*',
```

For production, change `'*'` to your actual domain:

```javascript
'Access-Control-Allow-Origin': 'https://braineatingmachines.com',
```

This ensures only your website can submit to this endpoint.

## Step 5: Get Your Worker URL

1. After deploying, you'll see your worker URL
2. It will look like: `https://feedback-form-handler.YOUR-SUBDOMAIN.workers.dev`
3. Copy this URL

## Step 6: Update JavaScript File

1. Open `assets/js/feedback-form.js` in your Jekyll site
2. Find this line near the top:

```javascript
const CLOUDFLARE_WORKER_URL = 'YOUR_CLOUDFLARE_WORKER_URL';
```

3. Replace `'YOUR_CLOUDFLARE_WORKER_URL'` with your actual worker URL:

```javascript
const CLOUDFLARE_WORKER_URL = 'https://feedback-form-handler.YOUR-SUBDOMAIN.workers.dev';
```

4. Save the file
5. Commit and push to GitHub

## Step 7: Test the Form

1. Visit your site at `/program-feedback/`
2. Fill out the form
3. Submit it
4. Check if:
   - You're redirected to the thank you page
   - You receive an email at feedback@braineatingmachines.com

## Troubleshooting

### Form submission fails

1. Check browser console (F12) for errors
2. Verify the worker URL is correct in `feedback-form.js`
3. Make sure RESEND_API_KEY environment variable is set correctly

### No email received

1. Check Resend dashboard for delivery logs
2. Verify the API key has permissions to send emails
3. Make sure `feedback@braineatingmachines.com` is verified in Resend

### CORS errors

1. Check that CORS headers are properly configured in the worker
2. Make sure you've set the correct origin domain

## Free Tier Limits

Cloudflare Workers free tier includes:
- 100,000 requests per day
- 10ms CPU time per request

This is more than enough for a feedback form!

## Monitoring

To view logs and monitor your worker:
1. Go to your worker in Cloudflare dashboard
2. Click **Logs** tab
3. Enable **Real-time logs** to see submissions in real-time

## Security Notes

- The API key is encrypted in Cloudflare environment variables
- CORS is configured to only allow requests from your domain
- No sensitive data is stored in the worker
- All data is immediately sent via email and not persisted

## Support

If you need help:
- Cloudflare Workers docs: https://developers.cloudflare.com/workers/
- Resend docs: https://resend.com/docs/
