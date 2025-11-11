# Complete Setup Guide - Gaming Top-up Website

## 📁 Project File Structure Setup

Create the following directory structure on your Mac:

```
gaming-topup-braintree/
├── app.js
├── package.json
├── .env
├── .env.example
├── .gitignore
├── README.md
├── DEPLOYMENT.md
├── config/
│   └── braintree.js
├── routes/
│   ├── index.js
│   ├── checkout.js
│   └── confirmation.js
├── views/
│   ├── layout.hbs
│   ├── index.hbs
│   └── confirmation.hbs
└── public/
    └── stylesheets/
        └── style.css
```

## 🛠️ Step-by-Step Setup Instructions

### Step 1: Create Project Directory

Open Terminal and run:

```bash
cd ~/Desktop
mkdir gaming-topup-braintree
cd gaming-topup-braintree
```

### Step 2: Create Directory Structure

```bash
# Create directories
mkdir -p config routes views public/stylesheets

# Create empty files
touch app.js package.json .env.example .gitignore README.md DEPLOYMENT.md
touch config/braintree.js
touch routes/index.js routes/checkout.js routes/confirmation.js
touch views/layout.hbs views/index.hbs views/confirmation.hbs
touch public/stylesheets/style.css
```

### Step 3: Copy File Contents

Copy the contents from each provided file into the corresponding file in your project:

1. **package.json** → Copy from provided package.json file
2. **app.js** → Copy from provided app.js file
3. **config/braintree.js** → Copy from provided braintree-config.js file
4. **routes/index.js** → Copy from provided routes-index.js file
5. **routes/checkout.js** → Copy from provided routes-checkout.js file
6. **routes/confirmation.js** → Copy from provided routes-confirm.js file
7. **views/layout.hbs** → Copy from provided layout.hbs file
8. **views/index.hbs** → Copy from provided index.hbs file
9. **views/confirmation.hbs** → Copy from provided confirmation.hbs file
10. **public/stylesheets/style.css** → Copy from provided style.css file
11. **.env.example** → Copy from provided env-example.txt file
12. **.gitignore** → Copy from provided gitignore.txt file
13. **README.md** → Copy from provided README.md file
14. **DEPLOYMENT.md** → Copy from provided DEPLOYMENT.md file

### Step 4: Install Dependencies

```bash
npm install
```

This will install:
- express (web framework)
- hbs (Handlebars templating)
- braintree (payment processing)
- dotenv (environment variables)
- body-parser (request parsing)
- express-session (session management)

### Step 5: Configure Environment Variables

```bash
# Copy the example env file
cp .env.example .env

# Open .env file in your default text editor
nano .env
# or
open -e .env
```

Fill in your Braintree credentials:

```env
BRAINTREE_ENVIRONMENT=sandbox
BRAINTREE_MERCHANT_ID=your_actual_merchant_id
BRAINTREE_PUBLIC_KEY=your_actual_public_key
BRAINTREE_PRIVATE_KEY=your_actual_private_key
NODE_ENV=development
PORT=3000
SESSION_SECRET=your_random_secret_key_here
```

**Getting Braintree Credentials:**

1. Go to https://sandbox.braintreegateway.com/
2. Log in or sign up
3. Click gear icon (⚙️) → **API**
4. Copy your:
   - Merchant ID (from Account section)
   - Public Key
   - Private Key

### Step 6: Test Locally

```bash
npm start
```

You should see:

```
✅ Braintree Gateway initialized in sandbox mode
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║     🎮 Gaming Top-up Server Running                  ║
║                                                       ║
║     Environment: development                         ║
║     Port: 3000                                       ║
║     URL: http://localhost:3000                       ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
```

### Step 7: Test the Application

1. Open browser: `http://localhost:3000`
2. Select a game and package
3. Enter a test User ID: `12345678`
4. Click "Continue to Payment"
5. Enter test card details:
   - Card: `4111 1111 1111 1111`
   - Expiry: `12/25`
   - CVV: `123`
   - Name: `Test User`
6. Click "Complete Payment"
7. Verify you see the loading spinner
8. Check confirmation page displays correctly

---

## 🎨 Customization Guide

### Adding New Games

Edit `routes/index.js` in the `GAMING_PACKAGES` object:

```javascript
'new-game': {
  name: 'New Game Name',
  icon: '🎮', // Change emoji
  packages: [
    { 
      id: 'newgame-100', 
      coins: 100,      // Change currency name
      price: 4.99, 
      bonus: 10 
    },
    // Add more packages
  ]
}
```

### Changing Colors/Styles

Edit `public/stylesheets/style.css`:

```css
:root {
  --primary-color: #6366f1;     /* Main brand color */
  --secondary-color: #8b5cf6;   /* Secondary accent */
  --success-color: #10b981;     /* Success states */
  /* Change these values to match your brand */
}
```

### Modifying Layout

Edit `views/layout.hbs` to change:
- Header/navigation
- Footer content
- Global scripts

Edit `views/index.hbs` to change:
- Game selection UI
- Package display
- Features section

Edit `views/confirmation.hbs` to change:
- Confirmation message
- Transaction details display

---

## 🔍 File-by-File Explanation

### Core Files

**app.js** - Main server file
- Initializes Express application
- Sets up middleware (body-parser, sessions)
- Configures view engine (Handlebars)
- Defines routes
- Starts HTTP server

**package.json** - Project metadata
- Dependencies list
- Scripts (start, dev)
- Node.js version requirements

**config/braintree.js** - Braintree setup
- Initializes Braintree Gateway
- Validates environment variables
- Exports gateway for use in routes

### Route Files

**routes/index.js** - Main page logic
- Displays game selection
- Handles package selection
- Generates client tokens
- Manages order sessions

**routes/checkout.js** - Payment processing
- Receives payment nonce
- Creates Braintree transaction
- Handles success/failure
- Stores transaction in session

**routes/confirmation.js** - Success page
- Retrieves transaction details
- Displays confirmation

### View Files (Handlebars Templates)

**views/layout.hbs** - Master template
- HTML structure
- Navigation header
- Footer
- Includes Braintree SDK
- Loading spinner overlay

**views/index.hbs** - Main content
- Game cards
- Package selection forms
- Payment form with Drop-in UI
- Features section

**views/confirmation.hbs** - Success page
- Transaction details
- Order summary
- Action buttons

### Style Files

**public/stylesheets/style.css** - All styles
- CSS variables for theming
- Responsive design
- Component styles
- Animations

---

## 🚨 Common Issues & Solutions

### Issue: "Cannot find module 'express'"

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Port 3000 already in use

**Solution:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill

# Or use different port
PORT=3001 npm start
```

### Issue: Braintree credentials error

**Solution:**
- Verify .env file exists in root directory
- Check for typos in variable names
- Ensure no extra spaces around = signs
- Restart server after changing .env

### Issue: Payment form not showing

**Solution:**
- Check browser console for errors (F12 → Console)
- Verify Braintree SDK loaded (Network tab)
- Check client token is being generated
- Verify BRAINTREE_ENVIRONMENT matches credentials

### Issue: CSS not loading

**Solution:**
- Ensure `public` folder exists
- Check `app.use(express.static('public'))` in app.js
- Clear browser cache (Cmd+Shift+R)
- Verify file path: `public/stylesheets/style.css`

---

## 📝 Development Workflow

### Daily Development

1. **Start development server:**
   ```bash
   npm run dev
   ```

2. **Make changes** to files
   - Server auto-restarts with nodemon

3. **Test changes** in browser
   - Visit http://localhost:3000

4. **Commit changes:**
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

### Before Deployment

1. **Test thoroughly**
   - Test all games
   - Test successful payment
   - Test failed payment
   - Test validation errors

2. **Check for errors**
   ```bash
   npm start
   # Look for any warnings or errors
   ```

3. **Update documentation**
   - Update README if needed
   - Document new features

---

## 🎯 Testing Checklist

Use this checklist to verify everything works:

- [ ] Server starts without errors
- [ ] Homepage loads correctly
- [ ] All game cards display
- [ ] Package selection works
- [ ] User ID validation works
- [ ] Payment form displays
- [ ] Test card (4111...) processes successfully
- [ ] Loading spinner appears during payment
- [ ] Confirmation page displays
- [ ] Transaction ID shows correctly
- [ ] All order details are accurate
- [ ] "Back to Home" button works
- [ ] Responsive design on mobile (resize browser)
- [ ] Browser console has no errors

---

## 🔐 Security Notes

### Development (.env file)
- Contains sensitive credentials
- NEVER commit to Git
- Keep backup in secure location

### Production Considerations
- Use strong SESSION_SECRET (32+ characters)
- Enable HTTPS (Render provides automatically)
- Use production Braintree credentials when ready
- Implement rate limiting for API routes
- Add CSRF protection for forms
- Validate all user inputs server-side

---

## 📞 Getting Help

### If you encounter issues:

1. **Check server logs** in Terminal
2. **Check browser console** (F12 → Console tab)
3. **Review this guide** thoroughly
4. **Check Braintree dashboard** for transaction logs
5. **Review Braintree documentation**

### Useful Resources

- **Braintree Docs**: https://developer.paypal.com/braintree/docs
- **Express Docs**: https://expressjs.com/
- **Handlebars Docs**: https://handlebarsjs.com/
- **Node.js Docs**: https://nodejs.org/docs/

---

## ✅ Setup Complete!

You now have a fully functional Gaming Top-up website with:
- ✅ Secure Braintree payment integration
- ✅ Multiple gaming platforms
- ✅ Responsive design
- ✅ Loading states
- ✅ Transaction confirmation
- ✅ Error handling
- ✅ Ready for deployment

Next steps:
1. Review the code and understand how it works
2. Customize branding and styling
3. Test thoroughly with sandbox
4. Follow DEPLOYMENT.md to go live
5. Add more games and features as needed

Happy coding! 🚀🎮
