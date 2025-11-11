/**
 * Gaming Top-up Website - Main Application Entry Point
 * 
 * This is the main server file that initializes the Express application,
 * sets up middleware, routes, and starts the server.
 * 
 * Key Features:
 * - Express web framework
 * - Handlebars templating engine
 * - Session management for storing transaction data
 * - Environment variable configuration
 * - Braintree payment integration
 */

// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const hbs = require('hbs');

// Initialize Express app
const app = express();

// Import route handlers
const indexRouter = require('./routes/index');
const checkoutRouter = require('./routes/checkout');
const confirmationRouter = require('./routes/confirmation');

// ===========================
// VIEW ENGINE SETUP
// ===========================
// Set up Handlebars as the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Register Handlebars partials directory (if needed for reusable components)
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// ===========================
// MIDDLEWARE CONFIGURATION
// ===========================

// Parse JSON and URL-encoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration - stores transaction data between requests
app.use(session({
  secret: process.env.SESSION_SECRET || 'gaming-topup-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    maxAge: 1000 * 60 * 60 // 1 hour session timeout
  }
}));

// ===========================
// ROUTES
// ===========================

// Main page - displays gaming top-up options
app.use('/', indexRouter);

// Checkout route - processes payment with Braintree
app.use('/checkout', checkoutRouter);

// Confirmation page - displays transaction success details
app.use('/confirmation', confirmationRouter);

// ===========================
// ERROR HANDLING
// ===========================

// 404 handler - catch any undefined routes
app.use((req, res, next) => {
  res.status(404).render('error', {
    title: 'Page Not Found',
    message: 'The page you are looking for does not exist.',
    error: { status: 404 }
  });
});

// General error handler
app.use((err, req, res, next) => {
  // Set locals, only providing error details in development
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error', {
    title: 'Error',
    message: err.message,
    error: err
  });
});

// ===========================
// SERVER STARTUP
// ===========================

// Set the port from environment variable or default to 3000
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║     🎮 Gaming Top-up Server Running                  ║
║                                                       ║
║     Environment: ${process.env.NODE_ENV || 'development'}                         ║
║     Port: ${PORT}                                    ║
║     URL: http://localhost:${PORT}                    ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
  `);
});

// Export the app for testing purposes
module.exports = app;
