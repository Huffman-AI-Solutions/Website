# Huffman AI Solutions — Website

Official website for Huffman AI Solutions, providing AI employees for recruiting firms.

**Live Site:** [huffmansolutionsai.com](https://huffmansolutionsai.com)

---

## Overview

This is a static HTML website featuring:
- **Typography:** Cormorant Garamond (display) + IBM Plex Sans (body) + IBM Plex Mono (mono)
- **Color Palette:** Warm neutrals with gold accents (#f5f3ef, #0d0d0d, #1a1a2e, #c8a96e)
- **Framework:** TailwindCSS (via CDN)
- **Hosting:** Cloudflare Pages
- **Build:** None required (static HTML)

---

## Structure

```
Website/
├── index.html              # Main landing page
├── about.html              # About/mission page
├── privacy.html            # Privacy policy
├── terms.html              # Terms of service
├── huffman-ai-primary-logo.jpg    # Primary logo (header)
├── huffman-ai-secondary-logo.jpg  # Secondary logo (favicon)
├── sitemap.xml             # SEO sitemap
├── robots.txt              # Search engine directives
├── wrangler.jsonc          # Cloudflare Wrangler configuration
├── src/
│   └── index.ts            # Cloudflare Worker entry point
└── DEPLOY.md               # Deployment instructions
```

---

## Brand System

### Typography
- **Display/Headings (h1, h2, h3):** Cormorant Garamond (serif, elegant)
- **Body Text:** IBM Plex Sans (clean, readable)
- **Monospace (labels, nav):** IBM Plex Mono (technical, uppercase)

### Colors
```css
--color-bg: #f5f3ef      /* Background (warm off-white) */
--color-ink: #0d0d0d     /* Primary text (near-black) */
--color-dark: #1a1a2e    /* Dark sections (hero, footer) */
--color-gold: #c8a96e    /* Accent (CTAs, emphasis) */
--color-muted: #6b6560   /* Secondary text */
--color-rule: #d4cfc9    /* Borders */
--color-surface: #ffffff /* Pure white */
```

### Logos
- **Primary:** "Hai" wordmark (H + "ai" in gold) — Used in header
- **Secondary:** "H" monogram — Used as favicon and footer accent

Full brand guidelines: `../brand-assets/BRAND-GUIDELINES.md`

---

## Deployment (Cloudflare Pages)

### Automatic Deployment
Every push to `main` branch automatically deploys via Cloudflare Pages.

### Initial Setup
1. **Cloudflare Dashboard** → Pages → Create a project
2. **Connect to Git:** Select `Huffman-AI-Solutions/Website` repository
3. **Build settings:**
   - Framework preset: None
   - Build command: (leave empty)
   - Build output directory: `/`
4. **Deploy** — Cloudflare automatically uses `wrangler.jsonc` configuration

### Custom Domain
1. In Cloudflare Pages → Custom domains → Add domain
2. Enter `huffmansolutionsai.com`
3. Cloudflare provides DNS instructions
4. SSL certificate auto-provisioned (free)

See `DEPLOY.md` for detailed instructions.

---

## Development

### Local Development
No build process required. Simply open `index.html` in a browser.

```bash
# Serve locally (optional)
python3 -m http.server 8000
# Visit http://localhost:8000
```

### Making Updates
1. Edit HTML files (`index.html`, `about.html`, etc.)
2. Commit changes: `git commit -am "Update content"`
3. Push to main: `git push origin main`
4. Cloudflare Pages auto-deploys in ~30 seconds

### Preview Deployments
Cloudflare automatically creates preview deployments for pull requests.

---

## Content Sections

### Main Page (index.html)
1. **Hero** — Value proposition with CTA
2. **Scarcity Banner** — Founding member pricing (25% off, expires March 31)
3. **Social Proof** — Stats and trust signals
4. **Before/After** — Pain points vs. solution
5. **Features** — 6 core capabilities with video placeholders
6. **How It Works** — 3-step process
7. **Time Savings Calculator** — Interactive breakdown
8. **Pricing** — 3 tiers (Starter, Pro, Enterprise)
9. **How We Compare** — vs. traditional solutions
10. **Guarantee** — 20+ hours saved in first month
11. **FAQ** — 13 questions
12. **Contact Form** — Lead capture and booking
13. **Footer** — Links, contact, copyright

### About Page (about.html)
1. **Hero** — Company mission
2. **Mission** — Purpose and value proposition
3. **Values** — Three pillars (Practical Value, Built for Recruiting, No Nonsense Pricing)
4. **Team** — Charlotte, NC location and contact
5. **CTA** — Link back to main site
6. **Footer** — Consistent with main page

---

## Technical Details

### Framework
- **TailwindCSS** via CDN (no build step)
- **CSS Custom Properties** for design tokens
- **Responsive** with mobile-first approach
- **Semantic HTML5** structure

### Fonts
Loaded from Google Fonts:
```
Cormorant Garamond: 300, 400, 600 (+ italic variants)
IBM Plex Sans: 300, 400, 500, 600
IBM Plex Mono: 300, 400, 500
```

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Uses modern CSS features:
- `clamp()` for responsive typography
- CSS custom properties
- Flexbox and Grid

### Performance
- No JavaScript framework (vanilla JS only)
- Optimized images (JPEG, compressed)
- CDN delivery via Cloudflare
- HTTP/3 support
- Brotli compression

---

## SEO

### Meta Tags
- Open Graph tags for social sharing
- Twitter Card support
- Descriptive meta descriptions
- Canonical URLs

### Structured Data
- Sitemap: `sitemap.xml`
- Robots: `robots.txt`
- Semantic HTML headings

### Monitoring
- Google Search Console (add property)
- Cloudflare Analytics (built-in)

---

## Contact

**Company:** Huffman AI Solutions LLC  
**Location:** Charlotte, NC  
**Email:** jakehuffman@huffmansolutionsai.com  
**Website:** [huffmansolutionsai.com](https://huffmansolutionsai.com)

---

## License

© 2026 Huffman AI Solutions LLC. All rights reserved.

---

## Changelog

### 2026-02-21
- ✅ Implemented Cormorant + IBM Plex typography system
- ✅ Applied brand color palette (warm neutrals + gold)
- ✅ Integrated primary and secondary logos
- ✅ Rebuilt About page with full brand consistency
- ✅ Migrated from Netlify to Cloudflare Pages
- ✅ Added Wrangler configuration for Cloudflare Workers

### 2026-02-20
- ✅ Updated pricing to 3-tier structure (Starter/Pro/Enterprise)
- ✅ Added Founding Member discount (25% off forever)
- ✅ Updated guarantee to 20+ hours in first month
- ✅ Clarified trial terms (4 weeks FM, 2 weeks standard)

### 2026-02-18
- ✅ Initial website launch
- ✅ Privacy policy and terms of service
- ✅ Video integration placeholders
