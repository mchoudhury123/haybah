# 🚀 Deployment Guide for Haybah Collections

## Deploy to https://haybahcollections.co.uk

This guide will help you deploy your Haybah Collections website to your custom domain with all features working perfectly.

## 🎯 What Works After Deployment

✅ **Frontend Features**
- Home page with functional Shop Now buttons
- Product catalog and collections
- Shopping cart and checkout
- Contact forms
- Responsive design

✅ **Backend Features**
- Admin dashboard (/admin)
- Sanity Studio (/studio)
- Stripe payment processing
- Order management system
- API routes for checkout and webhooks

✅ **Custom Domain**
- https://haybahcollections.co.uk
- SSL certificate included
- CDN for fast loading worldwide

## 🚀 Quick Deployment (Recommended)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy
```bash
npm run deploy
```

### Step 4: Add Custom Domain
```bash
npm run domain:add
```

## 📋 Detailed Setup Instructions

### 1. Pre-deployment Checklist

Ensure you have these environment variables in `.env.local`:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=gnppn7qx
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-07-01
SANITY_TOKEN=your_sanity_token
SANITY_READ_TOKEN=your_read_token

# Stripe Configuration
STRIPE_SECRET_KEY=sk_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_WEBHOOK_SECRET=whsec_...

# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_ORDER_TEMPLATE_ID=your_template_id

# Admin Configuration
ADMIN_PASS=haybah2024
```

### 2. Build and Test Locally

```bash
# Install dependencies
npm install

# Build the application
npm run build

# Test the build locally
npm start
```

### 3. Deploy to Vercel

```bash
# Deploy with custom configuration
npm run deploy:vercel

# Or use the automated script
npm run deploy
```

### 4. Configure Custom Domain

#### Option A: Through Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to Settings > Domains
4. Add `haybahcollections.co.uk`
5. Follow DNS configuration instructions

#### Option B: Through CLI
```bash
vercel domains add haybahcollections.co.uk
```

### 5. DNS Configuration

Configure your domain DNS with these records:

```
Type: A
Name: @
Value: 76.76.19.61

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## 🔧 Environment Variables Setup

### Vercel Dashboard Method:
1. Go to Project Settings > Environment Variables
2. Add all variables from your `.env.local`
3. Redeploy to apply changes

### CLI Method:
```bash
vercel env add STRIPE_SECRET_KEY
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
# ... add all other variables
```

## 🧪 Testing After Deployment

### 1. Frontend Testing
- [ ] Home page loads correctly
- [ ] Shop Now buttons work
- [ ] Product pages display properly
- [ ] Shopping cart functions
- [ ] Contact form works

### 2. Backend Testing
- [ ] Admin login works (/admin)
- [ ] Sanity Studio accessible (/studio)
- [ ] Stripe checkout processes payments
- [ ] Order management system works
- [ ] API routes respond correctly

### 3. Performance Testing
- [ ] Page load speed < 3 seconds
- [ ] Images load properly
- [ ] Mobile responsiveness
- [ ] SEO meta tags present

## 🔍 Troubleshooting

### Common Issues:

**Issue**: 500 Internal Server Error
**Solution**: Check environment variables are set correctly

**Issue**: Admin page not accessible
**Solution**: Verify ADMIN_PASS is set in environment variables

**Issue**: Stripe not working
**Solution**: 
1. Check Stripe keys are correct
2. Verify webhook endpoint is configured
3. Ensure webhook secret matches

**Issue**: Sanity Studio not loading
**Solution**: 
1. Check Sanity project ID and dataset
2. Verify Sanity token has correct permissions
3. Ensure CORS is configured in Sanity

### Debug Commands:
```bash
# Check deployment logs
vercel logs

# Check build logs
vercel build

# Preview deployment
vercel --dev
```

## 📞 Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Review Vercel deployment logs
3. Verify all environment variables are set
4. Test locally first with `npm run build && npm start`

## 🎉 Success!

Once deployed, your website will be available at:
- **https://haybahcollections.co.uk** (primary domain)
- **https://your-project.vercel.app** (vercel subdomain)

All features including admin, shop, payments, and order management will work perfectly!
