import React, { useState } from "react";
import { CollapsiblePromptCategory } from "../components/CollapsiblePromptCategory";
import { PromptFormulaPreview } from "../components/PromptFormulaPreview";
import { CustomInstructions } from "../components/CustomInstructions";
import { FileUpload } from "../components/FileUpload";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { cn } from "../lib/utils";
import {
  Camera,
  Palette,
  Zap,
  Sparkles,
  MapPin,
  Heart,
  Layers3,
  RefreshCw,
  ArrowDown,
  Target,
} from "lucide-react";

const promptCategories = {
  textures: {
    title: "Textures",
    icon: <Palette className="h-5 w-5" />,
    options: [
      "matte",
      "semi-gloss",
      "high-gloss polish",
      "chrome mirror",
      "brushed metal",
      "satin sheen",
      "frosted matte",
      "lacquered",
      "metallic powder finish",
      "velvet",
      "ceramic",
      "gritty raw surface",
      "pixelated finish",
      "glitch",
      "screenprint texture",
    ],
  },
  framing: {
    title: "Framing",
    icon: <Camera className="h-5 w-5" />,
    options: [
      "24mm: Wide landscapes, high energy",
      "35mm: Editorial and lifestyle portraits",
      "50mm: Clean product or natural portraits",
      "85mm: Intimate close-up, emotional storytelling",
      "Low Angle: Power, presence",
      "Macro: Detail shots, textures",
      "extreme close-up on texture",
      "wide establishing shot",
      "symmetrical center crop",
      "over-the-shoulder POV",
      "profile view portrait",
      "tight crop on eyes",
    ],
  },
  lighting: {
    title: "Lighting",
    icon: <Zap className="h-5 w-5" />,
    options: [
      "Golden Hour: Warm, cinematic",
      "Backlit: Rim lighting for shape",
      "Soft Ambient: Beauty shots, lifestyle",
      "Hard Flash: Edgy streetwear",
      "Neon: Retro-future, saturated",
      "Flicker: Great for dynamic transitions in video",
      "golden hour with long shadows",
      "overcast softness",
      "neon nightclub hues",
      "dramatic chiaroscuro",
      "candlelit intimacy",
      "tungsten indoor warmth",
      "arctic blue tone",
    ],
  },
  locations: {
    title: "Locations",
    icon: <MapPin className="h-5 w-5" />,
    options: [
      "foggy Tokyo street",
      "marble-floored Parisian hallway",
      "neon-lit cyberpunk alley",
      "desert salt flats",
      "concrete parking garage",
      "luxury hotel rooftop",
      "brutalist city center",
      "beach at low tide",
      "Arctic ice cave",
      "abandoned church interior",
      "luxury retail space",
      "moss-covered forest ruins",
      "jungle helipad",
    ],
  },
  creative: {
    title: "Creative Direction",
    icon: <Heart className="h-5 w-5" />,
    options: [
      "Wes Anderson meets Balenciaga",
      "Apple ad directed by Kubrick",
      "Old Money vibes",
      "Virgil Abloh x Eames visual tension",
      "Yeezy drop in a NASA lab",
      "Hypebeast Tokyo fantasy",
      "AI-generated art deco dream",
      "Wes meets Warhol",
      "Quiet luxury meets glitchcore",
      "High fashion in a war zone",
      "Edward Hopper moodboard",
      "Gucci in a cyber slum",
    ],
  },
  enhancers: {
    title: "Enhancers",
    icon: <Layers3 className="h-5 w-5" />,
    options: [
      "Shift texture layer: Velvet → Glass → Chrome → Plastic",
      "Change lighting mood: Golden hour → Neon glow → Paparazzi",
      "Apply time-based logic: Day → Night → Rainy → Overcast",
      "Swap camera angle: Top-down → Orbit → Over-the-shoulder",
      "floating dust particles",
      "lens flare streak",
      "reflections on lens",
      "rain droplets on lens",
      "reflective shine",
    ],
  },
};

export default function Index() {
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [customInstructions, setCustomInstructions] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleCategorySelect = (category: string, option: string) => {
    setSelections((prev) => ({
      ...prev,
      [category]: prev[category] === option ? "" : option,
    }));
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const handleExport = () => {
    console.log("Export prompt for Sora:", selections);
    // Future: Could open Sora platform or download file
  };

  const handleReset = () => {
    setSelections({});
    setCustomInstructions("");
    setUploadedFiles([]);
  };

  const selectedCount = Object.values(selections).filter(Boolean).length;
  const hasCustomInstructions = customInstructions.trim().length > 0;
  const hasFiles = uploadedFiles.length > 0;
  const totalComponents =
    selectedCount + (hasCustomInstructions ? 1 : 0) + (hasFiles ? 1 : 0);
  const isComplete = selectedCount >= 4;

  return (
    <div className="min-h-screen" style={{ background: "#ff3120" }}>
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-black/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-black/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-black/8 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-black/20 backdrop-blur-sm bg-black/10 sticky top-0 z-20">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F326314a2e8634f90977b83f81df01501%2Fec00ceaef5524675ba25aca88f5d5cec?format=webp&width=200"
                      alt="Overnight Success"
                      className="h-12 w-auto"
                    />
                  </div>
                  <div>
                    <h1 className="text-3xl font-black text-cream drop-shadow-[3px_3px_0px_#000000] tracking-tight">
                      AI PROMPT GENERATOR
                    </h1>
                    <p className="text-sm font-semibold text-black">
                      Build your perfect Sora prompt formula step by step
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="text-sm">
                  <Target className="h-4 w-4 mr-1" />
                  {totalComponents}/8 Components
                </Badge>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  size="sm"
                  disabled={selectedCount === 0}
                >
                  <RefreshCw className="h-4 w-4" />
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Instructions */}
        <div className="container mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/80 border border-black text-cream text-sm font-bold tracking-wide">
              <Target className="h-4 w-4" />
              Click each category header to expand and select options
              <ArrowDown className="h-4 w-4 animate-bounce" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-6 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Categories Flow */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {Object.entries(promptCategories).map(
                  ([key, category], index) => (
                    <CollapsiblePromptCategory
                      key={key}
                      title={category.title}
                      icon={category.icon}
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
                  stepNumber={7}
                  isCompleted={hasCustomInstructions}
                  showFlow={true}
                />

                {/* File Upload */}
                <FileUpload
                  files={uploadedFiles}
                  onFilesChange={setUploadedFiles}
                  stepNumber={8}
                  isCompleted={hasFiles}
                />

                {/* Final Step Indicator */}
                <div className="flex justify-center">
                  <div
                    className={cn(
                      "flex items-center gap-3 px-6 py-3 rounded-full border-2 border-dashed transition-all duration-300",
                      isComplete
                        ? "border-black bg-black/20 text-cream font-bold"
                        : "border-black/40 text-black font-semibold",
                    )}
                  >
                    <Target className="h-5 w-5" />
                    <span className="font-medium">
                      {isComplete
                        ? "Formula Ready!"
                        : "Complete 4+ base categories to generate"}
                    </span>
                    {isComplete && <Sparkles className="h-5 w-5" />}
                  </div>
                </div>
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
        </main>

        {/* Footer */}
        <footer className="border-t border-black/20 backdrop-blur-sm bg-black/10 mt-16">
          <div className="container mx-auto px-6 py-6">
            <div className="text-center text-sm font-semibold text-black">
              <p>
                ✨ POWERED BY AI • OPTIMIZED FOR SORA GENERATION • BUILT FOR
                CREATIVE EXCELLENCE
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
