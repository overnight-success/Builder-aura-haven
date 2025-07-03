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
  const [showSignupWall, setShowSignupWall] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if user has already signed up
  useEffect(() => {
    const hasSignedUp = localStorage.getItem("userSignedUp");
    if (hasSignedUp === "true") {
      setShowSignupWall(false);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    setIsSubmitting(true);

    try {
      // Store signup status
      localStorage.setItem("userSignedUp", "true");
      localStorage.setItem("userEmail", email);
      setShowSignupWall(false);
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openTool = (url: string) => {
    window.open(url, "_blank");
  };

  const goToMainApp = () => {
    // Clear the signup wall and redirect to main app
    localStorage.removeItem("userSignedUp");
    window.location.href = "/";
  };

  // Show signup wall if user hasn't signed up
  if (showSignupWall) {
    return (
      <div className="min-h-screen bg-neon-orange flex items-center justify-center p-4">
        <div className="bg-black border-4 border-black rounded-lg max-w-md w-full p-8">
          {/* Logo */}
          <div className="flex items-center justify-center mb-6">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F326314a2e8634f90977b83f81df01501%2F9a6248f59e554d6eb22258a507dde681?format=webp&width=800"
              alt="Overnight Success Logo"
              className="h-16 w-auto"
            />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-cream mb-2">
              Access AI Toolkit
            </h1>
            <p className="text-cream">
              Get instant access to 36+ AI tools for creative work
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-cream font-bold text-sm mb-2">
                <User className="h-4 w-4 inline mr-2" />
                Full Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-cream text-black border-2 border-cream rounded-lg focus:outline-none focus:border-neon-orange transition-colors font-medium"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-cream font-bold text-sm mb-2">
                <Mail className="h-4 w-4 inline mr-2" />
                Email Address *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-cream text-black border-2 border-cream rounded-lg focus:outline-none focus:border-neon-orange transition-colors font-medium"
                placeholder="Enter your email"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !email || !name}
              className="w-full bg-cream text-black hover:bg-white border-2 border-cream font-bold py-3 text-lg mt-6 rounded-lg transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent mr-2 inline-block" />
                  Getting Access...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2 inline" />
                  GET INSTANT ACCESS
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-cream text-xs">
              Join thousands changing their lives with next-level AI creative
              tools
            </p>
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

        {/* AI Code Generation Section */}
        <div className="bg-black border-2 border-black rounded-lg p-4 mb-4">
          <div className="flex items-center mb-4">
            <Wand2 className="h-4 w-4 text-neon-orange mr-2" />
            <h2 className="text-lg font-bold text-cream">AI Code Generation</h2>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div
              onClick={() => openTool("https://github.com/features/copilot")}
              className="bg-black border-2 border-neon-orange rounded-lg p-3 cursor-pointer hover:bg-gray-900 transition-all duration-200"
            >
              <h3 className="text-neon-orange font-bold mb-1 text-sm">
                GitHub Copilot
              </h3>
              <p className="text-white text-xs">
                AI pair programmer for code completion
              </p>
            </div>

            <div
              onClick={() => openTool("https://cursor.sh")}
              className="bg-black border-2 border-neon-orange rounded-lg p-3 cursor-pointer hover:bg-gray-900 transition-all duration-200"
            >
              <h3 className="text-neon-orange font-bold mb-1 text-sm">
                Cursor
              </h3>
              <p className="text-white text-xs">
                AI-powered code editor and IDE
              </p>
            </div>

            <div
              onClick={() => openTool("https://codeium.com")}
              className="bg-black border-2 border-neon-orange rounded-lg p-3 cursor-pointer hover:bg-gray-900 transition-all duration-200"
            >
              <h3 className="text-neon-orange font-bold mb-1 text-sm">
                Codeium
              </h3>
              <p className="text-white text-xs">
                Free AI code completion and chat
              </p>
            </div>

            <div
              onClick={() => openTool("https://replit.com")}
              className="bg-black border-2 border-neon-orange rounded-lg p-3 cursor-pointer hover:bg-gray-900 transition-all duration-200"
            >
              <h3 className="text-neon-orange font-bold mb-1 text-sm">
                Replit
              </h3>
              <p className="text-white text-xs">
                AI-powered collaborative coding platform
              </p>
            </div>

            <div
              onClick={() => openTool("https://tabnine.com")}
              className="bg-black border-2 border-neon-orange rounded-lg p-3 cursor-pointer hover:bg-gray-900 transition-all duration-200"
            >
              <h3 className="text-neon-orange font-bold mb-1 text-sm">
                Tabnine
              </h3>
              <p className="text-white text-xs">AI code completion assistant</p>
            </div>

            <div
              onClick={() => openTool("https://v0.dev")}
              className="bg-black border-2 border-neon-orange rounded-lg p-3 cursor-pointer hover:bg-gray-900 transition-all duration-200"
            >
              <h3 className="text-neon-orange font-bold mb-1 text-sm">
                v0.dev
              </h3>
              <p className="text-white text-xs">
                AI UI code generation by Vercel
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
