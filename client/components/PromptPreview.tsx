import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Copy, Wand2, Sparkles, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface PromptPreviewProps {
  selections: Record<string, string>;
  onCopy: (text: string) => void;
  onGenerate: () => void;
}

export function PromptPreview({
  selections,
  onCopy,
  onGenerate,
}: PromptPreviewProps) {
  const [copied, setCopied] = useState(false);

  const generatePromptText = () => {
    const parts = Object.entries(selections).filter(([_, value]) => value);
    if (parts.length === 0)
      return "Add custom instructions and select from categories to generate your Sora AI prompt...";

    const promptParts = parts.map(([category, value]) => {
      switch (category) {
        case "textures":
          return `with ${value} texture`;
        case "framing":
          return `shot with ${value}`;
        case "lighting":
          return `lit with ${value}`;
        case "enhancers":
          return `enhanced by ${value}`;
        case "locations":
          return `in ${value}`;
        case "creative":
          return `styled as ${value}`;
        default:
          return value;
      }
    });

    return promptParts.join(", ");
  };

  const promptText = generatePromptText();
  const isComplete = Object.values(selections).filter(Boolean).length >= 3;

  const handleCopy = async () => {
    await onCopy(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="backdrop-blur-sm bg-card/50 border-border/50 sticky top-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-primary/20 to-cosmic/20">
              <Wand2 className="h-5 w-5 text-primary" />
            </div>
            Generated Prompt
          </div>
          <Badge
            variant={isComplete ? "default" : "secondary"}
            className={cn(
              "transition-all duration-300",
              isComplete &&
                "animate-pulse bg-gradient-to-r from-primary to-cosmic",
            )}
          >
            {Object.values(selections).filter(Boolean).length}/7 Selected
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <div
            className={cn(
              "p-4 rounded-lg border min-h-32 transition-all duration-300",
              isComplete
                ? "bg-gradient-to-br from-primary/5 to-cosmic/5 border-primary/30"
                : "bg-muted/20 border-border/30",
            )}
          >
            <p
              className={cn(
                "text-sm leading-relaxed",
                isComplete ? "text-foreground" : "text-muted-foreground italic",
              )}
            >
              {promptText}
            </p>
          </div>
          {isComplete && (
            <div className="absolute -top-2 -right-2">
              <div className="bg-gradient-to-r from-primary to-cosmic p-1 rounded-full">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleCopy}
            variant="outline"
            size="sm"
            className="flex-1 hover:bg-primary/10 hover:border-primary/50"
            disabled={!isComplete}
          >
            <Copy className="h-4 w-4" />
            {copied ? "Copied!" : "Copy"}
          </Button>
          <Button
            onClick={onGenerate}
            size="sm"
            className="flex-1 bg-gradient-to-r from-primary to-cosmic hover:opacity-90 shadow-lg shadow-primary/20"
            disabled={!isComplete}
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>

        <div className="text-xs text-muted-foreground">
          <p>
            💡 Tip: Add custom instructions first, then select at least 3
            categories
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
