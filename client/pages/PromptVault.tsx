import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { AppLayout } from "../components/AppLayout";
import { Paywall } from "../components/Paywall";
import { useSubscription } from "../hooks/useSubscription";
import { Archive, Copy, Star, RefreshCw } from "lucide-react";

export default function PromptVault() {
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [showPaywall, setShowPaywall] = useState(false);
  const { subscriptionStatus, canUseFeature, loading } = useSubscription();

  const handleUpgradeRequest = () => {
    setShowPaywall(true);
  };

  const handleUpgradeComplete = () => {
    setShowPaywall(false);
    window.location.reload();
  };

  // Show paywall if needed
  if (showPaywall) {
    const userEmail = localStorage.getItem("userEmail") || "";
    return <Paywall onUpgrade={handleUpgradeComplete} userEmail={userEmail} />;
  }

  const promptVault = {
    keywords: {
      Lighting: [
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
        "sunrise haze",
        "twilight ambient wash",
        "stormy weather gloom",
        "moonlight and metallic reflections",
        "light leaks through blinds",
        "gradient sunset cast",
        "studio flash with softbox",
        "high-contrast film noir",
        "volumetric fog beams",
        "cinematic rim lighting",
        "harsh fluorescent glare",
        "warm fireplace glow",
        "cold LED strip accent",
        "dappled forest sunlight",
        "urban streetlight amber",
        "underwater caustic patterns",
        "laser light show effects",
        "vintage photography bulbs",
      ],
      Framing: [
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
        "subject entering frame",
        "bird's eye view",
        "rule-of-thirds precision",
        "macro product angle",
        "reflection-in-mirror shot",
        "rear-view mirror framing",
        "worm's eye perspective",
        "Dutch angle tilt",
        "extreme wide aerial shot",
        "fisheye distortion effect",
        "tracking shot movement",
        "dolly zoom technique",
        "handheld camera shake",
        "steadicam smooth glide",
        "crane shot elevation",
        "split screen composition",
      ],
      Locations: [
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
        "underground subway tunnel",
        "penthouse window view",
        "industrial warehouse space",
        "vintage diner interior",
        "mountain cliff edge",
        "floating space station",
        "underwater coral reef",
        "medieval castle courtyard",
        "modern art gallery",
        "bustling fish market",
      ],
      Texture: [
        "satin smooth finish",
        "glossy reflective surface",
        "soft fur texture",
        "luxurious velvet feel",
        "brushed metal finish",
        "rough concrete texture",
        "polished marble surface",
        "weathered leather grain",
        "smooth glass reflection",
        "woven fabric pattern",
        "carved wood grain",
        "hammered copper patina",
        "silk fabric drape",
        "suede matte finish",
        "chrome mirror polish",
        "rustic burlap weave",
        "crystal clear transparency",
        "matte rubber coating",
        "ribbed corduroy lines",
        "cracked ceramic glaze",
        "pearl iridescent sheen",
        "sandpaper rough grit",
        "liquid mercury flow",
        "carbon fiber weave",
        "frosted glass opacity",
        "snakeskin scale pattern",
        "worn denim fade",
        "aluminum brushed finish",
        "embossed leather pattern",
        "porcelain smooth surface",
      ],
      "Creative Direction": [
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
        "Tarantino aesthetic violence",
        "Hitchcock suspense tension",
        "Lynch surreal dreamscape",
        "Scorsese gritty realism",
        "Nolan temporal complexity",
        "Fincher cold precision",
        "Burton gothic whimsy",
        "Villeneuve sci-fi scale",
        "Chloé minimalist elegance",
        "Supreme streetwear culture",
      ],
      "Quality Modifiers": [
        "4K resolution",
        "cinematic quality",
        "professional grade",
        "award-winning",
        "ultra-high resolution",
        "masterpiece",
        "commercial ready",
        "studio quality",
        "professional video production",
        "optimized for SORA AI",
        "broadcast television grade",
        "film festival worthy",
        "magazine cover quality",
        "social media optimized",
        "HDR color grading",
        "IMAX presentation format",
        "streaming platform ready",
        "commercial advertisement grade",
        "documentary film standard",
        "music video production",
      ],
      Enhancers: [
        "Shift texture layer: Velvet → Glass → Chrome → Plastic",
        "Change lighting mood: Golden hour → Neon glow → Paparazzi",
        "Apply time-based logic: Day → Night → Rainy → Overcast",
        "Swap camera angle: Top-down → Orbit → Over-the-shoulder",
        "floating dust particles",
        "lens flare streak",
        "reflections on lens",
        "rain droplets on lens",
        "reflective shine",
        "film grain texture overlay",
        "color grading LUT application",
        "depth of field blur",
        "motion blur trails",
        "chromatic aberration edge",
        "vignette corner darkening",
        "lens distortion warp",
        "light leak artifacts",
        "double exposure blend",
        "cross-processing color shift",
      ],
    },
  };

  const toggleKeyword = (keyword: string) => {
    console.log("Toggling keyword:", keyword);
    setSelectedKeywords((prev) => {
      const newSelection = prev.includes(keyword)
        ? prev.filter((k) => k !== keyword)
        : [...prev, keyword];
      console.log("New selection:", newSelection);
      return newSelection;
    });
  };

  const getFormulaText = () => {
    if (selectedKeywords.length === 0) {
      return "Click keywords below to build your custom formula...";
    }
    return selectedKeywords.join(", ");
  };

  const copyFormula = async () => {
    const formula = getFormulaText();
    if (selectedKeywords.length === 0) return;

    try {
      await navigator.clipboard.writeText(formula);
      // Show success feedback
      console.log("Formula copied to clipboard:", formula);
    } catch (error) {
      console.log("Fallback copy method");
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = formula;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
  };

  const clearSelection = () => {
    console.log("Clearing selection");
    setSelectedKeywords([]);
  };

  const getPromptQualityScore = () => {
    const keywordCount = selectedKeywords.length;
    if (keywordCount === 0) return 0;
    if (keywordCount < 3) return 25;
    if (keywordCount < 5) return 50;
    if (keywordCount < 8) return 75;
    return 100;
  };

  const getQualityMessage = () => {
    const score = getPromptQualityScore();
    if (score === 0) return "Start by selecting keywords below";
    if (score < 50) return "Add more keywords for better results";
    if (score < 75) return "Good foundation - add a few more keywords";
    return "Excellent prompt structure - ready for SORA!";
  };

  const getQualityColor = () => {
    const score = getPromptQualityScore();
    if (score < 25) return "bg-red-500";
    if (score < 50) return "bg-yellow-500";
    if (score < 75) return "bg-blue-500";
    return "bg-green-500";
  };

  return (
    <AppLayout onUpgradeRequest={handleUpgradeRequest}>
      <div className="container mx-auto px-8 py-5">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-black">
              <Archive className="h-8 w-8 text-neon-orange" />
            </div>
            <h1 className="text-6xl font-black text-black retro-text">
              PROMPT VAULT
            </h1>
          </div>
          <p className="text-xl font-bold text-black/80 max-w-2xl mx-auto">
            Complete keyword library for building powerful SORA AI prompts
          </p>
        </div>

        {/* Formula Builder */}
        <div className="max-w-6xl mx-auto mb-12">
          <Card className="bg-black border-4 border-black">
            <CardHeader>
              <CardTitle className="text-2xl font-black text-cream flex items-center gap-2">
                <Star className="h-6 w-6 text-neon-orange" />
                Your Formula
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Quality Indicator */}
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-cream/20 rounded-full h-3">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${getQualityColor()}`}
                    style={{ width: `${getPromptQualityScore()}%` }}
                  />
                </div>
                <div className="text-cream font-bold text-sm">
                  {getPromptQualityScore()}%
                </div>
              </div>
              <p className="text-cream/80 text-sm font-medium">
                {getQualityMessage()}
              </p>

              {/* Formula Display */}
              <div className="bg-black/50 border-2 border-cream/20 rounded-lg p-4 min-h-[100px] font-mono text-cream">
                {getFormulaText()}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    copyFormula();
                  }}
                  disabled={selectedKeywords.length === 0}
                  className="bg-neon-orange border-2 border-neon-orange text-black font-bold hover:bg-black hover:text-neon-orange disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Formula
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    clearSelection();
                  }}
                  disabled={selectedKeywords.length === 0}
                  className="bg-transparent border-2 border-cream text-cream font-bold hover:bg-cream hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Clear Selection
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Keyword Categories */}
        <div className="max-w-6xl mx-auto space-y-8">
          {Object.entries(promptVault.keywords).map(([category, keywords]) => (
            <Card key={category} className="bg-black border-4 border-black">
              <CardHeader>
                <CardTitle className="text-2xl font-black text-cream">
                  {category}
                </CardTitle>
                <p className="text-cream/80">
                  Click keywords to add them to your formula
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {keywords.map((keyword, index) => (
                    <Badge
                      key={index}
                      onClick={() => toggleKeyword(keyword)}
                      className={`cursor-pointer font-bold text-xs px-3 py-2 transition-all duration-200 ${
                        selectedKeywords.includes(keyword)
                          ? "bg-neon-orange text-black"
                          : "bg-cream/20 text-cream hover:bg-neon-orange hover:text-black"
                      }`}
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
