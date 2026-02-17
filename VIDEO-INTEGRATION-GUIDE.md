# Video Integration Guide

## Overview
The large "See It In Action" demo video section has been removed. Instead, each of the 6 feature cards in the Features section has its own video placeholder ready for individual task demos.

---

## Step 1: Record & Upload Your Demo Videos

### Recommended Recording Tools
- **Loom** (loom.com) - Easy screen recording, instant sharing
- **OBS Studio** (free, open-source) - More control, better quality
- **ScreenFlow/Camtasia** - Professional editing tools

### Recommended Hosting
- **YouTube** (unlisted or public) - Best for SEO, reliable embeds
- **Loom** - Simplest workflow, good player
- **Vimeo** - Clean player, no ads, professional look

### Video Specs
- **Length:** 30-90 seconds per demo
- **Format:** MP4, 1080p (1920x1080)
- **Style:** Silent with text overlays OR voiceover
- **Music:** Optional background music (low volume)

---

## Step 2: Get Embed Codes

### For YouTube:
1. Upload video to YouTube
2. Click "Share" → "Embed"
3. Copy the `src` URL from the iframe code
4. Example: `https://www.youtube.com/embed/dQw4w9WgXcQ`

### For Loom:
1. Upload/record video on Loom
2. Click "Share" → "Embed"
3. Copy the embed URL
4. Example: `https://www.loom.com/embed/abc123xyz`

### For Vimeo:
1. Upload video to Vimeo
2. Click "Share" → Get the embed code
3. Copy the `src` URL
4. Example: `https://player.vimeo.com/video/123456789`

---

## Step 3: Add Videos to Website

Each feature card has a video placeholder. Here's where each demo goes:

### 1. Email Management Demo
**Location:** First card in Features section (line ~234)
**Shows:** New email arrives → auto-acknowledgment sent → categorized → draft response

**Find this code:**
```html
<div class="card-hover bg-white rounded-2xl p-7 border border-gray-100 shadow-sm">
  <!-- Video embed - replace VIDEO_ID_HERE with your YouTube/Loom video ID -->
  <div class="mb-4 rounded-xl overflow-hidden bg-gray-100 aspect-video">
    <!-- Uncomment when video is ready:
    <iframe 
      src="https://www.youtube.com/embed/VIDEO_ID_HERE" 
      ...
    -->
```

**Replace with:**
```html
<div class="card-hover bg-white rounded-2xl p-7 border border-gray-100 shadow-sm">
  <div class="mb-4 rounded-xl overflow-hidden bg-gray-100 aspect-video">
    <iframe 
      src="https://www.youtube.com/embed/YOUR_ACTUAL_VIDEO_ID" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen
      class="w-full h-full"
    ></iframe>
  </div>
```

### 2. Interview Coordination Demo
**Location:** Second card (line ~256)
**Shows:** Calendar check → propose times → send confirmation → book interview

### 3. Candidate Nurturing Demo
**Location:** Third card (line ~278)
**Shows:** Nurture sequence emails going out at Day 3, Day 7, Day 14

### 4. Daily Briefings Demo
**Location:** Fourth card (line ~300)
**Shows:** Morning briefing with urgent items, new candidates, today's interviews

### 5. Candidate Research Demo
**Location:** Fifth card (line ~322)
**Shows:** New application → LinkedIn research → fit score → outreach draft

### 6. CRM & Data Entry Demo
**Location:** Sixth card (line ~344)
**Shows:** Pipeline file updating automatically as actions happen

---

## Step 4: Quick Find & Replace Method

### Option A: Individual Replacement (Recommended)

For each video, search for the specific section heading in `index.html`:

1. **Email Management** - Search for: `<h3 class="text-lg font-bold text-navy-800 mb-2">Email Management</h3>`
2. Go up a few lines to find the video embed comment
3. Uncomment the iframe and replace `VIDEO_ID_HERE` with your actual video ID

### Option B: Bulk Replacement (Faster but less precise)

If all your videos are on the same platform (e.g., all YouTube):

**Find:**
```html
<!-- Uncomment when video is ready:
<iframe 
  src="https://www.youtube.com/embed/VIDEO_ID_HERE"
```

**Replace with:**
```html
<iframe 
  src="https://www.youtube.com/embed/YOUR_ACTUAL_VIDEO_ID"
```

Then manually update each `YOUR_ACTUAL_VIDEO_ID` with the correct ID for that card.

---

## Video ID Reference Template

Keep track of your video IDs here:

| Feature | Platform | Video ID | Status |
|---------|----------|----------|--------|
| Email Management | YouTube | `abc123` | ✅ Recorded |
| Interview Coordination | YouTube | `def456` | ⏳ Recording |
| Candidate Nurturing | YouTube | `ghi789` | ❌ Not started |
| Daily Briefings | YouTube | `jkl012` | ✅ Recorded |
| Candidate Research | YouTube | `mno345` | ✅ Recorded |
| CRM & Data Entry | YouTube | `pqr678` | ⏳ Recording |

---

## Step 5: Test the Website Locally

Before pushing to GitHub:

1. Open `index.html` in your browser (double-click the file)
2. Scroll to the Features section
3. Check that:
   - Videos load properly
   - Aspect ratio looks good (16:9)
   - No placeholder text showing
   - Videos are clickable/playable

---

## Step 6: Deploy to Netlify

Once all videos are added:

```bash
cd /home/hokiejake1/.openclaw/workspace/website
git add index.html
git commit -m "Added demo videos to feature cards"
git push origin main
```

Netlify will auto-deploy in ~30 seconds.

---

## Example: Full Card with Video

```html
<div class="card-hover bg-white rounded-2xl p-7 border border-gray-100 shadow-sm">
  <!-- Email Management Demo -->
  <div class="mb-4 rounded-xl overflow-hidden bg-gray-100 aspect-video">
    <iframe 
      src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen
      class="w-full h-full"
    ></iframe>
  </div>
  <div class="text-3xl mb-4">📧</div>
  <h3 class="text-lg font-bold text-navy-800 mb-2">Email Management</h3>
  <p class="text-gray-500 text-sm leading-relaxed mb-4">Reads, categorizes, and drafts responses to every candidate and client email — even at 2 AM. Flags urgent items, drafts interview coordination emails, auto-acknowledges applications.</p>
  <span class="inline-block bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">Save 10–15 hrs/week</span>
</div>
```

---

## Pro Tips

### Video Recording Best Practices
1. **Use real data** (demo accounts, not live client info)
2. **Keep it fast** - 30-60 seconds max per demo
3. **Show timestamps** - Include visible clock/timestamps to show speed
4. **Text overlays** - Annotate what's happening ("Email received at 11:43 PM → Auto-acknowledged 30 seconds later")
5. **No audio needed** - Text overlays work better than voiceover for quick demos

### Platform Choice
- **YouTube:** Best for SEO, shows up in search results, familiar player
- **Loom:** Fastest workflow (record → share → done in 2 minutes)
- **Vimeo:** Most professional look, no ads, clean player

### Thumbnail Optimization
- YouTube lets you set custom thumbnails
- Use a clear screenshot showing the feature in action
- Add text overlay: "Email Automation Demo" etc.

---

## Troubleshooting

### Video Won't Load
- Check that the iframe `src` URL is correct
- Make sure the video is set to "Public" or "Unlisted" (not Private)
- Try opening the `src` URL directly in your browser

### Video Shows "Video Unavailable"
- YouTube: Video might be set to Private
- Loom: Check sharing settings
- Vimeo: Check privacy settings

### Aspect Ratio Looks Wrong
- The `aspect-video` class maintains 16:9 ratio
- Make sure your source video is 16:9 (1920x1080 or 1280x720)

### Video Autoplays (Annoying)
- Remove `autoplay` from the iframe `allow` attribute if present
- Keep `autoplay` out of the `src` URL parameters

---

## Current Status

✅ Large demo video section **removed** from index.html  
✅ 6 video placeholders **ready** in feature cards  
⏳ Awaiting video uploads and embed codes

---

## Next Steps

1. ✅ Remove large demo section (DONE)
2. ⏳ Record 6 individual task demos
3. ⏳ Upload to YouTube/Loom/Vimeo
4. ⏳ Get embed codes
5. ⏳ Update index.html with video IDs
6. ⏳ Test locally
7. ⏳ Push to GitHub → Netlify auto-deploys

---

**Questions? Issues? Let me know and I'll help troubleshoot!** 🐢
