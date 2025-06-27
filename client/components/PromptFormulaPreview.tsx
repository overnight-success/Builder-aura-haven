import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { FavoritePrompts } from "./FavoritePrompts";
import {
  usePromptGenerator,
  ProcessedFile,
} from "../contexts/PromptGeneratorContext";
import { promptEngine } from "../utils/promptEngine";
import {
  Copy,
  Download,
  Wand2,
  Sparkles,
  RefreshCw,
  ExternalLink,
  Heart,
  Zap,
  TrendingUp,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PromptFormulaPreviewProps {
  generatorType: "product" | "lifestyle" | "graphic";
  onCopy: (text: string) => void;
  onExport: () => void;
  promptAnalysis: any;
}

export function PromptFormulaPreview({
  generatorType,
  onCopy,
  onExport,
  promptAnalysis,
}: PromptFormulaPreviewProps) {
  const { state, actions, computed } = usePromptGenerator();
  const [copied, setCopied] = useState(false);
  const [exported, setExported] = useState(false);
  const [showEnhanced, setShowEnhanced] = useState(false);
  const [enhancedFormula, setEnhancedFormula] = useState<any>(null);

  // Generate optimized formula using AI engine
  const optimizedFormula = useMemo(() => {
    return promptEngine.generateFormula(
      generatorType,
      state.selections,
      state.customInstructions,
      state.uploadedFiles,
    );
  }, [
    generatorType,
    state.selections,
    state.customInstructions,
    state.uploadedFiles,
  ]);

  // Generate enhanced version
  useEffect(() => {
    if (computed.isComplete && promptAnalysis) {
      const enhanced = promptEngine.enhanceFormula(
        optimizedFormula,
        generatorType,
        promptAnalysis.quality,
      );
      setEnhancedFormula(enhanced);
    }
  }, [optimizedFormula, generatorType, promptAnalysis, computed.isComplete]);

  // Smart suggestions based on analysis
  const smartSuggestions = useMemo(() => {
    if (!promptAnalysis) return [];
    return promptAnalysis.recommendations.slice(0, 3);
  }, [promptAnalysis]);

  const handleCopy = useCallback(async () => {
    const formulaToCopy = showEnhanced
      ? enhancedFormula?.enhanced || optimizedFormula
      : optimizedFormula;

    try {
      await onCopy(formulaToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      // Add to history with quality score
      if (promptAnalysis) {
        const promptVersion = {
          id: Date.now().toString(),
          formula: formulaToCopy,
          timestamp: Date.now(),
          quality: promptAnalysis.quality,
        };
        actions.addToHistory(promptVersion);
      }
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  }, [
    showEnhanced,
    enhancedFormula,
    optimizedFormula,
    onCopy,
    promptAnalysis,
    actions,
  ]);

  const handleExportToSora = useCallback(async () => {
    const formulaToExport = showEnhanced
      ? enhancedFormula?.enhanced || optimizedFormula
      : optimizedFormula;

    // Add Sora-specific optimizations
    const soraOptimized = `${formulaToExport}, optimized for Sora AI video generation, cinematic quality, professional grade`;

    try {
      await onCopy(soraOptimized);
      setExported(true);
      setTimeout(() => setExported(false), 2000);
      onExport();
    } catch (error) {
      console.error("Failed to export:", error);
    }
  }, [showEnhanced, enhancedFormula, optimizedFormula, onCopy, onExport]);

  const handleFavorite = useCallback(() => {
    if (computed.isComplete) {
      const formulaToSave = showEnhanced
        ? enhancedFormula?.enhanced || optimizedFormula
        : optimizedFormula;

      const favorite = {
        id: Date.now().toString(),
        generator: generatorType,
        formula: formulaToSave,
        selections: state.selections,
        customInstructions: state.customInstructions,
        files: state.uploadedFiles.map((f) => f.name),
        timestamp: Date.now(),
        quality: promptAnalysis?.quality || 0,
      };

      actions.addFavorite(favorite);
    }
  }, [
    computed.isComplete,
    showEnhanced,
    enhancedFormula,
    optimizedFormula,
    generatorType,
    state.selections,
    state.customInstructions,
    state.uploadedFiles,
    promptAnalysis,
    actions,
  ]);

  const handleOpenSora = useCallback(() => {
    try {
      window.open("https://openai.com/sora", "_blank");
    } catch (error) {
      console.error("Failed to open Sora:", error);
    }
  }, []);

  const displayFormula = showEnhanced
    ? enhancedFormula?.enhanced || optimizedFormula
    : optimizedFormula;

  const hasContent =
    computed.selectedCount > 0 ||
    computed.hasCustomInstructions ||
    computed.hasFiles;

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

          <div className="flex items-center justify-between">
            <Badge className="bg-black border-2 border-neon-orange text-cream font-bold text-xs px-3 py-1">
              {computed.totalComponents}/8 COMPONENTS
            </Badge>

            {promptAnalysis && (
              <Badge
                className={cn(
                  "font-bold text-xs px-3 py-1",
                  promptAnalysis.quality >= 80
                    ? "bg-green-500 text-black"
                    : promptAnalysis.quality >= 60
                      ? "bg-yellow-500 text-black"
                      : "bg-red-500 text-white",
                )}
              >
                {Math.round(promptAnalysis.quality)}% QUALITY
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Formula Display */}
        <div className="relative">
          <div
            className={cn(
              "p-4 rounded-lg border-2 min-h-24 transition-all duration-300 relative",
              computed.isComplete
                ? "bg-black border-neon-orange"
                : "bg-black border-cream",
            )}
          >
            {hasContent ? (
              <>
                <p
                  className={cn(
                    "text-sm leading-relaxed pr-8",
                    computed.isComplete
                      ? "text-cream font-semibold"
                      : "text-cream/80 font-normal",
                  )}
                >
                  {displayFormula}
                </p>

                {/* Enhanced Toggle */}
                {enhancedFormula && computed.isComplete && (
                  <Button
                    onClick={() => setShowEnhanced(!showEnhanced)}
                    className="absolute top-2 right-2 p-1 h-auto bg-transparent hover:bg-neon-orange/20 border border-neon-orange/50"
                    size="sm"
                  >
                    <Eye className="h-3 w-3 text-neon-orange" />
                  </Button>
                )}
              </>
            ) : (
              <p className="text-cream/60 italic text-sm">
                Select from categories above to build your Sora AI prompt
                formula...
              </p>
            )}
          </div>

          {computed.isComplete && (
            <div className="absolute -top-3 -right-3">
              <div className="bg-black border-2 border-neon-orange p-2 rounded-full animate-pulse">
                <Sparkles className="h-4 w-4 text-neon-orange" />
              </div>
            </div>
          )}
        </div>

        {/* Enhancement Info */}
        {showEnhanced && enhancedFormula && (
          <div className="bg-black/50 border border-neon-orange/30 p-3 rounded-lg">
            <h5 className="text-xs font-bold text-neon-orange mb-2 flex items-center gap-1">
              <Zap className="h-3 w-3" />
              AI ENHANCEMENTS APPLIED
            </h5>
            <ul className="text-xs text-cream space-y-1">
              {enhancedFormula.improvements.map(
                (improvement: string, i: number) => (
                  <li key={i} className="flex items-center gap-2">
                    <TrendingUp className="h-3 w-3 text-green-400 shrink-0" />
                    {improvement}
                  </li>
                ),
              )}
            </ul>
          </div>
        )}

        {/* Smart Suggestions */}
        {smartSuggestions.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-black text-cream flex items-center gap-2">
              <RefreshCw className="h-3 w-3 text-neon-orange shrink-0" />
              <span className="truncate">AI RECOMMENDATIONS</span>
            </h4>
            <div className="space-y-2">
              {smartSuggestions.map((suggestion: string, index: number) => (
                <div
                  key={index}
                  className="text-xs font-medium p-2 rounded-lg bg-black/50 border border-neon-orange/30 text-cream leading-tight flex items-center gap-2"
                >
                  <Sparkles className="h-3 w-3 text-neon-orange shrink-0" />
                  {suggestion}
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
              disabled={!hasContent}
            >
              <Copy className="h-3 w-3 text-neon-orange mr-1 shrink-0" />
              <span className="truncate">{copied ? "COPIED!" : "COPY"}</span>
            </Button>
            <Button
              onClick={handleExportToSora}
              className="bg-black border-2 border-neon-orange text-cream font-bold text-xs px-3 py-2 h-auto hover:bg-neon-orange hover:text-black transition-all duration-200 truncate"
              disabled={!hasContent}
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
              disabled={!computed.isComplete}
            >
              <Heart className="h-3 w-3 text-neon-orange mr-1 shrink-0" />
              <span className="truncate">FAVORITE</span>
            </Button>
            <Button
              onClick={handleOpenSora}
              className="bg-black border-2 border-neon-orange text-cream font-bold text-xs px-3 py-2 h-auto hover:bg-neon-orange hover:text-black transition-all duration-200 truncate"
              disabled={!computed.isComplete}
            >
              <Download className="h-3 w-3 text-neon-orange mr-1 shrink-0" />
              <span className="truncate">SORA</span>
            </Button>
          </div>
        </div>

        {/* Enhanced Tips */}
        <div className="text-xs font-medium text-cream space-y-1 border-t border-cream/20 pt-3">
          <p className="leading-tight flex items-center gap-2">
            <Sparkles className="h-3 w-3 text-neon-orange shrink-0" />
            <strong className="text-neon-orange">AI TIP:</strong> Complete 4+
            categories for AI optimization
          </p>
          <p className="leading-tight flex items-center gap-2">
            <TrendingUp className="h-3 w-3 text-neon-orange shrink-0" />
            <strong className="text-neon-orange">QUALITY:</strong> More specific
            = better results
          </p>
        </div>
      </CardContent>

      <FavoritePrompts onCopy={onCopy} />
    </Card>
  );
}
