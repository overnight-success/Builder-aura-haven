import React, { useEffect, useState, useCallback, useMemo } from "react";
import { CollapsiblePromptCategory } from "./CollapsiblePromptCategory";
import { PromptFormulaPreview } from "./PromptFormulaPreview";
import { CustomInstructions } from "./CustomInstructions";
import { FileUpload, ProcessedFile } from "./FileUpload";
import { InstructionFlow } from "./InstructionFlow";
import { PromptQualityIndicator } from "./PromptQualityIndicator";

import { generatorData } from "../data/generators";
import { usePromptGenerator } from "../contexts/PromptGeneratorContext";
import { promptEngine } from "../utils/promptEngine";
import { cn } from "@/lib/utils";
import {
  Camera,
  Palette,
  Zap,
  Sparkles,
  MapPin,
  Heart,
  Layers3,
  Package,
  Target,
  TrendingUp,
} from "lucide-react";

interface GeneratorProps {
  type: "product" | "lifestyle" | "graphic";
  onActionAttempt?: (action: "outputs" | "downloads") => boolean;
}

const iconMap = {
  style: <Palette className="h-5 w-5" />,
  background: <MapPin className="h-5 w-5" />,
  lighting: <Zap className="h-5 w-5" />,
  angle: <Camera className="h-5 w-5" />,
  mood: <Heart className="h-5 w-5" />,
  enhancement: <Layers3 className="h-5 w-5" />,
  environment: <MapPin className="h-5 w-5" />,
  layout: <Package className="h-5 w-5" />,
  color: <Palette className="h-5 w-5" />,
  typography: <Layers3 className="h-5 w-5" />,
  elements: <Sparkles className="h-5 w-5" />,
  purpose: <Target className="h-5 w-5" />,
};

export function Generator({ type, onActionAttempt }: GeneratorProps) {
  const { state, actions, computed } = usePromptGenerator();
  const [promptAnalysis, setPromptAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const generatorConfig = generatorData[type];

  // Sync generator type with context
  useEffect(() => {
    if (state.currentGenerator !== type) {
      actions.setGenerator(type);
    }
  }, [type, state.currentGenerator, actions.setGenerator]);

  // Analyze prompt quality in real-time
  useEffect(() => {
    const analyzePrompt = async () => {
      setIsAnalyzing(true);

      // Debounce analysis
      const timer = setTimeout(() => {
        const analysis = promptEngine.analyzePrompt(
          type,
          state.selections,
          state.customInstructions,
          state.uploadedFiles,
        );
        setPromptAnalysis(analysis);
        setIsAnalyzing(false);
      }, 500);

      return () => clearTimeout(timer);
    };

    analyzePrompt();
  }, [type, state.selections, state.customInstructions, state.uploadedFiles]);

  const handleCategorySelect = useCallback(
    (category: string, option: string) => {
      actions.updateSelection(category, option);
    },
    [actions],
  );

  const handleCopy = useCallback(
    (text: string) => {
      // Simple, reliable copy
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999px";
      textArea.style.top = "-999px";

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      let copySuccess = false;
      try {
        copySuccess = document.execCommand("copy");
      } catch (error) {
        copySuccess = false;
      }

      document.body.removeChild(textArea);

      if (!copySuccess) {
        alert(`❌ Copy failed. Please copy this text manually:\n\n${text}`);
      }

      // Add to history
      try {
        const promptVersion = {
          id: Date.now().toString(),
          formula: text,
          timestamp: Date.now(),
          quality: promptAnalysis?.quality || 0,
        };
        actions.addToHistory(promptVersion);
      } catch (historyError) {
        console.error("Failed to add to history:", historyError);
      }
    },
    [actions, promptAnalysis],
  );

  const handleExport = useCallback(() => {
    try {
      // Generate the current formula
      const formula = promptEngine.generateFormula(
        type,
        state.selections,
        state.customInstructions,
        state.uploadedFiles,
      );

      // Create export data
      const exportData = {
        timestamp: new Date().toISOString(),
        generator: type,
        formula: formula,
        selections: state.selections,
        customInstructions: state.customInstructions,
        filesCount: state.uploadedFiles.length,
        quality: promptAnalysis?.quality || 0,
      };

      // Create and download JSON file
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `sora-prompt-${type}-${Date.now()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      console.log("Prompt exported successfully");
    } catch (error) {
      console.error("Export failed:", error);
      alert("Export failed. Please try again or contact support.");
    }
  }, [
    type,
    state.selections,
    state.customInstructions,
    state.uploadedFiles,
    promptAnalysis,
  ]);

  // Memoized current step calculation based on new flow
  const currentStep = useMemo(() => {
    let step = 1; // Always start at step 1 (Custom Instructions)

    if (computed.hasCustomInstructions) step = 2; // Move to categories
    if (computed.selectedCount > 0) step = 3; // Move to file upload
    if (computed.hasFiles) step = 4; // Move to quality review
    if (computed.isComplete) step = 5; // Ready to copy

    return step;
  }, [
    computed.hasCustomInstructions,
    computed.selectedCount,
    computed.hasFiles,
    computed.isComplete,
  ]);

  // Generate smart suggestions based on current selections
  const smartSuggestions = useMemo(() => {
    if (!promptAnalysis) return [];

    const suggestions = [];

    // Quality-based suggestions
    if (promptAnalysis.quality < 60) {
      suggestions.push({
        type: "quality",
        title: "Improve Quality",
        description: "Add more category selections for better results",
        action: "Select more options",
      });
    }

    // Completeness suggestions
    if (promptAnalysis.completeness < 80) {
      const missingCategories = Object.keys(generatorConfig.categories).filter(
        (cat) => !state.selections[cat],
      );
      if (missingCategories.length > 0) {
        suggestions.push({
          type: "completeness",
          title: "Complete Your Prompt",
          description: `Consider adding ${missingCategories[0]} for better results`,
          action: `Add ${missingCategories[0]}`,
        });
      }
    }

    // Coherence suggestions
    if (promptAnalysis.coherence < 70) {
      suggestions.push({
        type: "coherence",
        title: "Improve Coherence",
        description: "Choose options that work well together",
        action: "Review selections",
      });
    }

    return suggestions.slice(0, 3);
  }, [promptAnalysis, generatorConfig.categories, state.selections]);

  return (
    <div className="container mx-auto px-4 lg:px-8 py-4 lg:py-8">
      {/* Generator Header */}
      <div className="mb-8">
        <div className="mb-4">
          <div></div>
        </div>
      </div>
    </div>
  );
}
