# Deployment Checklist - Haybah Collections

## 🚀 Pre-Deployment Setup

### 1. Environment Variables in Vercel
Set these in your Vercel project dashboard (Settings → Environment Variables):

```bash
# Sanity Configuration
SANITY_PROJECT_ID=gnppn7qx
SANITY_DATASET=production
SANITY_API_VERSION=2024-07-01
SANITY_READ_TOKEN=sk4noDj00qit4s8TsvqMK9KXW34RF4y9IXNMvSgAU8dRnXxrkvygZaRxd8emZErT05uQInfiGv4kg8HSMEFRAjf49QRW3t7dpW25auIedGIlfTjABQWTeycGKEvuXKT3F5V7pAfrtjLp9WtIyjSmucrRoMeqHYD8wu19Pyb5pizQhjl5Zq1A
SANITY_WRITE_TOKEN=sk4noDj00qit4s8TsvqMK9KXW34RF4y9IXNMvSgAU8dRnXxrkvygZaRxd8emZErT05uQInfiGv4kg8HSMEFRAjf49QRW3t7dpW25auIedGIlfTjABQWTeycGKEvuXKT3F5V7pAfrtjLp9WtIyjSmucrRoMeqHYD8wu19Pyb5pizQhjl5Zq1A

# Stripe Configuration
STRIPE_SECRET_KEY=sk_live_your_live_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Admin Access
ADMIN_PASS=your_secure_admin_password

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://haybahcollections.co.uk
```

### 2. Sanity Webhook Configuration
1. Go to [Sanity Project Settings](https://www.sanity.io/manage) → API → Webhooks
2. Create New Webhook:
   - **Name**: `Vercel Revalidation`
   - **URL**: `https://haybahcollections.co.uk/api/revalidate`
   - **Dataset**: `production`
   - **HTTP Method**: `POST`
   - **Filter**: `_type in ["product", "variant", "collection", "inventory_movement"]`
   - **Events**: Select all (create, update, delete)

### 3. Stripe Webhook Configuration
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/webhooks) → Developers → Webhooks
2. Add Endpoint:
   - **Endpoint URL**: `https://haybahcollections.co.uk/api/stripe/webhook`
   - **Events to send**: `checkout.session.completed`
3. Copy the webhook secret (starts with `whsec_`) and add to Vercel env vars

## ✅ Deployment Checklist

### Pre-Deployment
- [ ] Repository connected to Vercel
- [ ] All environment variables set in Vercel
- [ ] Sanity project deployed and accessible
- [ ] Stripe webhook endpoint configured
- [ ] Domain configured in Vercel (if using custom domain)
- [ ] `vercel.json` file committed to repository

### Post-Deployment Testing
- [ ] **Homepage**: Loads without errors
- [ ] **Products**: Product grid displays correctly
- [ ] **Collections**: Collection pages load
- [ ] **Cart**: Add/remove items works
- [ ] **Checkout**: Stripe checkout completes successfully
- [ ] **Webhooks**: Inventory updates after successful payment
- [ ] **Admin**: Admin reports accessible at `/admin/reports`
- [ ] **Studio**: Sanity Studio loads at `/studio`
- [ ] **Content Updates**: Changes in Sanity reflect on website

### Functionality Testing
- [ ] **Product Search**: Search functionality works
- [ ] **Filtering**: Size, color, price filters work
- [ ] **Responsive Design**: Mobile and desktop layouts work
- [ ] **Image Loading**: Product images load correctly
- [ ] **Cart Persistence**: Cart items persist across sessions
- [ ] **Payment Flow**: Complete checkout process works
- [ ] **Inventory Management**: Stock updates after purchases

## 🔧 Troubleshooting

### Common Issues

#### Build Errors
- **Problem**: Build fails with missing environment variables
- **Solution**: Verify all env vars are set in Vercel dashboard

#### Webhook Failures
- **Problem**: Stripe webhooks not delivering
- **Solution**: Check webhook secret matches in both Stripe and Vercel

#### Content Not Updating
- **Problem**: Changes in Sanity don't appear on website
- **Solution**: Verify Sanity webhook is configured correctly

#### Payment Issues
- **Problem**: Checkout fails or doesn't complete
- **Solution**: Check Stripe keys and webhook configuration

#### Admin Access Issues
- **Problem**: Can't access admin reports
- **Solution**: Verify `ADMIN_PASS` is set correctly

### Performance Monitoring
- [ ] **Function Logs**: Check Vercel function logs for errors
- [ ] **Webhook Delivery**: Monitor Stripe webhook delivery status
- [ ] **Page Load Times**: Ensure pages load within acceptable time
- [ ] **Image Optimization**: Verify images are being optimized

## 📱 Post-Launch

### Monitoring
- [ ] Set up Vercel Analytics
- [ ] Monitor Stripe webhook delivery
- [ ] Check Sanity webhook triggers
- [ ] Monitor admin access logs

### Maintenance
- [ ] Regular content updates in Sanity
- [ ] Monitor inventory levels
- [ ] Check payment processing
- [ ] Update admin password periodically

## 🎯 Success Criteria

Your deployment is successful when:
- ✅ Website loads without errors
- ✅ All pages render correctly
- ✅ Stripe checkout works end-to-end
- ✅ Inventory updates automatically
- ✅ Admin reports are accessible
- ✅ Content updates reflect immediately
- ✅ Webhooks deliver successfully

---

**Need Help?** Check the main README.md for detailed configuration instructions.
