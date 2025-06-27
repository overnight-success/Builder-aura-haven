import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  BookOpen,
  Archive,
  Wrench,
  Clock,
  Star,
  Download,
  ExternalLink,
  Play,
} from "lucide-react";

export function TheBriefcase() {
  const [activeTab, setActiveTab] = useState("guides");

  const howToGuides = [
    {
      title: "Mastering Sora AI Video Generation",
      description: "Complete guide to creating professional video content",
      duration: "15 min read",
      difficulty: "Beginner",
      updated: "2 days ago",
    },
    {
      title: "Advanced Prompt Engineering Techniques",
      description: "Pro tips for getting better results from AI generators",
      duration: "20 min read",
      difficulty: "Advanced",
      updated: "1 week ago",
    },
    {
      title: "Building Product Photography Prompts",
      description: "Step-by-step guide for e-commerce visuals",
      duration: "12 min read",
      difficulty: "Intermediate",
      updated: "3 days ago",
    },
  ];

  const promptVault = [
    {
      category: "Product Photography",
      count: 147,
      description: "Professional product shots and e-commerce visuals",
      tags: ["Studio", "Lifestyle", "Minimal", "Luxury"],
    },
    {
      category: "Lifestyle Content",
      count: 89,
      description: "Authentic lifestyle scenes and brand storytelling",
      tags: ["Authentic", "Natural", "Candid", "Emotional"],
    },
    {
      category: "Graphic Design",
      count: 203,
      description: "Modern graphics, logos, and visual identities",
      tags: ["Minimal", "Bold", "Abstract", "Corporate"],
    },
  ];

  const toolkits = [
    {
      name: "E-commerce Essentials",
      description: "Complete toolkit for online store visuals",
      tools: ["Product Generator", "Lifestyle Shots", "Brand Guidelines"],
      price: "Free",
    },
    {
      name: "Content Creator Pro",
      description: "Advanced tools for social media and marketing",
      tools: ["Video Templates", "Graphic Presets", "Trend Analysis"],
      price: "$29/month",
    },
    {
      name: "Agency Premium",
      description: "Professional suite for creative agencies",
      tools: ["Client Tools", "Team Collaboration", "White Label"],
      price: "$99/month",
    },
  ];

  const weeklyUpdates = [
    {
      date: "Dec 18, 2024",
      title: "New Sora AI Features Integration",
      type: "Feature Update",
      description: "Enhanced video generation with better motion control",
    },
    {
      date: "Dec 15, 2024",
      title: "50+ New Product Photography Prompts",
      type: "Content Update",
      description: "Premium product shots for luxury brands and electronics",
    },
    {
      date: "Dec 12, 2024",
      title: "Advanced Lighting Techniques Guide",
      type: "Tutorial",
      description: "Master professional lighting in your AI generations",
    },
  ];

  const tabs = [
    {
      id: "guides",
      label: "HOW-TO GUIDES",
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      id: "vault",
      label: "PROMPT VAULT",
      icon: <Archive className="h-4 w-4" />,
    },
    { id: "toolkits", label: "TOOLKITS", icon: <Wrench className="h-4 w-4" /> },
    {
      id: "updates",
      label: "WEEKLY FEED",
      icon: <Clock className="h-4 w-4" />,
    },
  ];

  return (
    <div className="container mx-auto px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-black mb-4">THE BRIEFCASE</h1>
        <p className="text-xl font-bold text-black">
          Your complete resource hub for AI content creation mastery
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-8">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              font-bold text-sm px-6 py-3 h-auto border-2 transition-all duration-200
              ${
                activeTab === tab.id
                  ? "bg-black border-black text-cream"
                  : "bg-neon-orange border-black text-black hover:bg-black hover:text-cream"
              }
            `}
          >
            {tab.icon}
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Content Sections */}
      {activeTab === "guides" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {howToGuides.map((guide, index) => (
            <Card key={index} className="bg-black border-2 border-cream">
              <CardHeader>
                <CardTitle className="text-lg font-black text-cream">
                  {guide.title}
                </CardTitle>
                <div className="flex gap-2">
                  <Badge className="bg-neon-orange text-black font-bold text-xs">
                    {guide.difficulty}
                  </Badge>
                  <Badge className="bg-cream text-black font-bold text-xs">
                    {guide.duration}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-cream mb-4">{guide.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-cream">
                    Updated {guide.updated}
                  </span>
                  <Button className="bg-neon-orange border-2 border-neon-orange text-black font-bold text-sm px-4 py-2 h-auto">
                    <Play className="h-4 w-4 mr-1" />
                    READ
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "vault" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promptVault.map((category, index) => (
            <Card key={index} className="bg-black border-2 border-cream">
              <CardHeader>
                <CardTitle className="text-lg font-black text-cream">
                  {category.category}
                </CardTitle>
                <Badge className="bg-neon-orange text-black font-bold text-sm w-fit">
                  {category.count} PROMPTS
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-cream mb-4">{category.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {category.tags.map((tag) => (
                    <Badge
                      key={tag}
                      className="bg-cream text-black font-bold text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button className="w-full bg-neon-orange border-2 border-neon-orange text-black font-bold text-sm py-2 h-auto">
                  <Download className="h-4 w-4 mr-1" />
                  ACCESS VAULT
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "toolkits" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolkits.map((toolkit, index) => (
            <Card key={index} className="bg-black border-2 border-cream">
              <CardHeader>
                <CardTitle className="text-lg font-black text-cream">
                  {toolkit.name}
                </CardTitle>
                <Badge
                  className={`font-bold text-sm w-fit ${
                    toolkit.price === "Free"
                      ? "bg-neon-orange text-black"
                      : "bg-cream text-black"
                  }`}
                >
                  {toolkit.price}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-cream mb-4">{toolkit.description}</p>
                <div className="space-y-2 mb-4">
                  {toolkit.tools.map((tool) => (
                    <div key={tool} className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-neon-orange" />
                      <span className="text-cream text-sm">{tool}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-neon-orange border-2 border-neon-orange text-black font-bold text-sm py-2 h-auto">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  GET TOOLKIT
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "updates" && (
        <div className="space-y-4">
          {weeklyUpdates.map((update, index) => (
            <Card key={index} className="bg-black border-2 border-cream">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-black text-cream mb-2">
                      {update.title}
                    </h3>
                    <p className="text-cream">{update.description}</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-neon-orange text-black font-bold text-xs mb-2">
                      {update.type}
                    </Badge>
                    <p className="text-sm text-cream">{update.date}</p>
                  </div>
                </div>
                <Button className="bg-neon-orange border-2 border-neon-orange text-black font-bold text-sm px-4 py-2 h-auto">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  VIEW UPDATE
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
