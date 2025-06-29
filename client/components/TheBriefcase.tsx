import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  X,
  BookOpen,
  Archive,
  Bell,
  Wrench,
  Image,
  Play,
  Download,
  ExternalLink,
  Copy,
  Star,
  Zap,
  Target,
  Palette,
  Camera,
  Package,
} from "lucide-react";

interface TheBriefcaseProps {
  onClose: () => void;
}

export function TheBriefcase({ onClose }: TheBriefcaseProps) {
  const [activeTab, setActiveTab] = useState("updates");

  // THE PLAYBOOK - How to use everything
  const playbookSections = [
    {
      title: "Getting Started with SORA AI Prompts",
      description: "Master the fundamentals of prompt generation",
      duration: "5 min read",
      content: `
# Getting Started with SORA AI Prompts

## Step 1: Choose Your Generator
- **Product Generator**: For e-commerce and product photography
- **Lifestyle Generator**: For authentic lifestyle and brand content
- **Graphic Generator**: For logos, graphics, and visual design

## Step 2: Start with Custom Instructions
Begin every prompt with your specific vision and requirements. This sets the foundation for everything else.

## Step 3: Select Categories
Choose 4+ categories for optimal results. Each selection adds important details to your prompt.

## Step 4: Upload Reference Images
Add images to be converted to JSON format for enhanced AI understanding.

## Step 5: Review Quality Analysis
Check your prompt quality score and follow AI recommendations.

## Step 6: Copy & Use in SORA
Export your optimized prompt and use it directly in SORA AI for best results.
      `,
    },
    {
      title: "Advanced Prompt Engineering",
      description: "Pro techniques for better AI results",
      duration: "10 min read",
      content: `
# Advanced Prompt Engineering for SORA

## Specificity is Key
The more specific your instructions, the better your results. Use concrete descriptors rather than vague terms.

## Layer Your Descriptions
Build your prompts in layers:
1. Subject/Object
2. Style and Aesthetic
3. Technical Specifications
4. Mood and Atmosphere

## Use Visual References
Always upload reference images when possible. Our JSON conversion optimizes them for SORA processing.

## Quality Optimization
- Aim for 80%+ quality score
- Complete 4+ categories minimum
- Include custom instructions
- Add reference materials

## Common Mistakes to Avoid
- Being too vague or generic
- Conflicting style choices
- Ignoring technical specifications
- Not using reference images
      `,
    },
    {
      title: "SORA-Specific Best Practices",
      description: "Optimize specifically for SORA AI video generation",
      duration: "8 min read",
      content: `
# SORA-Specific Best Practices

## Video-First Thinking
Remember that SORA generates video, so think about:
- Motion and movement
- Temporal consistency
- Cinematic composition
- Lighting that works in motion

## Technical Specifications
Always include:
- Resolution (4K recommended)
- Aspect ratio (16:9 for video)
- Quality markers (cinematic, professional)
- Frame rate considerations

## Prompt Structure for Video
1. **Opening Statement**: What the video shows
2. **Visual Style**: How it should look
3. **Motion Description**: How things move
4. **Technical Specs**: Quality and format
5. **Reference Data**: JSON image data

## Best Results Tips
- Use our quality analysis to optimize
- Include movement descriptors
- Specify camera angles and shots
- Add lighting and mood details
      `,
    },
  ];

  // PROMPT VAULT - Complete keyword library from screenshots
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  // TEMPLATES - Placeholder replacement values
  const [placeholders, setPlaceholders] = useState({
    product: "",
    brand: "",
    "brand color": "",
    "brand's primary color": "",
    "brand's secondary color": "",
    material: "",
    "Your Motto": "",
    "Your Quote": "",
  });

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

  // UPDATES - Running feed of new updates
  const updates = [
    {
      date: "Dec 20, 2024",
      title: "Enhanced JSON Image Processing",
      type: "Feature Update",
      description:
        "Improved image-to-JSON conversion for better SORA compatibility with optimized metadata",
      isNew: true,
    },
    {
      date: "Dec 19, 2024",
      title: "Mobile Interface Optimization",
      type: "UI Update",
      description:
        "Complete mobile responsive design with touch-optimized controls and improved navigation",
      isNew: true,
    },
    {
      date: "Dec 18, 2024",
      title: "New Sora AI Features Integration",
      type: "Feature Update",
      description:
        "Enhanced video generation with better motion control and temporal consistency",
      isNew: false,
    },
    {
      date: "Dec 15, 2024",
      title: "100+ New Prompt Templates",
      type: "Content Update",
      description:
        "Premium product shots, lifestyle scenes, and graphic design prompts added to vault",
      isNew: false,
    },
    {
      date: "Dec 12, 2024",
      title: "Advanced Quality Analysis",
      type: "Feature Update",
      description:
        "AI-powered prompt analysis with real-time quality scoring and suggestions",
      isNew: false,
    },
  ];

  // AI TOOLKIT - Database of tools, resources and links
  const aiToolkit = [
    {
      category: "AI Video Generation",
      tools: [
        {
          name: "SORA by OpenAI",
          description: "Advanced AI video generation",
          url: "https://openai.com/sora",
          type: "external",
        },
        {
          name: "Runway ML",
          description: "Creative AI video tools",
          url: "https://runwayml.com",
          type: "external",
        },
        {
          name: "Pika Labs",
          description: "AI video creation platform",
          url: "https://pika.art",
          type: "external",
        },
      ],
    },
    {
      category: "Image Generation",
      tools: [
        {
          name: "Midjourney",
          description: "High-quality AI image generation",
          url: "https://midjourney.com",
          type: "external",
        },
        {
          name: "DALL-E 3",
          description: "OpenAI's image generation model",
          url: "https://openai.com/dall-e-3",
          type: "external",
        },
        {
          name: "Stable Diffusion",
          description: "Open-source image generation",
          url: "https://stability.ai",
          type: "external",
        },
      ],
    },
    {
      category: "Prompt Engineering",
      tools: [
        {
          name: "PromptBase",
          description: "Marketplace for AI prompts",
          url: "https://promptbase.com",
          type: "external",
        },
        {
          name: "Prompt Perfect",
          description: "Prompt optimization tool",
          url: "https://promptperfect.jina.ai",
          type: "external",
        },
        {
          name: "ChatGPT",
          description: "AI assistant for prompt writing",
          url: "https://chat.openai.com",
          type: "external",
        },
      ],
    },
    {
      category: "Design Resources",
      tools: [
        {
          name: "Unsplash",
          description: "Free high-quality images",
          url: "https://unsplash.com",
          type: "external",
        },
        {
          name: "Adobe Creative Suite",
          description: "Professional design tools",
          url: "https://adobe.com",
          type: "external",
        },
        {
          name: "Figma",
          description: "Collaborative design platform",
          url: "https://figma.com",
          type: "external",
        },
      ],
    },
  ];

  // EXAMPLES - Finished outputs next to prompts
  const examples = [
    {
      category: "Product",
      title: "Luxury Perfume Bottle",
      prompt:
        "Elegant perfume bottle showcase, styled as luxury lifestyle placement, against gradient color fade background, lit with soft studio lighting, shot from dramatic angle, conveying premium luxury feel, enhanced with perfect color grading, cinematic quality, 4K resolution, professional video production",
      outputDescription:
        "Stunning video of crystal perfume bottle with elegant lighting, smooth camera movement revealing the bottle's details, soft background bokeh, and premium feel throughout the 10-second sequence.",
      tags: ["luxury", "product", "perfume"],
      quality: 94,
    },
    {
      category: "Lifestyle",
      title: "Coffee Shop Morning",
      prompt:
        "Cozy coffee shop morning scene, featuring authentic customers and baristas, in warm café environment, natural window light cinematography, comfortable authentic mood, documentary style approach, cinematic quality, 4K resolution, professional video production",
      outputDescription:
        "Warm, inviting video capturing the essence of a busy morning café with natural interactions, steam rising from cups, golden lighting, and authentic human moments.",
      tags: ["lifestyle", "coffee", "morning"],
      quality: 87,
    },
    {
      category: "Graphic",
      title: "Tech Brand Animation",
      prompt:
        "Modern tech logo animation, minimalist design style, clean geometric composition, electric blue color palette, with modern typography, for technology branding purpose, cinematic quality, 4K resolution, professional video production",
      outputDescription:
        "Sleek logo animation with smooth geometric transitions, modern typography reveals, electric blue accent colors, and professional motion graphics feel.",
      tags: ["logo", "tech", "animation"],
      quality: 91,
    },
  ];

  const tabs = [
    { id: "updates", label: "UPDATES", icon: <Bell className="h-4 w-4" /> },
    {
      id: "playbook",
      label: "THE PLAYBOOK",
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      id: "vault",
      label: "PROMPT VAULT",
      icon: <Archive className="h-4 w-4" />,
    },
    {
      id: "templates",
      label: "TEMPLATES",
      icon: <Package className="h-4 w-4" />,
    },
    {
      id: "toolkit",
      label: "AI TOOLKIT",
      icon: <Wrench className="h-4 w-4" />,
    },
  ];

  const downloadGuide = (section: any) => {
    const content = `# ${section.title}\n\n${section.content}`;
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${section.title.replace(/\s+/g, "-").toLowerCase()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const addKeywordToFormula = (keyword: string) => {
    if (!selectedKeywords.includes(keyword)) {
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };

  const removeKeywordFromFormula = (keyword: string) => {
    setSelectedKeywords(selectedKeywords.filter((k) => k !== keyword));
  };

  const clearFormula = () => {
    setSelectedKeywords([]);
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
      // Visual feedback could be added here
    } catch (error) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = formula;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
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
    if (score === 0) return "Start by typing your vision, then select keywords";
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

  const replacePlaceholders = (prompt: string) => {
    let replacedPrompt = prompt;
    Object.entries(placeholders).forEach(([key, value]) => {
      if (value.trim()) {
        const regex = new RegExp(`\\[${key}\\]`, "gi");
        replacedPrompt = replacedPrompt.replace(regex, value);
      }
    });
    return replacedPrompt;
  };

  const copyPrompt = async (prompt: string, event?: any) => {
    const finalPrompt = replacePlaceholders(prompt);
    try {
      await navigator.clipboard.writeText(finalPrompt);
      // Show success feedback
      const clickedButton = event?.target?.closest("button");
      if (clickedButton) {
        const originalText = clickedButton.innerHTML;
        clickedButton.innerHTML =
          '<svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>';
        clickedButton.style.backgroundColor = "#10b981";
        setTimeout(() => {
          clickedButton.innerHTML = originalText;
          clickedButton.style.backgroundColor = "";
        }, 1500);
      }
    } catch (error) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = finalPrompt;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      // Show success feedback for fallback too
      const clickedButton = event?.target?.closest("button");
      if (clickedButton) {
        const originalText = clickedButton.innerHTML;
        clickedButton.innerHTML =
          '<svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>';
        clickedButton.style.backgroundColor = "#10b981";
        setTimeout(() => {
          clickedButton.innerHTML = originalText;
          clickedButton.style.backgroundColor = "";
        }, 1500);
      }
    }
  };

  const openTool = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-neon-orange rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-4 border-black">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-black">
              <Archive className="h-6 w-6 text-neon-orange" />
            </div>
            <h2 className="text-2xl font-black text-black">THE BRIEFCASE</h2>
          </div>
          <Button
            onClick={onClose}
            className="bg-black border-2 border-black text-cream hover:bg-cream hover:text-black"
            size="sm"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b-2 border-black bg-black">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  font-bold text-xs px-4 py-3 border-0 rounded-none whitespace-nowrap
                  ${
                    activeTab === tab.id
                      ? "bg-neon-orange text-black"
                      : "bg-black text-cream hover:bg-neon-orange hover:text-black"
                  }
                `}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh] bg-black">
          {/* THE PLAYBOOK */}
          {activeTab === "playbook" && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-black text-cream mb-2">
                  Access The Complete Playbook
                </h3>
                <p className="text-cream/80">
                  Comprehensive guides and tutorials for mastering SORA AI
                </p>
              </div>

              <div className="flex justify-center">
                <Card className="bg-black border-2 border-neon-orange max-w-lg">
                  <CardContent className="p-8 text-center">
                    <div className="mb-6">
                      <BookOpen className="h-16 w-16 text-neon-orange mx-auto mb-4" />
                      <h4 className="text-xl font-black text-cream mb-2">
                        The Complete SORA Playbook
                      </h4>
                      <p className="text-cream/80 mb-6">
                        Access our comprehensive guide with step-by-step
                        tutorials, advanced techniques, and best practices for
                        SORA AI video generation.
                      </p>
                    </div>

                    <Button
                      onClick={() =>
                        window.open(
                          "https://b78aaa611b6f477e9114624029707554-main.projects.builder.my/",
                          "_blank",
                        )
                      }
                      className="bg-neon-orange border-2 border-neon-orange text-black font-bold text-lg px-8 py-4 h-auto hover:bg-black hover:text-neon-orange transition-all duration-200"
                    >
                      <ExternalLink className="h-5 w-5 mr-2" />
                      OPEN PLAYBOOK
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* PROMPT VAULT */}
          {activeTab === "vault" && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-black text-cream mb-2">
                  Prompt Vault
                </h3>
                <div className="max-w-2xl mx-auto">
                  <p className="text-cream/80 mb-4">
                    <strong className="text-neon-orange">Step 1:</strong> Type
                    out your specific vision and request below
                  </p>
                  <p className="text-cream/80">
                    <strong className="text-neon-orange">Step 2:</strong> Use
                    the keyword selector to enhance and build the ultimate
                    optimized prompt
                  </p>
                </div>
              </div>

              {/* Suggestions Meter */}
              <Card className="bg-black border-2 border-cream mb-4">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h5 className="text-sm font-black text-cream">
                        PROMPT QUALITY METER
                      </h5>
                      <span className="text-xs font-bold text-neon-orange">
                        {getPromptQualityScore()}%
                      </span>
                    </div>

                    <div className="w-full bg-cream/20 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-300 ${getQualityColor()}`}
                        style={{ width: `${getPromptQualityScore()}%` }}
                      ></div>
                    </div>

                    <p className="text-cream/80 text-sm">
                      💡 {getQualityMessage()}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                      <div className="text-cream/60">
                        ✓ Add lighting keywords
                      </div>
                      <div className="text-cream/60">
                        ✓ Choose camera framing
                      </div>
                      <div className="text-cream/60">
                        ✓ Select creative direction
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Formula Builder */}
              <Card className="bg-black border-2 border-neon-orange mb-8">
                <CardHeader>
                  <CardTitle className="text-xl font-black text-cream flex items-center gap-2">
                    <Zap className="h-5 w-5 text-neon-orange" />
                    Custom Formula Builder
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="min-h-24 p-4 border-2 border-cream rounded-lg bg-black">
                    <p className="text-cream text-sm font-mono leading-relaxed">
                      {getFormulaText()}
                    </p>
                  </div>

                  {/* Selected Keywords */}
                  {selectedKeywords.length > 0 && (
                    <div className="space-y-2">
                      <h5 className="text-sm font-black text-neon-orange">
                        SELECTED KEYWORDS:
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedKeywords.map((keyword) => (
                          <Badge
                            key={keyword}
                            onClick={() => removeKeywordFromFormula(keyword)}
                            className="bg-neon-orange text-black font-bold text-xs cursor-pointer hover:bg-red-500 transition-all duration-200"
                          >
                            {keyword} ×
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      onClick={copyFormula}
                      className="bg-neon-orange text-black hover:bg-cream font-bold"
                      disabled={selectedKeywords.length === 0}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      COPY FORMULA
                    </Button>
                    <Button
                      onClick={clearFormula}
                      className="bg-cream text-black hover:bg-red-500 hover:text-white font-bold"
                      disabled={selectedKeywords.length === 0}
                    >
                      CLEAR ALL
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Keywords Section */}
              <div className="mb-8">
                <h4 className="text-xl font-black text-cream mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5 text-neon-orange" />
                  Keyword Library
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  {Object.entries(promptVault.keywords).map(
                    ([category, keywords]) => (
                      <Card
                        key={category}
                        className="bg-black border-2 border-cream"
                      >
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg font-black text-cream">
                            {category}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {keywords.map((keyword) => (
                              <Badge
                                key={keyword}
                                onClick={() => addKeywordToFormula(keyword)}
                                className={`font-bold text-xs cursor-pointer transition-all duration-200 ${
                                  selectedKeywords.includes(keyword)
                                    ? "bg-neon-orange text-black"
                                    : "bg-cream text-black hover:bg-neon-orange"
                                }`}
                              >
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ),
                  )}
                </div>
              </div>
            </div>
          )}

          {/* UPDATES */}
          {activeTab === "updates" && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-black text-cream mb-2">
                  Latest Updates
                </h3>
                <p className="text-cream/80">
                  Stay up to date with new features, content, and improvements
                </p>
              </div>

              <div className="space-y-4">
                {updates.map((update, index) => (
                  <Card key={index} className="bg-black border-2 border-cream">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <Button
                          onClick={(e) => copyPrompt(example.prompt, e)}
                          className="bg-cream text-black hover:bg-neon-orange"
                          size="sm"
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* TEMPLATES */}
          {activeTab === "templates" && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-black text-cream mb-2">
                  Professional Prompt Templates
                </h3>
                <p className="text-cream/80 mb-4">
                  Copy and paste these templates into SORA, replacing
                  placeholders like [product] or [brand] with your specifics
                </p>
                <div className="bg-cream/10 border border-cream/20 rounded-lg p-4 max-w-5xl mx-auto">
                  <p className="text-cream/90 text-sm mb-4">
                    <strong className="text-neon-orange">Instructions:</strong>{" "}
                    Fill in your details below, then copy any template. The
                    placeholders will be automatically replaced with your
                    information.
                  </p>

                  {/* Placeholder Input Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                    {Object.entries(placeholders).map(([key, value]) => (
                      <div key={key}>
                        <label className="block text-xs font-bold text-neon-orange mb-1 uppercase">
                          [{key}]
                        </label>
                        <input
                          type="text"
                          value={value}
                          onChange={(e) =>
                            setPlaceholders((prev) => ({
                              ...prev,
                              [key]: e.target.value,
                            }))
                          }
                          placeholder={`Enter your ${key}`}
                          className="w-full px-2 py-1 text-xs bg-black border border-cream/30 rounded text-cream placeholder-cream/50 focus:border-neon-orange focus:outline-none"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center">
                    <Button
                      onClick={() =>
                        setPlaceholders({
                          product: "",
                          brand: "",
                          "brand color": "",
                          "brand's primary color": "",
                          "brand's secondary color": "",
                          material: "",
                          "Your Motto": "",
                          "Your Quote": "",
                        })
                      }
                      className="bg-cream/20 text-cream hover:bg-cream/30 text-xs font-bold"
                      size="sm"
                    >
                      CLEAR ALL FIELDS
                    </Button>
                  </div>
                </div>
              </div>

              {/* Template Categories */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <Card className="bg-black border-2 border-cream text-center">
                  <CardContent className="p-6">
                    <Package className="h-12 w-12 text-neon-orange mx-auto mb-4" />
                    <h4 className="text-lg font-black text-cream mb-2">
                      Studio Templates
                    </h4>
                    <p className="text-cream/80 text-sm">
                      100 clean, product-centered studio photography prompts
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-black border-2 border-cream text-center">
                  <CardContent className="p-6">
                    <Camera className="h-12 w-12 text-neon-orange mx-auto mb-4" />
                    <h4 className="text-lg font-black text-cream mb-2">
                      Lifestyle Templates
                    </h4>
                    <p className="text-cream/80 text-sm">
                      100 authentic lifestyle and community visuals
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-black border-2 border-cream text-center">
                  <CardContent className="p-6">
                    <Palette className="h-12 w-12 text-neon-orange mx-auto mb-4" />
                    <h4 className="text-lg font-black text-cream mb-2">
                      Graphics Templates
                    </h4>
                    <p className="text-cream/80 text-sm">
                      100 text-based visuals, memes, and viral concepts
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Studio Templates */}
              <Card className="bg-black border-2 border-cream mb-8">
                <CardHeader>
                  <CardTitle className="text-xl font-black text-cream flex items-center gap-2">
                    <Package className="h-5 w-5 text-neon-orange" />
                    Studio Templates (100 Prompts)
                  </CardTitle>
                  <p className="text-cream/80 text-sm">
                    Clean, product-centered visuals without a photoshoot, crew,
                    or big budget
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
                    {[
                      "Capture an industrial studio photograph of [product] against a solid [brand color] backdrop with dramatic studio lighting and sharp shadows.",
                      "Generate a playful studio photograph of [product] on a mirror for a reflection effect, with colorful gel lighting.",
                      "Capture a high-contrast studio photograph of [product] on a mirror for a reflection effect, with neon rim lighting in [brand's primary color].",
                      "Compose an industrial studio photograph of [product] on a mirror for a reflection effect, with dramatic studio lighting and sharp shadows.",
                      "Shoot a surreal product shot of [product] against a solid [brand color] backdrop under harsh strobe lighting.",
                      "Generate an elegant product shot of [product] against a pure white background under neon rim lighting in [brand's primary color].",
                      "Design an industrial product shot of [product] against a pure white background under dramatic studio lighting with sharp shadows.",
                      "Create a surreal product shot of [product] on a glossy black surface under golden backlighting.",
                      "Illustrate a futuristic still-life image of [product] on a glossy black surface with golden backlighting.",
                      "Design an ultra-detailed still-life image of [product] on a mirror for a reflection effect, with golden backlighting.",
                      "Generate a minimalist still-life image of [product] on a marble pedestal, with soft, diffused lighting.",
                      "Compose a vibrant still-life image of [product] on a mirror for a reflection effect, with harsh strobe lighting.",
                      "Capture an elegant studio photograph of [product] on a marble pedestal with soft, diffused lighting.",
                      "Generate a bold studio photograph of [product] against a solid [brand color] backdrop with dramatic studio lighting and sharp shadows.",
                      "Capture a sleek studio photograph of [product] on a glossy black surface with moody, low-key lighting.",
                      "Shoot a minimalist studio photograph of [product] against a pure white background with bright, even lighting.",
                      "Craft a modern studio photograph of [product] against a solid [brand color] backdrop with neon rim lighting in [brand's primary color].",
                      "Design a clean studio photograph of [product] on a pure white background with high-key lighting that eliminates shadows.",
                      "Create a luxurious studio photograph of [product] on a marble pedestal with soft, diffused lighting and gentle shadows.",
                      "Generate a colorful studio photograph of [product] against a gradient backdrop from [brand color] to black, with bright, even lighting.",
                      "Capture a monochromatic studio photograph of [product] against a solid [brand color] backdrop with soft, diffused lighting.",
                      "Generate a sleek product shot of [product] on a glossy black surface under dramatic studio lighting with sharp shadows.",
                      "Compose a futuristic product shot of [product] on a glossy black surface under neon rim lighting in [brand's primary color].",
                      "Capture a moody product shot of [product] on a marble pedestal with harsh strobe lighting creating bold shadows.",
                      "Design a vibrant product shot of [product] on a mirror for a reflection effect under colorful gel lighting.",
                      "Produce an elegant product shot of [product] on a pure white background with bright, even lighting highlighting its form.",
                      "Create a bold product shot of [product] against a gradient backdrop from [brand color] to black, lit by a spotlight from above.",
                      "Generate an artistic product shot of [product] on a bed of [material] in studio, with soft, diffused lighting for a creative touch.",
                      "Capture a dreamy product shot of [product] floating in mid-air against a studio backdrop, with soft, diffused lighting.",
                      "Imagine a clean product shot for [brand] featuring [product] against a pure white background, with bright, even lighting (e-commerce style).",
                      "Design a minimalist studio shot for [brand] featuring [product] against a solid [brand color] backdrop, softly lit with diffused light.",
                      "Generate a high-contrast studio shot for [brand] featuring [product] on a glossy black surface, with dramatic lighting and sharp shadows.",
                      "Create a monochromatic studio shot for [brand] featuring [product] with geometric shapes in the background and soft, diffused lighting.",
                      "Produce a modern studio shot for [brand] featuring [product] on a gradient backdrop from [brand color] to black, under moody, low-key lighting.",
                      "Capture an elegant arrangement featuring [product] on a bed of [material] in studio, with soft, diffused lighting.",
                      "Generate a luxurious arrangement featuring [product] on a marble pedestal, bathed in golden backlighting for a high-end look.",
                      "Compose a minimalist arrangement featuring [product] on a pure white surface, with high-key lighting eliminating shadows.",
                      "Design an artistic composition of [product] on a glossy black surface, with neon rim lighting in [brand's primary color].",
                      "Create an edgy composition of [product] surrounded by smoke on a dark background, under dramatic studio lighting.",
                      "Capture a vibrant composition of [product] with geometric shapes in the background, lit by bright, even lighting.",
                      "Generate a surreal composition of [product] floating in mid-air against a studio backdrop, under soft, diffused lighting.",
                      "Imagine a futuristic composition of [product] surrounded by swirling neon data streams, lit with colorful gel lighting.",
                      "Shoot a minimalist shot of [product] against a pure white backdrop, using soft, diffused lighting to highlight its details.",
                      "Capture a professional shot of [product] against a neutral gray background, using high-key lighting to eliminate harsh shadows.",
                      "Produce an ultra-detailed shot of [product] on a mirror, capturing a perfect reflection with bright, even lighting.",
                      "Generate a bold shot of [product] on a marble pedestal, with a spotlight from above creating dramatic focus.",
                      "Create a sleek shot of [product] on a glossy black surface, with moody, low-key studio lighting.",
                      "Design a colorful shot of [product] against a solid [brand color] backdrop, using a spotlight from above to create depth.",
                      "Compose a playful shot of [product] on a bed of [material] (like petals or fabric), with soft, diffused lighting for a whimsical feel.",
                      "Shoot a dramatic studio shot of [product] surrounded by smoke on a dark background, under harsh strobe lighting.",
                      "Craft a futuristic studio shot of [product] on a simple backdrop with [brand]'s logo faintly visible in the background, under soft, diffused lighting.",
                      "Generate a high-contrast studio shot of [product] on a simple backdrop with smoke swirling around, under soft, diffused lighting.",
                      "Produce a bold studio shot of [product] on a simple backdrop with splashes of water frozen in motion around it, under a spotlight from above.",
                      "Create a vibrant studio shot of [product] on a simple backdrop with a colorful paint splash frozen in mid-air, under moody, low-key lighting.",
                      "Craft an ultra-detailed studio shot of [product] on a simple backdrop with a complementary prop (like a matching accessory) beside it, under harsh strobe lighting.",
                      "Shoot a dreamy studio shot of [product] on a simple backdrop with a subtle reflection below it, under dramatic studio lighting with sharp shadows.",
                      "Design a playful studio shot of [product] on a simple backdrop with a colorful paint splash frozen in mid-air, under bright, even lighting.",
                      "Generate a monochromatic studio shot of [product] on a simple backdrop with a subtle reflection below it, under soft, diffused lighting.",
                      "Craft a futuristic studio shot of [product] on a simple backdrop with [brand]'s logo faintly visible in the background, under soft, diffused lighting.",
                      "Produce an edgy studio shot of [product] on a simple backdrop with a subtle reflection below it, under soft, diffused lighting.",
                      "Design a luxury product hero shot for [brand]: [product] on a reflective black surface with golden backlighting and a smoky ambiance.",
                      "Generate a futuristic product showcase featuring [product] levitating above a glowing platform, surrounded by holographic neon effects in a dark studio.",
                      "Produce a playful composition of multiple [product] units arranged in a colorful geometric pattern on a flat surface, with bright, even lighting.",
                      "Create an edgy studio image of [product] with splashes of liquid frozen mid-air around it, lit by high-contrast strobe lighting.",
                      "Illustrate [product] against a backdrop of swirling [brand color] smoke, with a spotlight from above casting a dramatic shadow.",
                      "Compose a surreal product scene: [product] emerging from a misty fog on a pedestal, under moody, low-key lighting.",
                      "Design an ultra-modern shot for [brand] featuring [product] in an infinity mirror room, with endless reflections and cool blue studio lighting.",
                      "Imagine an artistic studio shot of [product] cracked open to reveal its inner components, arranged neatly beside it, photographed with crisp, high-key lighting.",
                      "Capture [product] being gently held by a model's hands in studio – focus on the product with soft, diffused rim lighting for an intimate feel.",
                      "Generate a high-contrast silhouette of [product] against a brightly lit background, revealing its shape in dramatic form.",
                      "Shoot [product] alongside a small accent prop (like a flower or tool) on a textured surface, with warm, soft studio lighting for a lifestyle-meets-studio vibe.",
                      "Create a season-themed product photo of [product] surrounded by seasonal elements (e.g. autumn leaves, holiday lights), with balanced studio lighting.",
                      "Design a sleek product shot of [product] bathed in [brand's secondary color] light against a dark background, for a bold contrast.",
                      "Capture a top-down flat lay of [product] and complementary items arranged neatly on a matching background, with soft, diffused lighting.",
                      "Shoot a macro photograph focusing on [product]'s intricate details, with dramatic lighting emphasizing its texture and design.",
                      "Design a creative studio image featuring [product] with splashes of water frozen in motion around it, lit by a high-speed flash to capture every droplet.",
                      "Generate a fashion magazine-style product shot of [product] with dramatic high-contrast lighting and glossy reflections (high-end editorial vibe).",
                      "Produce a product group shot: multiple [product] variations lined up in gradient order on a reflective surface, with even, bright lighting across them.",
                      "Create a dynamic studio image of [product] surrounded by mirror fragments for a shattered reflection effect, under bold, edgy lighting.",
                      "Shoot [product] with smoke swirling around it on a dark background, a single spotlight from above highlighting the product through the haze.",
                      "Capture a scroll-stopping image of [product] for social feeds: bold contrast, a vibrant [brand color] background, and dramatic lighting to make it pop.",
                      "Design an Instagram-worthy flat lay of [product] with trendy props (coffee, notebook, phone) arranged aesthetically, shot under soft, natural-looking lighting.",
                      "Generate a lifestyle-meets-studio shot: [product] in use by a silhouetted figure against a colored backdrop, with motion blur trails and sharp focus on the product.",
                      "Produce an ad-friendly product photo of [product] on a clean background with ample negative space on one side for overlay text, evenly lit for versatility.",
                      "Create a Pinterest-style collage image featuring [product] from multiple angles, on a light backdrop with pastel lighting and decorative scrapbooking elements.",
                      "Imagine [product] displayed in a creative monochrome setup where everything except the product is tinted in [brand color], under bright studio lights (product really stands out).",
                      "Shoot [product] from an extreme low angle against a sweeping backdrop, making it appear larger-than-life, with high-contrast dramatic lighting.",
                      "Capture a teaser shot of [product] half in shadow and half illuminated on a dark background – a mysterious, high-drama look to intrigue viewers.",
                      "Compose a vibrant product shot of [product] bursting through a paper backdrop as if breaking through, freeze-framed with high-speed flash.",
                      "Generate a split-tone lighting effect on [product] (one side warm golden light, one side cool blue light) against a neutral backdrop, for a striking dual-color contrast.",
                      "Design a creative mirror image of [product] by placing two units symmetrically on a reflective surface, captured with perfect symmetry and soft studio lighting.",
                      "Produce an artistic shot of [product] with colored shadows cast onto the backdrop (using gel lights), giving a modern graphic art effect.",
                      "Create an aspirational product scene: [product] perched atop a 'mountain' of similar items (metaphorically conquering competition), shot with a wide-angle lens for epic scale.",
                      "Shoot a minimalist black-and-white photo of [product] where only the product itself is in color, highlighting it amid a grayscale scene, under moody lighting.",
                      "Imagine a vibrant product lineup – multiple [product] in different colors lined up diagonally, with dynamic studio lighting and a gradient background for a viral visual.",
                      "Design a magazine-quality product still for [brand], inspired by GQ style: [product] on an elegant set with rich colors and dramatic shadows.",
                      "Generate a cinematic product image reminiscent of a movie poster, making [product] the 'hero' under epic, contrasty lighting and a dark vignette background.",
                      "Produce a tech-inspired composition of [product] with neon accents and holographic elements, channeling a Blade Runner-esque futuristic aesthetic in studio.",
                      "Imagine a commercial product photo in Apple-like minimalism: [product] on a pristine white background with soft shadows and a clean, sleek look.",
                      "Design a creative product shot blending streetwear and tech vibes (Complex style): [product] on an urban-themed set (spray-painted backdrop, neon highlights) with edgy lighting for culture-meets-tech appeal.",
                    ].map((prompt, index) => (
                      <div
                        key={index}
                        className="bg-cream/5 border border-cream/20 rounded p-3 group hover:bg-cream/10 transition-all duration-200"
                      >
                        <div className="flex justify-between items-start gap-3">
                          <p className="text-cream text-sm font-mono leading-relaxed flex-1">
                            {prompt}
                          </p>
                          <Button
                            onClick={(e) => copyPrompt(prompt, e)}
                            className="bg-neon-orange text-black hover:bg-cream opacity-0 group-hover:opacity-100 transition-opacity"
                            size="sm"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Lifestyle Templates */}
              <Card className="bg-black border-2 border-cream mb-8">
                <CardHeader>
                  <CardTitle className="text-xl font-black text-cream flex items-center gap-2">
                    <Camera className="h-5 w-5 text-neon-orange" />
                    Lifestyle Templates (100 Prompts)
                  </CardTitle>
                  <p className="text-cream/80 text-sm">
                    Authentic, personality-driven images showing your brand in
                    real life
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
                    {[
                      "Capture a candid photo of a young entrepreneur using [product] in a cozy cafe, with warm, natural lighting and a genuine smile.",
                      "Photograph an authentic shot of an innovative startup founder holding [product] at a busy coworking space, during golden hour for a soft glow.",
                      "Snap a casual photograph featuring a social media influencer unboxing [product] at a sunny park, with vibrant city lights at night (for contrast and fun).",
                      "Capture a candid moment of a creative artist using [product] in a home office, with soft indoor lighting for an intimate feel.",
                      "Photograph an inspirational shot of the founder of [brand] demonstrating [product] on stage at a conference, with dramatic stage lighting highlighting them.",
                      "Capture a playful photo of a group of friends showing off [product] to each other on a city street, with bright daylight illuminating the scene.",
                      "Snap a dynamic shot of a diverse group of [brand] community members using [product] at a live event, capturing genuine smiles and energy.",
                      "Imagine a heartwarming lifestyle image of a loyal fan of [brand] holding [product] at a sunny park, with a candid, unposed vibe.",
                      "Photograph a relatable moment of a happy customer including [product] in their daily routine at a modern apartment, with soft morning light.",
                      "Capture an energetic photo of the [brand] team celebrating with [product] in hand at a product launch event, filled with laughter and real emotion.",
                      "Snap an authentic shot of an enthusiastic customer using [product] at a community meetup, with candid energy and movement in the frame.",
                      "Generate a cinematic photo of a social media influencer taking a selfie with [product] on a bustling city street at night, vibrant neon signs in the background.",
                      "Capture a casual image of an aspiring vlogger featuring [product] in a home studio setup, with ring-light illumination and a relaxed atmosphere.",
                      "Photograph a candid scene of a mentor and mentee duo working with [product] in a creative studio space, with natural window light and genuine interaction.",
                      "Snap a spontaneous shot of a pair of coworkers collaborating around [product] at a workshop session, with warm overhead lighting capturing the focus.",
                      "Imagine an uplifting photo of an influencer couple using [product] during a beach vacation sunset, with golden hour light giving a nostalgic feel.",
                      "Capture a raw, documentary-style image of a fitness coach with a client using [product] at an outdoor market, with vibrant true-to-life colors.",
                      "Photograph a casual moment of an influencer couple including [product] in their daily routine at a product launch event, with a candid, unposed vibe.",
                      "Snap an intimate shot of the founder of [brand] presenting [product] to an audience at a busy coworking space, in a documentary-style perspective.",
                      "Capture a vibrant image of a team of colleagues wearing or using [product] proudly in a modern apartment setting, with a candid, unposed vibe.",
                      "Photograph a relatable shot of an enthusiastic customer using [product] at a product launch event, with candid energy and movement.",
                      "Capture an energetic photograph featuring the founder of [brand] demonstrating [product] in a cozy cafe with a candid, unposed vibe.",
                      "Imagine a dynamic photo of a group of friends working on [product] at a sunny park, with bright daylight illuminating the scene.",
                      "Snap an empowering moment of a creative artist sharing [product] with a friend on stage at a conference, with candid energy and movement.",
                      "Capture a candid photograph featuring a group of friends wearing or using [product] proudly in a creative studio space with warm, natural lighting.",
                      "Photograph an authentic lifestyle shot of a young entrepreneur explaining [product] to a peer at a networking event, with soft indoor lighting and engaging body language.",
                      "Generate a friendly image of a happy customer sharing [product] with a friend in a suburban neighborhood street, with golden late-afternoon sunlight.",
                      "Capture a spontaneous photo of a social media influencer using [product] while chatting with followers during a live stream, with the home office softly lit by screen glow.",
                      "Snap a candid image of a diverse group of [brand] fans gathered at a meetup, all holding or wearing [product] and laughing together, vibrant daylight capturing the moment.",
                      "Photograph an uplifting scene of a startup founder including [product] in a daily morning routine – e.g., using [product] at sunrise in a home kitchen, with soft dawn light.",
                      "Capture an intimate portrait of [brand founder] working late on [product] in a dimly lit studio, neon computer glow on their face (showing dedication and vibe).",
                      "Snap a playful shot of two friends taking a selfie with [product] at a brand pop-up event, confetti in the air and bright event lighting.",
                      "Imagine a candid festival photo of a group of users holding [product] up in the air at a concert, stage lights and crowd energy in the background.",
                      "Photograph a sincere moment of a mentor handing [product] to a mentee in an office, both smiling – soft window light and shallow depth of field for focus.",
                      "Capture a documentary-style image of an agency team brainstorming around [product] sketches on a whiteboard, fluorescent office lighting and dynamic poses conveying action.",
                      "Generate a warm photo of a family using [product] together in a living room (if applicable), with evening lamp light creating a cozy atmosphere and genuine connection.",
                      "Snap a street-style image of a creative director carrying [product] (or wearing it) while walking through a graffiti alley, natural light and urban vibe emphasizing personality.",
                      "Photograph a behind-the-scenes moment of [brand founder] adjusting [product] on set of a photoshoot, with studio lighting equipment visible – giving a 'making the magic' feel.",
                      "Capture an energetic shot of an aspiring vlogger talking about [product] in a trendy studio loft, colorful LED lighting in the background and expressive hand gestures.",
                      "Snap a candid image of a small business owner including [product] in a storefront display, taken during actual business hours with customers around (real-life context).",
                      "Photograph a joyful scene of customers lining up to try [product] at an expo booth, bright expo hall lighting and smiling faces showing demand and community interest.",
                      "Capture an authentic photo of a content creator packing [product] orders late at night in a home office, lit by the glow of a desk lamp and laptop – a hustle moment.",
                      "Generate a lively image of a group of fans at a launch party clinking glasses around [product], colorful party lights and genuine excitement captured mid-celebration.",
                      "Photograph a candid workshop scene where participants are all using [product] together at tables, with a facilitator in view – daylight from windows and an educational vibe.",
                      "Snap a friendly image of an enthusiastic customer showing [product] to their friend at a cafe patio, both laughing – late afternoon sun and a casual atmosphere.",
                      "Capture a proud moment of a creative artist displaying artwork made with [product] to a small crowd in a gallery space, with soft gallery lighting focusing on the interaction.",
                      "Photograph a gritty, authentic shot of a street performer incorporating [product] into their act on a city sidewalk, evening neon signs and passerby reactions adding context.",
                      "Generate a cheerful image of [brand] team members taking a group selfie with [product] in their hands at the office, plenty of natural window light and big smiles (team culture moment).",
                      "Snap a behind-the-scenes photo of a YouTuber filming a tutorial with [product] in a bedroom studio, ring light on and background decor visible, giving a personal, relatable feel.",
                      "Capture a motivating scene of a fitness coach and client high-fiving over [product] (e.g., a result achieved using it) in a gym, action shot with motion blur and bright gym lighting.",
                    ].map((prompt, index) => (
                      <div
                        key={index}
                        className="bg-cream/5 border border-cream/20 rounded p-3 group hover:bg-cream/10 transition-all duration-200"
                      >
                        <div className="flex justify-between items-start gap-3">
                          <p className="text-cream text-sm font-mono leading-relaxed flex-1">
                            {prompt}
                          </p>
                          <Button
                            onClick={(e) => copyPrompt(prompt, e)}
                            className="bg-neon-orange text-black hover:bg-cream opacity-0 group-hover:opacity-100 transition-opacity"
                            size="sm"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Graphics Templates */}
              <Card className="bg-black border-2 border-cream mb-8">
                <CardHeader>
                  <CardTitle className="text-xl font-black text-cream flex items-center gap-2">
                    <Palette className="h-5 w-5 text-neon-orange" />
                    Graphics Templates (100 Prompts)
                  </CardTitle>
                  <p className="text-cream/80 text-sm">
                    Text-based visuals, memes, and viral graphic concepts
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
                    {[
                      "Design a bold typographic poster featuring the phrase 'No big team needed' in neon orange on a sleek black background, with an edgy modern font.",
                      "Create a neon sign art with the word 'SUCCESS' glowing in bright orange on a brick wall backdrop, giving off a retro-cool vibe.",
                      "Generate an inspirational quote image: a silhouette of a mountain climber at sunrise with the text 'Dream Big, Hustle Hard' in bold across the sky.",
                      "Illustrate a motivational quote in chalk on a blackboard-style background – e.g. 'Never Not Working' – with realistic chalk dust and hand-drawn typography.",
                      "Design a graffiti-style mural graphic with your slogan [Your Motto] spray-painted in bold letters on an urban concrete wall, featuring vibrant colors and drip effects.",
                      "Produce a minimal quote graphic: a simple [brand color] background with the quote '[Your Quote]' in large white bold text centered (clean Instagram aesthetic).",
                      "Craft a dynamic 3D text illustration of the word 'Inspire' exploding outward, with dramatic lighting and deep shadows for dimensional impact.",
                      "Create a retro marquee sign look with marquee lights spelling out 'HUSTLE', as if on an old theater sign, against a moody dark background.",
                      "Design a social media quote template featuring a faint image of a busy city street in the background and an overlay of large bold text 'Grind and Shine' in front (high contrast, scroll-stopping).",
                      "Generate an artistic word cloud in the shape of a lightbulb, composed of positive terms (Create, Innovate, Succeed, etc.) floating on a transparent or white background.",
                      "Illustrate a humorous scene of a cat in a business suit typing on a laptop at a boardroom table (the 'CEO cat' meme vibe).",
                      "Generate a funny image of a dog wearing a headset and sitting at a desk as if on a support call, looking confused (relatable customer service meme).",
                      "Create a cartoon of an entrepreneur literally juggling multiple items – a laptop, phone, coffee, clock – representing balancing many tasks at once (hustle meme).",
                      "Produce a comedic image of a person in office attire frantically trying to put out small fires burning on their desk (the 'everything is fine' chaos meme embodied).",
                      "Design a meme-style image of a snail with a jet pack strapped on, racing a rabbit – symbolizing a slow start that accelerates rapidly (fun twist on the tortoise and hare).",
                      "Illustrate a tired office worker buried in a huge pile of coffee cups and papers, with wild eyes (over-caffeinated hustle culture humor).",
                      "Generate a funny graphic of a brain character arm-wrestling a bicep muscle character, representing brains vs. brawn in business decision-making.",
                      "Create a parody image of a superhero in a suit holding a briefcase, ripping open their shirt to reveal a t-shirt that says '#Boss' underneath (business superhero meme).",
                      "Illustrate an 'idea' as a cartoon lightbulb character literally dragging a person out of bed in the morning – a humorous take on inspiration striking.",
                      "Produce a meme image of a person at a desk with a low battery icon above their head, while coffee is being poured into them like a charging cable (tired but recharging meme).",
                      "Design a quirky image of a businessman riding a rocket like a cowboy, launching upward (startup success taking off meme).",
                      "Generate a comical scene of multiple identical office workers in gray, except one in full color and unique outfit (standing out from the crowd concept).",
                      "Create a whimsical visual of a money bag and a clock holding hands and dancing together – a personification of 'time is money' in a fun way.",
                      "Illustrate a split-screen meme: left side a caveman with a square wheel, right side a modern person with a race car – evolution of innovation in a single image (no text needed).",
                      "Produce a lighthearted image of a person asleep on their keyboard while their on-screen avatar is still working (the grind never stops meme).",
                      "Design a meme-style graphic of a tombstone engraved with 'R.I.P. 9-5', with celebratory flowers and maybe a party hat on it (humorous farewell to the traditional job).",
                      "Illustrate a chaotic office cartoon where everyone is running around in panic except one calm person in the center meditating with [product] in hand (zen amidst chaos meme).",
                      "Create a funny 'upgrade' meme frame: an old broken lightbulb in the top part, and a bright LED bulb in the bottom part, indicating a brilliant upgrade idea (two-panel format merged).",
                      "Generate a playful image of an angry printer shooting out papers at a panicked user (tech frustration embodied as a meme character).",
                      "Design a comical signpost at a crossroads: one arrow says 'Comfort Zone' and another says 'Success', with a traveler hesitating towards the Success path (visual metaphor of tough choices).",
                      "Illustrate an over-the-top Rube Goldberg machine performing a simple task (like clicking a button) through absurd convolutions, poking fun at overengineering.",
                      "Produce a cartoon of a person literally carrying the world (globe) on their shoulders while still checking their phone and laptop – a modern Atlas meme about heavy responsibilities.",
                      "Create a meme-worthy image of an employee on a video call dressed professionally on top and in pajama pants below, giving a thumbs-up (the WFH video call joke).",
                      "Generate a humorous scene of a race where a small startup (person on a rocket skateboard) zooms past a giant slow corporation (person riding a turtle).",
                      "Design a playful image of a genie coming out of a laptop granting a wish, and the user asking for 'more followers' (social media wish fulfillment meme).",
                      "Illustrate the 'galaxy brain' meme progression: four panels of a human brain or head increasing in glow/size from normal to cosmic, representing escalating insight (no text labels needed).",
                      "Create a visual joke of two identical characters in office attire pointing at each other in confusion (homage to the Spider-Man pointing meme, but with generic office workers).",
                      "Generate a funny image of a person with an angel on one shoulder and a smartphone on the other, where the phone is tempting them – procrastination vs. productivity battle.",
                      "Produce a comedic before-and-after split: left side shows a messy desk and tired person labeled 'Monday' vibe, right side a tidy desk and happy person labeled 'Friday' vibe (contrasting tones in one image).",
                      "Design a playful meme-style image where a progress bar at 99% is above a person who looks exasperated, waiting for their video to render or project to finish (so close yet so far).",
                      "Illustrate the classic success metaphor: an iceberg with a small tip (success) visible above water and a huge submerged base below (hard work, failures).",
                      "Design a visual of a person climbing a staircase into the clouds toward a trophy at the top – each step representing progress, perseverance, and small wins.",
                      "Generate an image of a fork in the road at sunset: one path is smooth and labeled 'Easy', the other steep and rocky labeled 'Challenge', with a determined person choosing the hard path.",
                      "Create a depiction of time and money together: a clock face merging into a gold coin, symbolizing that time is money, on a clean white or transparent background.",
                      "Illustrate a human brain sprouting leaves and flowers like a garden, representing creative ideas and learning blossoming from the mind.",
                      "Produce an image of two figures on a seesaw: one side piled with work items (papers, laptop) and the other side with family or hobby items, showing the balance (or imbalance) of work and life.",
                      "Design a concept image of a lightbulb launching like a rocket from a launchpad, symbolizing a big idea taking off (lightbulb rocket metaphor).",
                      "Generate a surreal visual of a person standing on a ladder that reaches up to the stars, representing reaching for ambitious goals beyond the earth.",
                      "Illustrate teamwork as a bridge: a group of people forming a human bridge across a gap between two cliffs, allowing others to cross – visualizing collective effort.",
                      "Create a symbolic image of a puzzle piece being placed into a nearly complete puzzle that forms a logo or picture, representing the last piece of success clicking in.",
                      "Produce an imaginative graphic where the silhouette of a head is filled with interlocking cogs and one of the cogs is glowing gold (a brilliant idea amid ordinary thoughts).",
                    ].map((prompt, index) => (
                      <div
                        key={index}
                        className="bg-cream/5 border border-cream/20 rounded p-3 group hover:bg-cream/10 transition-all duration-200"
                      >
                        <div className="flex justify-between items-start gap-3">
                          <p className="text-cream text-sm font-mono leading-relaxed flex-1">
                            {prompt}
                          </p>
                          <Button
                            onClick={(e) => copyPrompt(prompt, e)}
                            className="bg-neon-orange text-black hover:bg-cream opacity-0 group-hover:opacity-100 transition-opacity"
                            size="sm"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* AI TOOLKIT */}
          {activeTab === "toolkit" && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-black text-cream mb-2">
                  AI Toolkit
                </h3>
                <p className="text-cream/80">
                  Curated database of AI tools, resources, and links
                </p>
              </div>

              <div className="space-y-8">
                {aiToolkit.map((category, index) => (
                  <div key={index}>
                    <h4 className="text-xl font-black text-cream mb-4 flex items-center gap-2">
                      <Wrench className="h-5 w-5 text-neon-orange" />
                      {category.category}
                    </h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {category.tools.map((tool, toolIndex) => (
                        <Card
                          key={toolIndex}
                          className="bg-black border-2 border-cream"
                        >
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h5 className="text-lg font-black text-cream mb-1">
                                  {tool.name}
                                </h5>
                                <p className="text-cream/80 text-sm">
                                  {tool.description}
                                </p>
                              </div>
                              <Button
                                onClick={() => openTool(tool.url)}
                                className="bg-neon-orange text-black hover:bg-cream"
                                size="sm"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EXAMPLES */}
          {activeTab === "examples" && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-black text-cream mb-2">
                  Examples Gallery
                </h3>
                <p className="text-cream/80">
                  See finished outputs alongside the prompts that generated them
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {examples.map((example, index) => (
                  <Card key={index} className="bg-black border-2 border-cream">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <Button
                          onClick={(e) => copyPrompt(example.prompt, e)}
                          className="bg-cream text-black hover:bg-neon-orange"
                          size="sm"
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </Button>
                        <Button
                          onClick={(e) => copyPrompt(example.prompt, e)}
                          className="bg-cream text-black hover:bg-neon-orange"
                          size="sm"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        </div>
                      </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h6 className="text-sm font-black text-neon-orange mb-2">
                            PROMPT USED:
                          </h6>
                          <p className="text-cream text-xs font-mono bg-cream/10 p-3 rounded">
                            {example.prompt}
                          </p>
                        </div>

                        <div>
                          <h6 className="text-sm font-black text-neon-orange mb-2">
                            OUTPUT RESULT:
                          </h6>
                          <p className="text-cream text-sm">
                            {example.outputDescription}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {example.tags.map((tag) => (
                            <Badge
                              key={tag}
                              className="bg-cream/20 text-cream text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}