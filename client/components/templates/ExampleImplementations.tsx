import React from "react";
import {
  PaywallLandingTemplate,
  PaywallTemplateConfig,
} from "./PaywallLandingTemplate";
import {
  Camera,
  Palette,
  Sparkles,
  Zap,
  Crown,
  Star,
  Shield,
  Users,
  TrendingUp,
  Bolt,
  Code,
  Smartphone,
  Globe,
  BarChart,
  Headphones,
  FileText,
} from "lucide-react";

// Example 1: SaaS Analytics Platform
export const analyticsConfig: PaywallTemplateConfig = {
  colors: {
    primary: "#3b82f6", // Blue
    secondary: "#1e293b", // Dark slate
    accent: "#f8fafc", // Light
    text: "#1e293b", // Dark text
    textSecondary: "#64748b",
  },
  content: {
    badge: {
      icon: <BarChart className="w-4 h-4" />,
      text: "NEW AI INSIGHTS AVAILABLE",
    },
    headline: {
      main: "THE FUTURE OF",
      highlighted: "DATA ANALYTICS",
    },
    description:
      "Transform your business data into actionable insights with our AI-powered analytics platform trusted by 5,000+ companies worldwide.",
    stats: [
      { value: "5K+", label: "Companies" },
      { value: "50M+", label: "Data Points" },
      { value: "99.9%", label: "Uptime" },
    ],
    features: [
      {
        icon: <BarChart className="w-8 h-8" />,
        title: "Advanced Analytics",
        description:
          "Get deep insights with machine learning-powered analytics and predictive modeling",
        highlights: [
          "Real-time Dashboards",
          "Predictive Analytics",
          "Custom Reports",
        ],
      },
      {
        icon: <Code className="w-8 h-8" />,
        title: "Developer API",
        description:
          "Integrate seamlessly with your existing tools and workflows",
        highlights: [
          "REST & GraphQL APIs",
          "SDKs for All Languages",
          "Webhook Support",
        ],
      },
      {
        icon: <Shield className="w-8 h-8" />,
        title: "Enterprise Security",
        description:
          "Bank-level security with SOC 2 compliance and end-to-end encryption",
        highlights: [
          "SOC 2 Certified",
          "End-to-End Encryption",
          "Role-Based Access",
        ],
      },
    ],
    testimonials: [
      {
        quote:
          "This platform reduced our reporting time from hours to minutes. The insights are incredible.",
        author: "Sarah Johnson",
        role: "VP of Analytics",
        company: "TechCorp Inc",
      },
      {
        quote:
          "The API integration was seamless. Our development team had it running in under a day.",
        author: "Mike Chen",
        role: "CTO",
        company: "StartupXYZ",
      },
      {
        quote:
          "Finally, analytics that our entire team can understand and act on.",
        author: "Lisa Rodriguez",
        role: "Operations Director",
        company: "Growth Co",
      },
    ],
    plans: [
      {
        name: "Starter",
        price: 49,
        period: "month",
        description: "Perfect for small teams",
        features: [
          "Up to 5 team members",
          "10 dashboards",
          "Basic integrations",
          "Email support",
          "Standard security",
        ],
        icon: <Zap className="w-6 h-6" />,
      },
      {
        name: "Professional",
        price: 149,
        period: "month",
        description: "Best for growing companies",
        features: [
          "Up to 25 team members",
          "Unlimited dashboards",
          "All integrations",
          "Priority support",
          "Advanced security",
          "API access",
          "Custom reports",
          "Predictive analytics",
        ],
        popular: true,
        icon: <Crown className="w-6 h-6" />,
      },
      {
        name: "Enterprise",
        price: 499,
        period: "month",
        description: "For large organizations",
        features: [
          "Unlimited team members",
          "White-label solution",
          "Custom integrations",
          "Dedicated support",
          "Advanced security",
          "SLA guarantee",
          "On-premise option",
          "Custom training",
        ],
        icon: <Star className="w-6 h-6" />,
      },
    ],
    trustSignals: [
      { icon: <Shield className="w-6 h-6" />, text: "SOC 2 Certified" },
      { icon: <Users className="w-6 h-6" />, text: "GDPR Compliant" },
      { icon: <TrendingUp className="w-6 h-6" />, text: "99.9% Uptime" },
    ],
  },
  onGetAccess: () => console.log("Analytics - Get Access"),
  onStartFree: () => console.log("Analytics - Start Free"),
};

// Example 2: Mobile App Builder
export const appBuilderConfig: PaywallTemplateConfig = {
  colors: {
    primary: "#10b981", // Green
    secondary: "#000000", // Black
    accent: "#ffffff", // White
    text: "#000000", // Black text
    textSecondary: "#6b7280",
  },
  content: {
    badge: {
      icon: <Smartphone className="w-4 h-4" />,
      text: "NO-CODE APP BUILDER",
    },
    headline: {
      main: "BUILD APPS WITHOUT",
      highlighted: "WRITING CODE",
    },
    description:
      "Create professional mobile apps in minutes, not months. No coding required - just drag, drop, and publish to app stores.",
    stats: [
      { value: "100K+", label: "Apps Built" },
      { value: "2M+", label: "Downloads" },
      { value: "4.8★", label: "App Store Rating" },
    ],
    features: [
      {
        icon: <Smartphone className="w-8 h-8" />,
        title: "Drag & Drop Builder",
        description:
          "Intuitive visual builder that anyone can use to create stunning mobile apps",
        highlights: [
          "50+ Pre-built Templates",
          "Custom Components",
          "Real-time Preview",
        ],
      },
      {
        icon: <Globe className="w-8 h-8" />,
        title: "Instant Publishing",
        description: "Publish to iOS and Android app stores with one click",
        highlights: [
          "App Store Submission",
          "Google Play Publishing",
          "Web App Deployment",
        ],
      },
      {
        icon: <Code className="w-8 h-8" />,
        title: "Advanced Features",
        description:
          "Add complex functionality without coding using our smart component library",
        highlights: [
          "Push Notifications",
          "In-App Purchases",
          "Analytics Integration",
        ],
      },
    ],
    testimonials: [
      {
        quote:
          "I built my first app in 2 hours. It's now generating $5K monthly revenue!",
        author: "David Park",
        role: "Entrepreneur",
        company: "Solo Founder",
      },
      {
        quote:
          "Our agency can now offer app development to clients without hiring developers.",
        author: "Amanda Foster",
        role: "Agency Owner",
        company: "Digital Agency Pro",
      },
      {
        quote: "The template library saved us months of development time.",
        author: "Carlos Rivera",
        role: "Product Manager",
        company: "Retail Chain LLC",
      },
    ],
    plans: [
      {
        name: "Hobby",
        price: 19,
        period: "month",
        description: "Perfect for personal projects",
        features: [
          "1 app project",
          "Basic templates",
          "Web app only",
          "Community support",
          "Basic analytics",
        ],
        icon: <Zap className="w-6 h-6" />,
      },
      {
        name: "Creator",
        price: 59,
        period: "month",
        description: "Best for entrepreneurs",
        features: [
          "5 app projects",
          "Premium templates",
          "iOS & Android publishing",
          "Priority support",
          "Advanced analytics",
          "Push notifications",
          "In-app purchases",
          "Custom branding",
        ],
        popular: true,
        icon: <Crown className="w-6 h-6" />,
      },
      {
        name: "Agency",
        price: 199,
        period: "month",
        description: "For agencies and teams",
        features: [
          "Unlimited projects",
          "White-label solution",
          "Client management",
          "Dedicated support",
          "Advanced integrations",
          "Team collaboration",
          "Revenue sharing",
          "Custom components",
        ],
        icon: <Star className="w-6 h-6" />,
      },
    ],
    trustSignals: [
      { icon: <Shield className="w-6 h-6" />, text: "App Store Approved" },
      { icon: <Users className="w-6 h-6" />, text: "100K+ Users" },
      { icon: <TrendingUp className="w-6 h-6" />, text: "4.8★ Rating" },
    ],
  },
  onGetAccess: () => console.log("App Builder - Get Access"),
  onStartFree: () => console.log("App Builder - Start Free"),
};

// Example 3: Content Creation Tool
export const contentCreatorConfig: PaywallTemplateConfig = {
  colors: {
    primary: "#8b5cf6", // Purple
    secondary: "#1f2937", // Dark gray
    accent: "#f9fafb", // Light gray
    text: "#111827", // Dark text
    textSecondary: "#6b7280",
  },
  content: {
    badge: {
      icon: <Sparkles className="w-4 h-4" />,
      text: "AI-POWERED CONTENT CREATION",
    },
    headline: {
      main: "CREATE CONTENT THAT",
      highlighted: "CONVERTS & ENGAGES",
    },
    description:
      "Generate high-converting copy, stunning visuals, and engaging social media content in seconds with our AI-powered creative suite.",
    stats: [
      { value: "50K+", label: "Creators" },
      { value: "5M+", label: "Content Pieces" },
      { value: "300%", label: "Avg Engagement Boost" },
    ],
    features: [
      {
        icon: <FileText className="w-8 h-8" />,
        title: "AI Copy Generator",
        description:
          "Generate compelling copy for ads, emails, websites, and social media",
        highlights: [
          "50+ Copy Templates",
          "Brand Voice Training",
          "A/B Test Variations",
        ],
      },
      {
        icon: <Camera className="w-8 h-8" />,
        title: "Visual Content Studio",
        description:
          "Create stunning graphics, images, and videos without design skills",
        highlights: [
          "AI Image Generation",
          "Video Templates",
          "Brand Kit Integration",
        ],
      },
      {
        icon: <BarChart className="w-8 h-8" />,
        title: "Performance Analytics",
        description:
          "Track content performance and optimize for better results",
        highlights: [
          "Engagement Metrics",
          "Conversion Tracking",
          "ROI Analysis",
        ],
      },
    ],
    testimonials: [
      {
        quote:
          "My content engagement increased 400% in the first month. This tool is incredible!",
        author: "Jessica Martinez",
        role: "Social Media Manager",
        company: "Fashion Brand Co",
      },
      {
        quote:
          "I went from spending 5 hours on copy to 30 minutes with better results.",
        author: "Tom Wilson",
        role: "Marketing Director",
        company: "SaaS Startup",
      },
      {
        quote:
          "The AI understands our brand voice perfectly. It's like having a copywriter on demand.",
        author: "Rachel Kim",
        role: "Content Lead",
        company: "E-commerce Plus",
      },
    ],
    plans: [
      {
        name: "Creator",
        price: 29,
        period: "month",
        description: "Perfect for individual creators",
        features: [
          "50 AI generations/month",
          "Basic templates",
          "Image creation",
          "Email support",
          "Community access",
        ],
        icon: <Zap className="w-6 h-6" />,
      },
      {
        name: "Pro Creator",
        price: 79,
        period: "month",
        description: "Best for professional creators",
        features: [
          "Unlimited generations",
          "Premium templates",
          "Video creation",
          "Priority support",
          "Brand kit",
          "Analytics dashboard",
          "A/B testing",
          "Team collaboration",
        ],
        popular: true,
        icon: <Crown className="w-6 h-6" />,
      },
      {
        name: "Agency",
        price: 249,
        period: "month",
        description: "For agencies and teams",
        features: [
          "Everything in Pro",
          "Unlimited team members",
          "Client management",
          "White-label solution",
          "API access",
          "Custom integrations",
          "Dedicated support",
          "Custom training",
        ],
        icon: <Star className="w-6 h-6" />,
      },
    ],
    trustSignals: [
      { icon: <Shield className="w-6 h-6" />, text: "AI Ethics Certified" },
      { icon: <Users className="w-6 h-6" />, text: "50K+ Creators" },
      { icon: <TrendingUp className="w-6 h-6" />, text: "300% Avg Growth" },
    ],
  },
  onGetAccess: () => console.log("Content Creator - Get Access"),
  onStartFree: () => console.log("Content Creator - Start Free"),
};

// Example usage components
export function AnalyticsPaywall() {
  return <PaywallLandingTemplate {...analyticsConfig} />;
}

export function AppBuilderPaywall() {
  return <PaywallLandingTemplate {...appBuilderConfig} />;
}

export function ContentCreatorPaywall() {
  return <PaywallLandingTemplate {...contentCreatorConfig} />;
}
