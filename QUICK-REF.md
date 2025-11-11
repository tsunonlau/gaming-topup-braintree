# Quick Reference Card - Gaming Top-up Website

## 🚀 Quick Start Commands

```bash
# Initial Setup
cd ~/Desktop
mkdir gaming-topup-braintree && cd gaming-topup-braintree
npm install

# Configure Environment
cp .env.example .env
# Edit .env with your Braintree credentials

# Run Locally
npm start                    # Production mode
npm run dev                  # Development mode with auto-reload

# Visit
http://localhost:3000
```

## 📝 Git Commands (Mac Terminal)

```bash
# Initialize Repository
git init
git add .
git commit -m "Initial commit"

# Connect to GitHub
git remote add origin https://github.com/YOUR_USERNAME/gaming-topup-braintree.git
git branch -M main
git push -u origin main

# Daily Updates
git add .
git commit -m "Your message"
git push origin main
```

## ☁️ Render.com Deployment

### Environment Variables to Add:
```
NODE_ENV=production
BRAINTREE_ENVIRONMENT=sandbox
BRAINTREE_MERCHANT_ID=your_id
BRAINTREE_PUBLIC_KEY=your_key
BRAINTREE_PRIVATE_KEY=your_key
SESSION_SECRET=random_32_char_string
```

### Build Settings:
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Branch**: `main`

## 🧪 Test Card Details

**Successful Transaction:**
- Card: `4111 1111 1111 1111`
- CVV: `123`
- Expiry: Any future date
- Name: Any name

**Declined Transaction:**
- Card: `4000 0000 0000 0002`

## 📂 Project Structure Quick View

```
gaming-topup-braintree/
├── app.js              # Main server
├── package.json        # Dependencies
├── .env               # Secret credentials (don't commit!)
├── config/
│   └── braintree.js   # Braintree gateway setup
├── routes/
│   ├── index.js       # Home & game selection
│   ├── checkout.js    # Payment processing
│   └── confirmation.js # Success page
├── views/
│   ├── layout.hbs     # Master template
│   ├── index.hbs      # Main page
│   └── confirmation.hbs # Success page
└── public/
    └── stylesheets/
        └── style.css  # All styles
```

## 🎮 Adding New Games

Edit `routes/index.js`, add to `GAMING_PACKAGES`:

```javascript
'your-game': {
  name: 'Game Name',
  icon: '🎮',
  packages: [
    { id: 'game-100', coins: 100, price: 4.99, bonus: 10 }
  ]
}
```

## 🎨 Customizing Colors

Edit `public/stylesheets/style.css`:

```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  --success-color: #10b981;
}
```

## 🔧 Common Fixes

**Port in use:**
```bash
lsof -ti:3000 | xargs kill
```

**Missing modules:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Can't find .env:**
- Ensure .env is in root directory
- Check file isn't named .env.txt
- Restart server after changes

## 🔍 Debugging

**Check Server Logs:**
- Look at Terminal output
- Check for error messages

**Check Browser:**
- Press F12 → Console tab
- Look for JavaScript errors

**Check Braintree:**
- Login to sandbox dashboard
- View transaction history
- Check API logs

## 📊 Application Flow

1. **Home Page** (`/`) - Game selection
2. **Package Selection** - User chooses package & enters ID
3. **Payment Form** - Braintree Drop-in UI loads
4. **Submit Payment** - Loading spinner shows
5. **Server Processing** - Creates transaction
6. **Confirmation** (`/confirmation`) - Shows success

## 🔐 Security Checklist

- [ ] .env file in .gitignore
- [ ] Strong SESSION_SECRET (32+ chars)
- [ ] Using environment variables
- [ ] HTTPS enabled (Render does this)
- [ ] Input validation on server
- [ ] Error handling implemented

## 📞 Important URLs

**Development:**
- Local: `http://localhost:3000`

**Braintree:**
- Sandbox: `https://sandbox.braintreegateway.com/`
- Docs: `https://developer.paypal.com/braintree/docs`

**Deployment:**
- Render: `https://dashboard.render.com`
- GitHub: `https://github.com`

## ⚡ Pro Tips

1. **Use nodemon for development:**
   ```bash
   npm run dev
   ```

2. **Generate secure session secret:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

3. **View real-time Render logs:**
   Dashboard → Your Service → Logs tab

4. **Test locally before pushing:**
   Always test payment flow completely

5. **Commit frequently:**
   Small, descriptive commits are better

## 🎯 File Mapping

**When editing these files affects:**

- `app.js` → Server behavior, middleware, routes
- `routes/index.js` → Game packages, home page logic
- `routes/checkout.js` → Payment processing
- `routes/confirmation.js` → Success page logic
- `views/*.hbs` → HTML structure and content
- `style.css` → Visual appearance
- `config/braintree.js` → Braintree connection

## 📱 Testing Workflow

1. Start server: `npm start`
2. Visit: `http://localhost:3000`
3. Select game: Mobile Legends
4. Enter User ID: `12345678`
5. Select package: Any package
6. Click "Continue to Payment"
7. Enter test card: `4111 1111 1111 1111`
8. Complete payment
9. Verify confirmation page

## 🚨 Emergency Commands

**Stop server:**
```bash
Ctrl + C
```

**Force kill server:**
```bash
pkill -f node
```

**Reset Git (careful!):**
```bash
rm -rf .git
git init
```

**Clean install:**
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📈 Going Live Checklist

- [ ] Test thoroughly in sandbox
- [ ] Get production Braintree credentials
- [ ] Update BRAINTREE_ENVIRONMENT=production
- [ ] Use production API keys
- [ ] Test with real small amount
- [ ] Set up monitoring
- [ ] Configure custom domain (optional)
- [ ] Review legal requirements

---

**Need Help?**
- README.md - Detailed documentation
- SETUP-GUIDE.md - Step-by-step setup
- DEPLOYMENT.md - Deploy to Render & GitHub
- Braintree Docs - Payment integration help

**Quick Support:**
- Braintree: support@braintreepayments.com
- Render: support@render.com
