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
    <div className="container mx-auto px-4 lg:px-8 py-0 lg:py-3">
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
            <div className="text-cream/90 text-sm space-y-3">
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
            <div className="text-cream/90 text-sm space-y-4">
              <div>
                <h4 className="text-neon-orange font-bold mb-2">
                  Core Principles:
                </h4>
                <ul className="space-y-2 ml-4">
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
              <div className="bg-cream/10 p-3 rounded">
                <p className="text-neon-orange font-bold mb-2">
                  Example Progression:
                </p>
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
                  shot of a green-eyed tabby cat lounging on a sunlit Victorian
                  bay window, rays of golden morning light patterning its fur
                  through ornate lace curtains. Shot with shallow depth of field
                  (85mm f/1.8)."
                </p>
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
            <div className="text-cream/90 text-sm space-y-4">
              <div className="bg-cream/10 p-3 rounded font-mono text-xs">
                <strong>Prompt Structure Formula:</strong>
                <br />
                [Subject] + [Action/Pose] + [Environment/Setting] + [Lighting] +
                [Camera Details] + [Style/Mood] + [Quality Parameters]
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-neon-orange font-bold mb-2">
                    Subject Description
                  </h4>
                  <p className="text-xs">
                    Who or what is the focus. Be specific about color, size,
                    distinctive features.
                  </p>
                </div>
                <div>
                  <h4 className="text-neon-orange font-bold mb-2">
                    Action/Pose
                  </h4>
                  <p className="text-xs">
                    What the subject is doing. Adds dynamism and context.
                  </p>
                </div>
                <div>
                  <h4 className="text-neon-orange font-bold mb-2">
                    Environment/Setting
                  </h4>
                  <p className="text-xs">
                    Surroundings, background. Include time of day or weather if
                    relevant.
                  </p>
                </div>
                <div>
                  <h4 className="text-neon-orange font-bold mb-2">Lighting</h4>
                  <p className="text-xs">
                    Quality and direction of light. Most powerful mood setter.
                  </p>
                </div>
                <div>
                  <h4 className="text-neon-orange font-bold mb-2">
                    Camera Details
                  </h4>
                  <p className="text-xs">
                    Angle, framing, lens type, depth of field, composition
                    terms.
                  </p>
                </div>
                <div>
                  <h4 className="text-neon-orange font-bold mb-2">
                    Style/Mood
                  </h4>
                  <p className="text-xs">
                    Artistic style, genre, overall vibe, color palette.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Lifestyle Photography */}
        <div className="bg-black border-4 border-black rounded-lg mb-6">
          <div className="bg-neon-orange text-black p-6 border-b-4 border-black">
            <h3 className="text-xl font-black">
              4. Lifestyle Photography Prompts
            </h3>
          </div>
          <div className="p-6">
            <div className="text-cream/90 text-sm space-y-3">
              <p>
                Lifestyle images capture people in everyday, real-life contexts.
                They feel candid, authentic, and relatable.
              </p>
              <div>
                <h4 className="text-neon-orange font-bold mb-2">
                  Characteristics:
                </h4>
                <ul className="space-y-1 ml-4 text-xs">
                  <li>
                    • <strong>Everyday Scenarios:</strong> Focus on common
                    activities - friends at cafe, family cooking, person jogging
                  </li>
                  <li>
                    • <strong>Natural Styling:</strong> Use "candid", "unposed",
                    "in the moment" descriptors
                  </li>
                  <li>
                    • <strong>Environmental Context:</strong> Include background
                    details, props, decor for realism
                  </li>
                  <li>
                    • <strong>Lighting for Mood:</strong> Daylight and ambient
                    lighting are common
                  </li>
                </ul>
              </div>
              <div className="bg-cream/10 p-3 rounded">
                <p className="text-neon-orange font-bold mb-1">
                  Expert Example:
                </p>
                <p className="text-xs">
                  "Candid outdoor lifestyle shot, golden-hour sun flare. A group
                  of diverse friends in hiking gear reach the summit of a hill,
                  cheering with exhilaration. Camera positioned low looking up
                  at triumphant poses against vibrant sky, emphasizing
                  achievement. Lens flare and long shadows add drama while faces
                  glow with warm sunset light."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Product & Studio Photography */}
        <div className="bg-black border-4 border-black rounded-lg mb-6">
          <div className="bg-neon-orange text-black p-6 border-b-4 border-black">
            <h3 className="text-xl font-black">
              5. Product & Studio Photography Prompts
            </h3>
          </div>
          <div className="p-6">
            <div className="text-cream/90 text-sm space-y-3">
              <p>
                Product photography focuses on highlighting item features in a
                clear, visually appealing way.
              </p>
              <div>
                <h4 className="text-neon-orange font-bold mb-2">
                  Key Elements:
                </h4>
                <ul className="space-y-1 ml-4 text-xs">
                  <li>
                    • <strong>Isolate the Product:</strong> Clean background,
                    good lighting, product centered
                  </li>
                  <li>
                    • <strong>Lighting & Reflections:</strong> Match lighting to
                    material - softbox for shiny objects
                  </li>
                  <li>
                    • <strong>Camera and Focus:</strong> Sharp focus, high
                    resolution, consider angle
                  </li>
                  <li>
                    • <strong>Contextual vs. Isolated:</strong> Decide on props
                    or plain background
                  </li>
                </ul>
              </div>
              <div className="bg-cream/10 p-3 rounded">
                <p className="text-neon-orange font-bold mb-1">
                  Expert Example:
                </p>
                <p className="text-xs">
                  "Hero shot of new smartphone levitating above matte black
                  pedestal, against dimly lit studio with two-point lighting
                  (cool blue fill from left, soft white key from right). Phone
                  screen displays faint home screen glow. Detailed reflections
                  on phone edges highlight metallic frame. Background in deep
                  shadow with bokeh city lights. Shot in 4K, ultra-sharp."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 6: Custom Graphics & Design */}
        <div className="bg-black border-4 border-black rounded-lg mb-6">
          <div className="bg-neon-orange text-black p-6 border-b-4 border-black">
            <h3 className="text-xl font-black">
              6. Custom Graphics & Design Prompts
            </h3>
          </div>
          <div className="p-6">
            <div className="text-cream/90 text-sm space-y-3">
              <p>
                Sora can generate graphic designs: logos, icons, banners with
                text, illustrations for branding.
              </p>
              <div>
                <h4 className="text-neon-orange font-bold mb-2">
                  Logo Creation Tips:
                </h4>
                <ul className="space-y-1 ml-4 text-xs">
                  <li>
                    • <strong>Keep it Simple:</strong> "Minimalist logo" or
                    "bold emblem-style logo"
                  </li>
                  <li>
                    • <strong>Specify Style:</strong> "Modern flat design",
                    "vintage retro style"
                  </li>
                  <li>
                    • <strong>Colors and Fonts:</strong> Include color schemes
                    and font style descriptions
                  </li>
                  <li>
                    • <strong>Background:</strong> Usually "plain white
                    background" or transparent
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-neon-orange font-bold mb-2">
                  Text Rendering (GPT-4o):
                </h4>
                <ul className="space-y-1 ml-4 text-xs">
                  <li>
                    • <strong>Be Concise:</strong> Short phrases work better
                    than paragraphs
                  </li>
                  <li>
                    • <strong>Use Quotes:</strong> "A poster with title 'Summer
                    Festival 2025'"
                  </li>
                  <li>
                    • <strong>Specify Style:</strong> "In red bold font" or
                    "handwritten style text"
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Section 7: Scene Regeneration */}
        <div className="bg-black border-4 border-black rounded-lg mb-6">
          <div className="bg-neon-orange text-black p-6 border-b-4 border-black">
            <h3 className="text-xl font-black">
              7. Scene Regeneration & Object Placement (Editing Images)
            </h3>
          </div>
          <div className="p-6">
            <div className="text-cream/90 text-sm space-y-3">
              <p>
                Sora's powerful editing feature lets you modify generated images
                by describing changes.
              </p>
              <div>
                <h4 className="text-neon-orange font-bold mb-2">
                  Editing Tips:
                </h4>
                <ul className="space-y-1 ml-4 text-xs">
                  <li>
                    • <strong>Identify Elements:</strong> Describe what you want
                    changed as you see it
                  </li>
                  <li>
                    • <strong>Be Spatially Specific:</strong> Use "left",
                    "right", "foreground", "background"
                  </li>
                  <li>
                    • <strong>Maintain Consistency:</strong> Consider overall
                    scene coherence
                  </li>
                  <li>
                    • <strong>One Change at a Time:</strong> For big edits, work
                    stepwise
                  </li>
                  <li>
                    • <strong>Object Removal:</strong> "Remove" or "erase"
                    usually works
                  </li>
                </ul>
              </div>
              <div className="bg-cream/10 p-3 rounded">
                <p className="text-neon-orange font-bold mb-1">Example Edit:</p>
                <p className="text-xs">
                  Initial: Outdoor picnic scene on sunny day
                  <br />
                  Remix: "Make it look like evening, with sunset sky. Add string
                  lights hanging between trees to create cozy atmosphere."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 8: Using the Prompt Vault */}
        <div className="bg-black border-4 border-black rounded-lg mb-6">
          <div className="bg-neon-orange text-black p-6 border-b-4 border-black">
            <h3 className="text-xl font-black">8. Using the Prompt Vault</h3>
          </div>
          <div className="p-6">
            <div className="text-cream/90 text-sm space-y-3">
              <p>
                The Prompt Vault is your advanced formula builder that combines
                custom vision, professional keywords, and image references into
                perfectly structured SORA prompts.
              </p>
              <div>
                <h4 className="text-neon-orange font-bold mb-2">
                  Step-by-Step Process:
                </h4>
                <ul className="space-y-1 ml-4 text-xs">
                  <li>
                    • <strong>Step 1:</strong> Write your creative vision in the
                    text area (describe your subject, scene, or concept)
                  </li>
                  <li>
                    • <strong>Step 2:</strong> Upload a reference image for
                    visual context (optional but recommended)
                  </li>
                  <li>
                    • <strong>Step 3:</strong> Select keywords from categories:
                    Lighting, Framing, Locations, Texture, Creative Direction,
                    Quality
                  </li>
                  <li>
                    • <strong>Step 4:</strong> Review the structured formula
                    that automatically organizes your inputs
                  </li>
                  <li>
                    • <strong>Step 5:</strong> Copy the formula and paste
                    directly into SORA
                  </li>
                </ul>
              </div>
              <div className="bg-cream/10 p-3 rounded">
                <p className="text-neon-orange font-bold mb-1">Pro Tips:</p>
                <p className="text-xs">
                  <strong>Structure:</strong> The vault auto-organizes keywords
                  for optimal SORA understanding
                  <br />
                  <strong>Images:</strong> Uploaded images become "--reference
                  image:" parameters
                  <br />
                  <strong>Keywords:</strong> Click to add, click × to remove
                  selected keywords
                  <br />
                  <strong>Quality:</strong> Use the quality meter to optimize
                  your prompt completeness
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 9: Tips & Best Practices */}
        <div className="bg-black border-4 border-black rounded-lg mb-6">
          <div className="bg-neon-orange text-black p-6 border-b-4 border-black">
            <h3 className="text-xl font-black">
              9. Tips, Best Practices, and Warnings
            </h3>
          </div>
          <div className="p-6">
            <div className="text-cream/90 text-sm space-y-4">
              <div>
                <h4 className="text-neon-orange font-bold mb-2">
                  General Tips:
                </h4>
                <ul className="space-y-1 ml-4 text-xs">
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
                <h4 className="text-neon-orange font-bold mb-2">
                  Content Warnings:
                </h4>
                <ul className="space-y-1 ml-4 text-xs">
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
              <div>
                <h4 className="text-neon-orange font-bold mb-2">
                  When Things Go Wrong:
                </h4>
                <ul className="space-y-1 ml-4 text-xs">
                  <li>
                    • <strong>Conflicting Elements:</strong> Resolve
                    contradictions
                  </li>
                  <li>
                    • <strong>Too Complex:</strong> Break into simpler scenes
                  </li>
                  <li>
                    • <strong>Obscure Terms:</strong> Use simpler descriptions
                  </li>
                  <li>
                    • <strong>Use Variations:</strong> Re-run same prompt for
                    different results
                  </li>
                </ul>
              </div>
              <div className="bg-cream/10 p-3 rounded">
                <p className="text-neon-orange font-bold mb-1">Final Advice:</p>
                <p className="text-xs">
                  Great images may not come on first try. Use Remix feature to
                  refine. Treat each generation as a prototype. "Iterate and
                  Refine" is key - even professional artists make many sketches!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference Card */}
        <div className="bg-black border-4 border-neon-orange rounded-lg">
          <div className="bg-neon-orange text-black p-6 border-b-4 border-black">
            <h3 className="text-xl font-black">
              Quick Reference: Variable Examples
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <h4 className="text-neon-orange font-bold mb-2">Lighting</h4>
                <p className="text-cream/80">
                  Soft diffused light, Golden hour sunlight, Neon glow,
                  Candlelight, Dramatic rim lighting
                </p>
              </div>
              <div>
                <h4 className="text-neon-orange font-bold mb-2">
                  Camera Angles
                </h4>
                <p className="text-cream/80">
                  Eye-level, Low-angle, Bird's-eye, First-person POV, Close-up,
                  Wide shot
                </p>
              </div>
              <div>
                <h4 className="text-neon-orange font-bold mb-2">Mood/Tone</h4>
                <p className="text-cream/80">
                  Cheerful and bright, Moody and dark, Tranquil, Whimsical,
                  Cinematic
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
