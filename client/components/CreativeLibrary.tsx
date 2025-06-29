import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BookOpen, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

export function CreativeLibrary() {
  const openInNewTab = () => {
    window.open(
      "https://brass-particle-e85.notion.site/Inspiration-21b4ae31069d8105b5f0dc7c9352c292",
      "_blank",
    );
  };

  return (
    <div className="min-h-screen bg-neon-orange">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="h-8 w-8 text-black" />
            <h1 className="text-4xl lg:text-5xl font-black text-black">
              CREATIVE LIBRARY
            </h1>
          </div>
          <p className="text-black text-lg font-medium max-w-2xl mx-auto">
            Explore curated inspiration, creative references, and visual
            resources to fuel your next project
          </p>
          <Button
            onClick={openInNewTab}
            className="mt-4 bg-black border-2 border-black text-cream font-bold hover:bg-cream hover:text-black transition-all duration-200"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open in New Tab
          </Button>
        </div>

        {/* Embedded Notion Page */}
        <Card className="bg-black border-4 border-black shadow-xl">
          <CardHeader className="bg-black border-b-2 border-cream">
            <CardTitle className="text-cream text-xl font-black flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-neon-orange" />
              Inspiration Gallery
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative w-full" style={{ height: "80vh" }}>
              <iframe
                src="https://brass-particle-e85.notion.site/Inspiration-21b4ae31069d8105b5f0dc7c9352c292"
                className="w-full h-full border-0 rounded-b-lg"
                title="Creative Library - Inspiration"
                allow="fullscreen"
                loading="lazy"
                style={{
                  minHeight: "600px",
                  background: "#fff",
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-black font-medium">
            Having trouble viewing the content?
            <Button
              onClick={openInNewTab}
              variant="link"
              className="text-black underline font-bold hover:text-black/80 p-0 ml-2"
            >
              Click here to open in a new tab
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
