# EmailJS Setup Guide for Haybah Collections

## 🚀 Quick Setup Steps

### 1. Install EmailJS Package
```bash
npm install @emailjs/browser
```

### 2. Sign Up for EmailJS
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### 3. Create Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Outlook" (since you use haybahcollections@outlook.com)
4. Enter your Outlook credentials:
   - **Email:** haybahcollections@outlook.com
   - **Password:** Your Outlook password
5. Click "Create Service"
6. **Copy the Service ID** (you'll need this)

### 4. Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

**Subject:** New Contact Form Message from {{from_name}}

**Email Body:**
```
New contact form submission from Haybah Collections website:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}
Message: {{message}}

Submitted at: {{submitted_at}}

---
This email was sent from your website contact form.
```

4. **Copy the Template ID** (you'll need this)

### 5. Get Your Public Key
1. Go to "Account" → "API Keys"
2. **Copy your Public Key**

### 6. Update Your Code
Replace these placeholders in `app/contact/ContactClient.tsx`:

```typescript
// Replace YOUR_PUBLIC_KEY with your actual public key
emailjs.init("YOUR_PUBLIC_KEY")

// Replace YOUR_SERVICE_ID with your actual service ID
'YOUR_SERVICE_ID'

// Replace YOUR_TEMPLATE_ID with your actual template ID
'YOUR_TEMPLATE_ID'
```

## 📧 How It Works

1. **User fills out form** on your contact page
2. **EmailJS sends email** directly to haybahcollections@outlook.com
3. **You receive email** with all the contact form details
4. **No backend needed** - everything works from the frontend

## 🎯 Benefits

- **Free tier:** 200 emails/month
- **No server setup** required
- **Direct email delivery** to your Outlook
- **Professional appearance**
- **Easy to maintain**

## 🔧 Troubleshooting

- **Emails not sending:** Check your service ID and template ID
- **Authentication errors:** Verify your Outlook credentials
- **Rate limiting:** Free tier allows 200 emails/month

## 📱 Testing

1. Fill out the contact form on your website
2. Submit the form
3. Check your haybahcollections@outlook.com inbox
4. You should receive the email within a few minutes

---

**Need help?** EmailJS has excellent documentation and support!
