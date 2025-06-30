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
  scene: <Camera className="h-5 w-5" />,
  people: <Heart className="h-5 w-5" />,
  environment: <MapPin className="h-5 w-5" />,
  layout: <Package className="h-5 w-5" />,
  color: <Palette className="h-5 w-5" />,
  typography: <Layers3 className="h-5 w-5" />,
  elements: <Sparkles className="h-5 w-5" />,
  purpose: <Target className="h-5 w-5" />,
};

export function Generator({ type }: GeneratorProps) {
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
    async (text: string) => {
      // Enhanced copy with analytics
      try {
        // Try modern clipboard API first
        let clipboardSuccess = false;

        if (navigator.clipboard) {
          try {
            await navigator.clipboard.writeText(text);
            clipboardSuccess = true;
          } catch (clipboardError) {
            console.warn(
              "Modern clipboard failed, using fallback:",
              clipboardError,
            );
          }
        }

        // Fallback method
        if (!clipboardSuccess) {
          try {
            const textArea = document.createElement("textarea");
            textArea.value = text;
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
            alert(`Copy failed. Please manually copy this text:\n\n${text}`);
          }
        }

        // Add to history if successful
        if (clipboardSuccess || true) {
          const promptVersion = {
            id: Date.now().toString(),
            formula: text,
            timestamp: Date.now(),
            quality: promptAnalysis?.quality || 0,
          };
          actions.addToHistory(promptVersion);
        }
      } catch (error) {
        console.error("Copy operation failed:", error);
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
          <div>
            <h1 className="text-4xl font-black text-black mb-2">
              {generatorConfig.title}
            </h1>
            <p className="text-xl font-bold text-black">
              {generatorConfig.description}
            </p>
          </div>
        </div>
      </div>

      {/* Instruction Flow */}
      <InstructionFlow
        currentStep={currentStep}
        totalComponents={computed.totalComponents}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Categories Flow */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {/* Custom Instructions - Step 1 */}
            <CustomInstructions
              value={state.customInstructions}
              onChange={actions.setCustomInstructions}
              stepNumber={1}
              isCompleted={computed.hasCustomInstructions}
              showFlow={true}
            />

            {Object.entries(generatorConfig.categories).map(
              ([key, category], index) => (
                <CollapsiblePromptCategory
                  key={key}
                  title={category.title}
                  icon={
                    iconMap[key as keyof typeof iconMap] || (
                      <Package className="h-5 w-5" />
                    )
                  }
                  options={category.options}
                  selectedOption={state.selections[key]}
                  onSelect={(option) => handleCategorySelect(key, option)}
                  stepNumber={index + 2}
                  isCompleted={!!state.selections[key]}
                  showFlow={true}
                />
              ),
            )}

            {/* File Upload */}
            <FileUpload
              files={state.uploadedFiles}
              onFilesChange={actions.setUploadedFiles}
              stepNumber={Object.keys(generatorConfig.categories).length + 2}
              isCompleted={computed.hasFiles}
            />

            {/* Completion Indicator with Quality Analysis - Mobile Optimized */}
            {computed.isComplete && (
              <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6 mt-6">
                <div className="flex items-center gap-2 lg:gap-3 px-4 lg:px-6 py-2 lg:py-3 rounded-lg bg-black border-2 border-neon-orange text-cream font-bold text-sm lg:text-lg animate-pulse w-full lg:w-auto justify-center">
                  <Sparkles className="h-4 w-4 lg:h-5 lg:w-5 text-neon-orange shrink-0" />
                  <span className="text-center">FORMULA READY TO COPY!</span>
                  <TrendingUp className="h-4 w-4 lg:h-5 lg:w-5 text-neon-orange shrink-0" />
                </div>
                {promptAnalysis && (
                  <div className="w-full lg:w-auto">
                    <PromptQualityIndicator
                      quality={promptAnalysis.quality}
                      completeness={promptAnalysis.completeness}
                      coherence={promptAnalysis.coherence}
                      creativity={promptAnalysis.creativity}
                      isAnalyzing={isAnalyzing}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Formula Preview */}
        <div className="lg:col-span-1">
          <PromptFormulaPreview
            generatorType={type}
            onCopy={handleCopy}
            onExport={handleExport}
            promptAnalysis={promptAnalysis}
          />
        </div>
      </div>
    </div>
  );
}
