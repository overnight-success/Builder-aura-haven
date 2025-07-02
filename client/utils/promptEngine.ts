import { generatorData } from "../data/generators";

// Import ProcessedFile type
export interface ProcessedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  originalFile: File;
  jsonData?: string; // Base64 encoded JSON for images
  processingStatus: "pending" | "processing" | "complete" | "error";
}

// Types
export interface PromptAnalysis {
  quality: number;
  completeness: number;
  coherence: number;
  creativity: number;
  recommendations: string[];
}

export interface PromptEnhancement {
  original: string;
  enhanced: string;
  improvements: string[];
}

// Simple, bulletproof prompt generation engine
export class PromptEngine {
  private static instance: PromptEngine;

  public static getInstance(): PromptEngine {
    if (!PromptEngine.instance) {
      PromptEngine.instance = new PromptEngine();
    }
    return PromptEngine.instance;
  }

  // Generate SORA-optimized prompt using natural language structure
  generateFormula(
    generatorType: "product" | "lifestyle" | "graphic",
    selections: Record<string, string>,
    customInstructions: string = "",
    uploadedFiles: ProcessedFile[] = [],
  ): string {
    try {
      // Start with custom instructions as the foundation
      let prompt = "";
      if (customInstructions && customInstructions.trim()) {
        prompt = customInstructions.trim();
      }

      // Structure the prompt in SORA-friendly order: Environment -> Angle -> Mood -> Lighting -> Style
      const orderedCategories = [
        "environment",
        "angle",
        "mood",
        "lighting",
        "style",
      ];
      const categoryPhrases: string[] = [];

      // Build natural language phrases from selections
      orderedCategories.forEach((category) => {
        const value = selections[category];
        if (value && value.trim()) {
          switch (category) {
            case "environment":
              categoryPhrases.push(`in ${value.toLowerCase()}`);
              break;
            case "angle":
              categoryPhrases.push(`shot from ${value.toLowerCase()}`);
              break;
            case "mood":
              categoryPhrases.push(`capturing ${value.toLowerCase()}`);
              break;
            case "lighting":
              categoryPhrases.push(`using ${value.toLowerCase()}`);
              break;
            case "style":
              categoryPhrases.push(`shot in ${value.toLowerCase()} style`);
              break;
            default:
              // For any other categories, use generic approach
              categoryPhrases.push(value.toLowerCase());
          }
        }
      });

      // Combine custom instructions with structured selections
      if (prompt && categoryPhrases.length > 0) {
        prompt += ", " + categoryPhrases.join(", ");
      } else if (categoryPhrases.length > 0) {
        prompt = categoryPhrases.join(", ");
      }

      // Add image references if any
      const images = uploadedFiles.filter(
        (f) => f.type.startsWith("image/") && f.processingStatus === "complete",
      );
      if (images.length > 0 && prompt) {
        const names = images.map((f) => f.name.split(".")[0]);
        prompt += `, referencing visual style from ${names.join(", ")}`;
      }

      return (
        prompt ||
        "Add custom instructions and select categories to build your prompt"
      );
    } catch (error) {
      console.error("Error in generateFormula:", error);
      return "Add custom instructions and select categories to build your prompt";
    }
  }

  // Analyze prompt quality - SIMPLIFIED VERSION
  analyzePrompt(
    generatorType: string,
    selections: Record<string, string>,
    customInstructions: string,
    uploadedFiles: ProcessedFile[],
  ): PromptAnalysis {
    try {
      const selectedCount = Object.values(selections).filter(
        (v) => v && v.trim(),
      ).length;
      const hasCustom = Boolean(
        customInstructions && customInstructions.trim(),
      );
      const hasFiles = uploadedFiles.length > 0;

      const completeness = Math.min((selectedCount / 6) * 100, 100);
      let quality = completeness * 0.7;
      if (hasCustom) quality += 20;
      if (hasFiles) quality += 10;

      const recommendations = [];
      if (selectedCount < 3)
        recommendations.push("Add more category selections");
      if (!hasCustom) recommendations.push("Add custom instructions");
      if (!hasFiles) recommendations.push("Upload reference images");

      return {
        quality: Math.min(quality, 100),
        completeness,
        coherence: 85,
        creativity: hasCustom ? 75 : 50,
        recommendations,
      };
    } catch (error) {
      console.error("Error in analyzePrompt:", error);
      return {
        quality: 50,
        completeness: 0,
        coherence: 50,
        creativity: 50,
        recommendations: ["Error analyzing prompt"],
      };
    }
  }

  // Enhanced formula - SIMPLIFIED VERSION
  enhanceFormula(
    baseFormula: string,
    generatorType: string,
    quality: number,
  ): PromptEnhancement {
    try {
      let enhanced = baseFormula;
      const improvements = [];

      if (quality >= 80) {
        enhanced += ", award-winning quality";
        improvements.push("Added quality markers");
      }

      enhanced += ", professional grade, commercial ready";
      improvements.push("Added professional specifications");

      return {
        original: baseFormula,
        enhanced,
        improvements,
      };
    } catch (error) {
      console.error("Error in enhanceFormula:", error);
      return {
        original: baseFormula,
        enhanced: baseFormula,
        improvements: [],
      };
    }
  }

  // Get image data - SIMPLIFIED VERSION
  getImageJSONData(files: ProcessedFile[]): any[] {
    try {
      return files
        .filter(
          (f) =>
            f.type.startsWith("image/") &&
            f.jsonData &&
            f.processingStatus === "complete",
        )
        .map((f) => {
          try {
            const data = JSON.parse(f.jsonData!);
            return {
              name: data.name || f.name,
              data: data.data,
            };
          } catch {
            return { name: f.name, data: null };
          }
        });
    } catch (error) {
      console.error("Error in getImageJSONData:", error);
      return [];
    }
  }

  // Get complete SORA data - SIMPLIFIED VERSION
  getCompleteSORAData(
    generatorType: "product" | "lifestyle" | "graphic",
    selections: Record<string, string>,
    customInstructions: string = "",
    uploadedFiles: ProcessedFile[] = [],
  ): { mainPrompt: string; imageData: any[]; combinedPrompt: string } {
    try {
      const mainPrompt = this.generateFormula(
        generatorType,
        selections,
        customInstructions,
        uploadedFiles,
      );
      const imageData = this.getImageJSONData(uploadedFiles);

      return {
        mainPrompt,
        imageData,
        combinedPrompt: mainPrompt,
      };
    } catch (error) {
      console.error("Error in getCompleteSORAData:", error);
      const fallback =
        "Add custom instructions and select categories to build your prompt";
      return {
        mainPrompt: fallback,
        imageData: [],
        combinedPrompt: fallback,
      };
    }
  }
}

// Export singleton instance
export const promptEngine = PromptEngine.getInstance();
