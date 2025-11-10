# Deployment Guide - StudyConnectAIA

## Netlify Deployment Instructions

### Option 1: Deploy via Netlify CLI (Recommended)

1. **Install Netlify CLI** (if not already installed):
```bash
npm install -g netlify-cli
```

2. **Login to Netlify**:
```bash
netlify login
```

3. **Deploy from the project root**:
```bash
# First build the project
npm run build

# Deploy to Netlify
netlify deploy --prod
```

4. Follow the prompts:
   - Choose "Create & configure a new site"
   - Select your team
   - Enter a site name (or leave blank for auto-generated)
   - Confirm the deploy path: `dist/public`

### Option 2: Deploy via Netlify UI (GitHub Integration)

1. **Push your code to GitHub** (if not already done):
```bash
git add .
git commit -m "Prepare for Netlify deployment"
git push origin main
```

2. **Connect to Netlify**:
   - Go to [Netlify](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and authorize Netlify
   - Select your `StudyConnectAIA` repository

3. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist/public`
   - Node version: `20`

4. **Click "Deploy site"**

### Configuration Files

The project includes a `netlify.toml` file with:
- Build configuration
- Redirect rules for SPA routing
- Security headers
- Asset caching

### Environment Variables

Currently, the app uses mock data and doesn't require environment variables. 

If you add backend API functionality in the future:
1. Go to Site settings → Environment variables in Netlify
2. Add any required variables (e.g., API keys, database URLs)

### Post-Deployment

After deployment:
- Your site will be live at: `https://your-site-name.netlify.app`
- Enable automatic deploys for continuous deployment
- Configure a custom domain if desired

### Troubleshooting

**Build fails:**
- Check that Node version is 20 or higher
- Verify all dependencies are in package.json
- Check build logs for specific errors

**404 on routes:**
- Ensure `netlify.toml` redirect rules are present
- Check that publish directory is set to `dist/public`

**Assets not loading:**
- Verify the build completed successfully
- Check browser console for CORS or path errors

### Performance Tips

- Netlify automatically provides:
  - CDN distribution
  - Automatic HTTPS
  - Asset optimization
  - Instant cache invalidation

### Cost

The free tier includes:
- 100GB bandwidth/month
- 300 build minutes/month
- Unlimited sites

This should be sufficient for most projects.

