import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { AppLayout } from "../components/AppLayout";
import { Paywall } from "../components/Paywall";
import { useSubscription } from "../hooks/useSubscription";
import { Wrench, ExternalLink, Search, Filter } from "lucide-react";

export default function AIToolkit() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
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

  const aiToolkit = [
    {
      category: "AI Video Generation",
      tools: [
        {
          name: "SORA by OpenAI",
          description:
            "Advanced AI video generation with text-to-video capabilities",
          url: "https://openai.com/sora",
          type: "external",
        },
        {
          name: "Runway ML",
          description:
            "Creative AI video tools for filmmakers and content creators",
          url: "https://runwayml.com",
          type: "external",
        },
        {
          name: "Pika Labs",
          description: "AI video creation platform with text and image inputs",
          url: "https://pika.art",
          type: "external",
        },
        {
          name: "Stable Video Diffusion",
          description: "Open-source video generation model by Stability AI",
          url: "https://stability.ai/stable-video",
          type: "external",
        },
        {
          name: "Synthesia",
          description:
            "AI video generation with virtual avatars and voiceovers",
          url: "https://synthesia.io",
          type: "external",
        },
        {
          name: "Invideo AI",
          description: "AI-powered video creation and editing platform",
          url: "https://invideo.io",
          type: "external",
        },
      ],
    },
    {
      category: "Image Generation",
      tools: [
        {
          name: "Midjourney",
          description: "High-quality AI image generation with artistic style",
          url: "https://midjourney.com",
          type: "external",
        },
        {
          name: "DALL-E 3",
          description: "OpenAI's advanced image generation model",
          url: "https://openai.com/dall-e-3",
          type: "external",
        },
        {
          name: "Stable Diffusion",
          description: "Open-source image generation with customizable models",
          url: "https://stability.ai",
          type: "external",
        },
        {
          name: "Adobe Firefly",
          description: "AI image generation integrated with Creative Cloud",
          url: "https://firefly.adobe.com",
          type: "external",
        },
        {
          name: "Leonardo AI",
          description: "AI image generation with fine-tuned models",
          url: "https://leonardo.ai",
          type: "external",
        },
        {
          name: "Ideogram",
          description: "AI image generation with text rendering capabilities",
          url: "https://ideogram.ai",
          type: "external",
        },
      ],
    },
    {
      category: "AI Writing & Content",
      tools: [
        {
          name: "ChatGPT",
          description:
            "Conversational AI for writing, brainstorming, and assistance",
          url: "https://chat.openai.com",
          type: "external",
        },
        {
          name: "Claude",
          description: "Anthropic's AI assistant for complex writing tasks",
          url: "https://claude.ai",
          type: "external",
        },
        {
          name: "Jasper",
          description: "AI copywriting tool for marketing and business content",
          url: "https://jasper.ai",
          type: "external",
        },
        {
          name: "Copy.ai",
          description: "AI writing assistant for marketing copy and content",
          url: "https://copy.ai",
          type: "external",
        },
        {
          name: "Grammarly",
          description: "AI writing assistant for grammar and style improvement",
          url: "https://grammarly.com",
          type: "external",
        },
        {
          name: "Notion AI",
          description: "AI writing and productivity features within Notion",
          url: "https://notion.so/ai",
          type: "external",
        },
      ],
    },
    {
      category: "Audio & Music AI",
      tools: [
        {
          name: "Eleven Labs",
          description: "AI voice generation and cloning platform",
          url: "https://elevenlabs.io",
          type: "external",
        },
        {
          name: "Murf AI",
          description: "AI voiceover and text-to-speech platform",
          url: "https://murf.ai",
          type: "external",
        },
        {
          name: "AIVA",
          description: "AI music composition for soundtracks and scores",
          url: "https://aiva.ai",
          type: "external",
        },
        {
          name: "Soundraw",
          description: "AI music generation for content creators",
          url: "https://soundraw.io",
          type: "external",
        },
        {
          name: "Boomy",
          description: "AI music creation platform for original songs",
          url: "https://boomy.com",
          type: "external",
        },
        {
          name: "Descript",
          description: "AI-powered audio and video editing with transcription",
          url: "https://descript.com",
          type: "external",
        },
      ],
    },
    {
      category: "Design & UI/UX",
      tools: [
        {
          name: "Figma AI",
          description: "AI features in Figma for design automation",
          url: "https://figma.com",
          type: "external",
        },
        {
          name: "Framer AI",
          description: "AI website generation and design assistance",
          url: "https://framer.com",
          type: "external",
        },
        {
          name: "Uizard",
          description: "AI-powered UI design and prototyping tool",
          url: "https://uizard.io",
          type: "external",
        },
        {
          name: "Canva AI",
          description: "AI design features in Canva for quick creation",
          url: "https://canva.com",
          type: "external",
        },
        {
          name: "Looka",
          description: "AI logo and brand identity design platform",
          url: "https://looka.com",
          type: "external",
        },
        {
          name: "Remove.bg",
          description: "AI background removal for images and designs",
          url: "https://remove.bg",
          type: "external",
        },
      ],
    },
    {
      category: "Productivity & Automation",
      tools: [
        {
          name: "Zapier AI",
          description: "AI-powered workflow automation and integration",
          url: "https://zapier.com",
          type: "external",
        },
        {
          name: "Motion",
          description: "AI calendar and task management for productivity",
          url: "https://usemotion.com",
          type: "external",
        },
        {
          name: "Superhuman",
          description: "AI email management and productivity features",
          url: "https://superhuman.com",
          type: "external",
        },
        {
          name: "Otter.ai",
          description: "AI meeting transcription and note-taking",
          url: "https://otter.ai",
          type: "external",
        },
        {
          name: "Reclaim.ai",
          description: "AI calendar scheduling and time management",
          url: "https://reclaim.ai",
          type: "external",
        },
        {
          name: "Clockify AI",
          description: "AI time tracking and productivity insights",
          url: "https://clockify.me",
          type: "external",
        },
      ],
    },
    {
      category: "Code & Development",
      tools: [
        {
          name: "GitHub Copilot",
          description: "AI code completion and generation assistant",
          url: "https://github.com/features/copilot",
          type: "external",
        },
        {
          name: "Cursor",
          description: "AI-powered code editor with intelligent assistance",
          url: "https://cursor.sh",
          type: "external",
        },
        {
          name: "Tabnine",
          description: "AI code completion for multiple programming languages",
          url: "https://tabnine.com",
          type: "external",
        },
        {
          name: "Replit Ghostwriter",
          description: "AI coding assistant in the browser IDE",
          url: "https://replit.com",
          type: "external",
        },
        {
          name: "Codeium",
          description: "Free AI code completion and chat assistant",
          url: "https://codeium.com",
          type: "external",
        },
        {
          name: "Sourcegraph Cody",
          description: "AI coding assistant with codebase context",
          url: "https://sourcegraph.com/cody",
          type: "external",
        },
      ],
    },
    {
      category: "Research & Analysis",
      tools: [
        {
          name: "Perplexity AI",
          description: "AI research and search engine with citations",
          url: "https://perplexity.ai",
          type: "external",
        },
        {
          name: "Consensus",
          description: "AI-powered scientific research and paper analysis",
          url: "https://consensus.app",
          type: "external",
        },
        {
          name: "Elicit",
          description: "AI research assistant for literature reviews",
          url: "https://elicit.org",
          type: "external",
        },
        {
          name: "Semantic Scholar",
          description: "AI-powered academic search and discovery",
          url: "https://semanticscholar.org",
          type: "external",
        },
        {
          name: "You.com",
          description: "AI-powered search engine with personalized results",
          url: "https://you.com",
          type: "external",
        },
        {
          name: "Wolfram Alpha",
          description: "Computational knowledge engine for complex queries",
          url: "https://wolframalpha.com",
          type: "external",
        },
      ],
    },
  ];

  const allCategories = [
    "all",
    ...aiToolkit.map((section) => section.category),
  ];

  const filteredTools = aiToolkit
    .filter((section) => {
      if (selectedCategory === "all") return true;
      return section.category === selectedCategory;
    })
    .map((section) => ({
      ...section,
      tools: section.tools.filter(
        (tool) =>
          tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((section) => section.tools.length > 0);

  const openTool = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <AppLayout onUpgradeRequest={handleUpgradeRequest}>
      <div className="container mx-auto px-8 py-5">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-black">
              <Wrench className="h-8 w-8 text-neon-orange" />
            </div>
            <h1 className="text-6xl font-black text-black retro-text">
              AI TOOLKIT
            </h1>
          </div>
          <p className="text-xl font-bold text-black/80 max-w-2xl mx-auto">
            Curated database of the best AI tools for creative professionals
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="bg-black border-4 border-black">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cream/50 h-4 w-4" />
                    <Input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search tools..."
                      className="pl-10 bg-black/50 border-cream/20 text-cream placeholder:text-cream/50"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="text-cream h-4 w-4" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-black border-2 border-cream/20 text-cream rounded-lg px-3 py-2 font-bold"
                  >
                    {allCategories.map((category) => (
                      <option key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tools Grid */}
        <div className="max-w-6xl mx-auto space-y-8">
          {filteredTools.map((section, sectionIndex) => (
            <Card key={sectionIndex} className="bg-black border-4 border-black">
              <CardHeader>
                <CardTitle className="text-2xl font-black text-cream">
                  {section.category}
                </CardTitle>
                <Badge className="bg-neon-orange text-black font-bold text-xs w-fit">
                  {section.tools.length} Tools
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {section.tools.map((tool, toolIndex) => (
                    <Card
                      key={toolIndex}
                      className="bg-black/50 border-2 border-cream/20 hover:border-neon-orange transition-colors duration-200"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-lg font-black text-cream">
                            {tool.name}
                          </h3>
                          <Button
                            onClick={() => openTool(tool.url)}
                            size="sm"
                            className="bg-neon-orange border-2 border-neon-orange text-black font-bold hover:bg-black hover:text-neon-orange"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-cream/80 text-sm leading-relaxed">
                          {tool.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredTools.length === 0 && (
          <div className="text-center mt-12">
            <Card className="bg-black border-4 border-black max-w-md mx-auto">
              <CardContent className="p-8">
                <p className="text-cream font-bold text-lg mb-2">
                  No tools found
                </p>
                <p className="text-cream/80 text-sm">
                  Try adjusting your search or filter criteria
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Submit Tool CTA */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="bg-black border-4 border-black">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-black text-cream mb-4">
                Know a Great AI Tool?
              </h2>
              <p className="text-cream/80 mb-6">
                Help us expand our toolkit by suggesting new AI tools for the
                community
              </p>
              <Button className="bg-neon-orange border-2 border-neon-orange text-black font-bold hover:bg-black hover:text-neon-orange">
                Suggest a Tool
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
