import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Check,
  Crown,
  Zap,
  Star,
  Download,
  MessageSquare,
  FileText,
  Users,
  Lock,
  CreditCard,
} from "lucide-react";

interface PaywallProps {
  onUpgrade: () => void;
  userEmail: string;
}

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  icon: React.ReactNode;
  stripePriceId: string;
}

export function Paywall({ onUpgrade, userEmail }: PaywallProps) {
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");
  const [isProcessing, setIsProcessing] = useState(false);

  const plans: PricingPlan[] = [
    {
      id: "basic",
      name: "Basic Access",
      price: 29,
      period: "month",
      description: "Perfect for individual creators getting started",
      stripePriceId: "price_basic_monthly",
      icon: <Zap className="h-6 w-6" />,
      features: [
        "50 AI outputs per month",
        "Basic prompt templates",
        "Email support",
        "Access to creative library",
        "Standard quality downloads",
      ],
    },
    {
      id: "pro",
      name: "Pro Creator",
      price: 79,
      period: "month",
      description: "Best for serious creators and small teams",
      stripePriceId: "price_pro_monthly",
      icon: <Crown className="h-6 w-6" />,
      popular: true,
      features: [
        "Unlimited AI outputs",
        "Premium prompt vault access",
        "Priority support",
        "Advanced customization",
        "High-quality downloads",
        "Team collaboration tools",
        "API access",
        "Custom branding",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 199,
      period: "month",
      description: "For agencies and large teams",
      stripePriceId: "price_enterprise_monthly",
      icon: <Star className="h-6 w-6" />,
      features: [
        "Everything in Pro",
        "Unlimited team members",
        "White-label solution",
        "Custom integrations",
        "Dedicated account manager",
        "Advanced analytics",
        "SLA guarantee",
        "Custom training",
      ],
    },
  ];

  const handleUpgrade = async (planId: string) => {
    setIsProcessing(true);
    const plan = plans.find((p) => p.id === planId);

    try {
      // Create Stripe checkout session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: plan?.stripePriceId,
          userEmail,
          planName: plan?.name,
        }),
      });

      const session = await response.json();

      if (session.url) {
        // Redirect to Stripe Checkout
        window.location.href = session.url;
      } else {
        console.error("Failed to create checkout session");
        alert("Payment processing failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment processing failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-neon-orange rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Lock className="h-8 w-8 text-black" />
              <Crown className="h-8 w-8 text-black" />
            </div>
            <h1 className="text-4xl font-black text-black mb-4">
              UNLOCK FULL ACCESS
            </h1>
            <p className="text-black text-lg font-bold max-w-2xl mx-auto">
              Join thousands of creators who have transformed their workflow
              with our premium AI creative system
            </p>
          </div>

          {/* Free vs Paid Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-black/20 border-2 border-black">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-black">
                  <Users className="h-5 w-5" />
                  What You Have Now (Free)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-black text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✕</span>
                    </div>
                    Limited to 5 outputs per day
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✕</span>
                    </div>
                    Basic templates only
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✕</span>
                    </div>
                    Standard quality downloads
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✕</span>
                    </div>
                    Community support only
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-black border-2 border-black">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-neon-orange">
                  <Crown className="h-5 w-5" />
                  What You Get (Premium)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-cream text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400" />
                    Unlimited AI outputs
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400" />
                    Premium prompt vault
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400" />
                    High-quality downloads
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400" />
                    Priority support
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400" />
                    Advanced customization
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Pricing Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative border-4 ${
                  plan.popular
                    ? "bg-black border-black scale-105 z-10"
                    : "bg-black/80 border-black"
                } ${selectedPlan === plan.id ? "ring-4 ring-neon-orange" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-neon-orange text-black font-bold px-3 py-1">
                      MOST POPULAR
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 bg-neon-orange/20 rounded-lg">
                      <div className="text-neon-orange">{plan.icon}</div>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-black text-cream">
                    {plan.name}
                  </CardTitle>
                  <div className="text-center">
                    <div className="text-3xl font-black text-neon-orange">
                      ${plan.price}
                    </div>
                    <div className="text-sm text-cream/60">
                      per {plan.period}
                    </div>
                  </div>
                  <p className="text-cream/80 text-sm">{plan.description}</p>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-cream text-sm"
                      >
                        <Check className="h-4 w-4 text-green-400 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleUpgrade(plan.id)}
                    disabled={isProcessing}
                    className={`w-full font-bold py-3 ${
                      plan.popular
                        ? "bg-neon-orange text-black hover:bg-neon-orange/90"
                        : "bg-neon-orange/20 text-neon-orange border-2 border-neon-orange hover:bg-neon-orange hover:text-black"
                    }`}
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4 mr-2" />
                        Upgrade Now
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-black text-sm">
              ✨ 30-day money-back guarantee • Cancel anytime • Secure payment
              with Stripe
            </p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-black" />
                <Star className="h-4 w-4 text-black" />
                <Star className="h-4 w-4 text-black" />
                <Star className="h-4 w-4 text-black" />
                <Star className="h-4 w-4 text-black" />
                <span className="text-black font-bold text-sm ml-2">
                  4.9/5 from 1,000+ creators
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
