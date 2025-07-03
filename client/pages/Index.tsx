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
    // Temporarily disabled to show landing page
    // const access = localStorage.getItem("toolkitAccess");
    // if (access === "true") {
    //   setHasAccess(true);
    // }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Store access status
      localStorage.setItem("toolkitAccess", "true");
      localStorage.setItem("userEmail", email);
      setHasAccess(true);
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
    window.location.href = "/";
  };

  const resetAccess = () => {
    localStorage.removeItem("toolkitAccess");
    localStorage.removeItem("userEmail");
    setHasAccess(false);
  };

  // Show landing page paywall if user doesn't have access
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-neon-orange">
        {/* Header */}
        <div className="text-center pt-8 pb-5">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F326314a2e8634f90977b83f81df01501%2F9a6248f59e554d6eb22258a507dde681?format=webp&width=800"
            alt="Overnight Success"
            className="h-12 w-auto mx-auto mb-6"
          />
          <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-4xl md:text-6xl font-black text-black mb-4 leading-tight">
              The Ultimate AI Toolkit
            </h1>
            <p className="text-xl text-black font-bold mb-8 max-w-2xl mx-auto">
              Access 30+ premium AI tools in one curated collection. Video,
              images, text, audio, and design tools.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 pb-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Email Collection */}
            <div className="lg:order-2">
              <div className="bg-black rounded-2xl p-8 max-w-md mx-auto">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-black text-neon-orange mb-2">
                    🚀 Get Instant Access
                  </h2>
                  <p className="text-cream font-medium">
                    Enter your email to unlock all 30+ AI tools
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-cream text-black rounded-lg font-medium text-center placeholder-black/60 focus:outline-none focus:ring-2 focus:ring-neon-orange"
                    placeholder="Enter your email address"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || !email}
                    className="w-full bg-neon-orange text-black font-bold py-3 rounded-lg hover:bg-orange-400 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent mr-2 inline-block" />
                        Unlocking Access...
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4 mr-2 inline" />
                        UNLOCK TOOLKIT
                      </>
                    )}
                  </button>
                </form>

                <div className="text-center mt-4">
                  <p className="text-cream text-xs">
                    ✓ Free access ✓ No credit card required ✓ Instant unlock
                  </p>
                </div>

                {/* Value Props */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center text-cream text-sm">
                    <Video className="h-4 w-4 text-neon-orange mr-3 shrink-0" />
                    <span>6 AI Video Generation Tools</span>
                  </div>
                  <div className="flex items-center text-cream text-sm">
                    <Image className="h-4 w-4 text-neon-orange mr-3 shrink-0" />
                    <span>6 AI Image Creation Tools</span>
                  </div>
                  <div className="flex items-center text-cream text-sm">
                    <FileText className="h-4 w-4 text-neon-orange mr-3 shrink-0" />
                    <span>6 AI Text Writing Tools</span>
                  </div>
                  <div className="flex items-center text-cream text-sm">
                    <Mic className="h-4 w-4 text-neon-orange mr-3 shrink-0" />
                    <span>6 AI Audio Production Tools</span>
                  </div>
                  <div className="flex items-center text-cream text-sm">
                    <Palette className="h-4 w-4 text-neon-orange mr-3 shrink-0" />
                    <span>6 AI Design Tools</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Tool Preview Grid */}
            <div className="lg:order-1">
              <h3 className="text-2xl font-bold text-black mb-6 text-center lg:text-left">
                What's Inside:
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "Video Generators",
                  "AI Editors",
                  "Text-to-Video",
                  "Image Creation",
                  "Art Generation",
                  "Style Transfer",
                  "Writing Assistants",
                  "Content Tools",
                  "Research AI",
                  "Voice Synthesis",
                  "Audio Editing",
                  "Music Creation",
                  "Design Tools",
                  "UI Generators",
                  "Creative Suite",
                  "Visual AI",
                  "Animation Tools",
                  "Media Creation",
                ].map((tool, i) => (
                  <div
                    key={i}
                    className="bg-black/10 border-2 border-black/20 rounded-lg p-3 text-center backdrop-blur-sm"
                  >
                    <span className="text-sm font-bold text-black">{tool}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center lg:text-left">
                <p className="text-black font-bold mb-2">
                  Join thousands of creators worldwide
                </p>
                <p className="text-black/80 text-sm">
                  Access premium AI tools in one curated collection
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="bg-black/10 py-8 text-center">
          <p className="text-black font-medium">
            Ready to transform your creative workflow?
            <span className="font-bold"> Get instant access above ↑</span>
          </p>
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
