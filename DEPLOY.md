# Deploying to Cloudflare Pages

This website is deployed using **Cloudflare Pages**, which provides automatic deployments, global CDN, and free SSL certificates.

---

## Automatic Deployment (Recommended)

Every push to the `main` branch automatically deploys via Cloudflare Pages.

**What happens:**
1. Push changes to GitHub
2. Cloudflare detects the push
3. Builds and deploys automatically (~30 seconds)
4. Live at `huffmansolutionsai.com`

**No manual steps required after initial setup.**

---

## Initial Cloudflare Setup (One-Time)

### 1. Connect GitHub Repository

1. Log into **Cloudflare Dashboard** → Navigate to **Pages**
2. Click **"Create a project"** → **"Connect to Git"**
3. Select **GitHub** → Authorize Cloudflare (if first time)
4. Choose repository: **`Huffman-AI-Solutions/Website`**
5. Select branch: **`main`**

### 2. Configure Build Settings

**Framework preset:** None (static HTML)

**Build settings:**
- Build command: _(leave empty)_
- Build output directory: `/`
- Root directory: `/`

**Environment variables:** None required

### 3. Deploy

Click **"Save and Deploy"**

Cloudflare will:
- Clone the repository
- Serve static files from root
- Use `wrangler.jsonc` configuration
- Provide a URL like `huffman-ai-solutions-website.pages.dev`

First deployment takes ~1 minute.

---

## Custom Domain Setup

### Add huffmansolutionsai.com

1. In Cloudflare Pages → Your project → **Custom domains**
2. Click **"Set up a custom domain"**
3. Enter: **`huffmansolutionsai.com`**
4. Cloudflare verifies DNS (if domain is in Cloudflare)
   - If domain NOT in Cloudflare: Add it first via **Cloudflare Dashboard → Add Site**
5. SSL certificate auto-provisioned (free, automatic renewal)

### DNS Configuration

If domain is in Cloudflare (recommended):
- Cloudflare automatically configures DNS
- No manual steps needed

If domain is elsewhere (Porkbun, GoDaddy, etc.):
1. Add CNAME record: `huffmansolutionsai.com` → `huffman-ai-solutions-website.pages.dev`
2. Add CNAME record: `www.huffmansolutionsai.com` → `huffman-ai-solutions-website.pages.dev`
3. Wait 10-30 minutes for DNS propagation

---

## Making Updates

### Edit and Deploy

```bash
# 1. Edit files locally
vim index.html  # or any text editor

# 2. Commit changes
git add .
git commit -m "Update homepage copy"

# 3. Push to GitHub
git push origin main

# 4. Cloudflare auto-deploys in ~30 seconds
# Check deploy status in Cloudflare Pages dashboard
```

### Preview Deployments

Cloudflare automatically creates preview deployments for:
- **Pull requests** — Test changes before merging
- **Other branches** — Each branch gets its own URL

Preview URL format: `<commit-hash>.huffman-ai-solutions-website.pages.dev`

---

## Rollback / Redeploy

### View Deployment History

1. Cloudflare Pages → Your project → **Deployments**
2. See list of all deployments with timestamps

### Rollback to Previous Version

1. Find the deployment you want to restore
2. Click **⋯** (three dots) → **Rollback to this deployment**
3. Confirms and makes that version live

### Redeploy

1. Go to **Deployments** → Click on any deployment
2. Click **"Retry deployment"**
3. Rebuilds from that commit

---

## Cloudflare Features

### Free Tier Includes:
- ✅ **Unlimited bandwidth** (no caps)
- ✅ **Unlimited requests** (no limits)
- ✅ **Automatic SSL/TLS** (free certificate)
- ✅ **Global CDN** (300+ locations)
- ✅ **DDoS protection** (always-on)
- ✅ **HTTP/3** and **Brotli compression**
- ✅ **Preview deployments** for PRs
- ✅ **Analytics** (traffic, performance)
- ✅ **Functions** (Cloudflare Workers)

### vs. Netlify
- **Faster global delivery** (Cloudflare has more edge locations)
- **Better DDoS protection** (Cloudflare's core business)
- **No bandwidth limits** (Netlify free tier caps at 100GB/month)
- **Integrated with Cloudflare DNS** (if using Cloudflare for domain)

---

## Troubleshooting

### Deployment Failed

**Check build logs:**
1. Cloudflare Pages → Your project → Deployments
2. Click on failed deployment → View logs
3. Look for errors

**Common issues:**
- **Missing files:** Ensure all files are committed to Git
- **Invalid wrangler.jsonc:** Verify JSON syntax
- **Branch mismatch:** Ensure pushing to `main` branch

### Site Not Updating

**Clear cache:**
1. Cloudflare Dashboard → Caching → Purge Everything
2. Or wait 5-10 minutes for cache to expire

**Hard refresh browser:**
- Mac: `Cmd + Shift + R`
- Windows/Linux: `Ctrl + Shift + R`

### Custom Domain Not Working

**DNS not propagated:**
- Wait 10-30 minutes (sometimes up to 24 hours)
- Check DNS with: `dig huffmansolutionsai.com`

**HTTPS not working:**
- SSL certificate provisioning takes 5-10 minutes
- Check status in Cloudflare Pages → Custom domains

---

## Local Testing

### Option 1: Python HTTP Server (Built-in)

```bash
python3 -m http.server 8000
# Visit http://localhost:8000
```

### Option 2: Wrangler Dev (Cloudflare Local)

```bash
# Install Wrangler
npm install -g wrangler

# Run local dev server
wrangler pages dev .

# Visit http://localhost:8788
```

### Option 3: VS Code Live Server

1. Install **Live Server** extension
2. Right-click `index.html` → **Open with Live Server**
3. Auto-reloads on file changes

---

## Performance Optimization

### Already Optimized:
- ✅ Cloudflare CDN (global edge caching)
- ✅ Brotli compression (better than gzip)
- ✅ HTTP/3 (faster protocol)
- ✅ Minified HTML (production-ready)
- ✅ Optimized images (JPEG, compressed)

### Future Enhancements:
- **Image CDN:** Convert logos to WebP format
- **Lazy Loading:** Add `loading="lazy"` to images
- **Preload Fonts:** Add `<link rel="preload">` for Google Fonts
- **Service Worker:** Add offline support (optional)

---

## Monitoring

### Cloudflare Analytics (Built-in)

1. Cloudflare Pages → Your project → **Analytics**
2. View:
   - Page views
   - Unique visitors
   - Bandwidth usage
   - Response times
   - Top pages

### Google Analytics (Optional)

Add to `<head>` of `index.html` and `about.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Replace `G-XXXXXXXXXX` with your Google Analytics ID.

---

## Security

### HTTPS Enforcement

Cloudflare automatically redirects HTTP → HTTPS.

To verify:
1. Cloudflare Dashboard → SSL/TLS
2. Ensure mode is **"Full"** or **"Full (strict)"**

### Headers

Cloudflare automatically adds security headers:
- `Strict-Transport-Security` (HSTS)
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`

Custom headers via `_headers` file (optional):

```
/*
  X-Robots-Tag: index, follow
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
```

---

## Cost

**Cloudflare Pages:** **$0/month** (unlimited)

**Domain:** ~$12/year (Porkbun, Cloudflare Registrar)

**SSL Certificate:** $0 (included, auto-renewal)

**Total:** ~$1/month

---

## Support

**Cloudflare Docs:** https://developers.cloudflare.com/pages  
**Cloudflare Community:** https://community.cloudflare.com  
**Status Page:** https://www.cloudflarestatus.com

**Company Contact:**  
Email: jakehuffman@huffmansolutionsai.com

---

## Quick Reference

```bash
# Update site
git add .
git commit -m "Update content"
git push origin main

# Check deployment status
# → Cloudflare Pages dashboard

# Rollback
# → Cloudflare Pages → Deployments → Rollback

# Clear cache
# → Cloudflare Dashboard → Caching → Purge
```

---

**Deployment is fully automated. Just push to `main` and Cloudflare handles the rest.** 🚀
