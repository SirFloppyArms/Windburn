# Quick Reference - Windburn Website Structure

## 🎯 Your New Project Layout

```
windburn/
├── index.html                    (Homepage - entry point)
├── README.md                     (Developer guide)
├── REFACTORING_SUMMARY.md        (What changed)
├── VERIFICATION_CHECKLIST.md     (Testing guide)
├── .gitignore                    (Git exclusions)
│
├── assets/                       (All static resources)
│   ├── css/                      (9 stylesheets)
│   ├── js/                       (5 scripts)
│   └── images/                   (60+ images)
│
├── components/                   (Reusable HTML)
│   ├── header.html
│   ├── footer.html
│   └── partners.html
│
└── pages/                        (All pages)
    ├── index.html
    ├── news.html
    ├── windburn-race-team.html
    ├── rm-triathlon.html
    ├── press-awards.html
    ├── admin.html
    └── sub-pages/
        ├── coaches.html
        ├── devo_team.html
        └── register.html
```

## 🔗 Path Reference

### From Root (`index.html`)
```html
<link rel="stylesheet" href="assets/css/global.css">
<script src="assets/js/header.js"></script>
<img src="assets/images/logo.png">
<a href="pages/news.html">News</a>
<a href="/">Home</a>
```

### From Pages (`pages/*.html`)
```html
<link rel="stylesheet" href="../assets/css/global.css">
<script src="../assets/js/header.js"></script>
<img src="../assets/images/logo.png">
<a href="../">Home</a>
<a href="sub-pages/coaches.html">Coaches</a>
```

### From Sub-Pages (`pages/sub-pages/*.html`)
```html
<link rel="stylesheet" href="../../assets/css/global.css">
<script src="../../assets/js/header.js"></script>
<img src="../../assets/images/logo.png">
<a href="../../">Home</a>
<a href="../windburn-race-team.html">Race Team</a>
```

## 📝 Editing Files

### Edit Homepage
- File: `/index.html`
- Stylesheet: `/assets/css/index-header.css`

### Edit Navigation
- File: `/components/header.html`
- Stylesheet: `/assets/css/header.css`
- Script: `/assets/js/header.js`

### Edit Footer
- File: `/components/footer.html`
- Stylesheet: `/assets/css/footer.css`
- Script: `/assets/js/footer.js` (if needed)

### Add New Page
1. Create `/pages/my-page.html`
2. Copy structure from existing page
3. Create `/assets/css/my-page.css` if needed
4. Update `/components/header.html` with link
5. Update `/components/footer.html` with link

### Add New Image
1. Place in `/assets/images/` (or subdirectory)
2. Use relative path: `<img src="assets/images/my-image.png">`
3. Always add `alt` text for accessibility

## 🚀 Deployment

### Test Locally
```bash
python3 -m http.server 8000
# Open http://localhost:8000
```

### Deploy to GitHub Pages
```bash
git add .
git commit -m "Update website"
git push origin main

# Then in GitHub:
# Settings → Pages → Select main branch, /root folder
```

### Custom Domain
```bash
# Add CNAME file with your domain
echo "yourdomain.com" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push

# Configure DNS at your registrar
```

## 📊 File Inventory

| Type | Location | Count |
|------|----------|-------|
| HTML | `/pages/` + `/components/` | 13 |
| CSS | `/assets/css/` | 9 |
| JavaScript | `/assets/js/` | 5 |
| Images | `/assets/images/` | 60+ |

## ✅ Before Publishing

- [ ] Test all links work
- [ ] Check all images display
- [ ] Test on mobile (F12 device mode)
- [ ] Check console for errors (F12)
- [ ] Verify footer links
- [ ] Test navigation menu

## 💡 Common Tasks

**Update site title:**
- Edit `<title>` in each HTML file's `<head>`

**Change logo:**
- Replace `/assets/images/header_logo.png`
- Update `src` in `/components/header.html`

**Add new navigation link:**
- Edit both sections in `/components/header.html`:
  - Desktop menu
  - Mobile menu

**Change footer text:**
- Edit `/components/footer.html`

**Add custom styles:**
- Add to relevant CSS file in `/assets/css/`

## 🔍 Troubleshooting

| Problem | Solution |
|---------|----------|
| Images not loading | Check relative path, ensure image exists |
| Styles not applied | Verify CSS file path in `<link>` tag |
| Links broken | Check path structure (../ for pages) |
| Navigation menu broken | Update `/components/header.html` |

## 📚 Documentation

- **README.md** - Full developer guide
- **REFACTORING_SUMMARY.md** - What changed
- **VERIFICATION_CHECKLIST.md** - Testing guide
- **This file** - Quick reference

---

**Ready to deploy! Questions? See README.md** ✨
