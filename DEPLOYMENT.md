# Deployment Guide - Render.com & GitHub

This guide covers deploying your Gaming Top-up website to Render.com and managing your code with GitHub.

## 📦 Part 1: GitHub Setup (Mac)

### Prerequisites
- Git installed on your Mac (comes pre-installed)
- GitHub account (sign up at https://github.com)

### Step 1: Initialize Local Git Repository

Open Terminal and navigate to your project directory:

```bash
cd ~/Desktop/gaming-topup-braintree
```

Initialize Git repository:

```bash
# Initialize git repository
git init

# Create .gitignore file
echo "node_modules/
.env
.DS_Store
npm-debug.log*
logs/
*.log" > .gitignore

# Add all files to staging
git add .

# Create initial commit
git commit -m "Initial commit: Gaming top-up website with Braintree integration"
```

### Step 2: Create GitHub Repository

1. Go to https://github.com and log in
2. Click the **+** icon in the top right corner
3. Select **New repository**
4. Fill in repository details:
   - **Repository name**: `gaming-topup-braintree`
   - **Description**: "Gaming top-up website with Braintree payment integration"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **Create repository**

### Step 3: Connect Local Repository to GitHub

Copy the commands from GitHub's "push an existing repository" section, or use these:

```bash
# Add GitHub as remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/gaming-topup-braintree.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

If prompted for credentials:
- Username: Your GitHub username
- Password: Use a Personal Access Token (not your password)
  - Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
  - Generate new token with `repo` scope
  - Copy and paste the token when prompted

### Step 4: Future Updates to GitHub

After making changes to your code:

```bash
# Check what files have changed
git status

# Add changed files
git add .

# Or add specific files
git add app.js routes/checkout.js

# Commit changes with a descriptive message
git commit -m "Add new game packages and improve error handling"

# Push to GitHub
git push origin main
```

### Common Git Commands

```bash
# View commit history
git log --oneline

# View current status
git status

# View changes in files
git diff

# Create a new branch
git checkout -b feature/new-feature

# Switch branches
git checkout main

# Merge branch into main
git merge feature/new-feature

# Pull latest changes from GitHub
git pull origin main
```

---

## 🚀 Part 2: Deploy to Render.com

### Prerequisites
- Render.com account (sign up at https://render.com)
- Your code pushed to GitHub
- Braintree account credentials ready

### Step 1: Create New Web Service on Render

1. Log in to https://dashboard.render.com
2. Click **New +** button
3. Select **Web Service**
4. Connect your GitHub account if not already connected
5. Select your `gaming-topup-braintree` repository
6. Click **Connect**

### Step 2: Configure Web Service Settings

Fill in the following settings:

**Basic Settings:**
- **Name**: `gaming-topup-store` (or your preferred name)
- **Region**: Choose closest to your users (e.g., Oregon, Singapore)
- **Branch**: `main`
- **Root Directory**: Leave blank (unless your app is in a subdirectory)
- **Runtime**: `Node`

**Build & Deploy:**
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Instance Type:**
- Select **Free** (for testing) or **Starter** ($7/month for production)

### Step 3: Add Environment Variables

Scroll down to **Environment Variables** section and add these:

Click **Add Environment Variable** for each:

```
Key: NODE_ENV
Value: production

Key: BRAINTREE_ENVIRONMENT
Value: sandbox (or 'production' when going live)

Key: BRAINTREE_MERCHANT_ID
Value: [Your Braintree Merchant ID]

Key: BRAINTREE_PUBLIC_KEY
Value: [Your Braintree Public Key]

Key: BRAINTREE_PRIVATE_KEY
Value: [Your Braintree Private Key]

Key: SESSION_SECRET
Value: [Generate a random string - at least 32 characters]
```

**To generate a secure session secret:**

```bash
# Run in Terminal
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 4: Deploy

1. Click **Create Web Service** at the bottom
2. Render will automatically:
   - Clone your repository
   - Install dependencies
   - Build your application
   - Start the server
3. Wait for deployment to complete (usually 2-5 minutes)
4. You'll see the deployment log in real-time

### Step 5: Access Your Deployed Application

Once deployed:
- Your app URL will be: `https://gaming-topup-store.onrender.com` (or your chosen name)
- Click the URL at the top of the dashboard to open your site
- Test a complete transaction flow

---

## 🔧 Render.com Configuration Details

### Auto-Deploy from GitHub

Render automatically deploys when you push to GitHub:

1. Make changes locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update game packages"
   git push origin main
   ```
3. Render automatically detects the push and redeploys

### Disable Auto-Deploy (Optional)

If you want manual control:
1. Go to your service settings on Render
2. Scroll to **Build & Deploy**
3. Toggle off **Auto-Deploy**
4. Click **Manual Deploy** → **Deploy latest commit** when ready

### View Logs

To debug issues:
1. Go to your service on Render dashboard
2. Click **Logs** tab
3. View real-time application logs

### Environment Variables Management

To update environment variables:
1. Go to **Environment** tab
2. Update or add variables
3. Click **Save Changes**
4. Render will automatically redeploy

---

## 🔄 Complete Workflow: Development to Production

### 1. Local Development
```bash
# Make changes to your code
# Test locally
npm start

# Visit http://localhost:3000
```

### 2. Commit to Git
```bash
git add .
git commit -m "Descriptive commit message"
```

### 3. Push to GitHub
```bash
git push origin main
```

### 4. Auto-Deploy to Render
- Render automatically detects the push
- Builds and deploys your application
- Your changes are live at your Render URL

---

## 🐛 Troubleshooting Render Deployment

### Build Fails

**Error: `Cannot find module 'express'`**
- Check `package.json` has all dependencies listed
- Build command should be `npm install`

**Error: `Permission denied`**
- Ensure no files/folders have restricted permissions
- Check `.gitignore` isn't excluding required files

### Application Crashes on Start

**Check the logs:**
1. Go to Render dashboard
2. Click **Logs**
3. Look for error messages

**Common issues:**
- Missing environment variables
- Wrong start command (should be `npm start` or `node app.js`)
- Port configuration (Render automatically sets PORT variable)

### Database/Session Issues

**Sessions not persisting:**
- Render's free tier restarts instances periodically
- Consider using a persistent session store for production:
  - Redis (via Render Redis addon)
  - PostgreSQL session store

### Environment Variables Not Working

- Verify all variables are added in Render dashboard
- Check for typos in variable names
- After adding/updating, service must be redeployed

---

## 📊 Monitoring Your Application

### Render Dashboard Metrics

Access these from your service dashboard:

1. **CPU Usage**: Monitor computational load
2. **Memory Usage**: Track memory consumption
3. **Deploy History**: View all deployments
4. **Logs**: Real-time application logs

### Setting Up Alerts

For paid plans:
1. Go to service **Settings**
2. Configure health checks
3. Set up notification preferences

---

## 🔐 Security Checklist for Production

Before going live with production Braintree credentials:

- [ ] Change `BRAINTREE_ENVIRONMENT` to `production`
- [ ] Use production Braintree credentials
- [ ] Generate strong `SESSION_SECRET` (32+ characters)
- [ ] Set `NODE_ENV` to `production`
- [ ] Enable HTTPS (Render provides this automatically)
- [ ] Review Braintree fraud protection settings
- [ ] Test all payment flows thoroughly
- [ ] Set up monitoring and logging
- [ ] Configure custom domain (optional)
- [ ] Review privacy policy and terms of service

---

## 🌐 Custom Domain Setup (Optional)

### Add Custom Domain to Render

1. Purchase a domain from registrar (Namecheap, GoDaddy, etc.)
2. In Render dashboard, go to your service
3. Click **Settings** → **Custom Domains**
4. Click **Add Custom Domain**
5. Enter your domain (e.g., `gamingtopup.com`)
6. Follow DNS configuration instructions
7. Add the provided CNAME or A records to your domain registrar
8. Wait for DNS propagation (can take up to 48 hours)
9. Render automatically provides SSL certificate

---

## 📈 Scaling Your Application

### Upgrading Render Plan

As your traffic grows:

1. **Starter Plan** ($7/month):
   - 512 MB RAM
   - Shared CPU
   - No sleep

2. **Standard Plan** ($25/month):
   - 2 GB RAM
   - Shared CPU
   - Better performance

3. **Pro Plan** ($85/month):
   - 4 GB RAM
   - Dedicated CPU
   - Priority support

### Horizontal Scaling

For high traffic:
- Deploy multiple instances
- Use Render's load balancing
- Consider Redis for session store
- Add caching layers

---

## 🆘 Support Resources

### Render Support
- Documentation: https://render.com/docs
- Community Forum: https://community.render.com
- Support Email: support@render.com

### Braintree Support
- Documentation: https://developer.paypal.com/braintree/docs
- Support Portal: https://support.braintreepayments.com

### GitHub Support
- Documentation: https://docs.github.com
- Community Forum: https://github.community

---

## 📝 Quick Reference Commands

### Git Commands
```bash
git status                          # Check status
git add .                          # Stage all changes
git commit -m "message"            # Commit changes
git push origin main               # Push to GitHub
git pull origin main               # Pull from GitHub
git log --oneline                  # View commit history
```

### Project Management
```bash
npm install                        # Install dependencies
npm start                          # Start application
npm run dev                        # Start with nodemon
git remote -v                      # View remote URLs
```

### Render CLI (Optional)
```bash
# Install Render CLI
npm install -g @render-web/cli

# Login to Render
render login

# View services
render services list

# View logs
render logs <service-id>
```

---

## ✅ Deployment Checklist

### Before First Deploy:
- [ ] Code pushed to GitHub
- [ ] All environment variables ready
- [ ] Braintree sandbox tested locally
- [ ] README and documentation complete

### First Deploy:
- [ ] Create Render web service
- [ ] Add all environment variables
- [ ] Wait for successful deployment
- [ ] Test the live URL
- [ ] Verify payment flow works

### Going to Production:
- [ ] Switch to production Braintree credentials
- [ ] Update environment variables
- [ ] Test thoroughly in production
- [ ] Set up monitoring
- [ ] Configure custom domain (optional)

---

## 🎉 Congratulations!

Your Gaming Top-up website is now live on Render.com and managed with GitHub. Every time you push changes to GitHub, Render will automatically deploy them to your live site.

Happy coding! 🚀
