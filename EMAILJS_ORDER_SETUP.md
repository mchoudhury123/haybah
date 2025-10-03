# EmailJS Order Confirmation Setup Guide

## 🚀 Setup for Order Confirmation Emails

### 1. EmailJS Account Setup
1. Go to [EmailJS.com](https://www.emailjs.com/) and sign in
2. Ensure you have the same account used for contact forms

### 2. Create Order Confirmation Email Template
1. Go to "Email Templates" in your EmailJS dashboard
2. Click "Create New Template"
3. Use this template:

**Subject:** Order Confirmation - Order #{{order_id}}

**Email Body:**
```
Dear {{customer_name}},

Thank you for your order with Haybah Collections! Your order has been received and is being processed.

📋 **Order Details:**
Order ID: {{order_id}}
Order Date: {{order_date}}
Total Amount: {{total_amount}}

🛍️ **Items Ordered:**
{{items_list}}

👤 **Customer Information:**
Name: {{customer_name}}
Email: {{customer_email}}
Phone: {{customer_phone}}

📍 **Shipping Address:**
{{address_line1}}
{{address_line2}}
{{address_line3}}
{{city}}
{{postcode}}

🚚 **Shipping Information:**
- Standard UK shipping: £4.99
- Estimated delivery: 2-3 weeks
- You will receive tracking information once your order ships

💳 **Payment:**
Your payment has been processed successfully.

📞 **Need Help?**
If you have any questions about your order, please contact us:
- Email: haybahcollections@outlook.com
- Phone: [Your phone number]

Thank you for choosing Haybah Collections for your modest fashion needs!

Best regards,
The Haybah Collections Team

---
This is an automated order confirmation email.
```

4. **Copy the Template ID** (you'll need this)

### 3. Update Environment Variables
Add these to your `.env.local` file:

```bash
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_ORDER_TEMPLATE_ID=your_order_confirmation_template_id
```

### 4. Template Variables Available
The order confirmation email will automatically populate these variables:

- `{{to_email}}` - Customer's email address
- `{{to_name}}` - Customer's name
- `{{order_id}}` - Unique order identifier
- `{{customer_name}}` - Customer's full name
- `{{customer_email}}` - Customer's email
- `{{customer_phone}}` - Customer's phone number
- `{{address_line1}}` - Primary address line
- `{{address_line2}}` - Secondary address line (optional)
- `{{address_line3}}` - Tertiary address line (optional)
- `{{city}}` - City
- `{{postcode}}` - Postcode
- `{{total_amount}}` - Total order amount with currency
- `{{items_list}}` - Formatted list of all ordered items
- `{{order_date}}` - Order date and time

### 5. Testing
1. Place a test order through your checkout
2. Check the customer's email for the confirmation
3. Verify all template variables are populated correctly

### 6. Customization
You can customize the email template to:
- Add your company logo
- Include social media links
- Add promotional content
- Modify the styling and layout
- Include additional order details

## 🔧 Troubleshooting

- **Emails not sending:** Check your service ID and template ID
- **Missing variables:** Ensure all template variables are properly set
- **Formatting issues:** Check the email template HTML structure

## 📱 Benefits

- **Professional appearance** with branded order confirmations
- **Complete order details** automatically included
- **Customer satisfaction** with immediate order confirmation
- **Reduced support requests** with clear order information
- **Brand reinforcement** with consistent communication

---

**Need help?** EmailJS has excellent documentation and support!
