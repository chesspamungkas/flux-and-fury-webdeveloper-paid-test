# Drop Zero Digital - Web Developer Paid Test

A responsive, modular case studies page built for Drop Zero Digital's website. This project demonstrates front-end development skills, clean code structure, and the ability to convert a mockup into a functional, reusable webpage.

## 📁 Project Structure

```
├── index.html                 # Main HTML file
├── css/
│   ├── styles.css            # Main stylesheet with CSS custom properties
│   ├── styles.min.css        # Minified version (production)
│   ├── responsive.css        # Responsive breakpoint styles
│   └── responsive.min.css   # Minified version (production)
├── js/
│   ├── main.js               # Brand switching & interactions
│   └── main.min.js           # Minified version (production)
├── assets/
│   ├── logo.webp             # Header logo (desktop)
│   ├── logo-mobile.webp      # Header logo (mobile)
│   ├── hero.webp             # Hero section background
│   ├── DZD_logo_colored_transparent.webp      # Video poster (desktop)
│   ├── DZD_logo_colored_transparent-mobile.webp  # Video poster (mobile)
│   ├── jamali-garden/        # Jamali Garden case study assets
│   │   ├── jamali-garden-stats-chart.webp      # Stats chart (desktop)
│   │   ├── jamali-garden-stats-chart-mobile.webp  # Stats chart (mobile)
│   │   ├── email-1.webp      # Email template 1 (desktop)
│   │   ├── email-1-mobile.webp  # Email template 1 (mobile)
│   │   ├── email-2.webp      # Email template 2 (desktop)
│   │   ├── email-2-mobile.webp  # Email template 2 (mobile)
│   │   ├── email-3.webp      # Email template 3 (desktop)
│   │   ├── email-3-mobile.webp  # Email template 3 (mobile)
│   │   └── jamali-garden-video.mp4
│   ├── wateranywhere/        # WaterAnywhere case study assets
│   │   ├── wateranywhere-stats-chart.webp      # Stats chart (desktop)
│   │   └── wateranywhere-stats-chart-mobile.webp  # Stats chart (mobile)
│   └── fromental/            # Fromental case study assets
│       ├── fromental-stats-chart.webp          # Stats chart (desktop)
│       └── fromental-stats-chart-mobile.webp  # Stats chart (mobile)
├── fonts/
│   ├── BBHSansHegarty-Regular.woff2
│   └── SilkSerif-MediumItalic.woff2
├── .gitignore                # Git ignore rules
├── .htaccess                 # Apache server configuration (compression, caching, security)
├── vercel.json               # Vercel deployment configuration
├── robots.txt                # SEO robots file
└── README.md                 # This file
```

## 🚀 Quick Start

### Local Development

Simply open `index.html` in a browser. No build process required.

**Prerequisites:**

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server recommended (for testing CORS, proper file paths, and Lighthouse audits)

**Using a Local Server (Recommended):**

```bash
# Python 3
python -m http.server 8000

# Node.js (with http-server)
npx http-server

# PHP
php -S localhost:8000

# VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

Then open `http://localhost:8000` in your browser.

**Note:** The project uses minified CSS/JS files in production. For development, you can switch to unminified versions in `index.html` if needed.

### Deployment

Upload all files to any static hosting service:

- **Vercel** (Recommended): Import project with "Other" framework (compression enabled via `vercel.json`)
- **Netlify**: Drag & drop the folder or connect your repo
- **Apache Server**: Upload all files including `.htaccess` (compression enabled automatically)
- **GitHub Pages**: Push to repo and enable Pages in settings (compression handled by GitHub)

**Note:**

- Compression is automatically enabled via configuration files (`.htaccess`, `vercel.json`) depending on your hosting platform
- The project uses minified CSS/JS files (`*.min.css`, `*.min.js`) for optimal performance
- All images are optimized in WebP format with responsive versions for mobile devices

## ✨ Features

### Brand Tab Switching

The page supports three brands with smooth tab-based switching:

- **Jamali Garden** (default) — Full case study with custom assets
- **WaterAnywhere** — Placeholder content with unique styling
- **Fromental** — Placeholder content with luxury theme

**Interaction Methods:**

1. Click any brand tab in the hero section
2. Direct URL linking: `yoursite.com/case-studies.html#wateranywhere`
3. Programmatic API: `window.DZD.switchBrand('fromental')`

### Responsive Design

Fully responsive across all device sizes:

| Element      | Desktop      | Tablet               | Mobile            |
| ------------ | ------------ | -------------------- | ----------------- |
| Brand tabs   | Horizontal   | Horizontal (smaller) | Vertical stack    |
| Results grid | 2 columns    | 1 column             | 1 column          |
| Timeline     | Horizontal   | Wrapped 2x2          | Vertical          |
| Gallery      | Side by side | Stacked              | Horizontal scroll |
| Video        | Side by side | Stacked              | Stacked           |

### Accessibility Features

- Semantic HTML5 structure
- ARIA attributes on interactive elements
- Keyboard navigation support
- Focus states on all interactive elements
- Reduced motion support (`prefers-reduced-motion`)
- Proper alt text on images

### SEO & Best Practices

- Comprehensive meta tags (description, Open Graph, Twitter Cards)
- `robots.txt` for search engine crawlers
- Semantic HTML structure
- Optimized font loading with preconnect and `display=swap`
- Image optimization (WebP format with responsive `srcset`)
- Critical CSS inlined for faster LCP
- Minified CSS/JS files for production
- LCP image preloading
- `.gitignore` for version control

## 🔄 Modifying Brand Content

### Structure

Each brand has its own `<article class="case-study">` element:

```html
<article class="case-study" id="brand-name" data-brand="brand-name" hidden>
  <!-- Hero Banner, Results, Timeline, Gallery, Video sections -->
</article>
```

### To Update Jamali Garden Content

1. Replace images in `assets/jamali-garden/` with updated assets
   - **Note**: Images should be in WebP format
   - Create both desktop and mobile versions (e.g., `image.webp` and `image-mobile.webp`)
   - Update `srcset` attributes in HTML for responsive images
2. Update text content in the `#jamali-garden` article
3. Replace video file if needed: `jamali-garden-video.mp4`

### To Update WaterAnywhere or Fromental

1. Locate the article with matching `data-brand`
2. Replace placeholder divs with actual images
3. Update text content

### Adding a New Brand

1. Add a new tab button:

```html
<button class="brand-tab" data-brand="new-brand">NEW BRAND</button>
```

2. Add a new article section:

```html
<article class="case-study" id="new-brand" data-brand="new-brand" hidden>
  <!-- Copy structure from existing brands -->
</article>
```

3. Update `checkUrlHash()` in `main.js` to include the new brand ID.

## 🎨 CSS Customization

### Design Tokens

All design values are CSS custom properties in `:root`:

```css
:root {
  /* Primary Colors */
  --color-teal: #008b8b;
  --color-orange: #e97132;
  --color-navy-dark: #0f0f1a;

  /* Typography */
  --font-primary: "Poppins", sans-serif;
  --font-serif: "Playfair Display", serif;

  /* Spacing Scale */
  --space-4: 1rem;
  --space-8: 2rem;
  --space-16: 4rem;

  /* And more... */
}
```

### Breakpoints

Defined in `responsive.css`:

- **4K/5K Desktop**: > 2560px
- **2K Desktop**: 1920px - 2560px
- **Large Desktop**: 1400px - 1920px
- **Desktop**: 1024px - 1400px
- **Tablet**: 768px - 1024px
- **Mobile**: 480px - 768px
- **Small Mobile**: < 480px

## 🔧 Integration Guide

### Static Site Integration

```html
<!-- In <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap"
  rel="stylesheet"
/>
<!-- Preload critical resources -->
<link rel="preload" as="style" href="css/styles.min.css" />
<link rel="preload" as="style" href="css/responsive.min.css" />
<link rel="preload" as="image" href="assets/hero.webp" fetchpriority="high" />
<!-- Stylesheets -->
<link rel="stylesheet" href="css/styles.min.css" />
<link rel="stylesheet" href="css/responsive.min.css" />

<!-- Before </body> -->
<script src="js/main.js" defer></script>
```

### WordPress Integration

```php
// In functions.php
function dzd_enqueue_assets() {
    // Use minified files in production, unminified in development
    $suffix = (defined('WP_DEBUG') && WP_DEBUG) ? '' : '.min';

    wp_enqueue_style('dzd-styles', get_template_directory_uri() . '/css/styles' . $suffix . '.css');
    wp_enqueue_style('dzd-responsive', get_template_directory_uri() . '/css/responsive' . $suffix . '.css');
    wp_enqueue_script('dzd-main', get_template_directory_uri() . '/js/main' . $suffix . '.js', array(), '1.0', true);
}
add_action('wp_enqueue_scripts', 'dzd_enqueue_assets');
```

### Header/Footer

The header and footer in `index.html` can be replaced with your existing site components. The case study content is self-contained within `<main>`.

## 📜 JavaScript API

```javascript
// Switch to a specific brand
window.DZD.switchBrand("wateranywhere");

// Get current brand
const current = window.DZD.getCurrentBrand();
// Returns: 'jamali-garden', 'wateranywhere', or 'fromental'
```

## 📦 Dependencies

**None!** This project uses vanilla HTML, CSS, and JavaScript only.

**External Resources:**

- Google Fonts: Poppins (300-900), Bebas Neue, Cormorant Garamond

**Custom Fonts:**

- BBH Sans (BBHSansHegarty-Regular.woff2)
- Silk Serif (SilkSerif-MediumItalic.woff2)

**Image Format:**

- All images use WebP format for optimal performance
- Responsive images with `srcset` for mobile/desktop versions
- Images are optimized and compressed for web delivery

## 🌐 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile Safari (iOS 13+)
- Chrome for Android

## 🛠️ Project Files & Configuration

### Essential Files

- **`.gitignore`** - Excludes unnecessary files from version control (node_modules, build files, OS files, minified files)
- **`robots.txt`** - Guides search engine crawlers for better SEO
- **`.htaccess`** - Apache server configuration (compression, caching, security headers)
- **`vercel.json`** - Vercel deployment configuration (compression, headers, redirects)

### Documentation

- **`README.md`** - This file, project overview and usage guide (includes integration instructions)

### Meta Tags & SEO

The HTML includes comprehensive meta tags:

- Meta description for search engines
- Open Graph tags for social media sharing (Facebook, LinkedIn)
- Twitter Card tags for Twitter sharing
- Favicon references for browser tabs

## 📝 Testing Checklist

### Functionality

- [ ] Brand tabs switch correctly with fade animation
- [ ] All three brands display their content
- [ ] URL hash changes when switching brands
- [ ] Direct linking via hash works (refresh with `#wateranywhere`)
- [ ] Mobile menu opens/closes properly
- [ ] Video play button shows/hides on interaction
- [ ] Keyboard navigation works on all interactive elements

### Responsive Design

- [ ] Responsive layouts work on all breakpoints
- [ ] Images scale properly on mobile devices
- [ ] Timeline adapts correctly (horizontal → vertical on mobile)
- [ ] Gallery scrolls horizontally on mobile

### SEO & Performance

- [ ] Meta tags are properly set
- [ ] `robots.txt` is accessible
- [ ] Images have descriptive alt text and proper `width`/`height` attributes
- [ ] Responsive images with `srcset` work correctly
- [ ] Fonts load correctly with preconnect
- [ ] LCP image (hero.webp) preloads correctly
- [ ] Minified CSS/JS files are used in production
- [ ] No console errors
- [ ] Lighthouse scores meet targets (Performance, Accessibility, Best Practices, SEO)

### Accessibility

- [ ] Screen reader compatibility
- [ ] Focus states visible on all interactive elements
- [ ] Color contrast meets WCAG standards
- [ ] Reduced motion preferences respected

## 🔄 Version History

- **v1.2.0** - Image optimization & performance improvements

  - Converted all images to WebP format for better performance
  - Added responsive images with `srcset` for mobile/desktop versions
  - Implemented `<picture>` element for stats charts
  - Added JavaScript-based responsive video poster
  - Minified CSS and JavaScript files
  - Added critical CSS inline for faster LCP
  - Optimized image loading with `loading="lazy"` and `decoding="async"`
  - Added LCP image preloading
  - Improved Lighthouse scores (Performance, SEO, Accessibility)
  - Updated deployment configurations (Vercel, Apache)

- **v1.1.0** - Best practices improvements

  - Added `.gitignore` for version control
  - Added `robots.txt` for SEO
  - Enhanced HTML meta tags (Open Graph, Twitter Cards)
  - Added favicon references
  - Added server configuration files (`.htaccess`, `vercel.json`)

- **v1.0.0** - Initial release
  - Complete case studies page
  - Brand switching functionality
  - Responsive design across all breakpoints
  - Accessibility features
  - Custom assets for Jamali Garden

---

**Built for Drop Zero Digital**
