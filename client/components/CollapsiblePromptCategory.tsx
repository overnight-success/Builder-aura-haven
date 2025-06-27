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
          "backdrop-blur-sm bg-card/50 border-border/50 transition-all duration-300",
          isCompleted
            ? "border-primary/50 shadow-lg shadow-primary/10"
            : "hover:border-border/70",
          isExpanded && "border-primary/30",
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
                    "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300",
                    isCompleted
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-border/50 group-hover:border-primary/50",
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span className="text-sm font-semibold">{stepNumber}</span>
                  )}
                </div>
                {icon && (
                  <div
                    className={cn(
                      "p-2 rounded-lg transition-all duration-300",
                      isCompleted
                        ? "bg-primary/20 text-primary"
                        : "bg-muted/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary",
                    )}
                  >
                    {icon}
                  </div>
                )}
                <div className="text-left">
                  <h3
                    className={cn(
                      "font-semibold transition-colors duration-300",
                      isCompleted
                        ? "text-primary"
                        : "text-foreground group-hover:text-primary",
                    )}
                  >
                    {title}
                  </h3>
                  {selectedOption && (
                    <p className="text-sm text-muted-foreground truncate max-w-48">
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
                    "w-full text-left p-3 rounded-lg border transition-all duration-200 hover:scale-[1.01]",
                    selectedOption === option
                      ? "bg-primary/20 border-primary text-primary font-medium shadow-md shadow-primary/20"
                      : "bg-muted/30 border-border/30 text-muted-foreground hover:bg-muted/50 hover:border-border/50 hover:text-foreground",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{option}</span>
                    {selectedOption === option && (
                      <Check className="h-4 w-4 text-primary" />
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
