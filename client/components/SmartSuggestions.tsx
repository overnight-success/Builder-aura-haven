import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Lightbulb, TrendingUp, Target, Zap, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Suggestion {
  type: "quality" | "completeness" | "coherence" | "creativity";
  title: string;
  description: string;
  action: string;
}

interface SmartSuggestionsProps {
  suggestions: Suggestion[];
}

export function SmartSuggestions({ suggestions }: SmartSuggestionsProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "quality":
        return <TrendingUp className="h-4 w-4" />;
      case "completeness":
        return <Target className="h-4 w-4" />;
      case "coherence":
        return <Zap className="h-4 w-4" />;
      case "creativity":
        return <Lightbulb className="h-4 w-4" />;
      default:
        return <Lightbulb className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "quality":
        return "border-green-500 text-green-400";
      case "completeness":
        return "border-blue-500 text-blue-400";
      case "coherence":
        return "border-purple-500 text-purple-400";
      case "creativity":
        return "border-yellow-500 text-yellow-400";
      default:
        return "border-neon-orange text-neon-orange";
    }
  };

  if (suggestions.length === 0) return null;

  return (
    <Card className="bg-black/50 border-2 border-neon-orange/50 mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-neon-orange" />
          <span className="text-lg font-black text-cream">AI SUGGESTIONS</span>
          <Badge className="bg-neon-orange text-black font-bold text-xs">
            {suggestions.length}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className={cn(
                "p-4 rounded-lg border-2 bg-black/60 transition-all duration-200 hover:bg-black/80 cursor-pointer",
                getTypeColor(suggestion.type),
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn("mt-1", getTypeColor(suggestion.type))}>
                  {getIcon(suggestion.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-cream text-sm mb-1">
                    {suggestion.title}
                  </h4>
                  <p className="text-xs text-cream/80 mb-3 leading-tight">
                    {suggestion.description}
                  </p>
                  <div className="flex items-center gap-1 text-xs font-bold text-neon-orange">
                    <span>{suggestion.action}</span>
                    <ChevronRight className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
