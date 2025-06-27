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
  const [exported, setExported] = useState(false);
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

    // Try modern clipboard API first, catch any permission errors
    let clipboardSuccess = false;

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(fullFormula);
        clipboardSuccess = true;
      } catch (clipboardError) {
        console.warn(
          "Modern clipboard failed, using fallback:",
          clipboardError,
        );
      }
    }

    // If modern clipboard failed, use fallback method
    if (!clipboardSuccess) {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = fullFormula;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        const success = document.execCommand("copy");
        document.body.removeChild(textArea);

        if (!success) {
          throw new Error("execCommand copy failed");
        }
      } catch (fallbackError) {
        console.error("All copy methods failed:", fallbackError);
        // Last resort: show the text for manual copy
        alert(`Copy failed. Please manually copy this text:\n\n${fullFormula}`);
        return;
      }
    }

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

    // Try modern clipboard API first, catch any permission errors
    let clipboardSuccess = false;

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(enhancedFormula);
        clipboardSuccess = true;
      } catch (clipboardError) {
        console.warn(
          "Modern clipboard failed, using fallback:",
          clipboardError,
        );
      }
    }

    // If modern clipboard failed, use fallback method
    if (!clipboardSuccess) {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = enhancedFormula;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        const success = document.execCommand("copy");
        document.body.removeChild(textArea);

        if (!success) {
          throw new Error("execCommand copy failed");
        }
      } catch (fallbackError) {
        console.error("All export methods failed:", fallbackError);
        alert(
          `Export failed. Please manually copy this enhanced text:\n\n${enhancedFormula}`,
        );
        return;
      }
    }

    setExported(true);
    setTimeout(() => setExported(false), 2000);
    onExport();
  };

  const handleFavorite = () => {
    if (isComplete && window.saveFavoritePrompt) {
      try {
        window.saveFavoritePrompt({
          formula,
          components: selections,
          customInstructions,
          files: uploadedFiles.map((f) => f.name),
        });
      } catch (error) {
        console.error("Failed to save favorite:", error);
      }
    }
  };

  const handleOpenSora = () => {
    try {
      window.open("https://openai.com/sora", "_blank");
    } catch (error) {
      console.error("Failed to open Sora:", error);
    }
  };

  return (
    <Card className="bg-black border-2 border-cream sticky top-6">
      <CardHeader className="pb-3">
        <CardTitle className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-black border-2 border-neon-orange shrink-0">
              <Wand2 className="h-4 w-4 text-neon-orange" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-lg font-black text-cream tracking-tight block truncate">
                AI PROMPT FORMULA
              </span>
              <p className="text-xs font-bold text-neon-orange tracking-wide">
                OPTIMIZED FOR SORA AI
              </p>
            </div>
          </div>
          <Badge className="bg-black border-2 border-neon-orange text-cream font-bold text-xs px-3 py-1 w-fit">
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
                ? "bg-black border-neon-orange"
                : "bg-black border-cream",
            )}
          >
            <p
              className={cn(
                "text-sm leading-relaxed",
                isComplete
                  ? "text-cream font-semibold"
                  : "text-cream italic font-normal",
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
          <div className="space-y-2">
            <h4 className="text-sm font-black text-cream flex items-center gap-2">
              <RefreshCw className="h-3 w-3 text-neon-orange shrink-0" />
              <span className="truncate">SUGGESTED ENHANCEMENTS</span>
            </h4>
            <div className="space-y-2">
              {suggestedTweaks.map((tweak, index) => (
                <div
                  key={index}
                  className="text-xs font-medium p-2 rounded-lg bg-black border border-cream text-cream leading-tight"
                >
                  {tweak}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={handleCopy}
              className="bg-black border-2 border-neon-orange text-cream font-bold text-xs px-3 py-2 h-auto hover:bg-neon-orange hover:text-black transition-all duration-200 truncate"
              disabled={!isComplete}
            >
              <Copy className="h-3 w-3 text-neon-orange mr-1 shrink-0" />
              <span className="truncate">{copied ? "COPIED!" : "COPY"}</span>
            </Button>
            <Button
              onClick={handleExportToSora}
              className="bg-black border-2 border-neon-orange text-cream font-bold text-xs px-3 py-2 h-auto hover:bg-neon-orange hover:text-black transition-all duration-200 truncate"
              disabled={!isComplete}
            >
              <ExternalLink className="h-3 w-3 text-neon-orange mr-1 shrink-0" />
              <span className="truncate">
                {exported ? "EXPORTED!" : "EXPORT"}
              </span>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={handleFavorite}
              className="bg-black border-2 border-neon-orange text-cream font-bold text-xs px-3 py-2 h-auto hover:bg-neon-orange hover:text-black transition-all duration-200 truncate"
              disabled={!isComplete}
            >
              <Heart className="h-3 w-3 text-neon-orange mr-1 shrink-0" />
              <span className="truncate">FAVORITE</span>
            </Button>
            <Button
              onClick={handleOpenSora}
              className="bg-black border-2 border-neon-orange text-cream font-bold text-xs px-3 py-2 h-auto hover:bg-neon-orange hover:text-black transition-all duration-200 truncate"
              disabled={!isComplete}
            >
              <Download className="h-3 w-3 text-neon-orange mr-1 shrink-0" />
              <span className="truncate">SORA</span>
            </Button>
          </div>
        </div>

        {/* Tips */}
        <div className="text-xs font-medium text-cream space-y-1 border-t border-cream/20 pt-3">
          <p className="leading-tight">
            💡 <strong className="text-neon-orange">TIP:</strong> Complete 4+
            categories for best results
          </p>
          <p className="leading-tight">
            🎯 <strong className="text-neon-orange">QUALITY:</strong> Specific
            selections = better output
          </p>
        </div>
      </CardContent>

      <FavoritePrompts onCopy={onCopy} />
    </Card>
  );
}
