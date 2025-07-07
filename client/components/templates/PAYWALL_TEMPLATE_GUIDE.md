# Paywall Landing Page Template

A highly customizable, conversion-optimized paywall landing page template that you can easily adapt for any project.

## Features

✅ **Fully Customizable Colors** - Brand colors, text colors, backgrounds  
✅ **Configurable Content** - Headlines, features, pricing, testimonials  
✅ **Mobile Responsive** - Optimized for all screen sizes  
✅ **High Conversion Design** - Professional paywall layout  
✅ **Reusable Components** - Modular pricing cards and feature cards  
✅ **TypeScript Support** - Full type safety

## Quick Start

```tsx
import { PaywallLandingTemplate } from "./templates/PaywallLandingTemplate";
import { Camera, Palette, Sparkles } from "lucide-react";

const config = {
  colors: {
    primary: "#your-brand-color", // Main brand color
    secondary: "#your-secondary", // Secondary color
    accent: "#your-accent", // Accent color
    text: "#your-text-color", // Primary text
    textSecondary: "#your-gray", // Secondary text
  },
  content: {
    badge: {
      icon: <Sparkles className="w-4 h-4" />,
      text: "NEW FEATURE ANNOUNCEMENT",
    },
    headline: {
      main: "THE FUTURE OF",
      highlighted: "YOUR PRODUCT NAME", // Gets highlighted background
    },
    description: "Your compelling value proposition goes here...",

    // Add your stats, features, testimonials, pricing plans...
  },
  onGetAccess: () => {
    // Handle premium upgrade
  },
  onStartFree: () => {
    // Handle free trial
  },
};

function MyPaywall() {
  return <PaywallLandingTemplate {...config} />;
}
```

## Configuration Options

### Colors

```tsx
colors: {
  primary: string; // Main brand color (backgrounds)
  secondary: string; // Secondary color (buttons, borders)
  accent: string; // Text on dark backgrounds
  text: string; // Primary text color
  textSecondary: string; // Secondary text color
}
```

### Content Sections

#### 1. Hero Section

```tsx
badge: {
  icon: React.ReactNode; // Lucide icon
  text: string; // Badge text
}
headline: {
  main: string; // Main headline
  highlighted: string; // Text with colored background
}
description: string; // Subheading description
```

#### 2. Stats Section

```tsx
stats: Array<{
  value: string; // "10K+", "99%", etc.
  label: string; // "Active Users", "Satisfaction"
}>;
```

#### 3. Features Section

```tsx
features: Array<{
  icon: React.ReactNode; // Lucide icon
  title: string; // Feature title
  description: string; // Feature description
  highlights: string[]; // Bullet points
}>;
```

#### 4. Testimonials Section

```tsx
testimonials: Array<{
  quote: string; // Customer quote
  author: string; // Customer name
  role: string; // Job title
  company: string; // Company name
}>;
```

#### 5. Pricing Section

```tsx
plans: Array<{
  name: string; // Plan name
  price: number; // Monthly price
  period: string; // "month", "year"
  description: string; // Plan description
  features: string[]; // Feature list
  popular?: boolean; // Highlight as popular
  icon: React.ReactNode; // Lucide icon
}>;
```

#### 6. Trust Signals

```tsx
trustSignals: Array<{
  icon: React.ReactNode; // Lucide icon
  text: string; // Trust signal text
}>;
```

## Example Configurations

### SaaS Product

```tsx
const saasConfig = {
  colors: {
    primary: "#3b82f6", // Blue
    secondary: "#1e293b", // Dark slate
    accent: "#f8fafc", // Light
    text: "#1e293b", // Dark text
    textSecondary: "#64748b",
  },
  content: {
    headline: {
      main: "THE FUTURE OF",
      highlighted: "PROJECT MANAGEMENT",
    },
    // ... rest of config
  },
};
```

### E-commerce

```tsx
const ecommerceConfig = {
  colors: {
    primary: "#10b981", // Green
    secondary: "#000000", // Black
    accent: "#ffffff", // White
    text: "#000000", // Black text
    textSecondary: "#6b7280",
  },
  content: {
    headline: {
      main: "REVOLUTIONIZE",
      highlighted: "ONLINE SELLING",
    },
    // ... rest of config
  },
};
```

### Creative Tools

```tsx
const creativeConfig = {
  colors: {
    primary: "#8b5cf6", // Purple
    secondary: "#1f2937", // Dark gray
    accent: "#f9fafb", // Light gray
    text: "#111827", // Dark text
    textSecondary: "#6b7280",
  },
  content: {
    headline: {
      main: "UNLEASH YOUR",
      highlighted: "CREATIVE POTENTIAL",
    },
    // ... rest of config
  },
};
```

## Customization Tips

### 1. Brand Colors

- Use your existing brand colors for consistency
- Ensure good contrast ratios for accessibility
- Test colors in light and dark sections

### 2. Content Strategy

- Keep headlines punchy and benefit-focused
- Use social proof numbers that are impressive but believable
- Write features from the user's perspective
- Include real testimonials with permission

### 3. Pricing Strategy

- Show 3 plans maximum for decision clarity
- Make the middle plan "popular" for anchoring
- Include annual discounts to increase lifetime value
- List features in order of importance

### 4. Trust Signals

- Include security badges (SSL, GDPR)
- Show uptime guarantees
- Display customer count or revenue
- Add money-back guarantee

### 5. Call-to-Actions

- Use action words: "Start", "Get", "Unlock"
- Create urgency without being pushy
- Make buttons large and easy to tap on mobile
- Use contrasting colors for visibility

## Mobile Optimization

The template is fully responsive and includes:

- Touch-friendly button sizes (min 44px)
- Readable text sizes on small screens
- Optimized spacing for mobile
- Horizontal scrolling prevention
- Fast loading with optimized images

## Accessibility Features

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance
- Focus indicators
- Screen reader friendly

## Performance Tips

- Optimize images for web (use WebP format)
- Lazy load below-the-fold content
- Minimize bundle size by importing only needed icons
- Use CSS-in-JS for critical styles
- Preload fonts to prevent layout shift

## A/B Testing Ideas

Test these elements to improve conversion:

- Headlines and value propositions
- Button colors and text
- Pricing structures
- Social proof placement
- Feature descriptions
- Testimonial selection

## License

This template is designed to be reusable across projects. Customize freely for your needs.
