import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { usePromptGenerator } from "../contexts/PromptGeneratorContext";
import { Heart, Trash2, Copy, Star, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface FavoritePromptsProps {
  onCopy: (text: string) => void;
}

export function FavoritePrompts({ onCopy }: FavoritePromptsProps) {
  const { state, actions } = usePromptGenerator();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCopyFavorite = async (formula: string) => {
    try {
      await onCopy(formula);
    } catch (error) {
      console.error("Failed to copy favorite:", error);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getQualityColor = (quality: number) => {
    if (quality >= 80) return "text-green-400";
    if (quality >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  if (state.favorites.length === 0) return null;

  return (
    <Card className="bg-black border-2 border-neon-orange mt-6">
      <CardHeader className="pb-3">
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full h-auto p-0 hover:bg-transparent"
        >
          <CardTitle className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <Heart className="h-5 w-5 text-neon-orange" />
              <span className="text-lg font-black text-cream">
                FAVORITE PROMPTS
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-black border-2 border-neon-orange text-cream font-bold text-xs">
                {state.favorites.length}
              </Badge>
              <Star className="h-4 w-4 text-neon-orange" />
            </div>
          </CardTitle>
        </Button>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-3">
          <div className="max-h-64 overflow-y-auto space-y-3">
            {state.favorites.map((fav) => (
              <div
                key={fav.id}
                className="p-4 bg-black border border-neon-orange/50 rounded-lg hover:border-neon-orange transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-neon-orange text-black font-bold text-xs">
                        {fav.generator.toUpperCase()}
                      </Badge>
                      <span
                        className={cn(
                          "text-xs font-bold",
                          getQualityColor(fav.quality),
                        )}
                      >
                        {Math.round(fav.quality)}% QUALITY
                      </span>
                    </div>
                    <p className="text-sm font-medium text-cream line-clamp-2 leading-tight">
                      {fav.formula}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-cream/60">
                    <Clock className="h-3 w-3" />
                    {formatDate(fav.timestamp)}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleCopyFavorite(fav.formula)}
                      className="bg-black border border-neon-orange text-cream font-bold text-xs px-2 py-1 h-auto hover:bg-neon-orange hover:text-black transition-all duration-200"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button
                      onClick={() => actions.removeFavorite(fav.id)}
                      className="bg-black border border-red-500 text-red-400 font-bold text-xs px-2 py-1 h-auto hover:bg-red-500 hover:text-black transition-all duration-200"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {state.favorites.length >= 20 && (
            <div className="text-xs text-cream/60 text-center pt-2 border-t border-cream/20">
              Showing latest 20 favorites
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}
