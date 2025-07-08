import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Bell } from "lucide-react";

export default function Updates() {
  const updates = [
    {
      date: "Jan 20, 2025",
      title: "O/S Creative System - Waiting List Now Open",
      type: "New Launch",
      description:
        "Join the waitlist for our revolutionary O/S Creative System - the next generation of AI-powered creative tools",
      isNew: true,
    },
    {
      date: "Jan 20, 2025",
      title: "Get Our Beginners Playbook to AI Creative for Free Here",
      type: "Free Resource",
      description:
        "Download our comprehensive beginner's guide to AI creative tools and start creating professional content today",
      isNew: true,
    },
    {
      date: "Jan 20, 2025",
      title: "Follow Us on Social @overnightsuccessllc",
      type: "Social Update",
      description:
        "Stay connected with the latest tips, tutorials, and creative inspiration by following us on social media",
      isNew: true,
    },
  ];

  return (
    <div className="min-h-screen bg-neon-orange font-sans">
      <div className="container mx-auto px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-black">
              <Bell className="h-8 w-8 text-neon-orange" />
            </div>
            <h1 className="text-6xl font-black text-black retro-text">
              UPDATES
            </h1>
          </div>
          <p className="text-xl font-bold text-black/80 max-w-2xl mx-auto">
            Stay up-to-date with the latest features, resources, and
            announcements from Overnight Success
          </p>
        </div>

        {/* Updates Feed */}
        <div className="max-w-4xl mx-auto space-y-6">
          {updates.map((update, index) => (
            <Card key={index} className="bg-black border-4 border-black">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className="bg-neon-orange text-black font-bold text-xs">
                        {update.type}
                      </Badge>
                      {update.isNew && (
                        <Badge className="bg-green-600 text-white font-bold text-xs animate-pulse">
                          NEW
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-2xl font-black text-cream mb-2">
                      {update.title}
                    </CardTitle>
                    <p className="text-sm text-cream/60 font-bold">
                      {update.date}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-cream font-medium leading-relaxed">
                  {update.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="bg-black border-4 border-black max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-3xl font-black text-cream mb-4">
                Never Miss an Update
              </h2>
              <p className="text-cream/80 mb-6">
                Stay connected with the latest developments in AI creative tools
                and exclusive resources.
              </p>
              <div className="flex justify-center gap-4">
                <a
                  href="https://twitter.com/overnightsuccessllc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-neon-orange border-2 border-neon-orange text-black font-bold px-6 py-3 rounded-lg hover:bg-black hover:text-neon-orange transition-all duration-200"
                >
                  Follow on Twitter
                </a>
                <a
                  href="https://instagram.com/overnightsuccessllc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent border-2 border-neon-orange text-neon-orange font-bold px-6 py-3 rounded-lg hover:bg-neon-orange hover:text-black transition-all duration-200"
                >
                  Follow on Instagram
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
