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
  scene: {
    title: "Scene Description",
    icon: <Clapperboard className="h-5 w-5" />,
    options: [
      "A majestic dragon soaring through clouds",
      "A bustling cyberpunk street market",
      "A serene forest waterfall",
      "A spacecraft landing on an alien planet",
      "A medieval castle on a cliff",
      "A submarine exploring ocean depths",
      "A time traveler in Victorian London",
      "A robot working in a garden",
      "A magical library with floating books",
      "A race car speeding through neon tunnels",
    ],
  },
  style: {
    title: "Visual Style",
    icon: <Palette className="h-5 w-5" />,
    options: [
      "Cyberpunk",
      "Photorealistic",
      "Cartoonish",
      "Watercolor Painting",
      "Vintage Film",
      "Film Noir",
      "Futuristic",
      "Abstract Art",
      "Anime Style",
      "Oil Painting",
    ],
  },
  camera: {
    title: "Camera Movement",
    icon: <Camera className="h-5 w-5" />,
    options: [
      "Static Shot",
      "Tracking Shot",
      "Zoom In",
      "Zoom Out",
      "Bird's Eye View",
      "360° Pan",
      "Dolly Zoom",
      "Handheld Camera",
      "Crane Shot",
      "Steadicam Follow",
    ],
  },
  time: {
    title: "Time of Day",
    icon: <Clock className="h-5 w-5" />,
    options: [
      "Sunrise",
      "Morning",
      "Noon",
      "Golden Hour",
      "Sunset",
      "Twilight",
      "Midnight",
      "Blue Hour",
    ],
  },
  weather: {
    title: "Weather Conditions",
    icon: <Cloud className="h-5 w-5" />,
    options: [
      "Clear Skies",
      "Rainy",
      "Thunderstorm",
      "Snowfall",
      "Foggy",
      "Overcast",
      "Hazy",
      "Drizzle",
      "Blizzard",
      "Aurora Borealis",
    ],
  },
  mood: {
    title: "Mood Setting",
    icon: <Heart className="h-5 w-5" />,
    options: [
      "Dramatic",
      "Romantic",
      "Joyful",
      "Mysterious",
      "Eerie",
      "Tense",
      "Uplifting",
      "Melancholic",
      "Whimsical",
      "Inspirational",
    ],
  },
  sound: {
    title: "Sound Atmosphere",
    icon: <Volume2 className="h-5 w-5" />,
    options: [
      "Gentle Piano Music",
      "Ambient City Sounds",
      "Dramatic Orchestral Score",
      "Eerie Whispers and Wind",
      "Jungle Sounds",
      "Thunderstorm with Heavy Rain",
      "Sci-fi Hums and Electronic Beeps",
      "Ocean Waves Crashing",
      "Quiet Snowfall",
      "Explosive Action Sounds",
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
                <Badge variant="secondary" className="text-sm">
                  <Zap className="h-4 w-4 mr-1" />
                  {selectedCount}/7 Categories
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
