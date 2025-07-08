import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { AppLayout } from "../components/AppLayout";
import { Paywall } from "../components/Paywall";
import { useSubscription } from "../hooks/useSubscription";
import { BookOpen, Clock, ChevronDown, ChevronRight } from "lucide-react";

export default function Playbook() {
  const [expandedSection, setExpandedSection] = useState<number | null>(0);
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

  const playbookSections = [
    {
      title: "Getting Started with SORA AI Prompts",
      description: "Master the fundamentals of prompt generation",
      duration: "5 min read",
      content: `
# Getting Started with SORA AI Prompts

## Step 1: Choose Your Generator
- **Product Generator**: For e-commerce and product photography
- **Lifestyle Generator**: For authentic lifestyle and brand content
- **Graphic Generator**: For logos, graphics, and visual design

## Step 2: Start with Custom Instructions
Begin every prompt with your specific vision and requirements. This sets the foundation for everything else.

## Step 3: Select Categories
Choose 4+ categories for optimal results. Each selection adds important details to your prompt.

## Step 4: Upload Reference Images
Add images to be converted to JSON format for enhanced AI understanding.

## Step 5: Review Quality Analysis
Check your prompt quality score and follow AI recommendations.

## Step 6: Copy & Use in SORA
Export your optimized prompt and use it directly in SORA AI for best results.
      `,
    },
    {
      title: "Advanced Prompt Engineering",
      description: "Pro techniques for better AI results",
      duration: "10 min read",
      content: `
# Advanced Prompt Engineering for SORA

## Specificity is Key
The more specific your instructions, the better your results. Use concrete descriptors rather than vague terms.

## Layer Your Descriptions
Build your prompts in layers:
1. Subject/Object
2. Style and Aesthetic
3. Technical Specifications
4. Mood and Atmosphere

## Use Visual References
Always upload reference images when possible. Our JSON conversion optimizes them for SORA processing.

## Quality Optimization
- Aim for 80%+ quality score
- Complete 4+ categories minimum
- Include custom instructions
- Add reference materials

## Common Mistakes to Avoid
- Being too vague or generic
- Conflicting style choices
- Ignoring technical specifications
- Not using reference images
      `,
    },
    {
      title: "SORA-Specific Best Practices",
      description: "Optimize specifically for SORA AI video generation",
      duration: "8 min read",
      content: `
# SORA-Specific Best Practices

## Video-First Thinking
Remember that SORA generates video, so think about:
- Motion and movement
- Temporal consistency
- Cinematic composition
- Lighting that works in motion

## Technical Specifications
Always include:
- Resolution (4K recommended)
- Aspect ratio (16:9 for video)
- Quality markers (cinematic, professional)
- Frame rate considerations

## Prompt Structure for Video
1. **Opening Statement**: What the video shows
2. **Visual Style**: How it should look
3. **Motion Description**: How things move
4. **Technical Specs**: Quality and format
5. **Reference Data**: JSON image data

## Best Results Tips
- Use our quality analysis to optimize
- Include movement descriptors
- Specify camera angles and shots
- Add lighting and mood details
      `,
    },
  ];

  const toggleSection = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  return (
    <AppLayout onUpgradeRequest={handleUpgradeRequest}>
      <div className="container mx-auto px-8 py-5">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-black">
              <BookOpen className="h-8 w-8 text-neon-orange" />
            </div>
            <h1 className="text-6xl font-black text-black retro-text">
              PLAYBOOK
            </h1>
          </div>
          <p className="text-xl font-bold text-black/80 max-w-2xl mx-auto">
            Master SORA AI prompting with our comprehensive guides and best
            practices
          </p>
        </div>

        {/* Playbook Sections */}
        <div className="max-w-4xl mx-auto space-y-6">
          {playbookSections.map((section, index) => (
            <Card key={index} className="bg-black border-4 border-black">
              <CardHeader
                className="cursor-pointer hover:bg-cream/5 transition-colors duration-200"
                onClick={() => toggleSection(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className="bg-neon-orange text-black font-bold text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {section.duration}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl font-black text-cream mb-2">
                      {section.title}
                    </CardTitle>
                    <p className="text-cream/80 font-medium">
                      {section.description}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-cream hover:bg-cream/10"
                  >
                    {expandedSection === index ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </CardHeader>

              {expandedSection === index && (
                <CardContent className="border-t border-cream/20">
                  <div className="prose prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap text-cream/90 font-medium leading-relaxed bg-black/50 p-6 rounded-lg">
                      {section.content.trim()}
                    </pre>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Quick Tips */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="bg-black border-4 border-black">
            <CardHeader>
              <CardTitle className="text-2xl font-black text-cream text-center">
                🚀 Quick Tips for Success
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-black text-neon-orange">Do's</h3>
                  <ul className="text-cream/90 space-y-2">
                    <li>• Be specific and detailed in descriptions</li>
                    <li>• Use 4+ keyword categories minimum</li>
                    <li>• Include technical specifications</li>
                    <li>• Upload reference images when possible</li>
                    <li>• Check quality score before generating</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-black text-neon-orange">
                    Don'ts
                  </h3>
                  <ul className="text-cream/90 space-y-2">
                    <li>• Don't use vague or generic terms</li>
                    <li>• Don't ignore the quality indicators</li>
                    <li>• Don't skip custom instructions</li>
                    <li>• Don't use conflicting style choices</li>
                    <li>• Don't forget about video motion</li>
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
