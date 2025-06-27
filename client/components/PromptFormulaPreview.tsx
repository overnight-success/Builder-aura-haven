import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { FavoritePrompts } from "./FavoritePrompts";
import {
  Copy,
  Download,
  Wand2,
  Sparkles,
  RefreshCw,
  ExternalLink,
  Heart,
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

    // Add file references with JSON conversion for images
    if (hasFiles) {
      const imageFiles = uploadedFiles.filter((file) =>
        file.type.startsWith("image/"),
      );
      const videoFiles = uploadedFiles.filter((file) =>
        file.type.startsWith("video/"),
      );

      const fileRefs = [];
      if (imageFiles.length > 0) {
        // Convert images to JSON metadata
        const imageData = imageFiles.map((file) => ({
          name: file.name,
          type: file.type,
          size: file.size,
          lastModified: file.lastModified,
        }));
        fileRefs.push(
          `${imageFiles.length} reference image${imageFiles.length > 1 ? "s" : ""} (metadata: ${JSON.stringify(imageData)})`,
        );
      }
      if (videoFiles.length > 0) {
        fileRefs.push(
          `${videoFiles.length} reference video${videoFiles.length > 1 ? "s" : ""}`,
        );
      }
      components.push(`with ${fileRefs.join(", ")} for visual reference`);
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
    // Create comprehensive formula with all components
    let fullFormula = formula;

    // Add professional cinematography terms if formula is complete
    if (isComplete) {
      fullFormula +=
        ". Professional cinematography, 4K resolution, dynamic composition";
    }

    // Add file information for reference
    if (uploadedFiles.length > 0) {
      fullFormula += `\n\nReference files included: ${uploadedFiles.map((f) => f.name).join(", ")}`;
    }

    await onCopy(fullFormula);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportToSora = async () => {
    // Create a more detailed prompt for Sora
    let enhancedFormula = `${formula}. Professional cinematography, 4K resolution, dynamic composition, ultra-detailed, masterpiece quality`;

    // Add file information for reference
    if (uploadedFiles.length > 0) {
      enhancedFormula += `\n\nReference files included: ${uploadedFiles.map((f) => f.name).join(", ")}`;
    }

    await onCopy(enhancedFormula);
    onExport();
  };

  return (
    <Card className="backdrop-blur-sm bg-black/80 border-black/50 sticky top-6">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-black border-2 border-neon-orange">
              <Wand2 className="h-6 w-6 text-neon-orange" />
            </div>
            <div>
              <span className="text-2xl font-black text-cream tracking-tight">
                AI PROMPT FORMULA
              </span>
              <p className="text-sm font-bold text-neon-orange tracking-wider">
                OPTIMIZED FOR SORA AI
              </p>
            </div>
          </div>
          <Badge className="btn-shiny-black text-cream font-bold text-base px-4 py-2 h-auto border-0">
            {totalComponents}/8 COMPONENTS
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Formula Display */}
        <div className="relative">
          <div
            className={cn(
              "p-6 rounded-lg border-2 min-h-32 transition-all duration-300",
              isComplete
                ? "bg-black/60 border-neon-orange"
                : "bg-black/40 border-black/60",
            )}
          >
            <p
              className={cn(
                "text-lg leading-relaxed",
                isComplete
                  ? "text-cream font-bold"
                  : "text-cream/60 italic font-medium",
              )}
            >
              {formula}
            </p>
          </div>
          {isComplete && (
            <div className="absolute -top-3 -right-3">
              <div className="bg-black border-2 border-neon-orange p-2 rounded-full">
                <Sparkles className="h-5 w-5 text-neon-orange" />
              </div>
            </div>
          )}
        </div>

        {/* Suggested Tweaks */}
        {suggestedTweaks.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-lg font-black text-cream flex items-center gap-3">
              <RefreshCw className="h-5 w-5 text-neon-orange" />
              SUGGESTED ENHANCEMENTS
            </h4>
            <div className="space-y-3">
              {suggestedTweaks.map((tweak, index) => (
                <div
                  key={index}
                  className="text-sm font-semibold p-4 rounded-lg bg-black/50 border-2 border-black/80 text-cream"
                >
                  {tweak}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={handleCopy}
              className="btn-shiny-black text-cream font-black text-sm px-4 py-4 h-auto"
              disabled={!isComplete}
            >
              <Copy className="h-4 w-4 text-neon-orange mr-2" />
              {copied ? "COPIED!" : "COPY"}
            </Button>
            <Button
              onClick={handleExportToSora}
              className="btn-shiny-black text-cream font-black text-sm px-4 py-4 h-auto"
              disabled={!isComplete}
            >
              <ExternalLink className="h-4 w-4 text-neon-orange mr-2" />
              EXPORT
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => {
                if (isComplete && window.saveFavoritePrompt) {
                  window.saveFavoritePrompt({
                    formula,
                    components: selections,
                    customInstructions,
                    files: uploadedFiles.map((f) => f.name),
                  });
                }
              }}
              className="btn-shiny-black text-cream font-black text-sm px-4 py-3 h-auto"
              disabled={!isComplete}
            >
              <Heart className="h-4 w-4 text-neon-orange mr-2" />
              FAVORITE
            </Button>
            <Button
              onClick={() => window.open("https://openai.com/sora", "_blank")}
              className="btn-shiny-black text-cream font-black text-sm px-4 py-3 h-auto"
              disabled={!isComplete}
            >
              <Download className="h-4 w-4 text-neon-orange mr-2" />
              SORA
            </Button>
          </div>
        </div>

        {/* Tips */}
        <div className="text-sm font-semibold text-cream space-y-2 border-t-2 border-black/50 pt-6">
          <p>
            💡 <strong className="text-neon-orange">PRO TIP:</strong> COMPLETE
            4+ CATEGORIES FOR BEST RESULTS
          </p>
          <p>
            🎯 <strong className="text-neon-orange">QUALITY:</strong> MORE
            SPECIFIC SELECTIONS = BETTER OUTPUT
          </p>
        </div>
      </CardContent>

      <FavoritePrompts onCopy={onCopy} />
    </Card>
  );
}
