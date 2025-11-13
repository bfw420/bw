# Image Guide for Dr Brian Walker MLC Website

**Last Updated:** 2025-11-13

This guide explains exactly how to provide images for optimal website performance and visual quality.

---

## 📐 Technical Specifications

### **Formats to Provide**

**Always provide in this order of preference:**

1. **WebP** - Modern format, 25-35% smaller than JPEG
2. **AVIF** - Newest format, even smaller (if you can generate it)
3. **JPEG** - Fallback for older browsers
4. **PNG** - Only for images requiring transparency (logos, icons)
5. **SVG** - For logos, icons, and graphics (infinitely scalable)

**How to provide:**
```
For each image, give me:
- filename.webp (primary)
- filename.jpg (fallback)
- filename@2x.webp (for retina displays, if possible)
```

---

### **File Size Limits**

| Image Type | Max File Size | Optimal Size | Notes |
|------------|---------------|--------------|-------|
| Hero images | 500 KB | 200-300 KB | Large viewport width |
| Featured images | 300 KB | 150-200 KB | Medium width |
| Thumbnails | 100 KB | 50-75 KB | Small previews |
| Logos | 50 KB | 20-30 KB | Usually vector (SVG) |
| Icons | 20 KB | 5-10 KB | Prefer SVG |
| Open Graph | 300 KB | 200 KB | Social media sharing |

**Why this matters:** Every KB affects page load time. Aim for total page weight under 2 MB.

---

### **Dimensions Guide**

#### **Hero/Banner Images**
- **Desktop:** 2400x1200px (2:1 ratio)
- **Tablet:** 1536x768px
- **Mobile:** 828x414px
- **Format:** WebP + JPEG fallback
- **Compression:** 80-85% quality

**Use cases:**
- Homepage hero section
- Page headers
- Campaign banners

---

#### **Portrait Photos (Headshots, Profile)**
- **Large:** 800x1000px (4:5 ratio)
- **Medium:** 400x500px
- **Thumbnail:** 200x250px
- **Format:** WebP + JPEG fallback
- **Compression:** 85-90% quality

**Use cases:**
- About page profile
- Team member photos
- Author bio images

---

#### **Landscape Photos (Events, Action Shots)**
- **Large:** 1600x900px (16:9 ratio)
- **Medium:** 800x450px
- **Thumbnail:** 400x225px
- **Format:** WebP + JPEG fallback
- **Compression:** 80-85% quality

**Use cases:**
- Blog post featured images
- Event galleries
- News articles

---

#### **Square Images (Social Media, Grid Layouts)**
- **Large:** 1200x1200px (1:1 ratio)
- **Medium:** 600x600px
- **Thumbnail:** 300x300px
- **Format:** WebP + JPEG fallback
- **Compression:** 80-85% quality

**Use cases:**
- Instagram-style feeds
- Team grids
- Icon sets with photos

---

#### **YouTube Video Thumbnails**
- **Dimension:** 1280x720px (16:9 ratio)
- **Format:** WebP + JPEG fallback
- **Compression:** 85% quality
- **Notes:** YouTube auto-generates these, but custom is better

---

#### **Open Graph Images (Social Sharing)**
- **Dimension:** 1200x630px (1.91:1 ratio)
- **Format:** JPEG or PNG
- **File size:** Max 8 MB (but aim for <300 KB)
- **Notes:** Must include text overlay (design required)

**Use cases:**
- Facebook/LinkedIn preview
- Twitter Card preview
- WhatsApp link preview

---

#### **Logos**
- **Vector:** SVG (preferred - infinitely scalable)
- **Raster sizes:**
  - 512x512px (high-res)
  - 256x256px (standard)
  - 128x128px (small)
  - 64x64px (favicon base)
- **Format:** SVG, PNG (with transparency)
- **Notes:** Always provide transparent background

---

#### **Icons**
- **Dimension:** 24x24px, 48x48px, 96x96px
- **Format:** SVG (preferred) or PNG
- **Notes:** Use lucide-react icons when possible (already in codebase)

---

#### **Favicons**
You need a complete favicon set:

```
favicon.ico (16x16, 32x32, 48x48 multi-resolution)
favicon-16x16.png
favicon-32x32.png
apple-touch-icon.png (180x180)
android-chrome-192x192.png
android-chrome-512x512.png
safari-pinned-tab.svg (monochrome SVG)
```

**Tool:** Use [RealFaviconGenerator.net](https://realfavicongenerator.net/) to generate all these from one source image.

---

## 🎨 Image Quality Guidelines

### **Do's:**
- ✅ Use natural lighting for photos
- ✅ Shoot at highest resolution possible (we'll optimize down)
- ✅ Include multiple angles of the same scene
- ✅ Capture candid moments (not just posed shots)
- ✅ Show Dr Walker in action (Parliament, clinic, community events)
- ✅ Include diverse people (constituents, community members)
- ✅ Shoot landscape/portrait orientation of the same scene

### **Don'ts:**
- ❌ Don't send blurry or low-resolution images
- ❌ Don't over-filter or over-saturate
- ❌ Don't send images with watermarks
- ❌ Don't send images with visible copyrights (unless you own them)
- ❌ Don't send screenshots of photos (send originals)
- ❌ Don't apply heavy Instagram filters

---

## 📁 How to Organize and Send Images

### **Folder Structure:**
```
images/
├── hero/
│   ├── homepage-hero.webp
│   ├── homepage-hero.jpg
│   ├── about-hero.webp
│   └── about-hero.jpg
├── profile/
│   ├── brian-walker-headshot.webp
│   ├── brian-walker-headshot.jpg
│   ├── brian-walker-parliament.webp
│   └── brian-walker-parliament.jpg
├── events/
│   ├── 2024-cannabis-forum/
│   ├── 2024-community-town-hall/
│   └── 2024-parliament-session/
├── logos/
│   ├── lcwa-logo.svg
│   ├── lcwa-logo.png
│   └── legislative-council-seal.svg
├── social/
│   ├── og-image-homepage.jpg
│   ├── og-image-report.jpg
│   └── twitter-card-default.jpg
└── team/
    ├── staff-member-1.webp
    └── staff-member-1.jpg
```

### **File Naming Convention:**

**Format:** `descriptor-context-version.extension`

**Good names:**
- `brian-walker-parliament-speaking-2024.jpg`
- `cannabis-economic-report-cover.jpg`
- `town-hall-claremont-march-2024.jpg`
- `og-image-economic-report.jpg`

**Bad names:**
- `IMG_0123.jpg`
- `Photo.jpg`
- `image (1).jpg`
- `WhatsApp Image 2024-03-15.jpg`

**Why this matters:** Descriptive filenames help with SEO and organization.

---

### **How to Send Images to Me:**

**Option 1: Cloud Storage (Preferred for large batches)**
- Dropbox shared folder
- Google Drive shared folder
- OneDrive shared link

**Option 2: Direct Upload**
- Just tell me where the images are
- I can read from your local filesystem
- Provide full paths

**Option 3: Git Repository**
- Add to `/public/images/` folder
- Commit and push
- I'll pull and optimize

**Include this info with each batch:**
```
Image: brian-walker-parliament-2024.jpg
Purpose: Homepage hero
Context: Dr Walker speaking in Parliament about cannabis reform
Credit: Parliamentary Services / Your Name
Date taken: March 15, 2024
Rights: Free to use / Need permission / Creative Commons
```

---

## 🛠️ Image Optimization Tools

### **Recommended Tools:**

**Online (Free):**
- [TinyPNG](https://tinypng.com/) - JPEG/PNG compression
- [Squoosh](https://squoosh.app/) - Google's image compressor (WebP, AVIF)
- [SVGOMG](https://jakearchibald.github.io/svgomg/) - SVG optimizer

**Desktop (Free):**
- [ImageOptim](https://imageoptim.com/) (Mac) - Drag-and-drop optimizer
- [FileOptimizer](https://sourceforge.net/projects/nikkhokkho/) (Windows) - Batch optimizer

**Command Line:**
```bash
# Convert to WebP
cwebp -q 80 input.jpg -o output.webp

# Optimize JPEG
jpegoptim --max=85 --strip-all image.jpg

# Optimize PNG
optipng -o7 image.png
```

**Next.js Image Optimization:**
The site uses Next.js `<Image>` component which automatically:
- Generates multiple sizes
- Lazy loads images
- Serves WebP when supported
- Adds blur placeholders

**You just need to provide high-quality originals.**

---

## 📋 Complete Image Shopping List

Here's every image the website needs, categorized by priority:

---

### **🔴 CRITICAL (Need ASAP)**

#### **1. Profile/Headshot Photos**
- **Dr Walker professional headshot**
  - Format: WebP + JPEG
  - Size: 800x1000px
  - Context: Clean background, professional attire, friendly expression
  - Quantity: 1 primary, 2 alternates

- **Dr Walker in medical setting**
  - Format: WebP + JPEG
  - Size: 1600x900px
  - Context: At clinic, with stethoscope (if appropriate), approachable
  - Quantity: 2-3 photos

- **Dr Walker in Parliament**
  - Format: WebP + JPEG
  - Size: 1600x900px
  - Context: Speaking, debating, in chamber
  - Quantity: 3-5 photos

#### **2. Homepage Hero Image**
- **Composite or single powerful image**
  - Format: WebP + JPEG
  - Size: 2400x1200px
  - Context: Dr Walker in action - Parliament, community, or clinic
  - Quantity: 1 primary, 2 alternates for rotation

#### **3. Open Graph Images**
- **Default OG image for homepage**
  - Format: JPEG/PNG
  - Size: 1200x630px
  - Context: Dr Walker + text: "Evidence-Based Policy for WA"
  - Quantity: 1

- **Economic Report OG image**
  - Format: JPEG/PNG
  - Size: 1200x630px
  - Context: Report cover or key stats + title
  - Quantity: 1

#### **4. Logos**
- **Legislative Council logo** (if not already have)
  - Format: SVG + PNG
  - Context: Official WA Parliament seal/logo
  - Quantity: 1

- **LCWA Party logo high-res**
  - Format: SVG + PNG (if current one is low-res)
  - Size: 512x512px minimum
  - Quantity: 1

---

### **🟠 HIGH PRIORITY (Need This Month)**

#### **5. About Page Images**
- **Timeline photos** (career progression)
  - Medical school graduation
  - First day as GP
  - Elected to Parliament
  - Key legislative wins
  - Format: WebP + JPEG
  - Size: 800x600px each
  - Quantity: 5-8 photos

- **Candid action shots**
  - Meeting constituents
  - Community events
  - Volunteering
  - Format: WebP + JPEG
  - Size: 1600x900px
  - Quantity: 5-10 photos

#### **6. Political Goals Page Images**
- **Icon photos for each goal** (optional but impactful)
  - Cannabis plant (legal context)
  - Healthcare workers
  - Indigenous elders/community
  - Environmental action
  - Justice reform
  - Format: WebP + JPEG
  - Size: 800x800px
  - Quantity: 1 per goal (9 total)

#### **7. Event Photos**
- **Recent town halls/community meetings**
  - Format: WebP + JPEG
  - Size: 1600x900px
  - Quantity: 10-20 photos from 3-5 events

- **Campaign events**
  - Format: WebP + JPEG
  - Size: 1600x900px
  - Quantity: 10-15 photos

#### **8. Testimonial Photos**
- **Constituents (with signed release forms)**
  - Format: WebP + JPEG
  - Size: 400x500px
  - Context: Headshots or action shots
  - Quantity: 5-10 people

---

### **🟡 MEDIUM PRIORITY (Nice to Have)**

#### **9. Blog/News Header Images**
- **Generic topic headers**
  - Healthcare
  - Cannabis policy
  - Environment
  - Justice reform
  - Education
  - Format: WebP + JPEG
  - Size: 1600x900px
  - Quantity: 5-10 stock or custom images

#### **10. Team Photos**
- **Staff members** (if applicable)
  - Format: WebP + JPEG
  - Size: 400x500px
  - Context: Professional headshots, consistent background
  - Quantity: As many as needed

#### **11. Office/Location Photos**
- **Parliamentary office**
  - Format: WebP + JPEG
  - Size: 1600x900px
  - Quantity: 2-3 photos

- **Medical clinic** (if allowed to share)
  - Format: WebP + JPEG
  - Size: 1600x900px
  - Quantity: 2-3 photos

- **Electorate/constituency areas**
  - Format: WebP + JPEG
  - Size: 1600x900px
  - Quantity: 5-10 scenic or landmark photos

#### **12. Infographic Images**
- **Policy visualizations**
  - Format: PNG (for transparency) or JPEG
  - Size: 1200x1200px or 1600x900px
  - Context: Stats, data, key facts
  - Quantity: 5-10 custom designs

---

### **🟢 LOW PRIORITY (Future Enhancement)**

#### **13. Video Thumbnails**
- **Custom YouTube thumbnails**
  - Format: WebP + JPEG
  - Size: 1280x720px
  - Context: Dr Walker + video title text
  - Quantity: 10-20 for top videos

#### **14. Social Media Graphics**
- **Quote cards** (for sharing)
  - Format: PNG/JPEG
  - Size: 1200x1200px (Instagram) or 1200x630px (Facebook/Twitter)
  - Context: Dr Walker quotes with branding
  - Quantity: 10-20 templates

#### **15. Campaign Materials**
- **Downloadable flyers/posters**
  - Format: PDF + PNG preview
  - Size: A4 (2480x3508px at 300 DPI)
  - Quantity: 3-5 designs

#### **16. Historical Photos**
- **Archival campaign photos**
  - Format: WebP + JPEG
  - Size: Original resolution (we'll optimize)
  - Context: Past campaigns, events, milestones
  - Quantity: 10-20 photos

---

## 🖼️ Image Rights and Legal

### **You MUST have rights to use these images:**

**Options:**
1. **Own the copyright** - Photos you took or commissioned
2. **Licensed stock photos** - From Unsplash, Pexels, Shutterstock
3. **Creative Commons** - Must attribute properly
4. **Parliamentary Services** - Official Parliament photos (usually free for members)

**For people in photos:**
- Get signed photo release forms (especially for testimonials)
- Minors need parental consent
- Public figures at public events usually don't need releases

**Include with each image:**
```
Photo credit: [Photographer name]
License: [Copyright, CC-BY, Public Domain, etc.]
Release: [Yes/No - include release form if Yes]
```

---

## 📊 Image Performance Checklist

Before providing images, check:

- [ ] Resolution is appropriate (not too big, not too small)
- [ ] File size is optimized (<300 KB for most images)
- [ ] Filename is descriptive
- [ ] Format is modern (WebP preferred)
- [ ] You have rights to use the image
- [ ] Subject is in focus and well-lit
- [ ] Image tells a story or serves a purpose
- [ ] Colors are accurate (not over-saturated)
- [ ] Composition follows rule of thirds
- [ ] Background is clean/uncluttered

---

## 🎯 Quick Start: What to Send Me Right Now

**Bare Minimum to Get Started:**

1. **One great headshot** of Dr Walker (800x1000px)
2. **One hero image** for homepage (2400x1200px)
3. **LCWA Party logo** in high resolution (SVG or PNG)
4. **3-5 action shots** of Dr Walker in Parliament or community (1600x900px)

**Send these and we can launch with placeholder stock photos for the rest, then replace them as you provide better images.**

---

## 💡 Pro Tips

1. **Always shoot wider than you need** - You can crop, but you can't add missing pixels
2. **Take multiple shots** - Give me options to choose from
3. **Vary the angle** - Straight-on, slight angle, close-up, wide shot
4. **Natural expressions** - Forced smiles look forced. Candid is better.
5. **Context matters** - Show Dr Walker DOING something, not just existing
6. **Consistent lighting** - Especially for profile/team photos
7. **Clean backgrounds** - Avoid clutter, busy patterns, or distracting elements
8. **Think mobile-first** - Images will be viewed on small screens
9. **Tell a story** - Every image should communicate something
10. **Quality over quantity** - 10 great photos beats 100 mediocre ones

---

## 🤝 Working Together

**When you send images:**
1. Tell me what page/section they're for
2. Provide context (when/where taken)
3. Include any text that should overlay
4. Mention if there are people who need credit/attribution
5. Flag any images that are temporary placeholders

**I will:**
1. Optimize for web (compression, format conversion)
2. Generate responsive sizes
3. Add proper alt text for accessibility
4. Implement lazy loading
5. Set up proper caching

**Together we'll make this site visually stunning while keeping it fast and accessible.**

---

## 📞 Questions?

If you're unsure about:
- Image quality
- File format
- Dimensions
- Rights/licensing
- Anything else

**Just ask!** It's easier to clarify upfront than to redo work later.

---

**Remember:** Images aren't just decoration. They build trust, tell stories, and drive action. Invest the time to get them right.

Now go take some amazing photos! 📸
