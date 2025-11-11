# Gaming Top-up Website with Braintree Integration

A complete gaming top-up e-commerce platform built with Node.js, Express, and Braintree Drop-in UI for secure payment processing.

## 🎮 Features

- **Multiple Gaming Platforms**: Support for Mobile Legends, Genshin Impact, PUBG Mobile, and Valorant
- **Secure Payments**: Powered by Braintree's Drop-in UI with PCI DSS compliance
- **Instant Processing**: Real-time payment processing with immediate confirmation
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Loading Spinner**: Visual feedback during payment processing
- **Transaction Confirmation**: Detailed confirmation page with transaction ID and order details
- **Session Management**: Secure session handling for order data
- **Error Handling**: Comprehensive error handling and user-friendly error messages

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher)
- **Git** (for version control)
- **Braintree Sandbox Account** (sign up at https://sandbox.braintreegateway.com/)

## 🚀 Quick Start

### 1. Clone or Download the Project

If you have the project as a ZIP file, extract it. If using Git:

```bash
cd ~/Desktop
mkdir gaming-topup-braintree
cd gaming-topup-braintree
# Copy all project files here
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file and add your Braintree credentials:

```env
BRAINTREE_ENVIRONMENT=sandbox
BRAINTREE_MERCHANT_ID=your_merchant_id
BRAINTREE_PUBLIC_KEY=your_public_key
BRAINTREE_PRIVATE_KEY=your_private_key
NODE_ENV=development
PORT=3000
SESSION_SECRET=your-random-secret-key
```

#### Getting Braintree Credentials:

1. Log in to your [Braintree Sandbox](https://sandbox.braintreegateway.com/)
2. Click the gear icon → **API**
3. Find your:
   - Merchant ID (under Account section)
   - Public Key
   - Private Key
   - Tokenization Keys (generate if needed)

### 4. Run the Application Locally

```bash
npm start
```

For development with auto-restart:

```bash
npm run dev
```

Visit: `http://localhost:3000`

## 🗂️ Project Structure

```
gaming-topup-braintree/
├── app.js                 # Main application entry point
├── package.json          # Project dependencies and scripts
├── .env                  # Environment variables (not in git)
├── .env.example          # Environment variables template
├── .gitignore           # Git ignore rules
├── config/
│   └── braintree.js     # Braintree gateway configuration
├── routes/
│   ├── index.js         # Main page routes
│   ├── checkout.js      # Payment processing route
│   └── confirmation.js  # Confirmation page route
├── views/
│   ├── layout.hbs       # Main layout template
│   ├── index.hbs        # Home/payment page
│   └── confirmation.hbs # Success confirmation page
└── public/
    └── stylesheets/
        └── style.css    # Application styles
```

## 🔧 Configuration

### Adding New Games

Edit `routes/index.js` and add to the `GAMING_PACKAGES` object:

```javascript
'your-game': {
  name: 'Your Game Name',
  icon: '🎯',
  packages: [
    { id: 'game-100', credits: 100, price: 4.99, bonus: 10 },
    // Add more packages
  ]
}
```

### Customizing Styles

Edit `public/stylesheets/style.css` to customize:
- Colors (CSS variables at the top)
- Layouts
- Animations
- Responsive breakpoints

## 🧪 Testing

### Test Cards for Braintree Sandbox:

**Successful Transaction:**
- Card Number: `4111 1111 1111 1111`
- CVV: `123`
- Expiration: Any future date

**Other Test Cards:**
- Declined: `4000 0000 0000 0002`
- Processor Declined: `4000 0000 0000 0259`

More test cards: [Braintree Testing](https://developer.paypal.com/braintree/docs/reference/general/testing)

## 📝 API Routes

### GET `/`
- Displays the main gaming top-up page
- Shows all available games and packages

### POST `/select-package`
- Processes package selection
- Generates Braintree client token
- Displays payment form with Drop-in UI

**Request Body:**
```json
{
  "gameId": "mobile-legends",
  "packageId": "ml-500",
  "userId": "12345678"
}
```

### POST `/checkout`
- Processes payment with Braintree
- Creates transaction
- Returns success/failure response

**Request Body:**
```json
{
  "paymentMethodNonce": "tokencc_xxx_xxx"
}
```

**Response:**
```json
{
  "success": true,
  "transactionId": "abc123xyz",
  "message": "Payment processed successfully"
}
```

### GET `/confirmation`
- Displays transaction confirmation
- Shows order details and transaction ID

## 🔒 Security Best Practices

1. **Never commit `.env` file** - Contains sensitive credentials
2. **Use HTTPS in production** - Enable secure cookies
3. **Validate all inputs** - Server-side validation implemented
4. **Use strong session secrets** - Change default SESSION_SECRET
5. **Regular dependency updates** - Keep packages up to date

## 🐛 Troubleshooting

### "Missing required Braintree environment variables"
- Check your `.env` file exists
- Verify all Braintree credentials are correct
- Ensure no extra spaces in variable values

### Payment form not loading
- Check browser console for JavaScript errors
- Verify client token is being generated
- Ensure Braintree SDK is loaded (check network tab)

### Transaction failing
- Verify Braintree credentials are correct
- Check sandbox vs production environment setting
- Review Braintree transaction logs in Control Panel

### Port already in use
```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill
# Or use a different port
PORT=3001 npm start
```

## 📚 Additional Resources

- [Braintree Documentation](https://developer.paypal.com/braintree/docs)
- [Drop-in UI Reference](https://developer.paypal.com/braintree/docs/guides/drop-in)
- [Express.js Documentation](https://expressjs.com/)
- [Handlebars Documentation](https://handlebarsjs.com/)

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 🤝 Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review Braintree documentation
3. Check browser console for error messages
4. Contact Braintree support for payment-specific issues

## 🎯 Next Steps

After setting up locally:
1. Review the deployment guide in `DEPLOYMENT.md`
2. Test all payment flows with sandbox
3. Customize branding and styling
4. Add email notifications (optional)
5. Set up production environment
6. Go live with production credentials
