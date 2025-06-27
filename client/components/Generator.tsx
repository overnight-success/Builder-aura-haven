import React, { useState } from "react";
import { CollapsiblePromptCategory } from "./CollapsiblePromptCategory";
import { PromptFormulaPreview } from "./PromptFormulaPreview";
import { CustomInstructions } from "./CustomInstructions";
import { FileUpload } from "./FileUpload";
import { InstructionFlow } from "./InstructionFlow";
import { generatorData } from "../data/generators";
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
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [customInstructions, setCustomInstructions] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const generatorConfig = generatorData[type];

  const handleCategorySelect = (category: string, option: string) => {
    setSelections((prev) => ({
      ...prev,
      [category]: prev[category] === option ? "" : option,
    }));
  };

  const handleCopy = async (text: string) => {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
          document.execCommand("copy");
        } catch (execError) {
          console.error("Fallback copy failed:", execError);
          alert(`Copy failed. Please manually copy this text:\n\n${text}`);
          return;
        } finally {
          document.body.removeChild(textArea);
        }
      }
    } catch (error) {
      console.error("Failed to copy:", error);
      alert(`Copy failed. Please manually copy this text:\n\n${text}`);
    }
  };

  const handleExport = () => {
    console.log("Export prompt for", type, ":", selections);
  };

  const selectedCount = Object.values(selections).filter(Boolean).length;
  const hasCustomInstructions = customInstructions.trim().length > 0;
  const hasFiles = uploadedFiles.length > 0;
  const totalComponents =
    selectedCount + (hasCustomInstructions ? 1 : 0) + (hasFiles ? 1 : 0);
  const isComplete = selectedCount >= 4;

  return (
    <div className="container mx-auto px-8 py-8">
      {/* Generator Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black text-black mb-4">
          {generatorConfig.title}
        </h1>
        <p className="text-xl font-bold text-black">
          {generatorConfig.description}
        </p>
      </div>

      {/* Instruction Flow */}
      <InstructionFlow
        currentStep={totalComponents > 0 ? Math.min(totalComponents + 1, 5) : 1}
        totalComponents={totalComponents}
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
                  selectedOption={selections[key]}
                  onSelect={(option) => handleCategorySelect(key, option)}
                  stepNumber={index + 1}
                  isCompleted={!!selections[key]}
                  showFlow={true}
                />
              ),
            )}

            {/* Custom Instructions */}
            <CustomInstructions
              value={customInstructions}
              onChange={setCustomInstructions}
              stepNumber={Object.keys(generatorConfig.categories).length + 1}
              isCompleted={hasCustomInstructions}
              showFlow={true}
            />

            {/* File Upload */}
            <FileUpload
              files={uploadedFiles}
              onFilesChange={setUploadedFiles}
              stepNumber={Object.keys(generatorConfig.categories).length + 2}
              isCompleted={hasFiles}
            />

            {/* Completion Indicator */}
            {totalComponents >= 4 && (
              <div className="flex justify-center mt-6">
                <div className="flex items-center gap-3 px-6 py-3 rounded-lg bg-black border-2 border-neon-orange text-cream font-bold text-lg">
                  <Sparkles className="h-5 w-5 text-neon-orange" />
                  <span>FORMULA READY TO COPY!</span>
                  <Sparkles className="h-5 w-5 text-neon-orange" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Formula Preview */}
        <div className="lg:col-span-1">
          <PromptFormulaPreview
            selections={selections}
            customInstructions={customInstructions}
            uploadedFiles={uploadedFiles}
            onCopy={handleCopy}
            onExport={handleExport}
          />
        </div>
      </div>
    </div>
  );
}
