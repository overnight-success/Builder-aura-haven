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

// Advanced prompt generation engine
export class PromptEngine {
  private static instance: PromptEngine;

  public static getInstance(): PromptEngine {
    if (!PromptEngine.instance) {
      PromptEngine.instance = new PromptEngine();
    }
    return PromptEngine.instance;
  }

  // Generate SORA-optimized prompt formula
  generateFormula(
    generatorType: "product" | "lifestyle" | "graphic",
    selections: Record<string, string>,
    customInstructions: string = "",
    uploadedFiles: ProcessedFile[] = [],
  ): string {
    const promptParts: string[] = [];

    // 1. Start with custom instructions if provided
    if (customInstructions.trim()) {
      promptParts.push(customInstructions.trim());
    }

    // 2. Add category selections in natural language
    const categories = Object.entries(selections).filter(([_, value]) => value);
    categories.forEach(([category, value]) => {
      const naturalText = this.convertToNaturalLanguage(
        generatorType,
        category,
        value,
      );
      if (naturalText) promptParts.push(naturalText);
    });

    // 3. Add basic SORA specifications
    promptParts.push(
      "cinematic quality, 4K resolution, professional video production",
    );

    // 4. Create main prompt
    const mainPrompt = promptParts.join(", ");

    // 5. Add image JSON data if available
    const imageData = this.getImageJSONData(uploadedFiles);
    if (imageData.length > 0) {
      const jsonData = this.createCleanJSONSection(imageData);
      return `${mainPrompt} ${jsonData}`;
    }

    return mainPrompt;
  }

  // Convert category selections to natural language
  private convertToNaturalLanguage(
    generatorType: string,
    category: string,
    value: string,
  ): string {
    const conversions: Record<
      string,
      Record<string, (val: string) => string>
    > = {
      product: {
        style: (val) => `styled as ${val.toLowerCase()}`,
        background: (val) => `with ${val.toLowerCase()} background`,
        lighting: (val) => `using ${val.toLowerCase()}`,
        angle: (val) => `shot from ${val.toLowerCase()}`,
        mood: (val) => `${val.toLowerCase()} aesthetic`,
        enhancement: (val) => `enhanced with ${val.toLowerCase()}`,
      },
      lifestyle: {
        scene: (val) => `${val.toLowerCase()} scene`,
        people: (val) => `featuring ${val.toLowerCase()}`,
        environment: (val) => `in ${val.toLowerCase()}`,
        mood: (val) => `${val.toLowerCase()} mood`,
        lighting: (val) => `${val.toLowerCase()} lighting`,
        style: (val) => `${val.toLowerCase()} style`,
      },
      graphic: {
        style: (val) => `${val.toLowerCase()} design`,
        layout: (val) => `${val.toLowerCase()} layout`,
        color: (val) => `${val.toLowerCase()} colors`,
        typography: (val) => `${val.toLowerCase()} typography`,
        elements: (val) => `with ${val.toLowerCase()}`,
        purpose: (val) => `for ${val.toLowerCase()}`,
      },
    };

    const typeConversions = conversions[generatorType];
    const converter = typeConversions?.[category];
    return converter ? converter(value) : value.toLowerCase();
  }

  // Create clean JSON section for SORA
  private createCleanJSONSection(imageData: any[]): string {
    const cleanData = imageData.map((img) => ({
      name: img.name,
      data: img.data,
    }));

    return `[REFERENCE_IMAGES:${JSON.stringify(cleanData)}]`;
  }

  // Old method removed - using simpler convertToNaturalLanguage instead
  // Old complex methods removed - using simpler approach

  // Get SORA-specific technical specifications
  private getSORASpecs(generatorType: string): string {
    const baseSpecs =
      "cinematic quality, 4K resolution, professional cinematography";

    const typeSpecs = {
      product: "commercial photography style, product focus, marketing ready",
      lifestyle: "documentary style, natural movement, authentic moments",
      graphic: "motion graphics style, clean animation, brand focused",
    };

    const specificSpecs = typeSpecs[generatorType as keyof typeof typeSpecs];
    return `${baseSpecs}, ${specificSpecs}`;
  }

  // Get complete SORA prompt data (main prompt + separate JSON data)
  getCompleteSORAData(
    generatorType: "product" | "lifestyle" | "graphic",
    selections: Record<string, string>,
    customInstructions: string = "",
    uploadedFiles: ProcessedFile[] = [],
  ): { mainPrompt: string; imageData: any[]; combinedPrompt: string } {
    const imageData = this.getImageJSONData(uploadedFiles);
    const fullPrompt = this.generateFormula(
      generatorType,
      selections,
      customInstructions,
      uploadedFiles,
    );

    return {
      mainPrompt: fullPrompt.split("[REFERENCE_IMAGES:")[0].trim(), // Clean version without JSON
      imageData,
      combinedPrompt: fullPrompt, // Full version with JSON data
    };
  }

  // Get JSON data separately for technical processing (not mixed in main prompt)
  getImageJSONData(files: ProcessedFile[]): any[] {
    const processedImages = files.filter(
      (f) =>
        f.type.startsWith("image/") &&
        f.jsonData &&
        f.processingStatus === "complete",
    );

    return processedImages.map((f) => {
      try {
        const jsonData = JSON.parse(f.jsonData!);
        return {
          name: jsonData.name,
          type: jsonData.type,
          data: jsonData.data,
          metadata: {
            ...jsonData.metadata,
            sora_optimized: true,
            processing_timestamp: Date.now(),
          },
        };
      } catch {
        return { name: f.name, error: "JSON parsing failed" };
      }
    });
  }

  // This method is no longer needed as formatting is handled in formatForSORA
  // Keeping for compatibility but not used in new flow

  // Generate smart improvement suggestions
  private generateImprovementSuggestions(
    generatorType: string,
    selections: Record<string, string>,
  ): string[] {
    const suggestions: string[] = [];

    // Context-aware suggestions based on selections
    if (generatorType === "product") {
      if (
        selections.style?.includes("luxury") ||
        selections.mood?.includes("premium")
      ) {
        suggestions.push("premium materials emphasis");
      }
      if (selections.lighting?.includes("dramatic")) {
        suggestions.push("enhanced shadow depth");
      }
    }

    if (generatorType === "lifestyle") {
      if (
        selections.mood?.includes("authentic") ||
        selections.style?.includes("candid")
      ) {
        suggestions.push("natural expressions");
      }
      if (selections.lighting?.includes("golden hour")) {
        suggestions.push("warm color temperature");
      }
    }

    if (generatorType === "graphic") {
      if (
        selections.style?.includes("modern") ||
        selections.style?.includes("clean")
      ) {
        suggestions.push("minimalist approach");
      }
      if (selections.color?.includes("contrast")) {
        suggestions.push("bold color relationships");
      }
    }

    return suggestions;
  }

  // Analyze prompt quality
  analyzePrompt(
    generatorType: string,
    selections: Record<string, string>,
    customInstructions: string,
    uploadedFiles: ProcessedFile[],
  ): PromptAnalysis {
    const selectedCount = Object.values(selections).filter(Boolean).length;
    const totalCategories = Object.keys(
      generatorData[generatorType as keyof typeof generatorData].categories,
    ).length;

    // Calculate metrics
    const completeness = (selectedCount / totalCategories) * 100;
    const hasCustom = customInstructions.trim().length > 0;
    const hasFiles = uploadedFiles.length > 0;
    const processedImages = uploadedFiles.filter(
      (f) => f.jsonData && f.processingStatus === "complete",
    ).length;

    // Quality score calculation
    let quality = completeness * 0.6; // Base from completeness
    if (hasCustom) quality += 20; // Bonus for custom instructions
    if (hasFiles) quality += 15; // Bonus for reference files
    if (processedImages > 0) quality += 10; // Extra bonus for processed JSON images
    if (selectedCount >= totalCategories) quality += 5; // Completeness bonus

    // Coherence analysis
    const coherence = this.analyzeCoherence(selections);

    // Creativity score
    const creativity = this.analyzeCreativity(selections, customInstructions);

    // Generate recommendations
    const recommendations = this.generateRecommendations(
      generatorType,
      selections,
      customInstructions,
      uploadedFiles,
    );

    return {
      quality: Math.min(quality, 100),
      completeness,
      coherence,
      creativity,
      recommendations,
    };
  }

  // Analyze coherence between selections
  private analyzeCoherence(selections: Record<string, string>): number {
    // Simple coherence analysis - could be enhanced with NLP
    const values = Object.values(selections).filter(Boolean);
    if (values.length < 2) return 100;

    // Look for consistent themes
    const themes = {
      luxury: ["luxury", "premium", "elegant", "sophisticated"],
      modern: ["modern", "clean", "minimalist", "contemporary"],
      vintage: ["vintage", "retro", "classic", "traditional"],
      bold: ["bold", "dramatic", "vibrant", "dynamic"],
    };

    let coherenceScore = 0;
    Object.values(themes).forEach((themeWords) => {
      const matches = values.filter((value) =>
        themeWords.some((word) => value.toLowerCase().includes(word)),
      ).length;

      if (matches > 1) {
        coherenceScore += matches * 10;
      }
    });

    return Math.min(coherenceScore + 50, 100); // Base 50 + theme bonuses
  }

  // Analyze creativity level
  private analyzeCreativity(
    selections: Record<string, string>,
    customInstructions: string,
  ): number {
    let creativity = 50; // Base creativity

    // Check for unique combinations
    const values = Object.values(selections).filter(Boolean);
    const uniqueWords = new Set(
      values
        .join(" ")
        .toLowerCase()
        .split(" ")
        .filter((word) => word.length > 3),
    );

    creativity += Math.min(uniqueWords.size * 2, 30);

    // Bonus for custom instructions
    if (customInstructions.trim().length > 0) {
      creativity += 20;
    }

    return Math.min(creativity, 100);
  }

  // Generate personalized recommendations
  private generateRecommendations(
    generatorType: string,
    selections: Record<string, string>,
    customInstructions: string,
    uploadedFiles: ProcessedFile[],
  ): string[] {
    const recommendations: string[] = [];
    const selectedCount = Object.values(selections).filter(Boolean).length;

    // Completeness recommendations
    if (selectedCount < 4) {
      recommendations.push(
        "Add more category selections for a complete prompt",
      );
    }

    // Custom instructions recommendations
    if (!customInstructions.trim()) {
      recommendations.push(
        "Add custom instructions for specific details and requirements",
      );
    }

    // File upload recommendations
    const processedImages = uploadedFiles.filter(
      (f) => f.jsonData && f.processingStatus === "complete",
    ).length;
    const pendingImages = uploadedFiles.filter(
      (f) => f.type.startsWith("image/") && f.processingStatus !== "complete",
    ).length;

    if (uploadedFiles.length === 0) {
      recommendations.push(
        "Upload reference images for JSON conversion and enhanced SORA AI understanding",
      );
    } else if (pendingImages > 0) {
      recommendations.push(
        "Some images are still processing - wait for JSON conversion to complete",
      );
    } else if (processedImages > 0) {
      recommendations.push(
        `${processedImages} image${processedImages > 1 ? "s" : ""} successfully converted to JSON for SORA`,
      );
    }

    // Context-specific recommendations
    if (generatorType === "product" && !selections.lighting) {
      recommendations.push(
        "Select lighting setup for professional product photography",
      );
    }

    if (generatorType === "lifestyle" && !selections.mood) {
      recommendations.push(
        "Choose emotional mood for authentic lifestyle content",
      );
    }

    if (generatorType === "graphic" && !selections.color) {
      recommendations.push("Define color palette for cohesive graphic design");
    }

    return recommendations.slice(0, 3); // Limit to top 3 recommendations
  }

  // Utility function to format file size
  private formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  // Enhanced formula with smart suggestions
  enhanceFormula(
    baseFormula: string,
    generatorType: string,
    quality: number,
  ): PromptEnhancement {
    let enhanced = baseFormula;
    const improvements: string[] = [];

    // Add quality-based enhancements
    if (quality >= 80) {
      enhanced += ", masterpiece quality, award-winning";
      improvements.push("Added quality excellence markers");
    }

    if (quality >= 60) {
      enhanced += ", professional grade, commercial use";
      improvements.push("Added professional quality indicators");
    }

    // Add technical specifications
    enhanced += ", ultra-high resolution, perfect composition";
    improvements.push("Added technical quality specifications");

    // Add context-aware style enhancements
    const styleEnhancements = {
      product: "studio-quality lighting, perfect focus, commercial appeal",
      lifestyle: "natural authenticity, emotional resonance, lifestyle appeal",
      graphic: "design excellence, visual impact, brand-ready quality",
    };

    enhanced += `, ${styleEnhancements[generatorType as keyof typeof styleEnhancements]}`;
    improvements.push(`Added ${generatorType}-specific enhancements`);

    return {
      original: baseFormula,
      enhanced,
      improvements,
    };
  }
}

// Export singleton instance
export const promptEngine = PromptEngine.getInstance();
