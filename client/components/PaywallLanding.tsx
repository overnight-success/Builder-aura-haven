import React, { useState } from "react";
import {
  Crown,
  Zap,
  Star,
  Camera,
  Palette,
  Sparkles,
  ArrowRight,
  Check,
  Play,
  Users,
  TrendingUp,
  Shield,
  Lightning,
} from "lucide-react";
import { PricingCard } from "./PricingCard";
import { FeatureCard } from "./FeatureCard";

interface PaywallLandingProps {
  onGetAccess: () => void;
  onStartFree: () => void;
}

export function PaywallLanding({
  onGetAccess,
  onStartFree,
}: PaywallLandingProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const features = [
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Advanced Lifestyle Generator",
      description:
        "Create stunning lifestyle content with AI-powered prompts across 5 comprehensive categories",
      highlights: [
        "24 Environment Options",
        "25 Camera Angles",
        "26 Photography Styles",
      ],
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Professional Prompt Vault",
      description:
        "Access thousands of proven formulas with custom builder and image upload capabilities",
      highlights: [
        "Custom Formula Builder",
        "Image Integration",
        "34 Quality Modifiers",
      ],
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "SORA-Optimized Output",
      description:
        "Specialized prompts engineered for OpenAI's SORA and leading AI video platforms",
      highlights: [
        "SORA Integration",
        "Video Prompts",
        "AI-Optimized Formulas",
      ],
    },
  ];

  const plans = [
    {
      name: "Starter",
      price: 29,
      period: "month",
      description: "Perfect for individual creators",
      features: [
        "50 AI outputs per month",
        "Basic lifestyle templates",
        "Standard quality downloads",
        "Email support",
        "Mobile access",
      ],
      popular: false,
      icon: <Zap className="w-6 h-6" />,
    },
    {
      name: "Creator Pro",
      price: 79,
      period: "month",
      description: "Best for serious content creators",
      features: [
        "Unlimited AI outputs",
        "Premium prompt vault access",
        "High-quality downloads",
        "Priority support",
        "Advanced customization",
        "Team collaboration",
        "API access",
        "Custom branding",
      ],
      popular: true,
      icon: <Crown className="w-6 h-6" />,
    },
    {
      name: "Studio",
      price: 199,
      period: "month",
      description: "For agencies and studios",
      features: [
        "Everything in Creator Pro",
        "Unlimited team members",
        "White-label solution",
        "Custom integrations",
        "Dedicated account manager",
        "Advanced analytics",
        "SLA guarantee",
        "Custom training sessions",
      ],
      popular: false,
      icon: <Star className="w-6 h-6" />,
    },
  ];

  const testimonials = [
    {
      quote:
        "This system completely transformed how I create content. The SORA integration is game-changing.",
      author: "Sarah Chen",
      role: "Creative Director",
      company: "Studio Flux",
    },
    {
      quote:
        "The prompt vault alone saved me hundreds of hours. ROI was immediate.",
      author: "Marcus Rodriguez",
      role: "Content Creator",
      company: "Digital Nomad Co",
    },
    {
      quote:
        "Professional-grade results every time. My clients love the quality.",
      author: "Emma Thompson",
      role: "Brand Designer",
      company: "Thompson Creative",
    },
  ];

  return (
    <div className="min-h-screen bg-neon-orange font-sans">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black/5 backdrop-blur-sm"></div>

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-black text-cream px-6 py-3 rounded-full font-bold text-sm mb-6">
              <Lightning className="w-4 h-4" />
              NOW WITH SORA INTEGRATION
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-black mb-6 leading-tight">
              THE FUTURE OF
              <br />
              <span className="bg-black text-neon-orange px-4 py-2 inline-block">
                LIFESTYLE CREATION
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-black font-bold max-w-3xl mx-auto mb-8">
              Professional AI-powered content generation system trusted by
              10,000+ creators worldwide. Generate stunning lifestyle content
              with precision and speed.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={onGetAccess}
              className="bg-black text-cream px-8 py-4 text-lg font-black border-4 border-black hover:bg-black/90 transition-all duration-200 flex items-center gap-2 min-w-[200px] justify-center"
            >
              <Crown className="w-5 h-5" />
              GET FULL ACCESS
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onStartFree}
              className="bg-transparent text-black px-8 py-4 text-lg font-black border-4 border-black hover:bg-black hover:text-cream transition-all duration-200 flex items-center gap-2 min-w-[200px] justify-center"
            >
              <Play className="w-5 h-5" />
              TRY FREE VERSION
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-black text-black">10K+</div>
              <div className="text-black font-bold">Active Creators</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-black">1M+</div>
              <div className="text-black font-bold">Prompts Generated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-black">98%</div>
              <div className="text-black font-bold">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-cream mb-6">
              EVERYTHING YOU NEED TO CREATE
            </h2>
            <p className="text-xl text-cream/80 max-w-3xl mx-auto">
              Professional-grade tools designed for the modern content creator.
              From concept to creation in minutes, not hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-neon-orange">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
              TRUSTED BY INDUSTRY LEADERS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-black border-4 border-black p-8">
                <div className="flex text-neon-orange mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <blockquote className="text-cream text-lg font-medium mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <div className="text-neon-orange font-black">
                    {testimonial.author}
                  </div>
                  <div className="text-cream/80">{testimonial.role}</div>
                  <div className="text-cream/60 text-sm">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-cream mb-6">
              CHOOSE YOUR CREATIVE POWER
            </h2>
            <p className="text-xl text-cream/80 max-w-3xl mx-auto">
              Start creating professional content today. All plans include
              mobile access and are backed by our 30-day money-back guarantee.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <PricingCard key={index} {...plan} onSelect={onGetAccess} />
            ))}
          </div>
        </div>
      </section>

      {/* Security & Trust Section */}
      <section className="py-16 bg-neon-orange border-t-4 border-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-black" />
              <span className="text-black font-bold">SSL Secured</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6 text-black" />
              <span className="text-black font-bold">GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-black" />
              <span className="text-black font-bold">99.9% Uptime</span>
            </div>
          </div>

          <p className="text-black font-bold text-lg">
            Join thousands of creators who trust our platform for their creative
            workflow
          </p>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-16 bg-black text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-cream mb-6">
            READY TO TRANSFORM YOUR CREATIVE PROCESS?
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onGetAccess}
              className="bg-neon-orange text-black px-8 py-4 text-lg font-black border-4 border-neon-orange hover:bg-neon-orange/90 transition-all duration-200 flex items-center gap-2 min-w-[250px] justify-center"
            >
              <Crown className="w-5 h-5" />
              START CREATING TODAY
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <p className="text-cream/60 text-sm mt-4">
            30-day money-back guarantee • Cancel anytime • No setup fees
          </p>
        </div>
      </section>
    </div>
  );
}
