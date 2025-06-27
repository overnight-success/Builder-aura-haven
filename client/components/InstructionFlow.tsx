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
      title: "Add Custom Instructions",
      description: "Start with your specific requirements",
      icon: <MousePointer className="h-4 w-4" />,
    },
    {
      number: 2,
      title: "Select Categories",
      description: "Choose options from each category",
      icon: <Check className="h-4 w-4" />,
    },
    {
      number: 3,
      title: "Upload Reference Files",
      description: "Add images for JSON conversion (optional)",
      icon: <MousePointer className="h-4 w-4" />,
    },
    {
      number: 4,
      title: "Review Quality",
      description: "Check AI analysis and suggestions",
      icon: <MousePointer className="h-4 w-4" />,
    },
    {
      number: 5,
      title: "Copy for SORA",
      description: "Get your optimized prompt with JSON data",
      icon: <Copy className="h-4 w-4" />,
    },
  ];

  return (
    <div className="bg-black border-2 border-cream p-4 rounded-lg mb-6">
      <div className="flex items-center justify-between mb-4">
        <span className="bg-neon-orange text-black px-3 py-1 rounded font-black text-sm">
          HOW IT WORKS
        </span>
        <span className="text-neon-orange font-bold text-sm">
          STEP {Math.min(currentStep, 5)}/5
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-start gap-2 p-2">
            <div
              className={`
              flex items-center justify-center w-6 h-6 rounded-full border-2 font-bold text-xs shrink-0
              ${
                currentStep >= step.number
                  ? "bg-neon-orange border-neon-orange text-black"
                  : "bg-black border-cream text-cream"
              }
            `}
            >
              {currentStep > step.number ? (
                <Check className="h-3 w-3" />
              ) : (
                step.number
              )}
            </div>

            <div className="text-cream min-w-0 flex-1">
              <div className="font-semibold text-xs truncate">{step.title}</div>
              <div className="text-xs text-cream/80 leading-tight">
                {step.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
