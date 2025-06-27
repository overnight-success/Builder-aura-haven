import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { TrendingUp, Target, Zap, Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PromptQualityIndicatorProps {
  quality: number;
  completeness: number;
  coherence: number;
  creativity: number;
  isAnalyzing?: boolean;
}

export function PromptQualityIndicator({
  quality,
  completeness,
  coherence,
  creativity,
  isAnalyzing = false,
}: PromptQualityIndicatorProps) {
  const getQualityColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getQualityLabel = (score: number) => {
    if (score >= 90) return "EXCELLENT";
    if (score >= 80) return "GREAT";
    if (score >= 60) return "GOOD";
    if (score >= 40) return "FAIR";
    return "NEEDS WORK";
  };

  const metrics = [
    {
      label: "Quality",
      value: quality,
      icon: <TrendingUp className="h-4 w-4" />,
      description: "Overall prompt effectiveness",
    },
    {
      label: "Complete",
      value: completeness,
      icon: <Target className="h-4 w-4" />,
      description: "Category coverage",
    },
    {
      label: "Coherence",
      value: coherence,
      icon: <Zap className="h-4 w-4" />,
      description: "How well selections work together",
    },
    {
      label: "Creative",
      value: creativity,
      icon: <Sparkles className="h-4 w-4" />,
      description: "Uniqueness and innovation",
    },
  ];

  return (
    <Card className="bg-black border-2 border-cream w-full max-w-80 mx-auto lg:mx-0">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          {isAnalyzing ? (
            <Loader2 className="h-4 w-4 text-neon-orange animate-spin" />
          ) : (
            <TrendingUp className="h-4 w-4 text-neon-orange" />
          )}
          <span className="text-sm font-black text-cream">PROMPT ANALYSIS</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Overall Quality Score */}
        <div className="text-center">
          <div className={cn("text-3xl font-black", getQualityColor(quality))}>
            {Math.round(quality)}%
          </div>
          <Badge
            className={cn(
              "text-xs font-bold",
              quality >= 80
                ? "bg-green-500 text-black"
                : quality >= 60
                  ? "bg-yellow-500 text-black"
                  : "bg-red-500 text-white",
            )}
          >
            {getQualityLabel(quality)}
          </Badge>
        </div>

        {/* Detailed Metrics */}
        <div className="space-y-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-neon-orange">{metric.icon}</span>
                  <span className="text-xs font-bold text-cream">
                    {metric.label.toUpperCase()}
                  </span>
                </div>
                <span
                  className={cn(
                    "text-xs font-bold",
                    getQualityColor(metric.value),
                  )}
                >
                  {Math.round(metric.value)}%
                </span>
              </div>
              <Progress
                value={metric.value}
                className="h-2 bg-cream/20"
                indicatorClassName={cn(
                  metric.value >= 80
                    ? "bg-green-500"
                    : metric.value >= 60
                      ? "bg-yellow-500"
                      : "bg-red-500",
                )}
              />
            </div>
          ))}
        </div>

        {/* Analysis Status */}
        {isAnalyzing && (
          <div className="text-center text-xs text-cream/60">
            Analyzing prompt quality...
          </div>
        )}
      </CardContent>
    </Card>
  );
}
