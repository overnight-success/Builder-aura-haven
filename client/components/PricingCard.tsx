import React from "react";
import { Check, Crown } from "lucide-react";

interface PricingCardProps {
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  icon: React.ReactNode;
  onSelect: () => void;
}

export function PricingCard({
  name,
  price,
  period,
  description,
  features,
  popular = false,
  icon,
  onSelect,
}: PricingCardProps) {
  return (
    <div
      className={`relative border-4 border-black ${
        popular ? "bg-neon-orange scale-105 z-10" : "bg-black/80"
      }`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-black text-cream px-6 py-2 font-black text-sm flex items-center gap-2">
            <Crown className="w-4 h-4" />
            MOST POPULAR
          </div>
        </div>
      )}

      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
              popular ? "bg-black" : "bg-neon-orange/20"
            }`}
          >
            <div className={popular ? "text-neon-orange" : "text-black"}>
              {icon}
            </div>
          </div>

          <h3
            className={`text-2xl font-black mb-2 ${
              popular ? "text-black" : "text-cream"
            }`}
          >
            {name}
          </h3>

          <div className="mb-4">
            <div
              className={`text-4xl font-black ${
                popular ? "text-black" : "text-neon-orange"
              }`}
            >
              ${price}
            </div>
            <div
              className={`text-sm ${
                popular ? "text-black/60" : "text-cream/60"
              }`}
            >
              per {period}
            </div>
          </div>

          <p
            className={`text-sm ${popular ? "text-black/80" : "text-cream/80"}`}
          >
            {description}
          </p>
        </div>

        {/* Features */}
        <div className="mb-8">
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li
                key={index}
                className={`flex items-start gap-3 text-sm ${
                  popular ? "text-black" : "text-cream"
                }`}
              >
                <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <button
          onClick={onSelect}
          className={`w-full py-4 font-black text-lg transition-all duration-200 flex items-center justify-center gap-2 border-4 ${
            popular
              ? "bg-black text-neon-orange border-black hover:bg-black/90"
              : "bg-neon-orange text-black border-neon-orange hover:bg-neon-orange/90"
          }`}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
