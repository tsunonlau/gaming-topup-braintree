/**
 * Confirmation Route - Transaction Confirmation Page
 * 
 * This route handles displaying the transaction confirmation
 * after a successful payment, showing all order and transaction details.
 */

const express = require('express');
const router = express.Router();

/**
 * GET /confirmation - Display transaction confirmation
 * 
 * Retrieves transaction details from session and displays them
 * in a user-friendly confirmation page
 */
router.get('/', (req, res) => {
  // Get transaction details from session
  const transactionDetails = req.session.transactionDetails;

  // If no transaction details found, redirect to home
  if (!transactionDetails) {
    return res.redirect('/?message=No transaction found');
  }

  // Render confirmation page with transaction details
  res.render('confirmation', {
    title: 'Payment Confirmation',
    transaction: transactionDetails
  });

  // Clear transaction details from session after displaying
  // (Optional: Comment out if you want to keep them for reference)
  // delete req.session.transactionDetails;
});

module.exports = router;
