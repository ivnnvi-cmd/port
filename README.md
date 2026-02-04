# 🎨 Jesign Portfolio

> Creative Digital Marketing Portfolio by Ivan and Jesryni Pantino-Lagura

**Jesign/NAVIN Media and Tech ltd.**

---

## 📋 Overview

A modern, responsive portfolio website showcasing creative digital marketing work, including:
- Brand kits & logos
- Social media campaigns
- Real estate marketing materials
- Mock-ups & presentations
- Video productions
- Graphic design work

**Live Demo:** [Your Netlify URL here]

---

## ✨ Features

- 🎨 **Modern Design** - Purple & yellow theme with smooth animations
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- 🖼️ **Portfolio Gallery** - Filterable categories with lightbox viewer
- 🎬 **Video Showcase** - Embedded video player for productions
- 📄 **PDF Viewer** - In-browser PDF presentation viewer
- 📧 **Contact Form** - Working email form with auto-reply
- ⚡ **Optimized** - Fast loading with caching and lazy loading
- 🔒 **Secure** - Enhanced security headers

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ (optional, for development)
- Modern web browser

### Local Development

1. **Clone or download this repository**

2. **Install dependencies (optional):**
```bash
npm install
```

3. **Start development server:**
```bash
npm start
```
Opens at `http://localhost:3000` with live reload!

4. **Or simply open `index.html` in your browser**

---

## 📦 Project Structure

```
jesign-portfolio/
├── index.html              # Main HTML file
├── styles.css              # CSS styles
├── script.js               # JavaScript functionality
├── package.json            # Node.js configuration
├── netlify.toml            # Netlify deployment config
├── Yellow.png              # Navbar logo
├── Purple.png              # Portfolio section logo
├── img pic.png             # Profile photo
├── PHOTOS/                 # Portfolio images
│   ├── Brand Kits/
│   ├── Logos/
│   ├── Social Media Posting Samples/
│   ├── LYONS Realty/
│   ├── Mock-Ups/
│   └── Presentations/
└── VIDEOS/                 # Video productions
    └── Jesign Media_Edited Video [1-7].mp4
```

---

## 🌐 Deployment

### Deploy to Netlify (Recommended)

#### Method 1: Drag & Drop
1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. Select all files and folders (including `netlify.toml`)
3. Drag to the browser window
4. Wait for deployment
5. Done! ✅

#### Method 2: GitHub Integration
1. Push code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_REPO_URL
git push -u origin main
```

2. Connect to Netlify:
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "Add new site" → "Import from Git"
   - Select your repository
   - Deploy settings:
     - Build command: (leave empty)
     - Publish directory: `.`
   - Click "Deploy"

3. Custom domain (optional):
   - Site settings → Domain management
   - Add custom domain
   - Update DNS records

---

## 📧 Contact Form Setup

The contact form uses [FormSubmit.co](https://formsubmit.co) for email handling.

### First-Time Activation:
1. Deploy your site
2. Visit your live site
3. Fill out the contact form yourself
4. Check email: `jesignnnnnnnmedia@gmail.com`
5. Click the verification link from FormSubmit
6. Done! All future submissions will be sent to your email

### Features:
- ✅ Direct email to your Gmail
- ✅ Auto-reply confirmation to sender
- ✅ No spam/captcha needed
- ✅ Free forever

---

## 🛠️ Development

### Available Scripts

```bash
npm start          # Start live development server
npm run dev        # Same as npm start
npm run build      # Minify CSS & JS (optional)
```

### Making Changes

1. Edit HTML, CSS, or JS files
2. Save (live server auto-reloads)
3. Test in browser
4. Deploy updates to Netlify (auto-deploys if using Git)

---

## ⚡ Performance Optimizations

### Implemented:
- ✅ **Lazy loading** for images
- ✅ **Preload metadata** for videos
- ✅ **Browser caching** (1 year for static assets)
- ✅ **Minified CSS/JS** (optional via build)
- ✅ **CDN delivery** (via Netlify)
- ✅ **Responsive images** with proper sizing

### Speed Metrics:
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Score: 90+

---

## 🎨 Customization

### Update Content:
- **Profile info:** Edit hero section in `index.html`
- **Work experience:** Edit about-me section
- **Portfolio items:** Add/remove items in portfolio section
- **Colors:** Update CSS variables in `styles.css`
- **Contact info:** Update contact section

### Add New Portfolio Items:
```html
<div class="portfolio-item" data-category="YOUR-CATEGORY">
    <img src="PATH/TO/IMAGE.png" alt="Description">
    <div class="portfolio-overlay">
        <h3>Project Title</h3>
        <p>Project Description</p>
    </div>
</div>
```

---

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🔧 Troubleshooting

### Images not loading?
- Check file paths are case-sensitive
- Verify files are in correct folders
- Clear browser cache

### Contact form not working?
- Verify FormSubmit is activated (check email)
- Test on live site (not localhost)
- Check spam folder for verification email

### Videos not playing?
- Ensure video files are uploaded
- Check file size (< 100MB recommended)
- Try different browser

---

## 📄 License

MIT License - Feel free to use this template for your own portfolio!

---

## 👤 Contact

**Jesryni Pantino**
- 📧 Email: jesignnnnnnnmedia@gmail.com
- 💼 LinkedIn: [linkedin.com/in/jesrynipantino](https://www.linkedin.com/in/jesrynipantino/)
- 📸 Instagram: [@jesignmedia](https://www.instagram.com/jesignmedia/)

---

## 🙏 Acknowledgments

- Font: Satoshi via Fontshare
- Icons: Font Awesome
- Form: FormSubmit.co
- Hosting: Netlify

---

**© 2026 Jesign/NAVIN Media and Tech ltd. All rights reserved.**

Made with ❤️ and creativity
