import React, { useEffect, useState, useCallback, useMemo } from "react";
import { CollapsiblePromptCategory } from "./CollapsiblePromptCategory";
import { PromptFormulaPreview } from "./PromptFormulaPreview";
import { CustomInstructions } from "./CustomInstructions";
import { FileUpload, ProcessedFile } from "./FileUpload";
import { InstructionFlow } from "./InstructionFlow";
import { PromptQualityIndicator } from "./PromptQualityIndicator";
import { SmartSuggestions } from "./SmartSuggestions";
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
  }, [type, state.currentGenerator, actions]);

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
    console.log("Export prompt for", type, ":", state.selections);
    // Could integrate with external services here
  }, [type, state.selections]);

  // Memoized current step calculation
  const currentStep = useMemo(() => {
    return computed.totalComponents > 0
      ? Math.min(computed.totalComponents + 1, 8)
      : 1;
  }, [computed.totalComponents]);

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
    <div className="container mx-auto px-8 py-8">
      {/* Generator Header with Quality Indicator */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-4xl font-black text-black mb-2">
              {generatorConfig.title}
            </h1>
            <p className="text-xl font-bold text-black">
              {generatorConfig.description}
            </p>
          </div>

          {promptAnalysis && (
            <PromptQualityIndicator
              quality={promptAnalysis.quality}
              completeness={promptAnalysis.completeness}
              coherence={promptAnalysis.coherence}
              creativity={promptAnalysis.creativity}
              isAnalyzing={isAnalyzing}
            />
          )}
        </div>

        {/* Smart Suggestions */}
        {smartSuggestions.length > 0 && (
          <SmartSuggestions suggestions={smartSuggestions} />
        )}
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
                  stepNumber={index + 1}
                  isCompleted={!!state.selections[key]}
                  showFlow={true}
                />
              ),
            )}

            {/* Custom Instructions */}
            <CustomInstructions
              value={state.customInstructions}
              onChange={actions.setCustomInstructions}
              stepNumber={Object.keys(generatorConfig.categories).length + 1}
              isCompleted={computed.hasCustomInstructions}
              showFlow={true}
            />

            {/* File Upload */}
            <FileUpload
              files={state.uploadedFiles}
              onFilesChange={actions.setUploadedFiles}
              stepNumber={Object.keys(generatorConfig.categories).length + 2}
              isCompleted={computed.hasFiles}
            />

            {/* Completion Indicator */}
            {computed.isComplete && (
              <div className="flex justify-center mt-6">
                <div className="flex items-center gap-3 px-6 py-3 rounded-lg bg-black border-2 border-neon-orange text-cream font-bold text-lg animate-pulse">
                  <Sparkles className="h-5 w-5 text-neon-orange" />
                  <span>FORMULA READY TO COPY!</span>
                  <TrendingUp className="h-5 w-5 text-neon-orange" />
                </div>
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
