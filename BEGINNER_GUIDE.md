# Beginner Guide: Taking Windburn Live

This guide is written for non-developers and explains how to turn this project into the real website for `www.windburnraceteam.ca`.

## 1. What You Have Right Now

This project is a static website:
- HTML = page content
- CSS = styling
- JavaScript = interactivity
- No required database

This is good. Static sites are fast, affordable, and easier to maintain.

## 2. New Production Files Added For You

These files were added to make the project more launch-ready without changing site design:
- `.github/workflows/deploy-github-pages.yml`: automatic deploy from GitHub
- `netlify.toml`: production hosting config (headers + serverless function settings)
- `netlify/functions/health.js`: backend health endpoint (`/.netlify/functions/health`)
- `netlify/functions/contact.js`: starter backend endpoint for contact submissions
- `.env.example`: backend environment variable template
- `robots.txt`: tells search engines how to crawl
- `sitemap.xml`: list of important pages for SEO
- `404.html`: fallback page for invalid URLs
- `CNAME.example`: custom domain example file

## 3. Choose Your Hosting Path

Pick ONE path below.

### Path A (Easiest): Netlify + Custom Domain
Use this if you want simple setup, easy DNS, and optional backend functions.

### Path B: GitHub Pages + Custom Domain
Use this if you want only static hosting through GitHub (no serverless backend unless separate service).

## 4. Recommended Path: Netlify

## Step 1: Push this repo to GitHub

```bash
git add .
git commit -m "Production readiness setup"
git push origin main
```

## Step 2: Create Netlify site
1. Sign in to Netlify.
2. Click "Add new site" -> "Import from Git".
3. Select your Windburn repository.
4. Build command: leave blank.
5. Publish directory: `.`
6. Deploy.

## Step 3: Add domain `www.windburnraceteam.ca`
1. In Netlify: Site settings -> Domain management -> Add custom domain.
2. Add `www.windburnraceteam.ca`.
3. Netlify will show DNS records to create at your domain registrar.

## Step 4: DNS changes at your registrar
Typical setup:
- `CNAME` record: `www` -> `your-site-name.netlify.app`
- Optional root domain (`windburnraceteam.ca`) forwarding to `www`.

Do not delete old records until Netlify confirms the new domain is active.

## Step 5: Turn on HTTPS
Netlify can automatically issue SSL certificates once DNS is correct. Make sure HTTPS is enabled.

## 5. If You Prefer GitHub Pages

1. In GitHub repo settings, enable Pages for `main` branch.
2. The included GitHub Actions workflow will publish automatically.
3. Add a real `CNAME` file (copy `CNAME.example` to `CNAME`) containing:
   `www.windburnraceteam.ca`
4. Add DNS records at registrar that point to GitHub Pages.

Note: GitHub Pages does not run Netlify serverless functions.

## 6. Basic Backend (Already Scaffolded)

You now have two backend endpoints (Netlify Functions):
- Health check: `/.netlify/functions/health`
- Contact endpoint: `/.netlify/functions/contact` (POST)

The contact endpoint forwards form data to another service using `CONTACT_FORWARD_URL`.

Set these in your host environment variables:
- `CONTACT_FORWARD_URL` (required)
- `ALLOWED_ORIGIN` (recommended)

## 7. Safe Launch Checklist

Before switching the real domain:
1. Confirm all pages load and links work.
2. Confirm mobile menu works on real phones.
3. Confirm images load quickly.
4. Confirm `404.html` is served for bad URLs.
5. Confirm `robots.txt` and `sitemap.xml` load.
6. Confirm SSL certificate is active.
7. Confirm contact flow works end-to-end.
8. Keep old site live until final verification is complete.

## 8. How To Update Content Later

Common edits:
- Text/content: edit files in `pages/`
- Main home page: `index.html`
- Header/footer menus: `components/header.html`, `components/footer.html`
- Styling: `assets/css/`
- Images: `assets/images/`

Typical update process:
```bash
git add .
git commit -m "Update site content"
git push origin main
```

Your host auto-deploys from GitHub.

## 9. What To Learn Next (Beginner-Friendly)

Focus in this order:
1. HTML basics (headings, links, images, sections)
2. CSS basics (selectors, layout, spacing, responsive design)
3. Browser DevTools (inspect elements, console errors, network tab)
4. Git basics (commit, push, rollback)
5. DNS basics (A record, CNAME, TTL)

## 10. When You Are Ready For More Advanced Features

If the business later needs:
- online payments,
- user accounts,
- athlete dashboards,
- admin content editing,

then move to a larger architecture (for example: CMS + API + database). For now, this static approach is the fastest and safest way to replace the old website.

## 11. Important Domain Ownership Notes

To replace the current live website, you must have access to:
- domain registrar account for `windburnraceteam.ca`
- DNS management
- current hosting account (optional but helpful for rollback)

Without DNS access, no one can switch the live site.

## 12. Quick Recovery Plan

If something goes wrong after launch:
1. Revert DNS records back to old host.
2. Roll back to previous deploy in Netlify/GitHub.
3. Fix issue in this repo and redeploy.

Having this rollback path protects the business from downtime.
