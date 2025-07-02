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
    <div className="min-h-screen bg-neon-orange p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F326314a2e8634f90977b83f81df01501%2F9a6248f59e554d6eb22258a507dde681?format=webp&width=800"
              alt="Overnight Success Logo"
              className="h-16 w-auto"
            />
          </div>
          <h1 className="text-4xl font-black text-black mb-2">AI Toolkit</h1>
          <p className="text-black font-bold">
            Essential tools and resources for AI-powered creative work
          </p>
        </div>

        {/* AI Video Generation Section */}
        <div className="bg-black border-4 border-black rounded-lg p-6 mb-6">
          <div className="flex items-center mb-6">
            <Video className="h-5 w-5 text-neon-orange mr-3" />
            <h2 className="text-xl font-bold text-cream">
              AI Video Generation
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div
              onClick={() => openTool("https://openai.com/sora")}
              className="bg-neon-orange border-2 border-cream rounded-lg p-4 cursor-pointer hover:bg-cream hover:text-black transition-all duration-200"
            >
              <h3 className="text-black font-bold mb-2">SORA by OpenAI</h3>
              <p className="text-black text-sm">
                Advanced AI video generation with text-to-video capabilities
              </p>
            </div>

            <div
              onClick={() => openTool("https://runwayml.com")}
              className="bg-neon-orange border-2 border-cream rounded-lg p-4 cursor-pointer hover:bg-cream hover:text-black transition-all duration-200"
            >
              <h3 className="text-black font-bold mb-2">Runway ML</h3>
              <p className="text-black text-sm">
                Creative AI video tools for filmmakers and content creators
              </p>
            </div>

            <div
              onClick={() => openTool("https://pika.art")}
              className="bg-neon-orange border-2 border-cream rounded-lg p-4 cursor-pointer hover:bg-cream hover:text-black transition-all duration-200"
            >
              <h3 className="text-black font-bold mb-2">Pika Labs</h3>
              <p className="text-black text-sm">
                AI video creation platform with text and image inputs
              </p>
            </div>

            <div
              onClick={() =>
                openTool(
                  "https://stability.ai/news/stable-video-diffusion-open-ai-video-model",
                )
              }
              className="bg-neon-orange border-2 border-cream rounded-lg p-4 cursor-pointer hover:bg-cream hover:text-black transition-all duration-200"
            >
              <h3 className="text-black font-bold mb-2">
                Stable Video Diffusion
              </h3>
              <p className="text-black text-sm">
                Open-source video generation model by Stability AI
              </p>
            </div>

            <div
              onClick={() => openTool("https://synthesia.io")}
              className="bg-neon-orange border-2 border-cream rounded-lg p-4 cursor-pointer hover:bg-cream hover:text-black transition-all duration-200"
            >
              <h3 className="text-black font-bold mb-2">Synthesia</h3>
              <p className="text-black text-sm">
                AI video generation with virtual avatars and voiceovers
              </p>
            </div>

            <div
              onClick={() => openTool("https://invideo.io")}
              className="bg-neon-orange border-2 border-cream rounded-lg p-4 cursor-pointer hover:bg-cream hover:text-black transition-all duration-200"
            >
              <h3 className="text-black font-bold mb-2">InVideo AI</h3>
              <p className="text-black text-sm">
                AI-powered video creation and editing platform
              </p>
            </div>
          </div>
        </div>

        {/* AI Image Generation Section */}
        <div className="bg-black border-4 border-black rounded-lg p-6 mb-6">
          <div className="flex items-center mb-6">
            <Image className="h-5 w-5 text-neon-orange mr-3" />
            <h2 className="text-xl font-bold text-cream">
              AI Image Generation
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div
              onClick={() => openTool("https://openai.com/dall-e-3")}
              className="bg-neon-orange border-2 border-cream rounded-lg p-4 cursor-pointer hover:bg-cream hover:text-black transition-all duration-200"
            >
              <h3 className="text-black font-bold mb-2">DALL-E 3</h3>
              <p className="text-black text-sm">
                Advanced AI image generation from OpenAI
              </p>
            </div>

            <div
              onClick={() => openTool("https://midjourney.com")}
              className="bg-neon-orange border-2 border-cream rounded-lg p-4 cursor-pointer hover:bg-cream hover:text-black transition-all duration-200"
            >
              <h3 className="text-black font-bold mb-2">Midjourney</h3>
              <p className="text-black text-sm">
                High-quality AI art and image generation
              </p>
            </div>

            <div
              onClick={() => openTool("https://stability.ai/stable-diffusion")}
              className="bg-neon-orange border-2 border-cream rounded-lg p-4 cursor-pointer hover:bg-cream hover:text-black transition-all duration-200"
            >
              <h3 className="text-black font-bold mb-2">Stable Diffusion</h3>
              <p className="text-black text-sm">
                Open-source AI image generation
              </p>
            </div>

            <div
              onClick={() => openTool("https://leonardo.ai")}
              className="bg-neon-orange border-2 border-cream rounded-lg p-4 cursor-pointer hover:bg-cream hover:text-black transition-all duration-200"
            >
              <h3 className="text-black font-bold mb-2">Leonardo.AI</h3>
              <p className="text-black text-sm">
                Professional AI image generation platform
              </p>
            </div>

            <div
              onClick={() => openTool("https://ideogram.ai")}
              className="bg-neon-orange border-2 border-cream rounded-lg p-4 cursor-pointer hover:bg-cream hover:text-black transition-all duration-200"
            >
              <h3 className="text-black font-bold mb-2">Ideogram</h3>
              <p className="text-black text-sm">
                AI image generation with text rendering
              </p>
            </div>

            <div
              onClick={() => openTool("https://firefly.adobe.com")}
              className="bg-neon-orange border-2 border-cream rounded-lg p-4 cursor-pointer hover:bg-cream hover:text-black transition-all duration-200"
            >
              <h3 className="text-black font-bold mb-2">Adobe Firefly</h3>
              <p className="text-black text-sm">Creative AI tools from Adobe</p>
            </div>
          </div>
        </div>

        {/* AI Text Generation Section */}
        <div className="bg-black border-4 border-black rounded-lg p-6 mb-6">
          <div className="flex items-center mb-6">
            <FileText className="h-5 w-5 text-neon-orange mr-3" />
            <h2 className="text-xl font-bold text-cream">AI Text Generation</h2>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div
              onClick={() => openTool("https://chat.openai.com")}
              className="bg-neon-orange border-2 border-cream rounded-lg p-4 cursor-pointer hover:bg-cream hover:text-black transition-all duration-200"
            >
              <h3 className="text-black font-bold mb-2">ChatGPT</h3>
              <p className="text-black text-sm">
                Advanced AI language model for text generation
              </p>
            </div>

            <div
              onClick={() => openTool("https://claude.ai")}
              className="bg-neon-orange border-2 border-cream rounded-lg p-4 cursor-pointer hover:bg-cream hover:text-black transition-all duration-200"
            >
              <h3 className="text-black font-bold mb-2">Claude</h3>
              <p className="text-black text-sm">
                Advanced AI assistant for analysis and creative work
              </p>
            </div>

            <div
              onClick={() => openTool("https://gemini.google.com")}
              className="bg-neon-orange border-2 border-cream rounded-lg p-4 cursor-pointer hover:bg-cream hover:text-black transition-all duration-200"
            >
              <h3 className="text-black font-bold mb-2">Gemini</h3>
              <p className="text-black text-sm">
                Google's advanced AI language model
              </p>
            </div>

            <div
              onClick={() => openTool("https://copilot.microsoft.com")}
              className="bg-neon-orange border-2 border-cream rounded-lg p-4 cursor-pointer hover:bg-cream hover:text-black transition-all duration-200"
            >
              <h3 className="text-black font-bold mb-2">Copilot</h3>
              <p className="text-black text-sm">
                Microsoft's AI assistant and creative companion
              </p>
            </div>

            <div
              onClick={() => openTool("https://perplexity.ai")}
              className="bg-neon-orange border-2 border-cream rounded-lg p-4 cursor-pointer hover:bg-cream hover:text-black transition-all duration-200"
            >
              <h3 className="text-black font-bold mb-2">Perplexity</h3>
              <p className="text-black text-sm">
                AI-powered research and answer engine
              </p>
            </div>

            <div
              onClick={() => openTool("https://writesonic.com")}
              className="bg-neon-orange border-2 border-cream rounded-lg p-4 cursor-pointer hover:bg-cream hover:text-black transition-all duration-200"
            >
              <h3 className="text-black font-bold mb-2">Writesonic</h3>
              <p className="text-black text-sm">
                AI writing and content creation platform
              </p>
            </div>
          </div>
        </div>

        {/* AI Audio Generation Section */}
        <div className="bg-black border-4 border-black rounded-lg p-6 mb-6">
          <div className="flex items-center mb-6">
            <Mic className="h-5 w-5 text-neon-orange mr-3" />
            <h2 className="text-xl font-bold text-cream">
              AI Audio Generation
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div
              onClick={() => openTool("https://elevenlabs.io")}
              className="bg-neon-orange border-2 border-cream rounded-lg p-4 cursor-pointer hover:bg-cream hover:text-black transition-all duration-200"
            >
              <h3 className="text-black font-bold mb-2">ElevenLabs</h3>
              <p className="text-black text-sm">
                Advanced AI voice synthesis and cloning
              </p>
            </div>

            <div
              onClick={() => openTool("https://murf.ai")}
              className="bg-neon-orange border-2 border-cream rounded-lg p-4 cursor-pointer hover:bg-cream hover:text-black transition-all duration-200"
            >
              <h3 className="text-black font-bold mb-2">Murf.AI</h3>
              <p className="text-black text-sm">
                AI voiceover and text-to-speech platform
              </p>
            </div>

            <div
              onClick={() => openTool("https://suno.ai")}
              className="bg-neon-orange border-2 border-cream rounded-lg p-4 cursor-pointer hover:bg-cream hover:text-black transition-all duration-200"
            >
              <h3 className="text-black font-bold mb-2">Suno</h3>
              <p className="text-black text-sm">
                AI music and song generation platform
              </p>
            </div>

            <div
              onClick={() => openTool("https://udio.com")}
              className="bg-neon-orange border-2 border-cream rounded-lg p-4 cursor-pointer hover:bg-cream hover:text-black transition-all duration-200"
            >
              <h3 className="text-black font-bold mb-2">Udio</h3>
              <p className="text-black text-sm">
                AI music creation and generation
              </p>
            </div>

            <div
              onClick={() => openTool("https://speechify.com")}
              className="bg-neon-orange border-2 border-cream rounded-lg p-4 cursor-pointer hover:bg-cream hover:text-black transition-all duration-200"
            >
              <h3 className="text-black font-bold mb-2">Speechify</h3>
              <p className="text-black text-sm">
                AI text-to-speech and voice generation
              </p>
            </div>

            <div
              onClick={() => openTool("https://podcast.adobe.com")}
              className="bg-neon-orange border-2 border-cream rounded-lg p-4 cursor-pointer hover:bg-cream hover:text-black transition-all duration-200"
            >
              <h3 className="text-black font-bold mb-2">Adobe Podcast</h3>
              <p className="text-black text-sm">
                AI-powered audio enhancement and recording
              </p>
            </div>
          </div>
        </div>

        {/* AI Code Generation Section */}
        <div className="bg-black border-4 border-black rounded-lg p-6 mb-6">
          <div className="flex items-center mb-6">
            <Wand2 className="h-5 w-5 text-neon-orange mr-3" />
            <h2 className="text-xl font-bold text-cream">AI Code Generation</h2>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div
              onClick={() => openTool("https://github.com/features/copilot")}
              className="bg-neon-orange border-2 border-cream rounded-lg p-4 cursor-pointer hover:bg-cream hover:text-black transition-all duration-200"
            >
              <h3 className="text-black font-bold mb-2">GitHub Copilot</h3>
              <p className="text-black text-sm">
                AI pair programmer for code completion
              </p>
            </div>

            <div
              onClick={() => openTool("https://cursor.sh")}
              className="bg-neon-orange border-2 border-cream rounded-lg p-4 cursor-pointer hover:bg-cream hover:text-black transition-all duration-200"
            >
              <h3 className="text-black font-bold mb-2">Cursor</h3>
              <p className="text-black text-sm">
                AI-powered code editor and IDE
              </p>
            </div>

            <div
              onClick={() => openTool("https://codeium.com")}
              className="bg-neon-orange border-2 border-cream rounded-lg p-4 cursor-pointer hover:bg-cream hover:text-black transition-all duration-200"
            >
              <h3 className="text-black font-bold mb-2">Codeium</h3>
              <p className="text-black text-sm">
                Free AI code completion and chat
              </p>
            </div>

            <div
              onClick={() => openTool("https://replit.com")}
              className="bg-neon-orange border-2 border-cream rounded-lg p-4 cursor-pointer hover:bg-cream hover:text-black transition-all duration-200"
            >
              <h3 className="text-black font-bold mb-2">Replit</h3>
              <p className="text-black text-sm">
                AI-powered collaborative coding platform
              </p>
            </div>

            <div
              onClick={() => openTool("https://tabnine.com")}
              className="bg-neon-orange border-2 border-cream rounded-lg p-4 cursor-pointer hover:bg-cream hover:text-black transition-all duration-200"
            >
              <h3 className="text-black font-bold mb-2">Tabnine</h3>
              <p className="text-black text-sm">AI code completion assistant</p>
            </div>

            <div
              onClick={() => openTool("https://v0.dev")}
              className="bg-neon-orange border-2 border-cream rounded-lg p-4 cursor-pointer hover:bg-cream hover:text-black transition-all duration-200"
            >
              <h3 className="text-black font-bold mb-2">v0.dev</h3>
              <p className="text-black text-sm">
                AI UI code generation by Vercel
              </p>
            </div>
          </div>
        </div>

        {/* AI Design Tools Section */}
        <div className="bg-black border-4 border-black rounded-lg p-6">
          <div className="flex items-center mb-6">
            <Palette className="h-5 w-5 text-neon-orange mr-3" />
            <h2 className="text-xl font-bold text-cream">AI Design Tools</h2>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div
              onClick={() => openTool("https://www.figma.com")}
              className="bg-neon-orange border-2 border-cream rounded-lg p-4 cursor-pointer hover:bg-cream hover:text-black transition-all duration-200"
            >
              <h3 className="text-black font-bold mb-2">Figma AI</h3>
              <p className="text-black text-sm">
                AI-powered design and prototyping
              </p>
            </div>

            <div
              onClick={() => openTool("https://www.canva.com")}
              className="bg-neon-orange border-2 border-cream rounded-lg p-4 cursor-pointer hover:bg-cream hover:text-black transition-all duration-200"
            >
              <h3 className="text-black font-bold mb-2">Canva AI</h3>
              <p className="text-black text-sm">
                AI design assistant for graphics
              </p>
            </div>

            <div
              onClick={() => openTool("https://designer.microsoft.com")}
              className="bg-neon-orange border-2 border-cream rounded-lg p-4 cursor-pointer hover:bg-cream hover:text-black transition-all duration-200"
            >
              <h3 className="text-black font-bold mb-2">Microsoft Designer</h3>
              <p className="text-black text-sm">
                AI-powered design creation tool
              </p>
            </div>

            <div
              onClick={() => openTool("https://gamma.app")}
              className="bg-neon-orange border-2 border-cream rounded-lg p-4 cursor-pointer hover:bg-cream hover:text-black transition-all duration-200"
            >
              <h3 className="text-black font-bold mb-2">Gamma</h3>
              <p className="text-black text-sm">
                AI presentation and document creation
              </p>
            </div>

            <div
              onClick={() => openTool("https://www.framer.com")}
              className="bg-neon-orange border-2 border-cream rounded-lg p-4 cursor-pointer hover:bg-cream hover:text-black transition-all duration-200"
            >
              <h3 className="text-black font-bold mb-2">Framer AI</h3>
              <p className="text-black text-sm">
                AI website and app design platform
              </p>
            </div>

            <div
              onClick={() => openTool("https://beautiful.ai")}
              className="bg-neon-orange border-2 border-cream rounded-lg p-4 cursor-pointer hover:bg-cream hover:text-black transition-all duration-200"
            >
              <h3 className="text-black font-bold mb-2">Beautiful.AI</h3>
              <p className="text-black text-sm">
                AI-powered presentation design
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
