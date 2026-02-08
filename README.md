# Windburn Multi-Sport Academy Website

A modern, responsive website for Windburn Multi-Sport Academy - a competitive triathlon training organization in Manitoba, Canada.

## Overview

This is a **static website** optimized for [GitHub Pages](https://pages.github.com/) deployment. No backend server or build process is required.

### Features
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Fast loading with semantic HTML and optimized CSS
- ✅ Accessible navigation and component system
- ✅ Dynamic header/footer loading for consistent branding
- ✅ Multiple pages for teams, races, news, and registration
- ✅ Production-ready for GitHub Pages hosting

## Project Structure

```
windburn/
├── index.html              # Homepage (root entry point)
├── assets/                 # All static resources
│   ├── css/                # Stylesheets (global, page-specific)
│   ├── js/                 # JavaScript files (10KB total)
│   └── images/             # Logos, maps, feature images
├── pages/                  # Page templates
│   ├── index.html         # Home page
│   ├── news.html          # News & updates
│   ├── windburn-race-team.html
│   ├── rm-triathlon.html
│   ├── press-awards.html
│   └── sub-pages/         # Nested pages
│       ├── coaches.html
│       ├── devo_team.html
│       └── register.html
├── components/            # Reusable HTML fragments
│   ├── header.html       # Site navigation header
│   ├── footer.html       # Footer with links
│   └── partners.html     # Partners section
└── README.md              # This file
```

## Getting Started

### Local Development

No build tools needed! Simply open the site in any browser:

```bash
# Option 1: Open directly (file:// protocol)
open index.html

# Option 2: Use Python's built-in server (recommended for local testing)
python3 -m http.server 8000

# Then visit: http://localhost:8000
```

### Editing Content

All content is in standard HTML files:
- **Pages**: Edit files in `/pages/` and `/pages/sub-pages/`
- **Styles**: Modify CSS files in `/assets/css/`
- **Scripts**: Update JavaScript in `/assets/js/`
- **Images**: Add/replace images in `/assets/images/`
- **Navigation**: Update `components/header.html` for menu items
- **Footer**: Update `components/footer.html` for footer links

### Path References

All paths are **relative** for compatibility with both local file access and deployed hosting:

```html
<!-- ✅ Correct: Relative paths -->
<link rel="stylesheet" href="assets/css/global.css">
<img src="assets/images/logo.png" alt="Logo">
<a href="pages/news.html">News</a>
<a href="/">Home</a>

<!-- ❌ Avoid: Absolute paths that break in different contexts -->
<link rel="stylesheet" href="/assets/css/global.css">
<img src="/public/assets/images/logo.png">
```

## Deployment

### GitHub Pages (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Update website"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to repository **Settings** → **Pages**
   - Select **Source**: `main` branch, `/root` folder
   - Choose a theme (optional)
   - Your site will be live at: `https://yourusername.github.io/windburn`

3. **Custom Domain** (optional):
   - Add `CNAME` file with your domain
   - Configure DNS settings with your registrar
   - Site will be available at your custom domain

### Other Hosting Options

This static site works on any hosting provider:

- **Netlify**: Connect GitHub repo, auto-deploys
- **Vercel**: Similar to Netlify
- **AWS S3 + CloudFront**: Static website hosting
- **Traditional Web Host**: Upload files via FTP/SFTP
- **Local Server**: Serve with any web server (Apache, Nginx, etc.)

## Performance Optimization

The site is already optimized:
- **No external dependencies**: Pure HTML, CSS, JavaScript
- **Minimal JavaScript**: ~10KB total
- **Optimized CSS**: Single critical stylesheet, page-specific modules
- **Image optimization**: Use modern formats (WebP) for faster loading
- **No database**: Static files only = instant loading

### Further Optimization Tips

```bash
# Minimize CSS/JS (optional)
# Using tools like cssnano, terser, or online minifiers

# Compress images
# Use tools like ImageOptim, TinyPNG, or WebP conversion

# Add lazy loading (if desired)
# <img src="image.jpg" loading="lazy" alt="...">

# Cache control headers (configure on your host)
# Set browser cache expiration for assets
```

## File Editing Guide

### Adding a New Page

1. Create `pages/my-page.html`
2. Copy structure from existing page:
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8" />
     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
     <title>My Page - Windburn Multi-Sport Academy</title>
     <link rel="stylesheet" href="../assets/css/global.css" />
     <link rel="stylesheet" href="../assets/css/my-page.css" />
   </head>
   <body>
     <div id="header-placeholder"></div>
     <!-- Your content here -->
     <div id="footer-placeholder"></div>
     
     <script src="../assets/js/global.js"></script>
     <script>
       fetch("../components/header.html")
         .then(res => res.text())
         .then(data => {
           document.getElementById("header-placeholder").innerHTML = data;
           initStickyHeader();
           initPhoneMenu();
         });
       fetch("../components/footer.html")
         .then(res => res.text())
         .then(data => {
           document.getElementById("footer-placeholder").innerHTML = data;
         });
     </script>
   </body>
   </html>
   ```
3. Add navigation link in `components/header.html`
4. Add footer link in `components/footer.html`

### Adding New Styles

1. Create `assets/css/my-page.css` for page-specific styles
2. Global styles are in `assets/css/global.css`
3. Link in your HTML: `<link rel="stylesheet" href="../assets/css/my-page.css">`

### Adding New Images

1. Place images in `/assets/images/` (organize in subdirectories if needed)
2. Use relative paths: `<img src="assets/images/my-image.png">`
3. Always include `alt` attributes for accessibility

## Browser Compatibility

- ✅ Chrome, Safari, Firefox, Edge (latest versions)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ✅ IE 11+ (basic support, some CSS features may not work)

## SEO & Meta Tags

Each page includes:
- Title tags
- Meta descriptions
- Open Graph tags (for social sharing)
- Structured data (schema.org - optional enhancement)

Update these in each HTML file's `<head>` section.

## Accessibility

- ✅ Semantic HTML structure
- ✅ ARIA labels for navigation
- ✅ Alt text for images
- ✅ Keyboard navigation support
- ✅ Color contrast meets WCAG AA standards

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Images not loading | Check relative paths, ensure images are in `assets/images/` |
| Styles not applying | Verify CSS file path, check browser console for 404 errors |
| Navigation broken | Update links in `components/header.html` and `footer.html` |
| Page not found on deploy | Ensure all files are committed to git, check GitHub Pages settings |
| Font issues | Check if external fonts (FontAwesome) are loading |

## Tools & Resources

- **HTML Validator**: https://validator.w3.org/
- **CSS Validator**: https://jigsaw.w3.org/css-validator/
- **Lighthouse**: Built into Chrome DevTools for performance audits
- **Responsiveness Tester**: Chrome DevTools → Toggle device toolbar
- **Image Optimization**: https://tinypng.com/, https://squoosh.app/

## Git Workflow

```bash
# Clone the repository
git clone https://github.com/yourusername/windburn.git
cd windburn

# Create a feature branch
git checkout -b feature/new-page

# Make changes, then commit
git add .
git commit -m "Add new team page"

# Push and create pull request
git push origin feature/new-page
```

## License

© 2026 Windburn Multi-Sport Academy. All rights reserved.

## Contact

For questions about the website or to report issues:
- **Email**: info@windburn.ca
- **GitHub Issues**: [Report a bug or request a feature](https://github.com/yourusername/windburn/issues)

---

**Last Updated**: February 2026  
**Maintained by**: Windburn Multi-Sport Academy Web Team
