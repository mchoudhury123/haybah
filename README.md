# Haybah Collections - Luxury Abaya Website

## Features

### Review System
- **Customer Reviews**: Users can submit reviews with ratings (1-5 stars) and comments
- **Moderation**: All reviews require admin approval before being displayed
- **Spam Protection**: Built-in rate limiting (1 review per hour per product) and content filtering
- **Display**: Shows average rating, review count, and last 3 reviews on product pages
- **Form**: Clean, on-brand review submission form with validation

#### Review Schema
- `productRef`: Reference to the product being reviewed
- `name`: Customer's name (max 100 characters)
- `rating`: 1-5 star rating
- `comment`: Review text (10-500 characters)
- `isApproved`: Admin approval status
- `createdAt`: Timestamp of review submission

#### Spam Protection Features
- Rate limiting by IP cookie (1 review per hour per product)
- Content validation (URLs, excessive caps, special characters, repeated characters)
- Comment length restrictions
- Admin approval required for all reviews

A modern, elegant e-commerce website for Haybah Collections, featuring premium Abaya designs and modest fashion.

## Features

- **Modern Design**: Clean, minimalist UI with elegant typography
- **Brand Identity**: Custom color scheme matching your brand (maroon, gold, peach)
- **Responsive Layout**: Mobile-first design that works on all devices
- **Interactive Elements**: Smooth animations and hover effects
- **Shopping Cart**: Fully functional cart with slide-out panel
- **Product Showcase**: Beautiful product grids with pricing and status badges
- **Arabic Typography**: Support for Arabic text and cultural elements

## Tech Stack

- **Next.js 14** - React framework for production
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icons
- **Sanity CMS** - Headless content management
- **Stripe** - Payment processing
- **Zustand** - State management
- **Zod** - Input validation

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (see Environment Configuration section below)

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Environment Configuration

This project requires several environment variables to function properly. Copy `.env.local.example` to `.env.local` and fill in the values:

### Sanity CMS Configuration
- **SANITY_PROJECT_ID**: Your Sanity project ID (found in project settings)
- **SANITY_DATASET**: Dataset name (usually "production")
- **SANITY_API_VERSION**: API version date (YYYY-MM-DD format)
- **SANITY_READ_TOKEN**: Read-only API token for fetching content
- **SANITY_WRITE_TOKEN**: Write token for content management (optional for read-only sites)

### Stripe Payment Configuration
- **STRIPE_SECRET_KEY**: Your Stripe secret key from the Stripe dashboard
- **STRIPE_WEBHOOK_SECRET**: Webhook endpoint secret for payment confirmations

### Next.js Configuration
- **NEXT_PUBLIC_SITE_URL**: Your site's public URL (https://haybahcollections.co.uk for production, http://localhost:3000 for development)

### How to Get These Values

#### Sanity Setup
1. Create a Sanity account at [sanity.io](https://sanity.io)
2. Create a new project
3. Go to Project Settings → API
4. Copy the Project ID and create API tokens
5. Set the dataset name (default is "production")

#### Stripe Setup
1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Go to Developers → API keys
3. Copy your secret key (starts with `sk_`)
4. Set up webhook endpoints and copy the webhook secret
5. The checkout API route is already configured with your test key
6. For production, update the secret key in `app/api/checkout/route.ts`

#### Stripe Webhook Testing with Stripe CLI
1. Install Stripe CLI: [stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)
2. Login to your Stripe account: `stripe login`
3. Forward webhooks to your local development server:
   ```bash
   stripe listen --forward-to localhost:3001/api/stripe/webhook
   ```
4. Copy the webhook signing secret (starts with `whsec_`) and add it to your `.env.local`:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   ```
5. Test webhook delivery by creating a test checkout session
6. Monitor webhook events in your terminal and server logs

#### Local Development
- Use `https://haybahcollections.co.uk` for production and `http://localhost:3000` for development
- Create a `.env.local` file (not committed to git)
- Restart your development server after adding environment variables

## Sanity CMS Setup

Your project now includes a fully configured Sanity CMS for managing products and content.

### Accessing Sanity Studio
Once your development server is running, you can access the content management system at:
```
http://localhost:3000/studio
```

### What's Included
- **Product Schema**: Complete product management with fields for:
  - Name, description, pricing
  - Images with hotspot support
  - Categories and tags
  - Stock status and discounts
  - Featured product flags
- **Content Management**: Add, edit, and organize your Abaya products
- **Image Management**: Upload and optimize product images
- **Real-time Updates**: Changes appear instantly on your website

### Getting Started with Content
1. Navigate to `/studio` in your browser
2. Create your first product using the Product schema
3. Upload product images
4. Set categories and pricing
5. Mark products as featured or set discounts
6. Publish your content

### Available Categories
- Classic Collection
- Luxury Line
- Evening Wear
- New Arrivals
- Best Sellers

### Shopping Cart & Checkout
The project includes a complete e-commerce cart system:

- **Cart Store**: Zustand-based state management with localStorage persistence
- **Cart Panel**: Slide-in cart interface accessible from the header
- **Stock Validation**: Prevents adding out-of-stock items
- **Stripe Integration**: Secure checkout with payment processing
- **Order Management**: Complete order flow with confirmation pages

#### Cart Features
- Add/remove items with quantity controls
- Real-time stock validation
- Variant selection (size, color)
- Persistent cart data across sessions
- Responsive design for mobile and desktop

#### Checkout Process
1. Users add items to cart from product grids or detail pages
2. Cart validates stock availability before checkout
3. Stripe checkout session is created with line items
4. Users complete payment on Stripe's secure page
5. Success redirects to thank you page with order confirmation
6. Cancel returns users to cart page

#### Inventory Management
- **Automatic Stock Updates**: Stock levels are automatically updated when payments are completed
- **Audit Trail**: All inventory movements are tracked in the `inventory_movement` schema
- **Webhook Processing**: Stripe webhooks trigger inventory updates in real-time
- **Stock Validation**: Prevents overselling by validating stock before checkout

#### Collection & Shop Pages
- **Collection Pages**: Dynamic pages for each collection (`/collection/[slug]`) with 60s revalidation
- **Shop Page**: Full catalog with advanced filtering and search capabilities
- **Client-side Filters**: Size, color, price range, in-stock status, and collection filters
- **Search Functionality**: Debounced search across product names and descriptions
- **URL Query Parameters**: All filters are reflected in the URL for shareable links
- **Performance Optimized**: Minimal GROQ queries with client-side filtering for better UX

### Using Sanity Data in Components
The project includes both static and dynamic product components:

- **`ProductGrid.tsx`**: Dynamic product grid with Sanity integration and cart functionality
- **`ProductGridSanity.tsx`**: Legacy static product grid (can be removed)

To use the Sanity-integrated version, replace the import in your main page:

```tsx
// Instead of:
import ProductGrid from '../components/ProductGrid'

// Use:
import ProductGridSanity from '../components/ProductGridSanity'
```

The Sanity version automatically:
- Fetches products from your CMS
- Displays real product images
- Shows loading states and error handling
- Provides a link to the studio when no products exist

## Project Structure

```
├── app/                 # Next.js app directory
│   ├── globals.css     # Global styles and Tailwind imports
│   ├── layout.tsx      # Root layout component
│   ├── page.tsx        # Main page component
│   ├── cart/           # Cart page
│   │   └── page.tsx
│   ├── thank-you/      # Thank you page after checkout
│   │   └── page.tsx
│   ├── product/        # Product detail pages
│   │   └── [slug]/page.tsx
│   ├── collection/     # Collection pages
│   │   └── [slug]/page.tsx
│   ├── shop/           # Shop page with filters
│   │   ├── page.tsx
│   │   └── ShopClient.tsx
│   ├── api/            # API routes
│   │   ├── checkout/route.ts
│   │   ├── stripe/webhook/route.ts
│   │   ├── products/route.ts
│   │   └── admin/      # Admin API routes
│   │       ├── low-stock-variants/route.ts
│   │       └── inventory-movements/route.ts
│   ├── admin/          # Admin pages
│   │   └── reports/    # Admin reports dashboard
│   │       ├── page.tsx
│   │       └── AdminReportsClient.tsx
│   └── studio/         # Sanity Studio for content management
│       └── [[...tool]]/page.tsx
├── components/          # Reusable React components
│   ├── Header.tsx      # Navigation header with cart
│   ├── Hero.tsx        # Hero section
│   ├── JustLanded.tsx  # New arrivals section
│   ├── Collections.tsx # Collections showcase
│   ├── ProductGrid.tsx # Product grid with cart integration
│   ├── Footer.tsx      # Footer component
│   ├── CartPanel.tsx   # Slide-in cart panel
│   ├── ProductGallery.tsx # Product image gallery
│   ├── VariantSelector.tsx # Product variant selector
│   ├── RelatedProducts.tsx # Related products section
│   ├── QuickAddButton.tsx # Quick add to cart button
│   └── ui/             # Shadcn UI components
│       ├── badge.tsx
│       ├── button.tsx
│       └── card.tsx
├── lib/                 # Utility libraries
│   ├── sanity.ts       # Sanity client configuration
│   ├── cart.ts         # Zustand cart store
│   ├── sanity.image.ts # Sanity image utilities
│   ├── sanity.server.ts # Server-side Sanity functions
│   ├── queries.ts      # GROQ queries
│   └── utils.ts        # Utility functions
├── schemas/             # Sanity content schemas
│   ├── index.ts        # Schema exports
│   ├── product.ts      # Product schema
│   ├── variant.ts      # Product variant schema
│   ├── collection.ts   # Collection schema
│   └── inventory_movement.ts # Inventory tracking schema
├── sanity.config.ts     # Sanity configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── next.config.js      # Next.js configuration
├── middleware.ts        # HTTP Basic Auth middleware for admin routes
├── .env.local.example  # Environment variables template
├── package.json        # Dependencies and scripts
└── README.md           # Project documentation
```

### Key Dependencies
- **Core**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **CMS**: Sanity, @sanity/client, next-sanity, @sanity/vision
- **Payments**: Stripe, @types/stripe
- **State**: Zustand for state management
- **Validation**: Zod for input validation
- **UI**: styled-components for Sanity Studio

## Customization

### Colors
The website uses a custom color palette defined in `tailwind.config.js`:
- `brand-maroon`: #8B2635 (Primary brand color)
- `brand-burgundy`: #6B1B2A (Darker accent)
- `brand-gold`: #D4AF37 (Gold accents)
- `brand-peach`: #F4E4D6 (Light peach)
- `brand-cream`: #F8F4F0 (Cream background)

### Typography
- **Serif**: Playfair Display for headings and brand elements
- **Sans**: Inter for body text and navigation
- **Arabic**: Noto Naskh Arabic for Arabic text support

## Admin Reports

The project includes a protected admin reports route at `/admin/reports` for monitoring inventory and business operations.

### Access Control
- **HTTP Basic Auth**: Protected by `ADMIN_PASS` environment variable
- **No Write Access**: All edits must be done through Sanity Studio
- **Secure**: Middleware-level authentication for all admin routes

### Environment Setup
Add the following to your `.env.local` file:
```bash
ADMIN_PASS=your_secure_password_here
```

### Features
- **Low Stock Monitoring**: Shows variants with stock ≤ 5 items
- **Inventory Movements**: Recent inventory transactions (last 50)
- **Quick Studio Access**: Direct links to edit documents in Sanity Studio
- **Real-time Data**: Live inventory and movement data from Sanity

### Usage
1. Navigate to `/admin/reports` in your browser
2. Enter the password when prompted
3. View low stock alerts and inventory movements
4. Click "Edit" or "View" buttons to open documents in Studio
5. Use quick action buttons for common Studio tasks

## Features in Detail

### Header
- Sticky navigation with brand logo
- Mobile-responsive menu
- Shopping cart with item count
- Search and account icons

### Hero Section
- Full-screen hero with brand messaging
- Arabic text integration
- Call-to-action buttons
- Smooth animations

### Product Sections
- "Just Landed" showcase
- Split-screen collections (New Arrivals/Best Sellers)
- Product grid with pricing and status
- Add to cart functionality

### Shopping Cart
- Slide-out cart panel
- Item management (add/remove)
- Total calculation
- Checkout flow

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized images and assets
- Lazy loading for components
- Smooth animations with hardware acceleration
- Responsive design for all screen sizes

## Testing the Stripe Integration

### Prerequisites
- Stripe CLI installed and configured
- Development server running on localhost:3001
- Products with variants added to Sanity Studio

### Step-by-Step Testing
1. **Start the webhook listener**:
   ```bash
   stripe listen --forward-to localhost:3001/api/stripe/webhook
   ```

2. **Add the webhook secret to your environment**:
   ```bash
   # Copy the whsec_... secret from the CLI output
   echo "STRIPE_WEBHOOK_SECRET=whsec_your_secret_here" >> .env.local
   ```

3. **Test the complete flow**:
   - Add items to cart from your website
   - Proceed to checkout
   - Use Stripe test card: `4242 4242 4242 4242`
   - Complete the payment
   - Check your server logs for webhook processing
   - Verify inventory updates in Sanity Studio

### Test Cards
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`

### Monitoring
- **Webhook Events**: Watch the Stripe CLI output for event delivery
- **Server Logs**: Check your Next.js console for webhook processing
- **Sanity Studio**: Verify inventory movements and stock updates
- **Database**: Check the `inventory_movement` documents for audit trail

### Troubleshooting
- **Webhook not received**: Check Stripe CLI connection and webhook secret
- **Inventory not updated**: Verify write permissions in Sanity
- **Schema errors**: Ensure `inventory_movement` schema is deployed
- **Stock validation**: Check that variants have proper stock values

## Deployment to Vercel

### Prerequisites
- Vercel account connected to your GitHub repository
- All environment variables configured
- Sanity project deployed and configured
- Stripe account with webhook endpoints

### Environment Variables Setup

Set the following environment variables in your Vercel project dashboard:

#### Required Environment Variables
```bash
# Sanity Configuration
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_API_VERSION=2024-07-01
SANITY_READ_TOKEN=your_read_token
SANITY_WRITE_TOKEN=your_write_token

# Stripe Configuration
STRIPE_SECRET_KEY=sk_live_your_live_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Admin Access
ADMIN_PASS=your_secure_admin_password

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

#### How to Set Environment Variables in Vercel
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable with the appropriate environment (Production, Preview, Development)
4. Click "Save" after adding each variable

### Sanity Webhook Configuration

Configure Sanity to trigger revalidation when content changes:

1. **Go to Sanity Project Settings** → API → Webhooks
2. **Create New Webhook**:
   - **Name**: `Vercel Revalidation`
   - **URL**: `https://yourdomain.com/api/revalidate`
   - **Dataset**: `production`
   - **HTTP Method**: `POST`
   - **Filter**: `_type in ["product", "variant", "collection", "inventory_movement"]`

3. **Webhook Events**: Select all relevant events (create, update, delete)

### Stripe Webhook Configuration

Configure Stripe webhooks for payment processing:

1. **Go to Stripe Dashboard** → Developers → Webhooks
2. **Add Endpoint**:
   - **Endpoint URL**: `https://yourdomain.com/api/stripe/webhook`
   - **Events to send**: `checkout.session.completed`

3. **Copy Webhook Secret**:
   - After creating the webhook, click on it
   - Copy the "Signing secret" (starts with `whsec_`)
   - Add this to your Vercel environment variables as `STRIPE_WEBHOOK_SECRET`

### Vercel Configuration

The project includes a `vercel.json` file with:
- **Function Configuration**: Stripe webhook has increased memory (1024MB) and timeout (30s)
- **Build Optimization**: Ignores development files and test files
- **Environment Mapping**: Maps `NEXT_PUBLIC_SITE_URL` to Vercel's `@site_url`

### Deployment Checklist

#### Pre-Deployment
- [ ] All environment variables set in Vercel
- [ ] Sanity project deployed and accessible
- [ ] Stripe webhook endpoint configured
- [ ] Domain configured in Vercel (if using custom domain)

#### Post-Deployment
- [ ] Test homepage loads correctly
- [ ] Test product pages load correctly
- [ ] Test Stripe checkout flow
- [ ] Test admin reports access (`/admin/reports`)
- [ ] Test Sanity Studio access (`/studio`)
- [ ] Verify webhook delivery in Stripe dashboard
- [ ] Test content revalidation by updating a product in Sanity

#### Testing Checklist
- [ ] **Homepage**: Loads without errors
- [ ] **Products**: Product grid displays correctly
- [ ] **Collections**: Collection pages load
- [ ] **Cart**: Add/remove items works
- [ ] **Checkout**: Stripe checkout completes successfully
- [ ] **Webhooks**: Inventory updates after successful payment
- [ ] **Admin**: Admin reports accessible with password
- [ ] **Studio**: Sanity Studio loads and functions

#### Troubleshooting
- **Build Errors**: Check environment variables are set correctly
- **Webhook Failures**: Verify webhook secrets match
- **Content Not Updating**: Check Sanity webhook configuration
- **Payment Issues**: Verify Stripe keys and webhook setup

### Performance Optimization

- **ISR**: Homepage and collection pages revalidate every 60 seconds
- **Image Optimization**: Sanity images are optimized automatically
- **Function Scaling**: Stripe webhook optimized for payment processing
- **Build Optimization**: Development files excluded from production builds

## License

This project is proprietary to Haybah Collections.

---

**Haybah Collections** - Prestige. Dignity. Fashion. 