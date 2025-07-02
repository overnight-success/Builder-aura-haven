import React from "react";
import {
  ExternalLink,
  Video,
  Image,
  Wand2,
  Mic,
  FileText,
  Palette,
} from "lucide-react";

const aiTools = [
  {
    name: "SORA by OpenAI",
    description: "Advanced AI video generation with text-to-video capabilities",
    url: "https://openai.com/sora",
    category: "AI Video Generation",
    icon: <Video className="h-6 w-6" />,
  },
  {
    name: "Runway ML",
    description: "Creative AI video tools for filmmakers and content creators",
    url: "https://runwayml.com",
    category: "AI Video Generation",
    icon: <Video className="h-6 w-6" />,
  },
  {
    name: "Pika Labs",
    description: "AI video creation platform with text and image inputs",
    url: "https://pika.art",
    category: "AI Video Generation",
    icon: <Video className="h-6 w-6" />,
  },
  {
    name: "Stable Video Diffusion",
    description: "Open-source video generation model by Stability AI",
    url: "https://stability.ai/news/stable-video-diffusion-open-ai-video-model",
    category: "AI Video Generation",
    icon: <Video className="h-6 w-6" />,
  },
  {
    name: "Synthesia",
    description: "AI video generation with virtual avatars and voiceovers",
    url: "https://synthesia.io",
    category: "AI Video Generation",
    icon: <Mic className="h-6 w-6" />,
  },
  {
    name: "InVideo AI",
    description: "AI-powered video creation and editing platform",
    url: "https://invideo.io",
    category: "AI Video Generation",
    icon: <Video className="h-6 w-6" />,
  },
  {
    name: "DALL-E 3",
    description: "Advanced AI image generation from OpenAI",
    url: "https://openai.com/dall-e-3",
    category: "AI Image Generation",
    icon: <Image className="h-6 w-6" />,
  },
  {
    name: "Midjourney",
    description: "High-quality AI art and image generation",
    url: "https://midjourney.com",
    category: "AI Image Generation",
    icon: <Palette className="h-6 w-6" />,
  },
  {
    name: "ChatGPT",
    description: "Advanced AI language model for text generation",
    url: "https://chat.openai.com",
    category: "AI Text Generation",
    icon: <FileText className="h-6 w-6" />,
  },
  {
    name: "Claude",
    description: "Advanced AI assistant for analysis and creative work",
    url: "https://claude.ai",
    category: "AI Text Generation",
    icon: <Wand2 className="h-6 w-6" />,
  },
];

const categories = [
  {
    name: "AI Video Generation",
    tools: aiTools.filter((tool) => tool.category === "AI Video Generation"),
  },
  {
    name: "AI Image Generation",
    tools: aiTools.filter((tool) => tool.category === "AI Image Generation"),
  },
  {
    name: "AI Text Generation",
    tools: aiTools.filter((tool) => tool.category === "AI Text Generation"),
  },
];

export default function Index() {
  const openTool = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">AI Toolkit</h1>
          <p className="text-gray-400 text-lg">
            Essential tools and resources for AI-powered creative work
          </p>
        </div>

        {/* Categories */}
        {categories.map((category) => (
          <div key={category.name} className="mb-12">
            <div className="flex items-center mb-6">
              <Video className="h-6 w-6 text-red-500 mr-3" />
              <h2 className="text-2xl font-bold">{category.name}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.tools.map((tool) => (
                <div
                  key={tool.name}
                  onClick={() => openTool(tool.url)}
                  className="bg-gray-900 border border-gray-700 rounded-lg p-6 cursor-pointer hover:border-gray-500 hover:bg-gray-800 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="text-white mr-3">{tool.icon}</div>
                      <h3 className="text-lg font-semibold text-white">
                        {tool.name}
                      </h3>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
