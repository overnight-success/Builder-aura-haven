import React from "react";
import {
  Crown,
  Zap,
  Star,
  ArrowRight,
  Check,
  Play,
  Users,
  TrendingUp,
  Shield,
  Bolt,
} from "lucide-react";

// Template Configuration Interface
interface PaywallTemplateConfig {
  // Brand Colors
  colors: {
    primary: string; // Main brand color (e.g., "#ff3120")
    secondary: string; // Secondary color (e.g., "#000000")
    accent: string; // Accent color (e.g., "#f5e6d3")
    text: string; // Primary text color
    textSecondary: string; // Secondary text color
  };

  // Content
  content: {
    // Hero Section
    badge: {
      icon: React.ReactNode;
      text: string;
    };
    headline: {
      main: string;
      highlighted: string; // Text that gets highlighted background
    };
    description: string;

    // Stats
    stats: Array<{
      value: string;
      label: string;
    }>;

    // Features
    features: Array<{
      icon: React.ReactNode;
      title: string;
      description: string;
      highlights: string[];
    }>;

    // Testimonials
    testimonials: Array<{
      quote: string;
      author: string;
      role: string;
      company: string;
    }>;

    // Pricing Plans
    plans: Array<{
      name: string;
      price: number;
      period: string;
      description: string;
      features: string[];
      popular?: boolean;
      icon: React.ReactNode;
    }>;

    // Trust Signals
    trustSignals: Array<{
      icon: React.ReactNode;
      text: string;
    }>;
  };

  // Actions
  onGetAccess: () => void;
  onStartFree: () => void;
}

// Reusable Components
interface TemplateFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlights: string[];
  colors: PaywallTemplateConfig["colors"];
}

function TemplateFeatureCard({
  icon,
  title,
  description,
  highlights,
  colors,
}: TemplateFeatureCardProps) {
  return (
    <div
      className="border-4 p-8 group hover:scale-105 transition-all duration-300"
      style={{
        backgroundColor: colors.primary,
        borderColor: colors.secondary,
      }}
    >
      <div
        className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
        style={{ backgroundColor: colors.secondary }}
      >
        <div style={{ color: colors.primary }}>{icon}</div>
      </div>

      <h3
        className="text-2xl font-black mb-4"
        style={{ color: colors.secondary }}
      >
        {title}
      </h3>

      <p className="font-medium mb-6" style={{ color: colors.secondary }}>
        {description}
      </p>

      <div className="space-y-2 mb-6">
        {highlights.map((highlight, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: colors.secondary }}
            ></div>
            <span
              className="font-bold text-sm"
              style={{ color: colors.secondary }}
            >
              {highlight}
            </span>
          </div>
        ))}
      </div>

      <div
        className="flex items-center gap-2 font-black text-sm group-hover:gap-3 transition-all duration-200"
        style={{ color: colors.secondary }}
      >
        <span>LEARN MORE</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </div>
  );
}

interface TemplatePricingCardProps {
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  icon: React.ReactNode;
  colors: PaywallTemplateConfig["colors"];
  onSelect: () => void;
}

function TemplatePricingCard({
  name,
  price,
  period,
  description,
  features,
  popular = false,
  icon,
  colors,
  onSelect,
}: TemplatePricingCardProps) {
  return (
    <div
      className={`relative border-4 ${popular ? "scale-105 z-10" : ""}`}
      style={{
        borderColor: colors.secondary,
        backgroundColor: popular ? colors.primary : `${colors.secondary}CC`,
      }}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div
            className="px-6 py-2 font-black text-sm flex items-center gap-2"
            style={{
              backgroundColor: colors.secondary,
              color: colors.accent,
            }}
          >
            <Crown className="w-4 h-4" />
            MOST POPULAR
          </div>
        </div>
      )}

      <div className="p-8">
        <div className="text-center mb-8">
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4`}
            style={{
              backgroundColor: popular
                ? colors.secondary
                : `${colors.primary}33`,
            }}
          >
            <div style={{ color: popular ? colors.primary : colors.secondary }}>
              {icon}
            </div>
          </div>

          <h3
            className="text-2xl font-black mb-2"
            style={{ color: popular ? colors.secondary : colors.accent }}
          >
            {name}
          </h3>

          <div className="mb-4">
            <div
              className="text-4xl font-black"
              style={{ color: popular ? colors.secondary : colors.primary }}
            >
              ${price}
            </div>
            <div
              className="text-sm opacity-60"
              style={{ color: popular ? colors.secondary : colors.accent }}
            >
              per {period}
            </div>
          </div>

          <p
            className="text-sm opacity-80"
            style={{ color: popular ? colors.secondary : colors.accent }}
          >
            {description}
          </p>
        </div>

        <div className="mb-8">
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-sm"
                style={{ color: popular ? colors.secondary : colors.accent }}
              >
                <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={onSelect}
          className="w-full py-4 font-black text-lg transition-all duration-200 flex items-center justify-center gap-2 border-4"
          style={{
            backgroundColor: popular ? colors.secondary : colors.primary,
            color: popular ? colors.primary : colors.secondary,
            borderColor: popular ? colors.secondary : colors.primary,
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

// Main Template Component
export function PaywallLandingTemplate({
  colors,
  content,
  onGetAccess,
  onStartFree,
}: PaywallTemplateConfig) {
  return (
    <div
      className="min-h-screen font-sans"
      style={{ backgroundColor: colors.primary }}
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        <div
          className="absolute inset-0 backdrop-blur-sm"
          style={{ backgroundColor: `${colors.secondary}0D` }}
        ></div>

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <div className="mb-8">
            <div
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm mb-6"
              style={{
                backgroundColor: colors.secondary,
                color: colors.accent,
              }}
            >
              {content.badge.icon}
              {content.badge.text}
            </div>

            <h1
              className="text-5xl md:text-7xl font-black mb-6 leading-tight"
              style={{ color: colors.text }}
            >
              {content.headline.main}
              <br />
              <span
                className="inline-block px-4 py-2"
                style={{
                  backgroundColor: colors.secondary,
                  color: colors.primary,
                }}
              >
                {content.headline.highlighted}
              </span>
            </h1>

            <p
              className="text-xl md:text-2xl font-bold max-w-3xl mx-auto mb-8"
              style={{ color: colors.text }}
            >
              {content.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={onGetAccess}
              className="px-8 py-4 text-lg font-black border-4 hover:opacity-90 transition-all duration-200 flex items-center gap-2 min-w-[200px] justify-center"
              style={{
                backgroundColor: colors.secondary,
                color: colors.accent,
                borderColor: colors.secondary,
              }}
            >
              <Crown className="w-5 h-5" />
              GET FULL ACCESS
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onStartFree}
              className="bg-transparent px-8 py-4 text-lg font-black border-4 hover:opacity-90 transition-all duration-200 flex items-center gap-2 min-w-[200px] justify-center"
              style={{
                color: colors.text,
                borderColor: colors.secondary,
              }}
            >
              <Play className="w-5 h-5" />
              TRY FREE VERSION
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            {content.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div
                  className="text-3xl font-black"
                  style={{ color: colors.text }}
                >
                  {stat.value}
                </div>
                <div className="font-bold" style={{ color: colors.text }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20" style={{ backgroundColor: colors.secondary }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-black mb-6"
              style={{ color: colors.accent }}
            >
              EVERYTHING YOU NEED TO CREATE
            </h2>
            <p
              className="text-xl max-w-3xl mx-auto"
              style={{ color: `${colors.accent}CC` }}
            >
              Professional-grade tools designed for the modern content creator.
              From concept to creation in minutes, not hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.features.map((feature, index) => (
              <TemplateFeatureCard key={index} {...feature} colors={colors} />
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-black mb-6"
              style={{ color: colors.text }}
            >
              TRUSTED BY INDUSTRY LEADERS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="border-4 p-8"
                style={{
                  backgroundColor: colors.secondary,
                  borderColor: colors.secondary,
                }}
              >
                <div className="flex mb-4" style={{ color: colors.primary }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <blockquote
                  className="text-lg font-medium mb-6"
                  style={{ color: colors.accent }}
                >
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <div className="font-black" style={{ color: colors.primary }}>
                    {testimonial.author}
                  </div>
                  <div style={{ color: `${colors.accent}CC` }}>
                    {testimonial.role}
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: `${colors.accent}99` }}
                  >
                    {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20" style={{ backgroundColor: colors.secondary }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-black mb-6"
              style={{ color: colors.accent }}
            >
              CHOOSE YOUR CREATIVE POWER
            </h2>
            <p
              className="text-xl max-w-3xl mx-auto"
              style={{ color: `${colors.accent}CC` }}
            >
              Start creating professional content today. All plans include
              mobile access and are backed by our 30-day money-back guarantee.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {content.plans.map((plan, index) => (
              <TemplatePricingCard
                key={index}
                {...plan}
                colors={colors}
                onSelect={onGetAccess}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Security & Trust Section */}
      <section
        className="py-16 border-t-4"
        style={{
          backgroundColor: colors.primary,
          borderColor: colors.secondary,
        }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-8 mb-8">
            {content.trustSignals.map((signal, index) => (
              <div key={index} className="flex items-center gap-2">
                <div style={{ color: colors.text }}>{signal.icon}</div>
                <span className="font-bold" style={{ color: colors.text }}>
                  {signal.text}
                </span>
              </div>
            ))}
          </div>

          <p className="font-bold text-lg" style={{ color: colors.text }}>
            Join thousands of creators who trust our platform for their creative
            workflow
          </p>
        </div>
      </section>

      {/* CTA Footer */}
      <section
        className="py-16 text-center"
        style={{ backgroundColor: colors.secondary }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <h2
            className="text-3xl md:text-4xl font-black mb-6"
            style={{ color: colors.accent }}
          >
            READY TO TRANSFORM YOUR CREATIVE PROCESS?
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onGetAccess}
              className="px-8 py-4 text-lg font-black border-4 hover:opacity-90 transition-all duration-200 flex items-center gap-2 min-w-[250px] justify-center"
              style={{
                backgroundColor: colors.primary,
                color: colors.secondary,
                borderColor: colors.primary,
              }}
            >
              <Crown className="w-5 h-5" />
              START CREATING TODAY
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <p className="text-sm mt-4" style={{ color: `${colors.accent}99` }}>
            30-day money-back guarantee • Cancel anytime • No setup fees
          </p>
        </div>
      </section>
    </div>
  );
}

// Example Usage Configuration
export const exampleConfig: PaywallTemplateConfig = {
  colors: {
    primary: "#ff3120", // Neon orange
    secondary: "#000000", // Black
    accent: "#f5e6d3", // Cream
    text: "#000000", // Black text
    textSecondary: "#666666", // Gray text
  },
  content: {
    badge: {
      icon: <Bolt className="w-4 h-4" />,
      text: "NOW WITH AI INTEGRATION",
    },
    headline: {
      main: "THE FUTURE OF",
      highlighted: "YOUR INDUSTRY",
    },
    description:
      "Professional AI-powered system trusted by 10,000+ users worldwide. Generate stunning content with precision and speed.",
    stats: [
      { value: "10K+", label: "Active Users" },
      { value: "1M+", label: "Generated" },
      { value: "98%", label: "Satisfaction" },
    ],
    features: [
      {
        icon: <Zap className="w-8 h-8" />,
        title: "Advanced Generator",
        description: "Create stunning content with AI-powered tools",
        highlights: ["Feature 1", "Feature 2", "Feature 3"],
      },
      // Add more features...
    ],
    testimonials: [
      {
        quote: "This system completely transformed our workflow.",
        author: "John Doe",
        role: "CEO",
        company: "Company Inc",
      },
      // Add more testimonials...
    ],
    plans: [
      {
        name: "Starter",
        price: 29,
        period: "month",
        description: "Perfect for individuals",
        features: ["Feature 1", "Feature 2"],
        icon: <Zap className="w-6 h-6" />,
      },
      // Add more plans...
    ],
    trustSignals: [
      { icon: <Shield className="w-6 h-6" />, text: "SSL Secured" },
      { icon: <Users className="w-6 h-6" />, text: "GDPR Compliant" },
      { icon: <TrendingUp className="w-6 h-6" />, text: "99.9% Uptime" },
    ],
  },
  onGetAccess: () => console.log("Get Access clicked"),
  onStartFree: () => console.log("Start Free clicked"),
};
