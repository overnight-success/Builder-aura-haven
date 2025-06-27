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
                <div
                  className={cn(
                    "p-2 rounded-lg transition-all duration-300",
                    isCompleted
                      ? "bg-primary/20 text-primary"
                      : "bg-muted/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary",
                  )}
                >
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <h3
                    className={cn(
                      "font-semibold transition-colors duration-300",
                      isCompleted
                        ? "text-primary"
                        : "text-foreground group-hover:text-primary",
                    )}
                  >
                    Custom Instructions
                  </h3>
                  {value && (
                    <p className="text-sm text-muted-foreground truncate max-w-48">
                      {value.slice(0, 50)}...
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {value && (
                  <Badge variant="secondary" className="text-xs">
                    {value.length} chars
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
          <CardContent className="pt-0 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Additional Instructions
              </label>
              <Textarea
                placeholder="Add any specific instructions, details, or creative direction not covered in the categories above..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="min-h-24 resize-none bg-muted/30 border-border/30 focus:border-primary/50 focus:bg-muted/50"
              />
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>💡 Be specific for better AI interpretation</span>
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
