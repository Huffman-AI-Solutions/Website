# Deploying Your Website — Free with Netlify

## What You Have
- `index.html` — Main landing page (hero, features, how it works, pricing, FAQ, contact)
- `about.html` — About/mission page

**No build step needed. Just drag & drop.**

---

## Deploy to Netlify (Free — 5 minutes)

1. Go to **https://app.netlify.com** → Sign up free (use GitHub account)
2. On the dashboard, look for **"Deploy manually"** or drag-and-drop area
3. **Drag the entire `website/` folder** onto the deploy area
4. Netlify gives you a free URL like `https://random-name.netlify.app`
5. Your site is live!

---

## Connect Your Custom Domain

Once you buy `huffmansolutionsai.com` (~$12/year from Porkbun):

1. In Netlify → Site settings → Domain management → Add custom domain
2. Enter `huffmansolutionsai.com`
3. Netlify shows you nameservers — update them in Porkbun
4. Wait 10-30 min → live at `huffmansolutionsai.com`
5. Netlify auto-enables HTTPS (free SSL certificate)

---

## Connect Calendly (Book Now button)

Once you set up Calendly:
1. Open `index.html`
2. Find `href="#"` near `📅 Schedule Free Discovery Call` (in the contact section)
3. Replace `#` with your Calendly link: `https://calendly.com/your-link`
4. Re-upload the folder to Netlify (just drag again — it updates automatically)

---

## Update Email Address

The site uses `jake@huffmansolutionsai.com` — once your domain email is live, it'll work.
If you want to change it temporarily to Gmail, search for `jake@huffmansolutionsai.com` in both files and replace.

---

## Making Future Updates

1. Edit `index.html` or `about.html` in any text editor (Notepad, VS Code, etc.)
2. Go to Netlify → Sites → your site → Deploys
3. Drag the updated `website/` folder onto the deploy area again
4. Live in ~30 seconds

---

## Total Cost
- Netlify hosting: **$0/month**
- Domain (Porkbun): **~$12/year (~$1/month)**
- SSL certificate: **$0** (Netlify provides free)
- **vs Squarespace: $26/month = $312/year**
- **Your savings: ~$300/year** 🎉
