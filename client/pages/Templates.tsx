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
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { AppLayout } from "../components/AppLayout";
import { Paywall } from "../components/Paywall";
import { useSubscription } from "../hooks/useSubscription";
import { FileText, Copy, ChevronDown, ChevronRight, Wand2 } from "lucide-react";

export default function Templates() {
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

  const [expandedTemplateSection, setExpandedTemplateSection] = useState<
    string | null
  >(null);
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

  const templateSections = [
    {
      title: "Product Photography",
      description:
        "SORA-optimized product showcase templates for stunning images",
      templates: [
        "Close-up shot of [product] made from [material], featuring [brand color] accent lighting, shot with 85mm macro lens, professional studio lighting with soft key and rim lights, clean gradient background, high resolution, optimized for SORA AI",
        "Lifestyle shot of [product] in modern minimalist setting, golden hour natural lighting streaming through windows, shallow depth of field, Instagram-worthy composition, cinematic quality, SORA-optimized",
        "Macro detail shot of [product] showcasing [material] texture, dramatic side lighting creating depth and shadows, black velvet background, luxury commercial grade, ultra-high resolution, perfect for SORA AI",
        "Studio shot of [product] with gradient background transitioning from [brand's primary color] to [brand's secondary color], consistent professional lighting, commercial advertisement quality, SORA-ready",
        "Elegant product shot with [product] in dramatic spotlight, sophisticated lighting setup, cinematic color grading, dramatic shadows, optimized for SORA AI image generation",
      ],
    },
    {
      title: "Lifestyle & Brand",
      description:
        "Authentic lifestyle content optimized for SORA image generation",
      templates: [
        "Authentic lifestyle shot with person using [product] in natural daily setting, warm natural lighting, emotional composition, 35mm lens aesthetic, SORA-optimized lifestyle photography",
        "Brand story image featuring [product] with '[Your Motto]' subtly integrated, cinematic composition, warm color grading, inspirational mood lighting, professional quality for SORA AI",
        "Behind-the-scenes shot of [product] creation process, natural lighting with practical lights, authentic documentary style, professional production quality, SORA-ready",
        "Seasonal brand campaign image with [product] in natural outdoor environment, '[Your Quote]' message integration, golden hour photography, lifestyle authenticity, optimized for SORA",
        "Lifestyle composition with [product] in carefully curated setting, consistent lighting and color palette, modern aesthetic, professional lifestyle photography, SORA AI optimized",
      ],
    },
    {
      title: "Graphics & Design",
      description: "Visual design and graphic templates for SORA AI generation",
      templates: [
        "Clean logo design for [brand] in [brand's primary color], modern typography, geometric shapes, professional aesthetic, vector-style graphics, high-quality branding, SORA-optimized",
        "Abstract pattern design inspired by [material] texture, [brand color] color palette, contemporary graphic design, packaging and branding ready, professional graphics for SORA",
        "Typography design with '[Your Motto]' message, dramatic contrast, [brand's primary color] and [brand's secondary color] scheme, modern poster style, SORA-ready graphics",
        "Geometric illustration of [product] concept, flat design style, vibrant [brand color] palette, minimalist approach, professional icon design ready for SORA AI",
        "Corporate branding design with [brand] logo and '[Your Quote]' text, professional presentation style, consistent branding elements, optimized for SORA image generation",
      ],
    },
  ];

  const toggleTemplateSection = (section: string) => {
    setExpandedTemplateSection(
      expandedTemplateSection === section ? null : section,
    );
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

  const copyPrompt = async (prompt: string) => {
    const finalPrompt = replacePlaceholders(prompt);
    try {
      await navigator.clipboard.writeText(finalPrompt);
      console.log("Copied prompt:", finalPrompt);
    } catch (error) {
      const textArea = document.createElement("textarea");
      textArea.value = finalPrompt;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      console.log("Fallback copy successful");
    }
  };

  // Generate SORA-structured custom prompt from user inputs
  const generateCustomPrompt = () => {
    const {
      product,
      brand,
      "brand color": brandColor,
      "brand's primary color": primaryColor,
      "brand's secondary color": secondaryColor,
      material,
      "Your Motto": motto,
      "Your Quote": quote,
    } = placeholders;

    // Structure for SORA: Subject, Style/Brand, Material, Colors, Message
    let prompt = "";

    // 1. Main subject first
    if (product) {
      prompt = product;
    }

    // 2. Brand/Style context
    if (brand) {
      prompt = prompt ? `${prompt}, ${brand}` : brand;
    }

    // 3. Material specification
    if (material) {
      prompt = prompt ? `${prompt}, ${material}` : material;
    }

    // 4. Color palette (structured properly)
    const colors = [];
    if (brandColor) colors.push(brandColor);
    if (primaryColor) colors.push(primaryColor);
    if (secondaryColor) colors.push(secondaryColor);

    if (colors.length > 0) {
      prompt = prompt ? `${prompt}, ${colors.join(" ")}` : colors.join(" ");
    }

    // 5. Brand messaging
    if (motto) {
      prompt = prompt ? `${prompt}, ${motto}` : motto;
    }
    if (quote) {
      prompt = prompt ? `${prompt}, ${quote}` : quote;
    }

    return prompt || "Enter your details above to generate a custom prompt...";
  };

  const copyCustomPrompt = async () => {
    const customPrompt = generateCustomPrompt();
    if (customPrompt.includes("Enter your details")) return;

    try {
      await navigator.clipboard.writeText(customPrompt);
      console.log("Custom prompt copied:", customPrompt);
    } catch (error) {
      const textArea = document.createElement("textarea");
      textArea.value = customPrompt;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      console.log("Custom prompt copied with fallback");
    }
  };

  const clearPrompt = () => {
    setPlaceholders({
      product: "",
      brand: "",
      "brand color": "",
      "brand's primary color": "",
      "brand's secondary color": "",
      material: "",
      "Your Motto": "",
      "Your Quote": "",
    });
    console.log("All fields cleared");
  };

  return (
    <AppLayout onUpgradeRequest={handleUpgradeRequest}>
      <div className="container mx-auto px-8 py-5">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-black">
              <FileText className="h-8 w-8 text-neon-orange" />
            </div>
            <h1 className="text-6xl font-black text-black retro-text">
              TEMPLATES
            </h1>
          </div>
          <p className="text-xl font-bold text-black/80 max-w-2xl mx-auto">
            SORA-optimized prompt templates with customizable placeholders for
            professional image generation
          </p>
        </div>

        {/* Placeholder Configuration */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="bg-black border-4 border-black">
            <CardHeader>
              <CardTitle className="text-2xl font-black text-cream">
                🎛️ Customize Your Variables
              </CardTitle>
              <p className="text-cream/80">
                Fill in these fields to automatically customize all templates
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(placeholders).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <Label className="text-cream font-bold">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Label>
                    <Input
                      value={value}
                      onChange={(e) =>
                        setPlaceholders((prev) => ({
                          ...prev,
                          [key]: e.target.value,
                        }))
                      }
                      placeholder={`Enter your ${key}...`}
                      className="bg-black/50 border-cream/20 text-cream placeholder:text-cream/50"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Prompt Generator */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="bg-black border-4 border-black">
            <CardHeader>
              <CardTitle className="text-2xl font-black text-cream flex items-center gap-2">
                <Wand2 className="h-6 w-6 text-neon-orange" />
                Your Custom Prompt
              </CardTitle>
              <p className="text-cream/80">
                Live preview of your personalized prompt based on your inputs
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={generateCustomPrompt()}
                readOnly
                className="bg-black/50 border-cream/20 text-cream min-h-[120px] font-mono text-sm"
                placeholder="Your custom prompt will appear here as you fill in the variables above..."
              />
              <div className="flex gap-3">
                <Button
                  onClick={copyCustomPrompt}
                  disabled={generateCustomPrompt().includes(
                    "Enter your details",
                  )}
                  className="bg-neon-orange border-2 border-neon-orange text-black font-bold hover:bg-black hover:text-neon-orange"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Custom Prompt
                </Button>
                <Button
                  onClick={clearPrompt}
                  variant="outline"
                  className="border-2 border-cream text-cream hover:bg-cream hover:text-black"
                >
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Template Categories */}
        <div className="max-w-6xl mx-auto space-y-6">
          {templateSections.map((section, sectionIndex) => (
            <Card key={sectionIndex} className="bg-black border-4 border-black">
              <CardHeader
                className="cursor-pointer hover:bg-cream/5 transition-colors duration-200"
                onClick={() => toggleTemplateSection(section.title)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl font-black text-cream mb-2">
                      {section.title}
                    </CardTitle>
                    <p className="text-cream/80 font-medium">
                      {section.description}
                    </p>
                    <Badge className="bg-neon-orange text-black font-bold text-xs mt-2">
                      {section.templates.length} Templates
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-cream hover:bg-cream/10"
                  >
                    {expandedTemplateSection === section.title ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </CardHeader>

              {expandedTemplateSection === section.title && (
                <CardContent className="border-t border-cream/20">
                  <div className="space-y-4">
                    {section.templates.map((template, templateIndex) => (
                      <div
                        key={templateIndex}
                        className="bg-black/50 rounded-lg p-4 border border-cream/20"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <p className="text-cream/90 font-mono text-sm leading-relaxed">
                              {replacePlaceholders(template)}
                            </p>
                          </div>
                          <Button
                            onClick={() => copyPrompt(template)}
                            className="bg-neon-orange border-2 border-neon-orange text-black font-bold hover:bg-black hover:text-neon-orange"
                            size="sm"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Usage Tips */}
        <div className="mt-12 max-w-4xl mx-auto">
          <Card className="bg-black border-4 border-black">
            <CardHeader>
              <CardTitle className="text-2xl font-black text-cream text-center">
                📸 SORA AI Image Generation Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-black text-neon-orange">
                    SORA Best Practices
                  </h3>
                  <ul className="text-cream/90 space-y-2">
                    <li>• Specify photography techniques clearly</li>
                    <li>• Include detailed lighting conditions</li>
                    <li>• Add composition and framing details</li>
                    <li>• Use technical specifications (lens, resolution)</li>
                    <li>• Structure: Subject → Style → Technical → Quality</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-black text-neon-orange">
                    Customization Tips
                  </h3>
                  <ul className="text-cream/90 space-y-2">
                    <li>• Fill brand details for personalized results</li>
                    <li>• Use specific materials and colors</li>
                    <li>• Combine templates with Prompt Vault keywords</li>
                    <li>• Test prompts in SORA for optimal results</li>
                    <li>• Keep brand messaging consistent</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
