# 🚀 Stripe Integration Setup Guide

## 📋 **What We've Built**

✅ **Complete Stripe Integration** with your e-commerce site
✅ **Sanity Order Storage** - all orders saved to your CMS
✅ **Automatic Email Confirmations** - triggered by successful payments
✅ **Secure Payment Processing** - Stripe handles all payment security
✅ **Webhook Integration** - real-time order status updates

## 🔑 **Environment Variables to Add**

Add these to your `.env.local` file:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Sanity Token (for writing orders)
SANITY_TOKEN=sk_your_sanity_token_here
```

## 🎯 **Step 1: Stripe Dashboard Setup**

### **1.1 Create Stripe Account**
1. Go to [stripe.com](https://stripe.com)
2. Sign up for a free account
3. Complete account verification

### **1.2 Get API Keys**
1. **Dashboard** → **Developers** → **API keys**
2. **Publishable key**: pk_test_51Rxx2fCYhuzCYj2Eb4VaedupeV96aGN3M51TOI5I59XqrFolYqO0B1ZtEpcYXGq0agWQIv3DnSEtThXRlgUvCLyy00327PoVg6
3. **Secret key**: pk_test_51Rxx2fCYhuzCYj2Eb4VaedupeV96aGN3M51TOI5I59XqrFolYqO0B1ZtEpcYXGq0agWQIv3DnSEtThXRlgUvCLyy00327PoVg6
4. **Add to `.env.local`**:
   ```bash
   STRIPE_SECRET_KEY=sk_test_your_key_here
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
   ```

## 🔗 **Step 2: Webhook Setup**

### **2.1 Create Webhook Endpoint**
1. **Dashboard** → **Developers** → **Webhooks**
2. **Add endpoint**: `https://yourdomain.com/api/stripe/webhook`
3. **Events to send**:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
4. **Copy webhook secret**: `whsec_...`
5. **Add to `.env.local`**:
   ```bash
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   ```

## 🔐 **Step 3: Sanity Token Setup**

### **3.1 Create Sanity Token**
1. **Sanity Dashboard** → **API** → **Tokens**
2. **Create new token**:
   - **Name**: `Order Management`
   - **Role**: `Editor` (or custom role with write access)
   - **Dataset**: `production` (or your dataset name)
3. **Copy token**: `sk_...`
4. **Add to `.env.local`**:
   ```bash
   SANITY_TOKEN=sk_your_sanity_token_here
   ```

## 🧪 **Step 4: Test the Integration**

### **4.1 Test Mode**
- Stripe is in **test mode** by default
- Use **test card numbers**:
  - **Success**: `4242 4242 4242 4242`
  - **Decline**: `4000 0000 0000 0002`
  - **Expiry**: Any future date
  - **CVC**: Any 3 digits

### **4.2 Test Flow**
1. **Add items to cart**
2. **Fill customer information**
3. **Click "Continue to Payment"**
4. **Complete Stripe payment form**
5. **Check Sanity Studio** for new order
6. **Verify webhook processing**

## 📧 **Step 5: Email Confirmation Setup**

### **5.1 Current Setup**
- **EmailJS fallback** (for development)
- **Webhook triggers** email sending
- **Order status tracking** in Sanity

### **5.2 Production Upgrade (Optional)**
For production, consider:
- **SendGrid** integration
- **Resend** email service
- **Custom email templates**

## 🚀 **How It Works**

### **1. Customer Checkout**
```
Customer fills form → Validates info → Creates Stripe payment intent
```

### **2. Order Creation**
```
Stripe payment intent → Sanity order document → Order ID generated
```

### **3. Payment Processing**
```
Customer pays → Stripe processes → Webhook triggers → Order updated
```

### **4. Confirmation**
```
Payment success → Order status updated → Email sent → Cart cleared
```

## 🔍 **Troubleshooting**

### **Common Issues**

#### **"STRIPE_SECRET_KEY is not set"**
- Check `.env.local` file exists
- Verify variable name is correct
- **Restart development server**

#### **"Webhook signature verification failed"**
- Check `STRIPE_WEBHOOK_SECRET` in `.env.local`
- Verify webhook endpoint URL
- Ensure webhook secret matches Stripe dashboard

#### **"Sanity token not working"**
- Verify token has write permissions
- Check dataset name matches
- Ensure token is not expired

#### **"Payment form not loading"**
- Check `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- Verify Stripe Elements are loading
- Check browser console for errors

## 📱 **Production Deployment**

### **1. Switch to Live Keys**
- **Stripe Dashboard** → **View test data** → **Switch to live**
- **Update environment variables** with live keys
- **Update webhook endpoint** to production URL

### **2. Domain Verification**
- **Add production domain** to Stripe dashboard
- **Update webhook endpoint** URL
- **Test webhook delivery**

### **3. SSL Certificate**
- **Ensure HTTPS** is enabled
- **Valid SSL certificate** required for webhooks
- **Test webhook delivery** in production

## 🎉 **You're All Set!**

Your e-commerce site now has:
- ✅ **Professional payment processing**
- ✅ **Secure order management**
- ✅ **Automatic confirmations**
- ✅ **Real-time status updates**
- ✅ **CMS integration**

**Test thoroughly in test mode before going live!**
