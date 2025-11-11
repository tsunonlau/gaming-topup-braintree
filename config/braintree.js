/**
 * Braintree Configuration Module
 * 
 * This module initializes and exports the Braintree Gateway instance
 * that will be used throughout the application for payment processing.
 * 
 * Environment Variables Required:
 * - BRAINTREE_MERCHANT_ID: Your Braintree merchant ID
 * - BRAINTREE_PUBLIC_KEY: Your Braintree public key
 * - BRAINTREE_PRIVATE_KEY: Your Braintree private key
 * - BRAINTREE_ENVIRONMENT: 'sandbox' or 'production'
 */

const braintree = require('braintree');

// Validate that all required environment variables are present
const requiredEnvVars = [
  'BRAINTREE_MERCHANT_ID',
  'BRAINTREE_PUBLIC_KEY',
  'BRAINTREE_PRIVATE_KEY'
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Missing required Braintree environment variables:');
  missingVars.forEach(varName => console.error(`   - ${varName}`));
  console.error('\nPlease check your .env file and ensure all variables are set.');
  process.exit(1);
}

// Determine the Braintree environment (sandbox or production)
const environment = process.env.BRAINTREE_ENVIRONMENT === 'production' 
  ? braintree.Environment.Production 
  : braintree.Environment.Sandbox;

// Initialize the Braintree Gateway
const gateway = new braintree.BraintreeGateway({
  environment: environment,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY
});

console.log(`✅ Braintree Gateway initialized in ${process.env.BRAINTREE_ENVIRONMENT || 'sandbox'} mode`);

// Export the configured gateway instance
module.exports = gateway;
