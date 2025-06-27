import React, { useState } from "react";
import { PromptCategory } from "../components/PromptCategory";
import { PromptPreview } from "../components/PromptPreview";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Camera,
  Palette,
  Clock,
  Cloud,
  Heart,
  Volume2,
  Clapperboard,
  Sparkles,
  Zap,
  RefreshCw,
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
  enhancers: {
    title: "Enhancers",
    icon: <Sparkles className="h-5 w-5" />,
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
  locations: {
    title: "Locations",
    icon: <Clapperboard className="h-5 w-5" />,
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
};

export default function Index() {
  const [selections, setSelections] = useState<Record<string, string>>({});

  const handleCategorySelect = (category: string, option: string) => {
    setSelections((prev) => ({
      ...prev,
      [category]: prev[category] === option ? "" : option,
    }));
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const handleGenerate = () => {
    // Future: Could integrate with Sora API or download functionality
    console.log("Generate/Export prompt:", selections);
  };

  const handleReset = () => {
    setSelections({});
  };

  const selectedCount = Object.values(selections).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-midnight">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cosmic/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-aurora/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-20">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-primary to-cosmic shadow-lg shadow-primary/20">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-cosmic bg-clip-text text-transparent">
                      Sora AI Prompt Generator
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      Create perfect prompts for AI video generation
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
            <Badge
              variant={isComplete ? "default" : "secondary"}
              className={cn(
                "transition-all duration-300",
                isComplete &&
                  "animate-pulse bg-gradient-to-r from-primary to-cosmic",
              )}
            >
              {Object.values(selections).filter(Boolean).length}/6 Selected
            </Badge>
                  <RefreshCw className="h-4 w-4" />
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Categories Grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Object.entries(promptCategories).map(([key, category]) => (
                  <PromptCategory
                    key={key}
                    title={category.title}
                    icon={category.icon}
                    options={category.options}
                    selectedOption={selections[key]}
                    onSelect={(option) => handleCategorySelect(key, option)}
                  />
                ))}
              </div>
            </div>

            {/* Prompt Preview */}
            <div className="lg:col-span-1">
              <PromptPreview
                selections={selections}
                onCopy={handleCopy}
                onGenerate={handleGenerate}
              />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/50 backdrop-blur-sm bg-background/80 mt-16">
          <div className="container mx-auto px-6 py-6">
            <div className="text-center text-sm text-muted-foreground">
              <p>Powered by AI • Built for Creative Excellence</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}