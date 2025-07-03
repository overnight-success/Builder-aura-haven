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
  const [showToolkit, setShowToolkit] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if user has already unlocked
  useEffect(() => {
    const hasAccess = localStorage.getItem("toolkitAccess");
    if (hasAccess === "true") {
      setShowToolkit(true);
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
      <div className="min-h-screen bg-neon-orange">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F326314a2e8634f90977b83f81df01501%2F9a6248f59e554d6eb22258a507dde681?format=webp&width=800"
                alt="Overnight Success Logo"
                className="h-16 w-auto"
              />
            </div>

            {/* Hero Content */}
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-black text-black mb-6 leading-tight">
                The Ultimate
                <span className="block">AI Toolkit</span>
              </h1>
              <p className="text-xl md:text-2xl text-black font-bold mb-4 max-w-4xl mx-auto leading-relaxed">
                Access 30+ premium AI tools in one place. Video generation,
                image creation, text writing, audio production, and design
                tools.
              </p>
              <p className="text-lg text-black font-medium mb-12 max-w-2xl mx-auto">
                Everything you need to dominate the AI creative landscape
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16 max-w-4xl mx-auto">
                <div className="bg-black/10 backdrop-blur-sm rounded-lg p-4 border-2 border-black/20">
                  <Video className="h-8 w-8 text-black mx-auto mb-2" />
                  <h3 className="font-bold text-black text-sm">AI Video</h3>
                  <p className="text-xs text-black/80">6 Tools</p>
                </div>
                <div className="bg-black/10 backdrop-blur-sm rounded-lg p-4 border-2 border-black/20">
                  <Image className="h-8 w-8 text-black mx-auto mb-2" />
                  <h3 className="font-bold text-black text-sm">AI Image</h3>
                  <p className="text-xs text-black/80">6 Tools</p>
                </div>
                <div className="bg-black/10 backdrop-blur-sm rounded-lg p-4 border-2 border-black/20">
                  <FileText className="h-8 w-8 text-black mx-auto mb-2" />
                  <h3 className="font-bold text-black text-sm">AI Text</h3>
                  <p className="text-xs text-black/80">6 Tools</p>
                </div>
                <div className="bg-black/10 backdrop-blur-sm rounded-lg p-4 border-2 border-black/20">
                  <Mic className="h-8 w-8 text-black mx-auto mb-2" />
                  <h3 className="font-bold text-black text-sm">AI Audio</h3>
                  <p className="text-xs text-black/80">6 Tools</p>
                </div>
                <div className="bg-black/10 backdrop-blur-sm rounded-lg p-4 border-2 border-black/20">
                  <Palette className="h-8 w-8 text-black mx-auto mb-2" />
                  <h3 className="font-bold text-black text-sm">AI Design</h3>
                  <p className="text-xs text-black/80">6 Tools</p>
                </div>
              </div>

              {/* Email Capture */}
              <div className="max-w-md mx-auto">
                <div className="bg-black rounded-xl p-8 border-4 border-black shadow-2xl">
                  <h2 className="text-2xl font-black text-neon-orange mb-2">
                    🚀 Unlock Instant Access
                  </h2>
                  <p className="text-cream font-bold mb-6 text-sm">
                    Enter your email to access all 30+ AI tools
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-cream text-black border-2 border-cream rounded-lg focus:outline-none focus:border-neon-orange transition-colors font-bold text-center placeholder-black/60"
                        placeholder="Enter your email address"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || !email}
                      className="w-full bg-neon-orange text-black hover:bg-cream border-2 border-neon-orange font-black py-3 text-lg rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent mr-2 inline-block" />
                          UNLOCKING...
                        </>
                      ) : (
                        <>
                          <Zap className="h-5 w-5 mr-2 inline" />
                          UNLOCK AI TOOLKIT
                        </>
                      )}
                    </button>
                  </form>

                  <div className="text-center mt-4">
                    <p className="text-cream text-xs">
                      Free access • No credit card required • Instant unlock
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="text-center">
              <p className="text-black font-bold text-sm mb-4">
                Trusted by 10,000+ creators and entrepreneurs
              </p>
              <div className="flex justify-center items-center space-x-6 opacity-60">
                <div className="bg-black/20 px-4 py-2 rounded-lg">
                  <span className="text-black font-bold text-xs">SORA</span>
                </div>
                <div className="bg-black/20 px-4 py-2 rounded-lg">
                  <span className="text-black font-bold text-xs">
                    MIDJOURNEY
                  </span>
                </div>
                <div className="bg-black/20 px-4 py-2 rounded-lg">
                  <span className="text-black font-bold text-xs">CHATGPT</span>
                </div>
                <div className="bg-black/20 px-4 py-2 rounded-lg">
                  <span className="text-black font-bold text-xs">CLAUDE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
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
