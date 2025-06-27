import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ChevronDown, ChevronRight, Plus, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollapsiblePromptCategoryProps {
  title: string;
  options: string[];
  selectedOption?: string;
  onSelect: (option: string) => void;
  icon?: React.ReactNode;
  stepNumber: number;
  isCompleted: boolean;
  showFlow?: boolean;
}

export function CollapsiblePromptCategory({
  title,
  options,
  selectedOption,
  onSelect,
  icon,
  stepNumber,
  isCompleted,
  showFlow = true,
}: CollapsiblePromptCategoryProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative">
      <Card
        className={cn(
          "bg-black border-2 transition-all duration-300",
          isCompleted
            ? "border-neon-orange shadow-lg shadow-neon-orange/20"
            : "border-black hover:border-cream/50",
          isExpanded && "border-neon-orange",
        )}
      >
        <CardHeader className="pb-3">
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full h-auto p-0 hover:bg-transparent group"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full border-3 transition-all duration-300",
                    isCompleted
                      ? "bg-neon-orange border-neon-orange text-black"
                      : "border-cream/50 bg-black text-cream group-hover:border-neon-orange",
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-lg font-black">{stepNumber}</span>
                  )}
                </div>
                {icon && (
                  <div className="p-3 rounded-lg bg-black border-2 border-neon-orange">
                    <div className="text-neon-orange">{icon}</div>
                  </div>
                )}
                <div className="text-left">
                  <h3 className="text-2xl font-black text-cream tracking-tight">
                    {title}
                  </h3>
                  {selectedOption && (
                    <p className="text-base font-bold text-neon-orange truncate max-w-64 mt-1">
                      {selectedOption}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {selectedOption && (
                  <Badge variant="secondary" className="text-xs">
                    Selected
                  </Badge>
                )}
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </div>
          </Button>
        </CardHeader>

        {isExpanded && (
          <CardContent className="pt-0 space-y-2">
            <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    onSelect(option);
                    setIsExpanded(false);
                  }}
                  className={cn(
                    "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 hover:scale-[1.01]",
                    selectedOption === option
                      ? "bg-neon-orange border-neon-orange text-black font-black shadow-md shadow-neon-orange/20"
                      : "bg-black border-cream/30 text-cream hover:bg-black hover:border-neon-orange hover:text-neon-orange font-bold",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base">{option}</span>
                    {selectedOption === option && (
                      <Check className="h-5 w-5 text-black" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Flow Indicator */}
      {showFlow && (
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
          <div
            className={cn(
              "w-8 h-8 rounded-full border-2 border-dashed flex items-center justify-center transition-all duration-300",
              isCompleted
                ? "border-primary/50 bg-primary/10"
                : "border-border/30 bg-background/50",
            )}
          >
            <Plus
              className={cn(
                "h-4 w-4 transition-colors duration-300",
                isCompleted ? "text-primary" : "text-muted-foreground",
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
}
