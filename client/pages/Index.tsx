import React, { useState, useEffect } from "react";
import {
  ExternalLink,
  Video,
  Image,
  Wand2,
  Mic,
  FileText,
  Palette,
  Mail,
  User,
  Zap,
} from "lucide-react";

export default function Index() {
  const [hasAccess, setHasAccess] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if user has already unlocked
  useEffect(() => {
    const access = localStorage.getItem("toolkitAccess");
    if (access === "true") {
      setHasAccess(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    try {
      // Store access status
      localStorage.setItem("toolkitAccess", "true");
      localStorage.setItem("userEmail", email);
      setShowToolkit(true);
    } catch (error) {
      console.error("Access error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openTool = (url: string) => {
    window.open(url, "_blank");
  };

  const goToMainApp = () => {
    // Clear the toolkit access and redirect to main app
    localStorage.removeItem("toolkitAccess");
    window.location.href = "/";
  };

  // Show sleek landing page if user hasn't unlocked
  if (!showToolkit) {
    return (
      <div className="min-h-screen bg-black text-white">
        {/* Navigation */}
        <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F326314a2e8634f90977b83f81df01501%2F9a6248f59e554d6eb22258a507dde681?format=webp&width=800"
            alt="Overnight Success"
            className="h-8 w-auto"
          />
          <button
            onClick={goToMainApp}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Back to App
          </button>
        </nav>

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-neon-orange/10 border border-neon-orange/20 rounded-full px-4 py-2 mb-8">
            <Zap className="h-4 w-4 text-neon-orange" />
            <span className="text-sm font-medium text-neon-orange">
              30+ Premium AI Tools
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            Your Complete
            <span className="text-neon-orange block">AI Arsenal</span>
          </h1>

          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Video, images, text, audio, and design. Everything you need to
            create with AI in one curated collection.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mb-16 max-w-lg mx-auto">
            <div>
              <div className="text-3xl font-black text-white mb-1">30+</div>
              <div className="text-sm text-gray-500">AI Tools</div>
            </div>
            <div>
              <div className="text-3xl font-black text-white mb-1">5</div>
              <div className="text-sm text-gray-500">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-black text-white mb-1">Free</div>
              <div className="text-sm text-gray-500">Access</div>
            </div>
          </div>

          {/* Email Form */}
          <div className="max-w-sm mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-4 bg-gray-900 border border-gray-800 rounded-xl focus:outline-none focus:border-neon-orange transition-colors text-white placeholder-gray-500"
                placeholder="Enter your email"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting || !email}
                className="w-full bg-neon-orange text-black font-bold py-4 rounded-xl hover:bg-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent mr-2 inline-block" />
                    Getting Access...
                  </>
                ) : (
                  "Get Instant Access"
                )}
              </button>
            </form>
            <p className="text-xs text-gray-600 mt-3">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Tools Preview */}
        <div className="max-w-6xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { icon: Video, name: "Video AI", tools: "6 tools" },
              { icon: Image, name: "Image AI", tools: "6 tools" },
              { icon: FileText, name: "Text AI", tools: "6 tools" },
              { icon: Mic, name: "Audio AI", tools: "6 tools" },
              { icon: Palette, name: "Design AI", tools: "6 tools" },
            ].map((category, i) => (
              <div
                key={i}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-center hover:border-gray-700 transition-colors"
              >
                <category.icon className="h-6 w-6 text-gray-400 mx-auto mb-3" />
                <h3 className="font-medium text-white text-sm mb-1">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-500">{category.tools}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-900 py-8">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-gray-600 text-sm">
              Trusted by creators worldwide • Built by Overnight Success
            </p>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neon-orange p-3">
      <img
        src="https://cdn.builder.io/api/v1/image/assets%2F326314a2e8634f90977b83f81df01501%2F9a6248f59e554d6eb22258a507dde681?format=webp&width=800"
        alt="Overnight Success Logo"
        className="h-14 w-auto block"
      />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-3 pt-1.5">
          <div className="flex items-center justify-center mb-4"></div>
          <h1 className="text-4xl font-black text-black mb-1">AI Toolkit</h1>
          <p className="text-black font-bold text-sm">
            Essential tools and resources for AI-powered creative work
          </p>
        </div>

        {/* AI Video Generation Section */}
        <div className="bg-black border-2 border-black rounded-lg p-4 mb-4">
          <div className="flex items-center mb-4">
            <Video className="h-4 w-4 text-neon-orange mr-2" />
            <h2 className="text-lg font-bold text-cream">
              AI Video Generation
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div
              onClick={() => openTool("https://openai.com/sora")}
              className="bg-black border-2 border-neon-orange rounded-lg p-3 cursor-pointer hover:bg-gray-900 transition-all duration-200"
            >
              <h3 className="text-neon-orange font-bold mb-1 text-sm">
                SORA by OpenAI
              </h3>
              <p className="text-white text-xs">
                Advanced AI video generation with text-to-video capabilities
              </p>
            </div>

            <div
              onClick={() => openTool("https://runwayml.com")}
              className="bg-black border-2 border-neon-orange rounded-lg p-3 cursor-pointer hover:bg-gray-900 transition-all duration-200"
            >
              <h3 className="text-neon-orange font-bold mb-1 text-sm">
                Runway ML
              </h3>
              <p className="text-white text-xs">
                Creative AI video tools for filmmakers and content creators
              </p>
            </div>

            <div
              onClick={() => openTool("https://pika.art")}
              className="bg-black border-2 border-neon-orange rounded-lg p-3 cursor-pointer hover:bg-gray-900 transition-all duration-200"
            >
              <h3 className="text-neon-orange font-bold mb-1 text-sm">
                Pika Labs
              </h3>
              <p className="text-white text-xs">
                AI video creation platform with text and image inputs
              </p>
            </div>

            <div
              onClick={() =>
                openTool(
                  "https://stability.ai/news/stable-video-diffusion-open-ai-video-model",
                )
              }
              className="bg-black border-2 border-neon-orange rounded-lg p-3 cursor-pointer hover:bg-gray-900 transition-all duration-200"
            >
              <h3 className="text-neon-orange font-bold mb-1 text-sm">
                Stable Video Diffusion
              </h3>
              <p className="text-white text-xs">
                Open-source video generation model by Stability AI
              </p>
            </div>

            <div
              onClick={() => openTool("https://synthesia.io")}
              className="bg-black border-2 border-neon-orange rounded-lg p-3 cursor-pointer hover:bg-gray-900 transition-all duration-200"
            >
              <h3 className="text-neon-orange font-bold mb-1 text-sm">
                Synthesia
              </h3>
              <p className="text-white text-xs">
                AI video generation with virtual avatars and voiceovers
              </p>
            </div>

            <div
              onClick={() => openTool("https://invideo.io")}
              className="bg-black border-2 border-neon-orange rounded-lg p-3 cursor-pointer hover:bg-gray-900 transition-all duration-200"
            >
              <h3 className="text-neon-orange font-bold mb-1 text-sm">
                InVideo AI
              </h3>
              <p className="text-white text-xs">
                AI-powered video creation and editing platform
              </p>
            </div>
          </div>
        </div>

        {/* AI Image Generation Section */}
        <div className="bg-black border-2 border-black rounded-lg p-4 mb-4">
          <div className="flex items-center mb-4">
            <Image className="h-4 w-4 text-neon-orange mr-2" />
            <h2 className="text-lg font-bold text-cream">
              AI Image Generation
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div
              onClick={() => openTool("https://openai.com/dall-e-3")}
              className="bg-black border-2 border-neon-orange rounded-lg p-3 cursor-pointer hover:bg-gray-900 transition-all duration-200"
            >
              <h3 className="text-neon-orange font-bold mb-1 text-sm">
                DALL-E 3
              </h3>
              <p className="text-white text-xs">
                Advanced AI image generation from OpenAI
              </p>
            </div>

            <div
              onClick={() => openTool("https://midjourney.com")}
              className="bg-black border-2 border-neon-orange rounded-lg p-3 cursor-pointer hover:bg-gray-900 transition-all duration-200"
            >
              <h3 className="text-neon-orange font-bold mb-1 text-sm">
                Midjourney
              </h3>
              <p className="text-white text-xs">
                High-quality AI art and image generation
              </p>
            </div>

            <div
              onClick={() => openTool("https://stability.ai/stable-diffusion")}
              className="bg-black border-2 border-neon-orange rounded-lg p-3 cursor-pointer hover:bg-gray-900 transition-all duration-200"
            >
              <h3 className="text-neon-orange font-bold mb-1 text-sm">
                Stable Diffusion
              </h3>
              <p className="text-white text-xs">
                Open-source AI image generation
              </p>
            </div>

            <div
              onClick={() => openTool("https://leonardo.ai")}
              className="bg-black border-2 border-neon-orange rounded-lg p-3 cursor-pointer hover:bg-gray-900 transition-all duration-200"
            >
              <h3 className="text-neon-orange font-bold mb-1 text-sm">
                Leonardo.AI
              </h3>
              <p className="text-white text-xs">
                Professional AI image generation platform
              </p>
            </div>

            <div
              onClick={() => openTool("https://ideogram.ai")}
              className="bg-black border-2 border-neon-orange rounded-lg p-3 cursor-pointer hover:bg-gray-900 transition-all duration-200"
            >
              <h3 className="text-neon-orange font-bold mb-1 text-sm">
                Ideogram
              </h3>
              <p className="text-white text-xs">
                AI image generation with text rendering
              </p>
            </div>

            <div
              onClick={() => openTool("https://firefly.adobe.com")}
              className="bg-black border-2 border-neon-orange rounded-lg p-3 cursor-pointer hover:bg-gray-900 transition-all duration-200"
            >
              <h3 className="text-neon-orange font-bold mb-1 text-sm">
                Adobe Firefly
              </h3>
              <p className="text-white text-xs">Creative AI tools from Adobe</p>
            </div>
          </div>
        </div>

        {/* AI Text Generation Section */}
        <div className="bg-black border-2 border-black rounded-lg p-4 mb-4">
          <div className="flex items-center mb-4">
            <FileText className="h-4 w-4 text-neon-orange mr-2" />
            <h2 className="text-lg font-bold text-cream">AI Text Generation</h2>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div
              onClick={() => openTool("https://chat.openai.com")}
              className="bg-black border-2 border-neon-orange rounded-lg p-3 cursor-pointer hover:bg-gray-900 transition-all duration-200"
            >
              <h3 className="text-neon-orange font-bold mb-1 text-sm">
                ChatGPT
              </h3>
              <p className="text-white text-xs">
                Advanced AI language model for text generation
              </p>
            </div>

            <div
              onClick={() => openTool("https://claude.ai")}
              className="bg-black border-2 border-neon-orange rounded-lg p-3 cursor-pointer hover:bg-gray-900 transition-all duration-200"
            >
              <h3 className="text-neon-orange font-bold mb-1 text-sm">
                Claude
              </h3>
              <p className="text-white text-xs">
                Advanced AI assistant for analysis and creative work
              </p>
            </div>

            <div
              onClick={() => openTool("https://gemini.google.com")}
              className="bg-black border-2 border-neon-orange rounded-lg p-3 cursor-pointer hover:bg-gray-900 transition-all duration-200"
            >
              <h3 className="text-neon-orange font-bold mb-1 text-sm">
                Gemini
              </h3>
              <p className="text-white text-xs">
                Google's advanced AI language model
              </p>
            </div>

            <div
              onClick={() => openTool("https://copilot.microsoft.com")}
              className="bg-black border-2 border-neon-orange rounded-lg p-3 cursor-pointer hover:bg-gray-900 transition-all duration-200"
            >
              <h3 className="text-neon-orange font-bold mb-1 text-sm">
                Copilot
              </h3>
              <p className="text-white text-xs">
                Microsoft's AI assistant and creative companion
              </p>
            </div>

            <div
              onClick={() => openTool("https://perplexity.ai")}
              className="bg-black border-2 border-neon-orange rounded-lg p-3 cursor-pointer hover:bg-gray-900 transition-all duration-200"
            >
              <h3 className="text-neon-orange font-bold mb-1 text-sm">
                Perplexity
              </h3>
              <p className="text-white text-xs">
                AI-powered research and answer engine
              </p>
            </div>

            <div
              onClick={() => openTool("https://writesonic.com")}
              className="bg-black border-2 border-neon-orange rounded-lg p-3 cursor-pointer hover:bg-gray-900 transition-all duration-200"
            >
              <h3 className="text-neon-orange font-bold mb-1 text-sm">
                Writesonic
              </h3>
              <p className="text-white text-xs">
                AI writing and content creation platform
              </p>
            </div>
          </div>
        </div>

        {/* AI Audio Generation Section */}
        <div className="bg-black border-2 border-black rounded-lg p-4 mb-4">
          <div className="flex items-center mb-4">
            <Mic className="h-4 w-4 text-neon-orange mr-2" />
            <h2 className="text-lg font-bold text-cream">
              AI Audio Generation
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div
              onClick={() => openTool("https://elevenlabs.io")}
              className="bg-black border-2 border-neon-orange rounded-lg p-3 cursor-pointer hover:bg-gray-900 transition-all duration-200"
            >
              <h3 className="text-neon-orange font-bold mb-1 text-sm">
                ElevenLabs
              </h3>
              <p className="text-white text-xs">
                Advanced AI voice synthesis and cloning
              </p>
            </div>

            <div
              onClick={() => openTool("https://murf.ai")}
              className="bg-black border-2 border-neon-orange rounded-lg p-3 cursor-pointer hover:bg-gray-900 transition-all duration-200"
            >
              <h3 className="text-neon-orange font-bold mb-1 text-sm">
                Murf.AI
              </h3>
              <p className="text-white text-xs">
                AI voiceover and text-to-speech platform
              </p>
            </div>

            <div
              onClick={() => openTool("https://suno.ai")}
              className="bg-black border-2 border-neon-orange rounded-lg p-3 cursor-pointer hover:bg-gray-900 transition-all duration-200"
            >
              <h3 className="text-neon-orange font-bold mb-1 text-sm">Suno</h3>
              <p className="text-white text-xs">
                AI music and song generation platform
              </p>
            </div>

            <div
              onClick={() => openTool("https://udio.com")}
              className="bg-black border-2 border-neon-orange rounded-lg p-3 cursor-pointer hover:bg-gray-900 transition-all duration-200"
            >
              <h3 className="text-neon-orange font-bold mb-1 text-sm">Udio</h3>
              <p className="text-white text-xs">
                AI music creation and generation
              </p>
            </div>

            <div
              onClick={() => openTool("https://speechify.com")}
              className="bg-black border-2 border-neon-orange rounded-lg p-3 cursor-pointer hover:bg-gray-900 transition-all duration-200"
            >
              <h3 className="text-neon-orange font-bold mb-1 text-sm">
                Speechify
              </h3>
              <p className="text-white text-xs">
                AI text-to-speech and voice generation
              </p>
            </div>

            <div
              onClick={() => openTool("https://podcast.adobe.com")}
              className="bg-black border-2 border-neon-orange rounded-lg p-3 cursor-pointer hover:bg-gray-900 transition-all duration-200"
            >
              <h3 className="text-neon-orange font-bold mb-1 text-sm">
                Adobe Podcast
              </h3>
              <p className="text-white text-xs">
                AI-powered audio enhancement and recording
              </p>
            </div>
          </div>
        </div>

        {/* AI Design Tools Section */}
        <div className="bg-black border-2 border-black rounded-lg p-4 mb-4">
          <div className="flex items-center mb-4">
            <Palette className="h-4 w-4 text-neon-orange mr-2" />
            <h2 className="text-lg font-bold text-cream">AI Design Tools</h2>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div
              onClick={() => openTool("https://www.figma.com")}
              className="bg-black border-2 border-neon-orange rounded-lg p-3 cursor-pointer hover:bg-gray-900 transition-all duration-200"
            >
              <h3 className="text-neon-orange font-bold mb-1 text-sm">
                Figma AI
              </h3>
              <p className="text-white text-xs">
                AI-powered design and prototyping
              </p>
            </div>

            <div
              onClick={() => openTool("https://www.canva.com")}
              className="bg-black border-2 border-neon-orange rounded-lg p-3 cursor-pointer hover:bg-gray-900 transition-all duration-200"
            >
              <h3 className="text-neon-orange font-bold mb-1 text-sm">
                Canva AI
              </h3>
              <p className="text-white text-xs">
                AI design assistant for graphics
              </p>
            </div>

            <div
              onClick={() => openTool("https://designer.microsoft.com")}
              className="bg-black border-2 border-neon-orange rounded-lg p-3 cursor-pointer hover:bg-gray-900 transition-all duration-200"
            >
              <h3 className="text-neon-orange font-bold mb-1 text-sm">
                Microsoft Designer
              </h3>
              <p className="text-white text-xs">
                AI-powered design creation tool
              </p>
            </div>

            <div
              onClick={() => openTool("https://gamma.app")}
              className="bg-black border-2 border-neon-orange rounded-lg p-3 cursor-pointer hover:bg-gray-900 transition-all duration-200"
            >
              <h3 className="text-neon-orange font-bold mb-1 text-sm">Gamma</h3>
              <p className="text-white text-xs">
                AI presentation and document creation
              </p>
            </div>

            <div
              onClick={() => openTool("https://www.framer.com")}
              className="bg-black border-2 border-neon-orange rounded-lg p-3 cursor-pointer hover:bg-gray-900 transition-all duration-200"
            >
              <h3 className="text-neon-orange font-bold mb-1 text-sm">
                Framer AI
              </h3>
              <p className="text-white text-xs">
                AI website and app design platform
              </p>
            </div>

            <div
              onClick={() => openTool("https://beautiful.ai")}
              className="bg-black border-2 border-neon-orange rounded-lg p-3 cursor-pointer hover:bg-gray-900 transition-all duration-200"
            >
              <h3 className="text-neon-orange font-bold mb-1 text-sm">
                Beautiful.AI
              </h3>
              <p className="text-white text-xs">
                AI-powered presentation design
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div
          onClick={goToMainApp}
          className="bg-black border-2 border-black rounded-lg p-4 cursor-pointer hover:bg-gray-900 transition-all duration-200 text-center"
        >
          <h2 className="text-2xl font-black text-neon-orange mb-2">
            🎯 Ready to Create? Unlock Our AI Creative System Today
          </h2>
          <p className="text-cream font-bold mb-3">
            Join thousands using our advanced prompt generation system for Sora
            AI
          </p>
          <div className="bg-neon-orange text-black font-black py-2 px-4 rounded-lg inline-block hover:bg-cream transition-colors text-sm">
            ACCESS THE FULL SYSTEM →
          </div>
        </div>
      </div>
    </div>
  );
}
