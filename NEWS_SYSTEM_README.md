# Windburn News (GitHub Pages Compatible)

This version is fully static and works on GitHub Pages. News posts live in a JSON file that the page loads at runtime.

## How to Add or Edit News

1) Open [data/news.json](data/news.json)
2) Add, edit, or remove items in the array
3) Commit and push to GitHub
4) GitHub Pages will publish the updates automatically

### News Item Format
Each item must have these fields:

```json
{
   "id": 1,
   "title": "RM Triathlon Registration Now Open",
   "excerpt": "Short summary shown on the news card.",
   "content": "Optional full text (not currently shown).",
   "month": "Jan",
   "day": 15,
   "date": "2026-01-15T00:00:00Z",
   "author": "Coach Dave",
   "link": "/src/pages/sub-pages/register.html"
}
```

## Run Locally

```bash
npm run serve
```

Open:
- **News Page**: http://localhost:8000/src/pages/news.html

## Notes

- GitHub Pages can only host static files, so there is no login or admin panel.
- If you want private posting later, use a CMS or a hosted API.
