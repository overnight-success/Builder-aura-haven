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
      description: "Professional e-commerce and product showcase templates",
      templates: [
        "Cinematic close-up of a [product] made from [material] in [brand color], shot with 85mm lens, soft ambient lighting, clean white background, 4K resolution, commercial ready, studio quality",
        "Lifestyle shot of [product] in a modern minimalist setting, golden hour lighting, shallow depth of field, Instagram-ready composition, professional photography",
        "Macro detailed shot of [product] texture and materials, dramatic lighting, black background, premium luxury feel, ultra-high resolution",
        "360-degree rotating view of [product], studio lighting setup, gradient background from [brand's primary color] to [brand's secondary color], commercial advertisement grade",
        "Smooth product reveal animation, [product] emerging from darkness into spotlight, cinematic quality, slow motion effect, dramatic music sync point",
      ],
    },
    {
      title: "Lifestyle & Brand",
      description: "Authentic lifestyle content and brand storytelling",
      templates: [
        "Authentic lifestyle moment featuring [product] in daily use, natural lighting, candid photography style, emotional storytelling, 35mm lens aesthetic",
        "Brand story visual showing [product] with '[Your Motto]' overlay, cinematic composition, warm color grading, inspirational mood",
        "Behind-the-scenes content creation process, documentary style, handheld camera movement, natural light, authentic brand narrative",
        "Seasonal brand campaign featuring [product] with '[Your Quote]' message, outdoor setting, natural environment, lifestyle photography",
        "Lifestyle video montage, quick cuts of [product] in various scenarios, upbeat rhythm, modern editing style, social media optimized",
      ],
    },
    {
      title: "Graphics & Design",
      description: "Visual design and graphic content templates",
      templates: [
        "Minimalist logo design featuring [brand] name in [brand's primary color], clean typography, geometric shapes, modern aesthetic, vector style, professional branding",
        "Abstract graphic pattern inspired by [material] texture, [brand color] color palette, contemporary design, suitable for packaging and branding",
        "Bold typography layout with '[Your Motto]' message, dramatic contrast, [brand's primary color] and [brand's secondary color] scheme, modern poster style",
        "Geometric illustration of [product] concept, flat design style, vibrant [brand color] palette, minimalist approach, icon-ready format",
        "Dynamic motion graphics sequence, [brand] logo animation with '[Your Quote]' reveal, sleek transitions, corporate presentation style",
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

  const copyPrompt = async (prompt: string, event?: any) => {
    const finalPrompt = replacePlaceholders(prompt);
    try {
      await navigator.clipboard.writeText(finalPrompt);
      // Show success feedback
      const clickedButton = event?.target?.closest("button");
      if (clickedButton) {
        const originalText = clickedButton.innerHTML;
        clickedButton.innerHTML =
          '<svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>';
        clickedButton.style.backgroundColor = "#10b981";
        setTimeout(() => {
          clickedButton.innerHTML = originalText;
          clickedButton.style.backgroundColor = "";
        }, 1500);
      }
    } catch (error) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = finalPrompt;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
  };

  // Generate a custom prompt based on user inputs
  const generateCustomPrompt = () => {
    const {
      product,
      brand,
      "brand color": brandColor,
      material,
      "Your Motto": motto,
    } = placeholders;

    if (!product || !brand) {
      return "Please fill in at least Product and Brand fields to generate a custom prompt...";
    }

    let customPrompt = `Professional ${product} photography for ${brand}`;

    if (material) {
      customPrompt += `, showcasing ${material} materials`;
    }

    if (brandColor) {
      customPrompt += `, featuring ${brandColor} color scheme`;
    }

    customPrompt += `, cinematic lighting, high-resolution, commercial grade`;

    if (motto) {
      customPrompt += `, embodying the brand message "${motto}"`;
    }

    customPrompt += `, optimized for SORA AI video generation, 4K quality, professional production value`;

    return customPrompt;
  };

  const copyCustomPrompt = async () => {
    const customPrompt = generateCustomPrompt();
    if (customPrompt.includes("Please fill in")) return;

    try {
      await navigator.clipboard.writeText(customPrompt);
    } catch (error) {
      const textArea = document.createElement("textarea");
      textArea.value = customPrompt;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
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
            Ready-to-use prompt templates with customizable placeholders
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
              <Button
                onClick={copyCustomPrompt}
                disabled={generateCustomPrompt().includes("Please fill in")}
                className="bg-neon-orange border-2 border-neon-orange text-black font-bold hover:bg-black hover:text-neon-orange"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Custom Prompt
              </Button>
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
                            onClick={(e) => copyPrompt(template, e)}
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
                💡 Template Usage Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-black text-neon-orange">
                    Customization
                  </h3>
                  <ul className="text-cream/90 space-y-2">
                    <li>• Fill out all placeholder fields above</li>
                    <li>
                      • Use the custom prompt generator for personalized results
                    </li>
                    <li>• Mix and match elements from different templates</li>
                    <li>• Combine with Prompt Vault keywords</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-black text-neon-orange">
                    Best Practices
                  </h3>
                  <ul className="text-cream/90 space-y-2">
                    <li>• Use specific brand colors and materials</li>
                    <li>• Keep your motto/quote consistent</li>
                    <li>• Test templates with different products</li>
                    <li>• Save successful combinations</li>
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
