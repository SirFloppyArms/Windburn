# Windburn Multi-Sport Academy Website

A modern, responsive website for Windburn Multi-Sport Academy featuring information about the competitive triathlon team and development programs.

## Project Structure

```
windburn/
├── index.html                 # Root entry point (redirects to src/pages/index.html)
├── .gitignore                 # Git ignore rules
│
├── src/                       # Source code directory
│   ├── pages/                # Page templates
│   │   ├── index.html        # Home page
│   │   ├── windburn-race-team.html
│   │   ├── rm-triathlon.html
│   │   └── news.html
│   │
│   ├── components/           # Reusable components
│   │   ├── header/          # Header component
│   │   │   ├── header.html
│   │   │   ├── header.css
│   │   │   └── header.js
│   │   │
│   │   └── footer/          # Footer component
│   │       ├── footer.html
│   │       ├── footer.css
│   │       └── footer.js
│   │
│   └── styles/              # Global stylesheets & scripts
│       ├── global.css       # Main stylesheet (formerly home.css)
│       └── global.js        # Main JavaScript (formerly home.js)
│
├── public/                   # Static assets
│   └── assets/
│       └── images/
│           ├── header_logo.png
│           ├── logo.png
│           ├── devo_logo.png
│           ├── favicon.ico
│           └── partners/      # Partner logos
│               └── partner1.png through partner29.png
│
└── docs/                     # Documentation
    └── README.md            # This file
```

## Key Features

- **Modular Component Structure**: Header and footer are separate reusable components
- **Organized Assets**: All images centralized in `public/assets/`
- **Scalable Architecture**: Easy to add new pages and components
- **Responsive Design**: Mobile-friendly layout using CSS flexbox
- **Dynamic Content Loading**: Header and footer load dynamically via JavaScript

## Getting Started

### Prerequisites

- A modern web browser
- A local development server (recommended for local testing)

### Running Locally

**Option 1: Python (Python 3)**
```bash
cd /Users/nolanlaw/Developer/HTML-apps/Windburn
python3 -m http.server 8000
# Visit http://localhost:8000
```

**Option 2: Node.js**
```bash
cd /Users/nolanlaw/Developer/HTML-apps/Windburn
npx http-server
```

**Option 3: VS Code Live Server**
Install the "Live Server" extension and click "Go Live"

## File Path References

All internal paths use relative navigation:

- From `src/pages/*.html`: 
  - Styles: `../styles/global.css`
  - Components: `../components/header/header.html`
  - Images: `../../public/assets/images/logo.png`

## Future Expansion Guidelines

### Adding New Pages
1. Create new `.html` in `src/pages/`
2. Copy the header/footer imports from an existing page
3. Update `src/components/header/header.html` navigation

### Adding Components
1. Create folder in `src/components/YourComponent/`
2. Add `.html`, `.css`, `.js` files
3. Use consistent naming conventions

### Organizing Styles
The current `global.css` can be split into:
- `base.css` - Reset & typography
- `layout.css` - Layout utilities
- `components.css` - Component styles
- `utils.css` - Utility classes

## Browser Support

- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers (iOS Safari, Chrome Android)
