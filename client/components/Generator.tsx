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

      {/* The Playbook - Embedded from TheBriefcase */}
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4">
            THE PLAYBOOK
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
            Image Generation with Sora & ChatGPT
          </h2>
          <p className="text-lg text-black/80 max-w-2xl mx-auto">
            Complete guide for mastering AI image generation from beginner to
            expert
          </p>
        </div>

        {/* Section 1: Introduction */}
        <div className="bg-black border-4 border-black rounded-lg mb-6">
          <div className="bg-neon-orange text-black p-6 border-b-4 border-black">
            <h3 className="text-xl font-black">
              1. Introduction to Sora Image Generation
            </h3>
          </div>
          <div className="p-6">
            <div className="text-cream text-sm space-y-4">
              <p>
                Sora is OpenAI's advanced platform that extends ChatGPT's
                capabilities to <strong>create images from text prompts</strong>
                . It leverages the latest image generation model (GPT-4o) which
                excels at following detailed instructions and even rendering
                text within images.
              </p>
              <p>
                <strong>How it Works:</strong> In Sora (or ChatGPT's image
                mode), you simply describe the image you want. The AI interprets
                your description and generates an image to match. You can
                specify visual details like style, lighting, composition, and
                more.
              </p>
              <p>
                <strong>Who This Guide is For:</strong> Anyone looking to create
                images – from beginners who have never written an image prompt,
                to advanced users seeking to fine-tune their results, up to
                experts who want to automate prompt generation.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Basics of Prompting */}
        <div className="bg-black border-4 border-black rounded-lg mb-6">
          <div className="bg-neon-orange text-black p-6 border-b-4 border-black">
            <h3 className="text-xl font-black">
              2. Basics of Prompting (Prompting 101)
            </h3>
          </div>
          <div className="p-6">
            <div className="text-cream text-sm space-y-4">
              <div>
                <h4 className="text-neon-orange font-bold mb-3 text-lg">
                  Core Principles:
                </h4>
                <ul className="space-y-3 ml-4">
                  <li>
                    <strong>• Be Specific and Clear:</strong> Provide concrete
                    details about the subject and scene. "A young woman in a red
                    coat walking through a snowy forest" vs "a person in a city"
                  </li>
                  <li>
                    <strong>• Mention the Style or Mood:</strong> "Shot in a
                    natural, casual style" or "photorealistic, 4K detail,
                    ultra-realistic"
                  </li>
                  <li>
                    <strong>• Keep It Simple (at first):</strong> Start with
                    single sentences focusing on one scene
                  </li>
                  <li>
                    <strong>• Use Natural Language:</strong> Write as if
                    describing an image to a person
                  </li>
                  <li>
                    <strong>• Check Output and Iterate:</strong> Treat first
                    image as a draft and refine
                  </li>
                </ul>
              </div>
              <div className="bg-cream/10 p-4 rounded border-2 border-neon-orange/30">
                <p className="text-neon-orange font-bold mb-3">
                  Example Progression:
                </p>
                <div className="space-y-2">
                  <p>
                    <strong>Beginner:</strong> "Photo of a cat sitting on a
                    windowsill."
                  </p>
                  <p>
                    <strong>Advanced:</strong> "A tabby cat lounging on a sunny
                    windowsill with soft morning light filtering through lace
                    curtains, looking outside at birds."
                  </p>
                  <p>
                    <strong>Expert:</strong> "Candid pet photography, close-up
                    shot of a green-eyed tabby cat lounging on a sunlit
                    Victorian bay window, rays of golden morning light
                    patterning its fur through ornate lace curtains. Shot with
                    shallow depth of field (85mm f/1.8)."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Key Components */}
        <div className="bg-black border-4 border-black rounded-lg mb-6">
          <div className="bg-neon-orange text-black p-6 border-b-4 border-black">
            <h3 className="text-xl font-black">
              3. Key Prompt Components & Variables
            </h3>
          </div>
          <div className="p-6">
            <div className="text-cream text-sm space-y-4">
              <div className="bg-cream/10 p-4 rounded border-2 border-neon-orange/30 font-mono text-sm">
                <strong className="text-neon-orange">
                  Prompt Structure Formula:
                </strong>
                <br />
                [Subject] + [Action/Pose] + [Environment/Setting] + [Style/Mood]
                + [Technical Specs]
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-neon-orange font-bold mb-3">
                    Essential Components:
                  </h4>
                  <ul className="space-y-2 text-xs">
                    <li>
                      <strong>Subject:</strong> The main focus (person, object,
                      animal)
                    </li>
                    <li>
                      <strong>Action/Pose:</strong> What they're doing or how
                      positioned
                    </li>
                    <li>
                      <strong>Setting:</strong> Where the scene takes place
                    </li>
                    <li>
                      <strong>Lighting:</strong> Type and quality of light
                    </li>
                    <li>
                      <strong>Style:</strong> Artistic style or photographic
                      approach
                    </li>
                    <li>
                      <strong>Technical:</strong> Camera settings, quality
                      markers
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-neon-orange font-bold mb-3">
                    Advanced Variables:
                  </h4>
                  <ul className="space-y-2 text-xs">
                    <li>
                      <strong>Camera Angle:</strong> Eye-level, low-angle,
                      overhead
                    </li>
                    <li>
                      <strong>Composition:</strong> Rule of thirds, centered,
                      close-up
                    </li>
                    <li>
                      <strong>Color Palette:</strong> Warm tones, monochrome,
                      vibrant
                    </li>
                    <li>
                      <strong>Texture:</strong> Smooth, rough, glossy, matte
                    </li>
                    <li>
                      <strong>Mood:</strong> Cheerful, moody, dramatic, serene
                    </li>
                    <li>
                      <strong>Quality:</strong> 4K, photorealistic, professional
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: SORA-Specific Best Practices */}
        <div className="bg-black border-4 border-black rounded-lg mb-6">
          <div className="bg-neon-orange text-black p-6 border-b-4 border-black">
            <h3 className="text-xl font-black">
              4. SORA-Specific Best Practices
            </h3>
          </div>
          <div className="p-6">
            <div className="text-cream text-sm space-y-4">
              <div>
                <h4 className="text-neon-orange font-bold mb-3">
                  Video-First Thinking
                </h4>
                <p className="mb-3">
                  Remember that SORA generates video, so think about:
                </p>
                <ul className="space-y-1 ml-4 text-xs">
                  <li>• Motion and movement</li>
                  <li>• Temporal consistency</li>
                  <li>• Cinematic composition</li>
                  <li>• Lighting that works in motion</li>
                </ul>
              </div>

              <div>
                <h4 className="text-neon-orange font-bold mb-3">
                  Technical Specifications
                </h4>
                <p className="mb-3">Always include:</p>
                <ul className="space-y-1 ml-4 text-xs">
                  <li>• Resolution (4K recommended)</li>
                  <li>• Aspect ratio (16:9 for video)</li>
                  <li>• Quality markers (cinematic, professional)</li>
                  <li>• Frame rate considerations</li>
                </ul>
              </div>

              <div className="bg-cream/10 p-4 rounded border-2 border-neon-orange/30">
                <h4 className="text-neon-orange font-bold mb-3">
                  Prompt Structure for Video
                </h4>
                <ol className="space-y-1 ml-4 text-xs">
                  <li>
                    1. <strong>Opening Statement:</strong> What the video shows
                  </li>
                  <li>
                    2. <strong>Visual Style:</strong> How it should look
                  </li>
                  <li>
                    3. <strong>Motion Description:</strong> How things move
                  </li>
                  <li>
                    4. <strong>Technical Specs:</strong> Quality and format
                  </li>
                  <li>
                    5. <strong>Reference Data:</strong> JSON image data
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Quick Reference */}
        <div className="bg-black border-4 border-neon-orange rounded-lg">
          <div className="bg-neon-orange text-black p-6 border-b-4 border-black">
            <h3 className="text-xl font-black">
              5. Quick Reference: Variable Examples
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              <div>
                <h4 className="text-neon-orange font-bold mb-3">Lighting</h4>
                <p className="text-cream/80">
                  Soft diffused light, Golden hour sunlight, Neon glow,
                  Candlelight, Dramatic rim lighting
                </p>
              </div>
              <div>
                <h4 className="text-neon-orange font-bold mb-3">
                  Camera Angles
                </h4>
                <p className="text-cream/80">
                  Eye-level, Low-angle, Bird's-eye, First-person POV, Close-up,
                  Wide shot
                </p>
              </div>
              <div>
                <h4 className="text-neon-orange font-bold mb-3">Mood/Tone</h4>
                <p className="text-cream/80">
                  Cheerful and bright, Moody and dark, Tranquil, Whimsical,
                  Cinematic
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 6: Tips & Warnings */}
        <div className="bg-black border-4 border-black rounded-lg mb-6">
          <div className="bg-neon-orange text-black p-6 border-b-4 border-black">
            <h3 className="text-xl font-black">
              6. Tips, Best Practices, and Warnings
            </h3>
          </div>
          <div className="p-6">
            <div className="text-cream text-sm space-y-4">
              <div>
                <h4 className="text-neon-orange font-bold mb-3">
                  General Tips:
                </h4>
                <ul className="space-y-2 ml-4 text-xs">
                  <li>
                    • <strong>Be Specific, Avoid Redundancy:</strong> "Red ball
                    on wooden table" not "nice pretty red ball sitting on wooden
                    table that is brown"
                  </li>
                  <li>
                    • <strong>Avoid Ambiguity:</strong> Clarify words with
                    multiple meanings
                  </li>
                  <li>
                    • <strong>Test in Parts:</strong> Try mini-prompts first for
                    complex concepts
                  </li>
                  <li>
                    • <strong>Use ChatGPT to Improve:</strong> Ask for prompt
                    refinements conversationally
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-neon-orange font-bold mb-3">
                  Content Warnings:
                </h4>
                <ul className="space-y-2 ml-4 text-xs">
                  <li>
                    • <strong>No Disallowed Content:</strong> Violence, gore,
                    sexual, hate content
                  </li>
                  <li>
                    • <strong>Avoid Real Person Likeness:</strong> No named
                    celebrities or individuals
                  </li>
                  <li>
                    • <strong>No Trademark Violations:</strong> Don't request
                    copyrighted logos
                  </li>
                </ul>
              </div>

              <div className="bg-cream/10 p-4 rounded border-2 border-neon-orange/30">
                <p className="text-neon-orange font-bold mb-2">Final Advice:</p>
                <p className="text-xs">
                  Great images may not come on first try. Use Remix feature to
                  refine. Treat each generation as a prototype. "Iterate and
                  Refine" is key - even professional artists make many sketches!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
