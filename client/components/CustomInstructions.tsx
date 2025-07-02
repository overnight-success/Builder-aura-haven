import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import {
  ChevronDown,
  ChevronRight,
  Plus,
  Check,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomInstructionsProps {
  value: string;
  onChange: (value: string) => void;
  stepNumber: number;
  isCompleted: boolean;
  showFlow?: boolean;
}

export function CustomInstructions({
  value,
  onChange,
  stepNumber,
  isCompleted,
  showFlow = true,
}: CustomInstructionsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative">
      <Card
        className={cn(
          "bg-black border-2 transition-all duration-300",
          isCompleted
            ? "border-neon-orange shadow-lg"
            : "border-cream hover:border-neon-orange",
          isExpanded && "border-neon-orange",
        )}
      >
        <CardHeader className="pb-3">
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full h-auto p-4 hover:bg-transparent group"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300",
                    isCompleted
                      ? "bg-neon-orange border-neon-orange text-black"
                      : "border-cream bg-black text-cream group-hover:border-neon-orange",
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-lg font-black">{stepNumber}</span>
                  )}
                </div>
                <div className="p-3 rounded-lg bg-black border-2 border-neon-orange">
                  <div className="text-neon-orange">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                </div>
                <div className="text-left min-w-0 flex-1">
                  <h3 className="text-lg font-black text-cream tracking-tight truncate">
                    Custom Instructions
                  </h3>
                  {value && (
                    <p className="text-sm font-bold text-neon-orange truncate mt-1">
                      {value.slice(0, 50)}...
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {value && (
                  <Badge
                    variant="secondary"
                    className="text-xs px-2 py-0.5 whitespace-nowrap"
                  >
                    {value.length} chars
                  </Badge>
                )}
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
              </div>
            </div>
          </Button>
        </CardHeader>

        {isExpanded && (
          <CardContent className="pt-0 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Your Creative Vision & Requirements
              </label>
              <Textarea
                placeholder="Start with your specific instructions, creative vision, or requirements that will guide the AI generation..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="min-h-24 resize-none bg-black border-2 border-cream text-cream focus:border-neon-orange focus:bg-black placeholder:text-cream"
              />
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>{value.length}/500</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => onChange("")}
                variant="outline"
                size="sm"
                className="flex-1"
                disabled={!value}
              >
                Clear
              </Button>
              <Button
                onClick={() => setIsExpanded(false)}
                size="sm"
                className="flex-1"
                disabled={!value}
              >
                Done
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Flow Indicator */}
      {showFlow && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
          <div
            className={cn(
              "w-1 h-4 transition-all duration-300",
              isCompleted ? "bg-neon-orange" : "bg-cream/30",
            )}
          />
        </div>
      )}
    </div>
  );
}
