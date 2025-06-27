import React from "react";
import { ChevronRight, MousePointer, Check, Copy } from "lucide-react";

interface InstructionFlowProps {
  currentStep: number;
  totalComponents: number;
}

export function InstructionFlow({
  currentStep,
  totalComponents,
}: InstructionFlowProps) {
  const steps = [
    {
      number: 1,
      title: "Select Categories",
      description: "Click each category header to expand options",
      icon: <MousePointer className="h-4 w-4" />,
    },
    {
      number: 2,
      title: "Choose Options",
      description: "Pick the best option from each category",
      icon: <Check className="h-4 w-4" />,
    },
    {
      number: 3,
      title: "Add Custom Text",
      description: "Include specific instructions (optional)",
      icon: <MousePointer className="h-4 w-4" />,
    },
    {
      number: 4,
      title: "Upload Files",
      description: "Add reference images/videos (optional)",
      icon: <MousePointer className="h-4 w-4" />,
    },
    {
      number: 5,
      title: "Copy Formula",
      description: "Get your optimized Sora prompt",
      icon: <Copy className="h-4 w-4" />,
    },
  ];

  return (
    <div className="bg-black border-2 border-cream p-6 rounded-lg mb-8">
      <h2 className="text-xl font-bold text-cream mb-4 flex items-center gap-2">
        <span className="bg-neon-orange text-black px-2 py-1 rounded font-black">
          HOW IT WORKS
        </span>
        <span className="text-neon-orange">
          {totalComponents}/8 COMPONENTS SELECTED
        </span>
      </h2>

      <div className="flex flex-wrap gap-4">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center gap-2">
            <div
              className={`
              flex items-center justify-center w-8 h-8 rounded-full border-2 font-bold text-sm
              ${
                currentStep >= step.number
                  ? "bg-neon-orange border-neon-orange text-black"
                  : "bg-black border-cream text-cream"
              }
            `}
            >
              {currentStep > step.number ? (
                <Check className="h-4 w-4" />
              ) : (
                step.number
              )}
            </div>

            <div className="text-cream">
              <div className="font-semibold text-sm">{step.title}</div>
              <div className="text-xs text-cream">{step.description}</div>
            </div>

            {index < steps.length - 1 && (
              <ChevronRight className="h-4 w-4 text-cream mx-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
