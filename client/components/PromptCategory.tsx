import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

interface PromptCategoryProps {
  title: string;
  options: string[];
  selectedOption?: string;
  onSelect: (option: string) => void;
  icon?: React.ReactNode;
}

export function PromptCategory({
  title,
  options,
  selectedOption,
  onSelect,
  icon,
}: PromptCategoryProps) {
  return (
    <Card className="h-full backdrop-blur-sm bg-card/50 border-border/50 hover:border-primary/20 transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-lg font-semibold text-foreground">
          {icon && (
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              {icon}
            </div>
          )}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={cn(
              "w-full text-left p-3 rounded-lg border transition-all duration-200 hover:scale-[1.02]",
              selectedOption === option
                ? "bg-primary/20 border-primary text-primary font-medium shadow-md shadow-primary/20"
                : "bg-muted/30 border-border/30 text-muted-foreground hover:bg-muted/50 hover:border-border/50 hover:text-foreground",
            )}
          >
            {option}
          </button>
        ))}
      </CardContent>
    </Card>
  );
}
