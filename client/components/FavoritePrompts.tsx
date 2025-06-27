import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Heart, Trash2, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface FavoritePrompt {
  id: string;
  formula: string;
  timestamp: number;
  components: Record<string, string>;
  customInstructions?: string;
  files?: string[];
}

interface FavoritePromptsProps {
  onCopy: (text: string) => void;
}

export function FavoritePrompts({ onCopy }: FavoritePromptsProps) {
  const [favorites, setFavorites] = useState<FavoritePrompt[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("favoritePrompts");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const saveFavorite = (prompt: Omit<FavoritePrompt, "id" | "timestamp">) => {
    const newFavorite: FavoritePrompt = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      ...prompt,
    };

    const updatedFavorites = [newFavorite, ...favorites].slice(0, 10); // Keep only 10 most recent
    setFavorites(updatedFavorites);
    localStorage.setItem("favoritePrompts", JSON.stringify(updatedFavorites));
  };

  const removeFavorite = (id: string) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favoritePrompts", JSON.stringify(updatedFavorites));
  };

  const handleCopyFavorite = async (formula: string) => {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(formula);
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement("textarea");
        textArea.value = formula;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
          document.execCommand("copy");
        } catch (execError) {
          console.error("Fallback copy failed:", execError);
          alert(`Copy failed. Please manually copy this text:\n\n${formula}`);
          return;
        } finally {
          document.body.removeChild(textArea);
        }
      }
    } catch (error) {
      console.error("Failed to copy:", error);
      alert(`Copy failed. Please manually copy this text:\n\n${formula}`);
    }
  };

  // Export this function to be used by parent component
  window.saveFavoritePrompt = saveFavorite;

  if (favorites.length === 0) return null;

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
              <Heart className="h-6 w-6 text-neon-orange" />
              <span className="text-xl font-black text-cream">
                FAVORITE PROMPTS
              </span>
            </div>
            <Badge className="bg-black border-2 border-neon-orange text-cream font-bold">
              {favorites.length}
            </Badge>
          </CardTitle>
        </Button>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-3">
          {favorites.map((fav) => (
            <div
              key={fav.id}
              className="p-4 bg-black border border-neon-orange rounded-lg"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-cream truncate mb-2">
                    {fav.formula}
                  </p>
                  <p className="text-xs text-neon-orange">
                    {new Date(fav.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleCopyFavorite(fav.formula)}
                    className="btn-shiny-black p-2 h-auto"
                  >
                    <Copy className="h-4 w-4 text-neon-orange" />
                  </Button>
                  <Button
                    onClick={() => removeFavorite(fav.id)}
                    className="btn-shiny-black p-2 h-auto"
                  >
                    <Trash2 className="h-4 w-4 text-neon-orange" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  );
}
