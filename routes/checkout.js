/**
 * Checkout Route - Payment Processing
 * 
 * This route handles:
 * 1. Receiving the payment method nonce from Braintree Drop-in UI
 * 2. Creating a transaction with Braintree
 * 3. Returning the transaction result to the client
 * 
 * The actual transaction processing happens here on the server side
 * to ensure security and proper handling of sensitive payment data.
 */

const express = require('express');
const router = express.Router();
const gateway = require('../config/braintree');

/**
 * POST /checkout - Process payment
 * 
 * Request body should contain:
 * - paymentMethodNonce: The payment method nonce from Braintree Drop-in UI
 * 
 * This endpoint:
 * 1. Retrieves order details from session
 * 2. Creates a transaction using Braintree's transaction.sale method
 * 3. Stores transaction details in session for confirmation page
 * 4. Returns success/failure response to client
 */
router.post('/', async (req, res) => {
  try {
    console.log('🔄 Checkout route called');
    console.log('Request body:', req.body);

    // Extract the payment method nonce from request
    const { paymentMethodNonce } = req.body;

    // Validate that nonce exists
    if (!paymentMethodNonce) {
      console.log('❌ No payment method nonce provided');
      return res.status(400).json({
        success: false,
        message: 'Payment method nonce is required'
      });
    }

    console.log('✅ Payment method nonce received:', paymentMethodNonce.substring(0, 20) + '...');

    // Retrieve order details from session
    const orderDetails = req.session.orderDetails;

    // Validate that order details exist in session
    if (!orderDetails) {
      return res.status(400).json({
        success: false,
        message: 'Order details not found. Please start your order again.'
      });
    }

    console.log('Processing payment for order:', {
      game: orderDetails.gameName,
      amount: orderDetails.totalAmount,
      userId: orderDetails.userId
    });

    console.log('🏦 Creating Braintree transaction...');

    // Create the transaction with Braintree
    const transactionResult = await gateway.transaction.sale({
      // Amount to charge (must be a string)
      amount: orderDetails.totalAmount,
      
      // Payment method nonce from the client
      paymentMethodNonce: paymentMethodNonce,
      
      // Additional transaction options
      options: {
        // Submit for settlement immediately after authorization
        // If false, you'll need to manually settle the transaction later
        submitForSettlement: true
      },

      // Order ID for reference (including game info for tracking)
      orderId: `ORDER-${orderDetails.gameName.replace(/\s+/g, '')}-${orderDetails.packageId}-${Date.now()}`
    });

    // Check if transaction was successful
    if (transactionResult.success) {
      const transaction = transactionResult.transaction;
      
      console.log('✅ Transaction successful:', {
        id: transaction.id,
        amount: transaction.amount,
        status: transaction.status
      });

      // Store transaction details in session for confirmation page
      req.session.transactionDetails = {
        transactionId: transaction.id,
        status: transaction.status,
        amount: transaction.amount,
        currencyIsoCode: transaction.currencyIsoCode || 'USD',
        createdAt: transaction.createdAt,
        processorResponseText: transaction.processorResponseText,
        orderDetails: orderDetails
      };

      // Return success response to client
      return res.json({
        success: true,
        transactionId: transaction.id,
        message: 'Payment processed successfully'
      });

    } else {
      // Transaction failed
      console.error('❌ Transaction failed:', transactionResult.message);
      
      // Log detailed error information
      if (transactionResult.errors) {
        const errorMessages = transactionResult.errors.deepErrors();
        console.error('Validation errors:', errorMessages);
      }

      // Return failure response to client
      return res.status(400).json({
        success: false,
        message: transactionResult.message || 'Transaction failed',
        errors: transactionResult.errors ? 
          transactionResult.errors.deepErrors().map(error => ({
            code: error.code,
            message: error.message,
            attribute: error.attribute
          })) : []
      });
    }

  } catch (error) {
    // Catch any unexpected errors
    console.error('❌ Error processing checkout:', error);
    
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred while processing your payment',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
