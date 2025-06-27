import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Copy,
  Download,
  Wand2,
  Sparkles,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PromptFormulaPreviewProps {
  selections: Record<string, string>;
  customInstructions: string;
  uploadedFiles: File[];
  onCopy: (text: string) => void;
  onExport: () => void;
}

export function PromptFormulaPreview({
  selections,
  customInstructions,
  uploadedFiles,
  onCopy,
  onExport,
}: PromptFormulaPreviewProps) {
  const [copied, setCopied] = useState(false);
  const [suggestedTweaks, setSuggestedTweaks] = useState<string[]>([]);

  const generatePromptFormula = () => {
    const parts = Object.entries(selections).filter(([_, value]) => value);
    const hasCustomInstructions = customInstructions.trim().length > 0;
    const hasFiles = uploadedFiles.length > 0;

    if (parts.length === 0 && !hasCustomInstructions && !hasFiles) {
      return {
        formula:
          "Select from each category above to build your Sora AI prompt formula...",
        isComplete: false,
      };
    }

    // Build the base formula
    const components: string[] = [];

    parts.forEach(([category, value]) => {
      switch (category) {
        case "textures":
          components.push(`${value} finish`);
          break;
        case "framing":
          components.push(`${value}`);
          break;
        case "lighting":
          components.push(`${value}`);
          break;
        case "locations":
          components.push(`shot in ${value}`);
          break;
        case "creative":
          components.push(`styled as ${value}`);
          break;
        case "enhancers":
          components.push(`enhanced with ${value}`);
          break;
      }
    });

    // Add custom instructions if provided
    if (hasCustomInstructions) {
      components.push(customInstructions.trim());
    }

    // Add file references if provided
    if (hasFiles) {
      const fileTypes = uploadedFiles.map((file) => {
        if (file.type.startsWith("image/")) return "reference image";
        if (file.type.startsWith("video/")) return "reference video";
        return "reference file";
      });
      components.push(`with ${fileTypes.join(", ")} for visual reference`);
    }

    const formula = components.join(", ");
    const isComplete = parts.length >= 4;

    return { formula, isComplete };
  };

  const generateSuggestedTweaks = () => {
    const currentSelections = Object.keys(selections).filter(
      (key) => selections[key],
    );
    const tweaks: string[] = [];

    if (selections.lighting && selections.textures) {
      tweaks.push("💡 Try: Add 'volumetric lighting' for depth");
    }
    if (selections.framing && !selections.enhancers) {
      tweaks.push("✨ Try: Add lens flare or particles for cinema feel");
    }
    if (selections.creative && selections.locations) {
      tweaks.push("🎬 Try: Specify '4K cinematic' for professional quality");
    }
    if (currentSelections.length >= 3 && !hasCustomInstructions) {
      tweaks.push("📝 Try: Add custom instructions for specific details");
    }
    if (selections.textures && selections.lighting && !hasFiles) {
      tweaks.push("📎 Try: Upload reference images for better results");
    }
    if (hasFiles && !customInstructions.includes("reference")) {
      tweaks.push("🔗 Try: Mention how to use reference files in instructions");
    }

    return tweaks.slice(0, 3); // Show max 3 suggestions
  };

  useEffect(() => {
    setSuggestedTweaks(generateSuggestedTweaks());
  }, [selections]);

  const { formula, isComplete } = generatePromptFormula();
  const selectedCount = Object.values(selections).filter(Boolean).length;
  const hasCustomInstructions = customInstructions.trim().length > 0;
  const hasFiles = uploadedFiles.length > 0;
  const totalComponents =
    selectedCount + (hasCustomInstructions ? 1 : 0) + (hasFiles ? 1 : 0);

  const handleCopy = async () => {
    await onCopy(formula);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportToSora = () => {
    // Create a more detailed prompt for Sora
    let enhancedFormula = `${formula}. Professional cinematography, 4K resolution, dynamic composition`;

    // Add file information for reference
    if (uploadedFiles.length > 0) {
      enhancedFormula += `\n\nReference files included: ${uploadedFiles.map((f) => f.name).join(", ")}`;
    }

    onCopy(enhancedFormula);
    onExport();
  };

  return (
    <Card className="backdrop-blur-sm bg-card/50 border-border/50 sticky top-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "p-2 rounded-lg transition-all duration-300",
                isComplete
                  ? "bg-gradient-to-r from-primary/20 to-cosmic/20"
                  : "bg-muted/20",
              )}
            >
              <Wand2
                className={cn(
                  "h-5 w-5 transition-colors duration-300",
                  isComplete ? "text-primary" : "text-muted-foreground",
                )}
              />
            </div>
            <div>
              <span className="text-lg font-semibold">AI Prompt Formula</span>
              <p className="text-xs text-muted-foreground">
                Optimized for Sora AI
              </p>
            </div>
          </div>
          <Badge
            variant={isComplete ? "default" : "secondary"}
            className={cn(
              "transition-all duration-300",
              isComplete &&
                "animate-pulse bg-gradient-to-r from-primary to-cosmic",
            )}
          >
            {totalComponents}/8 Components
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Formula Display */}
        <div className="relative">
          <div
            className={cn(
              "p-4 rounded-lg border min-h-24 transition-all duration-300",
              isComplete
                ? "bg-gradient-to-br from-primary/5 to-cosmic/5 border-primary/30"
                : "bg-muted/20 border-border/30",
            )}
          >
            <p
              className={cn(
                "text-sm leading-relaxed",
                isComplete
                  ? "text-foreground font-medium"
                  : "text-muted-foreground italic",
              )}
            >
              {formula}
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

        {/* Suggested Tweaks */}
        {suggestedTweaks.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Suggested Enhancements
            </h4>
            <div className="space-y-2">
              {suggestedTweaks.map((tweak, index) => (
                <div
                  key={index}
                  className="text-xs p-2 rounded-md bg-muted/30 border border-border/30 text-muted-foreground"
                >
                  {tweak}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <Button
              onClick={handleCopy}
              variant="outline"
              size="sm"
              className="flex-1 hover:bg-primary/10 hover:border-primary/50"
              disabled={!isComplete}
            >
              <Copy className="h-4 w-4" />
              {copied ? "Copied!" : "Copy Formula"}
            </Button>
            <Button
              onClick={handleExportToSora}
              size="sm"
              className="flex-1 bg-gradient-to-r from-primary to-cosmic hover:opacity-90 shadow-lg shadow-primary/20"
              disabled={!isComplete}
            >
              <ExternalLink className="h-4 w-4" />
              Export to Sora
            </Button>
          </div>

          {isComplete && (
            <Button
              onClick={() => window.open("https://openai.com/sora", "_blank")}
              variant="ghost"
              size="sm"
              className="w-full text-xs text-muted-foreground hover:text-primary"
            >
              <Download className="h-3 w-3 mr-1" />
              Open Sora AI Platform
            </Button>
          )}
        </div>

        {/* Tips */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>
            💡 <strong>Pro Tip:</strong> Complete 4+ categories for best results
          </p>
          <p>
            🎯 <strong>Quality:</strong> More specific selections = better
            output
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
