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
        <header className="border-b-4 border-black bg-black sticky top-0 z-20">
          <div className="container mx-auto px-8 py-8">
            <div className="flex items-center justify-between">
              <div className="flex-1 flex justify-center">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F326314a2e8634f90977b83f81df01501%2Fec00ceaef5524675ba25aca88f5d5cec?format=webp&width=400"
                  alt="Overnight Success"
                  className="h-16 w-auto"
                />
              </div>
              <div className="flex items-center gap-4">
                <Badge className="bg-black border-2 border-neon-orange text-cream font-black text-base px-4 py-2">
                  <Target className="h-5 w-5 text-neon-orange mr-2" />
                  {totalComponents}/8
                </Badge>
                <Button
                  onClick={handleReset}
                  className="btn-shiny-black text-cream font-black text-base px-6 py-3 h-auto"
                  disabled={totalComponents === 0}
                >
                  <RefreshCw className="h-5 w-5 text-neon-orange mr-2" />
                  RESET
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Instructions */}

        {/* Main Content */}
        <main className="container mx-auto px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Categories Flow */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
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
                <div className="flex justify-center mt-8">
                  <div
                    className={cn(
                      "flex items-center gap-4 px-8 py-4 rounded-full border-4 border-dashed transition-all duration-300",
                      isComplete
                        ? "bg-black border-neon-orange text-cream font-black text-xl"
                        : "bg-black border-cream/50 text-cream font-bold text-lg",
                    )}
                  >
                    <Target
                      className={cn(
                        "h-6 w-6",
                        isComplete ? "text-neon-orange" : "text-cream",
                      )}
                    />
                    <span>
                      {isComplete ? "FORMULA READY!" : "COMPLETE 4+ CATEGORIES"}
                    </span>
                    {isComplete && (
                      <Sparkles className="h-6 w-6 text-neon-orange" />
                    )}
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
        <footer className="border-t-4 border-black bg-black mt-16">
          <div className="container mx-auto px-8 py-6">
            <div className="text-center text-base font-black text-cream tracking-wide">
              <p>
                ✨ POWERED BY AI • OPTIMIZED FOR SORA • BUILT FOR CREATIVE
                EXCELLENCE ✨
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
