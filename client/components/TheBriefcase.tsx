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
  const [activeTab, setActiveTab] = useState("playbook");

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
    { id: "updates", label: "UPDATES", icon: <Bell className="h-4 w-4" /> },
    {
      id: "toolkit",
      label: "AI TOOLKIT",
      icon: <Wrench className="h-4 w-4" />,
    },
    { id: "examples", label: "EXAMPLES", icon: <Image className="h-4 w-4" /> },
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
    return (
      selectedKeywords.join(", ") +
      ", cinematic quality, 4K resolution, professional video production"
    );
  };

  const copyFormula = async () => {
    const formula = getFormulaText();
    try {
      await navigator.clipboard.writeText(formula);
    } catch (error) {
      alert(`Formula copied: ${formula}`);
    }
  };

  const copyPrompt = async (prompt: string) => {
    try {
      await navigator.clipboard.writeText(prompt);
    } catch (error) {
      alert(`Prompt copied: ${prompt}`);
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
                  Master SORA AI Prompt Generation
                </h3>
                <p className="text-cream/80">
                  Complete guides to get the best results from our platform
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {playbookSections.map((section, index) => (
                  <Card key={index} className="bg-black border-2 border-cream">
                    <CardHeader>
                      <CardTitle className="text-lg font-black text-cream flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-neon-orange" />
                        {section.title}
                      </CardTitle>
                      <Badge className="bg-neon-orange text-black font-bold text-xs w-fit">
                        {section.duration}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-cream mb-4">{section.description}</p>
                      <Button
                        onClick={() => downloadGuide(section)}
                        className="bg-neon-orange border-2 border-neon-orange text-black font-bold text-sm px-4 py-2 h-auto hover:bg-black hover:text-neon-orange transition-all duration-200"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        DOWNLOAD GUIDE
                      </Button>
                    </CardContent>
                  </Card>
                ))}
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
              </div>

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

              {/* Prebuilt Prompts Section */}
              <div>
                <h4 className="text-xl font-black text-cream mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-neon-orange" />
                  Ready-to-Use Prompts
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  {promptVault.prebuiltPrompts.map((prompt, index) => (
                    <Card
                      key={index}
                      className="bg-black border-2 border-cream"
                    >
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg font-black text-cream">
                              {prompt.title}
                            </CardTitle>
                            <Badge className="bg-neon-orange text-black font-bold text-xs">
                              {prompt.category}
                            </Badge>
                          </div>
                          <Button
                            onClick={() => copyPrompt(prompt.prompt)}
                            className="bg-cream text-black hover:bg-neon-orange"
                            size="sm"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-cream text-sm mb-3 font-mono bg-cream/10 p-3 rounded">
                          {prompt.prompt}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {prompt.tags.map((tag) => (
                            <Badge
                              key={tag}
                              className="bg-cream/20 text-cream text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
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
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-black text-cream">
                              {update.title}
                            </h3>
                            {update.isNew && (
                              <Badge className="bg-neon-orange text-black font-bold text-xs">
                                NEW
                              </Badge>
                            )}
                          </div>
                          <p className="text-cream">{update.description}</p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-cream text-black font-bold text-xs mb-2">
                            {update.type}
                          </Badge>
                          <p className="text-sm text-cream">{update.date}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
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
                        <div>
                          <CardTitle className="text-lg font-black text-cream flex items-center gap-2">
                            {example.category === "Product" && (
                              <Package className="h-5 w-5 text-neon-orange" />
                            )}
                            {example.category === "Lifestyle" && (
                              <Camera className="h-5 w-5 text-neon-orange" />
                            )}
                            {example.category === "Graphic" && (
                              <Palette className="h-5 w-5 text-neon-orange" />
                            )}
                            {example.title}
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className="bg-neon-orange text-black font-bold text-xs">
                              {example.category}
                            </Badge>
                            <Badge className="bg-green-500 text-black font-bold text-xs">
                              {example.quality}% Quality
                            </Badge>
                          </div>
                        </div>
                        <Button
                          onClick={() => copyPrompt(example.prompt)}
                          className="bg-cream text-black hover:bg-neon-orange"
                          size="sm"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
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
