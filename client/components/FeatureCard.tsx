import React from "react";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlights: string[];
}

export function FeatureCard({
  icon,
  title,
  description,
  highlights,
}: FeatureCardProps) {
  return (
    <div className="bg-neon-orange border-4 border-black p-8 group hover:scale-105 transition-all duration-300">
      {/* Icon */}
      <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-full mb-6">
        <div className="text-neon-orange">{icon}</div>
      </div>

      {/* Content */}
      <h3 className="text-2xl font-black text-black mb-4">{title}</h3>

      <p className="text-black font-medium mb-6">{description}</p>

      {/* Highlights */}
      <div className="space-y-2 mb-6">
        {highlights.map((highlight, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-2 h-2 bg-black rounded-full"></div>
            <span className="text-black font-bold text-sm">{highlight}</span>
          </div>
        ))}
      </div>

      {/* Learn More */}
      <div className="flex items-center gap-2 text-black font-black text-sm group-hover:gap-3 transition-all duration-200">
        <span>LEARN MORE</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </div>
  );
}
