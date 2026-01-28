# BetterVitals Design System

A clinical, data-driven aesthetic for health optimization and longevity gear.

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Vite** | 6.2.0 | Build tool and dev server |
| **React** | 19.2.4 | UI framework |
| **TypeScript** | 5.8.2 | Type safety |
| **Tailwind CSS** | CDN | Utility-first styling |
| **Google GenAI** | 1.38.0 | AI-powered assessments |

### Project Structure

```
bettervitals/
├── components/       # Reusable UI components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ToolCard.tsx
│   ├── ProductCard.tsx
│   ├── MegaMenu.tsx
│   └── AssessmentModal.tsx
├── pages/            # Page components
│   ├── Home.tsx
│   ├── Tools.tsx
│   ├── Discovery.tsx
│   ├── CategoryPage.tsx
│   └── About.tsx
├── services/         # API integrations
│   └── geminiService.ts
├── utils/            # Shared utilities
│   └── categoryColors.ts
├── constants.tsx     # Data constants
├── types.ts          # TypeScript interfaces
└── App.tsx           # Main app with routing
```

---

## Brand Identity

**Tone**: Scientific, clinical, authoritative, minimal
**Personality**: Brutally honest, data-driven, no-nonsense

---

## Colors

### Primary Palette

| Name | Hex | Usage |
|------|-----|-------|
| **Primary Blue** | `#359EFF` | CTAs, links, accents, hover states |
| **Scientific Blue** | `#0a2472` | Headings, primary buttons, brand identity |
| **Silver** | `#e2e8f0` | Borders, dividers |
| **Analytical Gray** | `#94a3b8` | Secondary text, metadata |

### Background Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Background Light** | `#f5f7f8` | Page background (light mode) |
| **Background Dark** | `#0f1923` | Page background (dark mode) |
| **White** | `#ffffff` | Cards, containers |
| **Slate 50** | `#f8fafc` | Card image backgrounds, subtle fills |
| **Slate 100** | `#f1f5f9` | Borders, dividers, badges |

### Category Colors

| Category | Background | Text | Border |
|----------|------------|------|--------|
| Sleep | `bg-blue-50` | `text-blue-600` | `border-blue-100` |
| Metabolic | `bg-orange-50` | `text-orange-600` | `border-orange-100` |
| Labs | `bg-purple-50` | `text-purple-600` | `border-purple-100` |
| Wearables | `bg-emerald-50` | `text-emerald-600` | `border-emerald-100` |
| Recovery | `bg-rose-50` | `text-rose-600` | `border-rose-100` |

### Semantic Colors

| Purpose | Color |
|---------|-------|
| Success/Positive | `text-primary` (#359EFF) with `check_circle` icon |
| Negative/Con | `text-slate-400` with `cancel` icon, 60% opacity |

### Color Utilities

Category colors are managed via shared utilities in `utils/categoryColors.ts`:

```typescript
import { getCategoryColor, getCategoryColorDark } from '../utils/categoryColors';

// Standard variant (light backgrounds)
getCategoryColor('Sleep')     // 'bg-blue-50 text-blue-600 border-blue-100'
getCategoryColor('Metabolic') // 'bg-orange-50 text-orange-600 border-orange-100'

// Dark variant (featured cards, emphasis)
getCategoryColorDark('Sleep')     // 'bg-blue-100 text-blue-700'
getCategoryColorDark('Metabolic') // 'bg-orange-100 text-orange-700'
```

**Usage:**
- `getCategoryColor()` — Used in `ToolCard` for category badges
- `getCategoryColorDark()` — Used in `Tools` page for featured card badges

---

## Typography

### Font Families

```css
font-sans: 'Inter', sans-serif;      /* Body text, UI elements */
font-display: 'Playfair Display', serif;  /* Accent/italic headings */
```

### Type Scale

| Element | Classes | Example |
|---------|---------|---------|
| **Hero Heading** | `text-5xl lg:text-7xl font-black leading-tight tracking-tighter` | Main page title |
| **Section Title** | `text-2xl font-black uppercase tracking-tight` | Featured Tools |
| **Section Label** | `text-xs font-black tracking-[0.3em] uppercase text-primary` | "The Process", "Diagnostic Intelligence" |
| **Card Title** | `font-black text-sm uppercase tracking-tight` | Tool/Product names |
| **Body Text** | `text-xl text-slate-500 font-light leading-relaxed` | Hero description |
| **Small Text** | `text-[11px] text-slate-500 leading-relaxed` | Card descriptions |
| **Micro Text** | `text-[9px] font-black uppercase tracking-widest` | Badges, metadata |
| **Button Text** | `text-[10px] font-black uppercase tracking-widest` | All buttons |

### Text Colors

| Usage | Class |
|-------|-------|
| Primary headings | `text-scientific-blue` / `dark:text-white` |
| Accent/italic text | `text-primary` with `font-serif italic` |
| Body text | `text-slate-500` / `dark:text-slate-400` |
| Metadata/labels | `text-slate-400` |

---

## Spacing

### Section Spacing

| Element | Margin |
|---------|--------|
| Between sections | `mb-24` (96px) |
| Section header to content | `mb-8` (32px) or `mb-12` (48px) |
| Between grid items | `gap-4` (16px) or `gap-8` (32px) |

### Container

```
max-w-[1200px] mx-auto px-6 py-12
```

---

## Components

### Buttons

#### Primary Button (Filled)
```jsx
className="bg-scientific-blue text-white h-14 px-10 rounded-sm font-black text-sm uppercase tracking-widest hover:bg-primary hover:text-scientific-blue transition-all shadow-lg active:scale-95"
```

#### Secondary Button (Outline)
```jsx
className="border-2 border-slate-200 text-slate-900 h-14 px-10 rounded-sm font-black text-sm uppercase tracking-widest hover:border-primary transition-all active:scale-95"
```

#### Card Button (Full Width)
```jsx
className="w-full bg-slate-900 text-white py-2 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-scientific-blue transition-all"
```

#### Text Link Button
```jsx
className="text-[10px] font-black uppercase tracking-widest hover:text-primary hover:underline"
```

### Cards

#### Base Card
```jsx
className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm hover:border-primary transition-all"
```

#### Tool Card
- Padding: `p-6`
- Flex column: `flex flex-col h-full`
- Divider: `h-px bg-slate-100 w-full mb-4`

#### Product Card
- Image area: `h-44 bg-slate-50 grayscale group-hover:grayscale-0`
- Content padding: `p-4`
- Tag: `absolute top-2 left-2 bg-scientific-blue text-white text-[8px] font-black px-1.5 py-0.5`

### Badges

#### Category Badge
```jsx
className="text-[8px] font-black px-2 py-0.5 rounded-full border uppercase tracking-widest w-fit"
```

#### Time Badge
```jsx
className="text-[9px] font-black bg-slate-100 px-2 py-1 rounded-sm uppercase tracking-widest text-slate-500"
```

### Section Headers

```jsx
<div className="flex items-end justify-between mb-8 pb-4 border-b border-slate-100">
  <div>
    <h2 className="text-xs font-black tracking-[0.3em] uppercase text-primary mb-1">
      Section Label
    </h2>
    <h3 className="text-2xl font-black text-scientific-blue uppercase tracking-tight">
      Section Title
    </h3>
  </div>
  <button className="text-[10px] font-black uppercase tracking-widest hover:underline">
    View all
  </button>
</div>
```

---

## Grid Layouts

### Tool Grid (4 columns)
```jsx
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
```

### Product Grid (4 columns)
```jsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
```

### How It Works (3 columns)
```jsx
className="grid grid-cols-1 md:grid-cols-3 gap-8"
```

### System Hierarchy (5 columns)
```jsx
className="grid grid-cols-2 md:grid-cols-5 gap-px"
```

---

## Interactions & Animations

### Hover States

| Element | Effect |
|---------|--------|
| Cards | `hover:border-primary hover:shadow-xl` |
| Images | `grayscale group-hover:grayscale-0 transition-all duration-500` |
| Buttons | `hover:bg-primary hover:text-scientific-blue active:scale-95` |
| Icons | `group-hover:text-primary group-hover:scale-110 transition-all` |
| Links | `hover:underline` or `hover:text-primary` |

### Transitions

```jsx
transition-all          /* Default for most elements */
duration-500            /* Image grayscale animations */
duration-700            /* Longer grayscale fades */
duration-1000           /* Hero image grayscale */
```

### Page Entrance
```jsx
className="animate-in fade-in duration-500"
```

---

## Icons

**Library**: Material Symbols Outlined (Google)

### Icon Settings
```css
font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
```

### Common Icons

| Purpose | Icon Name |
|---------|-----------|
| Sleep | `hotel` |
| Labs | `science` |
| Metabolic | `ecg_heart` |
| Wearables | `watch` |
| Recovery | `spa` |
| Performance | `fitness_center` |
| Quiz/Tool | `quiz` |
| Analytics | `analytics` |
| Shopping | `shopping_cart_checkout` |
| Arrow | `arrow_forward` |
| Check | `check_circle` |
| Cancel | `cancel` |

### Icon Sizes

| Context | Size |
|---------|------|
| Hero/Feature | `text-6xl` |
| Card icon | `text-2xl` |
| Button icon | `text-xs` |
| List icon | `text-[12px]` |

---

## Dark Mode

All components support dark mode via `dark:` variants:

```jsx
bg-white dark:bg-slate-900
text-slate-900 dark:text-slate-100
border-slate-200 dark:border-slate-800
text-slate-500 dark:text-slate-400
```

---

## Tailwind Configuration

Custom theme defined in `index.html`:

```javascript
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#359EFF",
        "scientific-blue": "#0a2472",
        silver: "#e2e8f0",
        "analytical-gray": "#94a3b8",
        "background-light": "#f5f7f8",
        "background-dark": "#0f1923"
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Playfair Display', 'serif']
      }
    }
  }
}
```

### Custom CSS Classes

Defined in `index.html` `<style>` block:

| Class | Purpose |
|-------|---------|
| `.serif-heading` | Applies Playfair Display font for accent headings |
| `.material-symbols-outlined` | Icon font settings (weight 300, no fill) |

---

## Design Principles

1. **Clinical Precision**: Use uppercase, tight tracking, and structured layouts
2. **Data-First**: Lead with metrics, badges, and categorization
3. **Minimal Color**: Mostly grayscale with strategic primary blue accents
4. **Visual Hierarchy**: Clear section labels → section titles → content
5. **Interaction Feedback**: Grayscale-to-color on hover, scale on click
6. **Brutally Honest**: Show pros AND cons, no marketing fluff

---

## Development Notes

### Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Environment Variables

| Variable | Purpose |
|----------|---------|
| `API_KEY` | Google GenAI API key (defined in `.env.local`)
