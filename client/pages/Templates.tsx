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
        "SORA-optimized product showcase templates with cinematic quality",
      templates: [
        "Close-up cinematic shot of [product] made from [material], featuring [brand color] accent lighting, shot with 85mm macro lens, smooth camera orbit around product, professional studio lighting with soft key and rim lights, clean gradient background, 4K resolution, optimized for SORA AI video generation",
        "Dynamic lifestyle reveal of [product] in modern minimalist setting, golden hour natural lighting streaming through windows, gentle camera push-in movement, shallow depth of field transition, Instagram-worthy composition, 4K cinematic quality, SORA-optimized",
        "Macro detail sequence of [product] showcasing [material] texture, dramatic side lighting creating depth, slow camera drift across surface details, black velvet background, luxury commercial grade, ultra-high resolution, perfect for SORA AI",
        "360-degree smooth rotation of [product] with studio lighting setup, gradient background transitioning from [brand's primary color] to [brand's secondary color], consistent lighting throughout rotation, commercial advertisement quality, 4K SORA-ready",
        "Elegant product reveal animation with [product] emerging from darkness into spotlight, smooth camera movement, slow motion effect at 60fps, cinematic color grading, dramatic shadows, optimized for SORA AI video generation",
      ],
    },
    {
      title: "Lifestyle & Brand",
      description:
        "Authentic lifestyle content optimized for SORA video generation",
      templates: [
        "Authentic lifestyle moment with person using [product] in natural daily setting, warm natural lighting, smooth handheld camera movement, emotional close-ups and wide establishing shots, 35mm lens aesthetic, SORA-optimized storytelling sequence",
        "Brand story sequence featuring [product] with '[Your Motto]' subtly integrated, cinematic composition with smooth camera movements, warm color grading, inspirational mood lighting, seamless transitions, 4K quality for SORA AI",
        "Behind-the-scenes documentary style sequence of [product] creation process, natural lighting with practical lights, authentic handheld camera movement, multiple angle coverage, real-time narrative flow, SORA-ready production quality",
        "Seasonal brand campaign with [product] in natural outdoor environment, '[Your Quote]' message integration, golden hour cinematography, smooth camera pans and tilts, lifestyle authenticity, optimized for SORA video generation",
        "Lifestyle montage sequence with [product] in various scenarios, smooth transitions between scenes, consistent lighting and color palette, upbeat pacing with natural movement, modern editing style, SORA AI optimized",
      ],
    },
    {
      title: "Graphics & Design",
      description:
        "Motion graphics and design templates for SORA AI generation",
      templates: [
        "Animated logo reveal for [brand] in [brand's primary color], clean typography emerging with smooth easing, geometric shape transformations, modern aesthetic, vector-style animation, professional branding quality, SORA-optimized motion graphics",
        "Abstract pattern animation inspired by [material] texture, [brand color] color palette flowing and morphing, contemporary design with smooth transitions, packaging and branding ready, 4K motion graphics for SORA",
        "Typography animation sequence with '[Your Motto]' message reveal, dramatic contrast lighting, smooth text emergence, [brand's primary color] and [brand's secondary color] scheme transitions, modern poster style animation, SORA-ready",
        "Geometric illustration animation of [product] concept, flat design elements moving in smooth sequences, vibrant [brand color] palette transitions, minimalist approach with elegant motion, icon animation ready for SORA AI",
        "Corporate motion graphics sequence with [brand] logo animation and '[Your Quote]' text reveal, sleek transitions and smooth easing, professional presentation style, consistent branding elements, optimized for SORA video generation",
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

  // Generate a SORA-optimized custom prompt based on user inputs
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

    if (!product || !brand) {
      return "Please fill in at least Product and Brand fields to generate a custom prompt...";
    }

    // SORA-optimized prompt structure:
    // 1. Main subject/action, 2. Visual style, 3. Technical specs, 4. Lighting, 5. Quality

    // 1. Main Subject/Action (what SORA will generate)
    let prompt = `Close-up cinematic shot of ${product} for ${brand}`;

    // 2. Visual Style and Materials
    if (material) {
      prompt += `, crafted from premium ${material}`;
    }

    // 3. Color Scheme (important for visual coherence)
    const colors = [brandColor, primaryColor, secondaryColor].filter(Boolean);
    if (colors.length > 0) {
      prompt += `, featuring ${colors.join(" and ")} color palette`;
    }

    // 4. Camera Movement and Technical Specs (crucial for SORA video)
    prompt += `, smooth camera movement, 85mm lens with shallow depth of field`;

    // 5. Lighting (essential for SORA quality)
    prompt += `, professional studio lighting with soft key light and subtle rim lighting`;

    // 6. Brand Integration
    if (motto || quote) {
      const message = motto || quote;
      prompt += `, subtly incorporating the brand essence "${message}"`;
    }

    // 7. Motion and Animation (what makes SORA special)
    prompt += `, gentle product rotation revealing key details, elegant transitions`;

    // 8. Quality and Technical Specifications (always end with these for SORA)
    prompt += `, shot in 4K resolution, cinematic color grading, commercial advertisement quality, optimized for SORA AI video generation, professional production value, broadcast-ready output`;

    return prompt;
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
            SORA-optimized prompt templates with customizable placeholders for
            professional video generation
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
                🎬 SORA AI Optimization Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-black text-neon-orange">
                    SORA Best Practices
                  </h3>
                  <ul className="text-cream/90 space-y-2">
                    <li>• Include camera movement descriptions</li>
                    <li>• Specify lighting conditions clearly</li>
                    <li>• Add motion and animation details</li>
                    <li>• Use technical specifications (4K, 60fps)</li>
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
