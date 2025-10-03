#!/usr/bin/env node

/**
 * Deployment script for Haybah Collections
 * Deploys to Vercel with custom domain haybahcollections.co.uk
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting deployment for Haybah Collections...\n');

// Check if environment file exists
const envPath = path.join(__dirname, '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('❌ .env.local file not found!');
  console.log('Please create .env.local with your environment variables.\n');
  process.exit(1);
}

// Check for required environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_SANITY_PROJECT_ID',
  'NEXT_PUBLIC_SANITY_DATASET',
  'STRIPE_SECRET_KEY',
  'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'SANITY_TOKEN'
];

console.log('✅ Checking environment variables...');
const envContent = fs.readFileSync(envPath, 'utf8');
const missingVars = requiredEnvVars.filter(varName => !envContent.includes(varName));

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:');
  missingVars.forEach(varName => console.log(`   - ${varName}`));
  console.log('\n');
  process.exit(1);
}

try {
  // Build the application
  console.log('🔨 Building the application...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Deploy to Vercel
  console.log('\n🚀 Deploying to Vercel...');
  execSync('vercel --prod', { stdio: 'inherit' });
  
  console.log('\n✅ Deployment completed successfully!');
  console.log('🌍 Your website will be available at: https://haybahcollections.co.uk');
  console.log('\n📋 Next steps:');
  console.log('1. Configure your domain DNS to point to Vercel');
  console.log('2. Add haybahcollections.co.uk as a custom domain in Vercel dashboard');
  console.log('3. Test all features including /admin and API routes');
  console.log('\n🎉 Happy selling!');

} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  console.log('\n🔧 Troubleshooting:');
  console.log('1. Make sure you\'re logged into Vercel: vercel login');
  console.log('2. Check your environment variables');
  console.log('3. Ensure all dependencies are installed: npm install');
  process.exit(1);
}
