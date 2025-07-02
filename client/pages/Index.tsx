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
    <div className="min-h-screen bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-black border border-gray-600 rounded-2xl max-w-4xl w-full p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">AI Toolkit</h1>
          <p className="text-gray-400">
            Essential tools and resources for AI-powered creative work
          </p>
        </div>

        {/* AI Video Generation Section */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <Video className="h-5 w-5 text-red-500 mr-3" />
            <h2 className="text-xl font-bold text-white">
              AI Video Generation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories[0].tools.map((tool) => (
              <div
                key={tool.name}
                onClick={() => openTool(tool.url)}
                className="bg-gray-900 border border-gray-700 rounded-lg p-4 cursor-pointer hover:border-gray-500 hover:bg-gray-800 transition-all duration-200"
              >
                <div className="mb-3">
                  <h3 className="text-white font-semibold mb-1">{tool.name}</h3>
                  <p className="text-gray-400 text-sm">{tool.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Image Generation Section */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <Image className="h-5 w-5 text-blue-500 mr-3" />
            <h2 className="text-xl font-bold text-white">
              AI Image Generation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories[1].tools.map((tool) => (
              <div
                key={tool.name}
                onClick={() => openTool(tool.url)}
                className="bg-gray-900 border border-gray-700 rounded-lg p-4 cursor-pointer hover:border-gray-500 hover:bg-gray-800 transition-all duration-200"
              >
                <div className="mb-3">
                  <h3 className="text-white font-semibold mb-1">{tool.name}</h3>
                  <p className="text-gray-400 text-sm">{tool.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Text Generation Section */}
        <div>
          <div className="flex items-center mb-6">
            <FileText className="h-5 w-5 text-green-500 mr-3" />
            <h2 className="text-xl font-bold text-white">AI Text Generation</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories[2].tools.map((tool) => (
              <div
                key={tool.name}
                onClick={() => openTool(tool.url)}
                className="bg-gray-900 border border-gray-700 rounded-lg p-4 cursor-pointer hover:border-gray-500 hover:bg-gray-800 transition-all duration-200"
              >
                <div className="mb-3">
                  <h3 className="text-white font-semibold mb-1">{tool.name}</h3>
                  <p className="text-gray-400 text-sm">{tool.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
