/**
 * Index Route - Main Gaming Top-up Page
 * 
 * This route handles:
 * 1. Displaying the main gaming top-up selection page
 * 2. Generating a client token for Braintree Drop-in UI
 * 3. Processing the selected game and package information
 */

const express = require('express');
const router = express.Router();

 if (process.env.NODE_ENV !== 'production') {
    router.get('/test-gateway', async (req, res) => {
      try {

        const gateway = require('../config/braintree');
        const result = await gateway.clientToken.generate({});
        console.log("Attempt generating test Braintree Client Token");
        res.json({ success: true, tokenPreview: result.clientToken.substring(0, 50) });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });
 }

// Gaming packages configuration
// Add more games and packages as needed
const GAMING_PACKAGES = {
  'mobile-legends': {
    name: 'Mobile Legends',
    icon: '🎮',
    packages: [
      { id: 'ml-100', diamonds: 100, price: 2.99, bonus: 0 },
      { id: 'ml-250', diamonds: 250, price: 6.99, bonus: 5 },
      { id: 'ml-500', diamonds: 500, price: 12.99, bonus: 15 },
      { id: 'ml-1000', diamonds: 1000, price: 24.99, bonus: 50 },
      { id: 'ml-2000', diamonds: 2000, price: 49.99, bonus: 150 }
    ]
  },
  'genshin-impact': {
    name: 'Genshin Impact',
    icon: '⚔️',
    packages: [
      { id: 'gi-60', crystals: 60, price: 0.99, bonus: 0 },
      { id: 'gi-300', crystals: 300, price: 4.99, bonus: 30 },
      { id: 'gi-980', crystals: 980, price: 14.99, bonus: 110 },
      { id: 'gi-1980', crystals: 1980, price: 29.99, bonus: 260 },
      { id: 'gi-3280', crystals: 3280, price: 49.99, bonus: 600 }
    ]
  },
  'pubg-mobile': {
    name: 'PUBG Mobile',
    icon: '🔫',
    packages: [
      { id: 'pubg-60', uc: 60, price: 0.99, bonus: 0 },
      { id: 'pubg-325', uc: 325, price: 4.99, bonus: 25 },
      { id: 'pubg-660', uc: 660, price: 9.99, bonus: 60 },
      { id: 'pubg-1800', uc: 1800, price: 24.99, bonus: 300 },
      { id: 'pubg-3850', uc: 3850, price: 49.99, bonus: 850 }
    ]
  },
  'valorant': {
    name: 'Valorant',
    icon: '🎯',
    packages: [
      { id: 'val-475', vp: 475, price: 4.99, bonus: 0 },
      { id: 'val-1000', vp: 1000, price: 9.99, bonus: 50 },
      { id: 'val-2050', vp: 2050, price: 19.99, bonus: 150 },
      { id: 'val-3650', vp: 3650, price: 34.99, bonus: 350 },
      { id: 'val-5350', vp: 5350, price: 49.99, bonus: 600 }
    ]
  }
};

/**
 * GET / - Main page route
 * Renders the gaming top-up selection page with available games and packages
 */
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Gaming Top-up Store',
    games: GAMING_PACKAGES,
    message: req.query.message || null
  });
});

/**
 * POST /select-package - Handle package selection
 * 
 * This route:
 * 1. Validates the selected game and package
 * 2. Generates a Braintree client token
 * 3. Stores the order details in the session
 * 4. Renders the payment page with Drop-in UI
 */
router.post('/select-package', async (req, res) => {
  try {
    const { gameId, packageId, userId } = req.body;

    // Validate input
    if (!gameId || !packageId || !userId) {
      return res.status(400).render('index', {
        title: 'Gaming Top-up Store',
        games: GAMING_PACKAGES,
        error: 'Please fill in all required fields'
      });
    }

    // Validate game exists
    const selectedGame = GAMING_PACKAGES[gameId];
    if (!selectedGame) {
      return res.status(404).render('index', {
        title: 'Gaming Top-up Store',
        games: GAMING_PACKAGES,
        error: 'Selected game not found'
      });
    }

    // Find the selected package
    const selectedPackage = selectedGame.packages.find(pkg => pkg.id === packageId);
    if (!selectedPackage) {
      return res.status(404).render('index', {
        title: 'Gaming Top-up Store',
        games: GAMING_PACKAGES,
        error: 'Selected package not found'
      });
    }

    // Generate Braintree client token
    
    const gateway = require('../config/braintree'); // (OK repeated - it's cached by Node)
    const tokenResult = await gateway.clientToken.generate({});
    const clientToken = tokenResult.clientToken;   // This is where a fresh new token is made

    // Store order details in session for checkout
    req.session.orderDetails = {
      gameId: gameId,
      gameName: selectedGame.name,
      gameIcon: selectedGame.icon,
      packageId: packageId,
      package: selectedPackage,
      userId: userId,
      totalAmount: selectedPackage.price.toFixed(2),
      timestamp: new Date().toISOString()
    };

    console.log('Passing clientToken:', clientToken, typeof clientToken);

    // Render payment page with Drop-in UI
    res.render('index', {
      title: `Checkout - ${selectedGame.name}`,
      games: GAMING_PACKAGES,
      showPayment: true,
      clientToken,
      orderDetails: req.session.orderDetails,
      error: null
    });

  } catch (error) {
    console.error('Error in select-package route:', error);
    res.status(500).render('index', {
      title: 'Gaming Top-up Store',
      games: GAMING_PACKAGES,
      error: 'An error occurred while processing your request. Please try again.'
    });
  }
});

module.exports = router;
