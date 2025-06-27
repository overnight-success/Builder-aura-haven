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

  // Generate optimized prompt formula
  generateFormula(
    generatorType: "product" | "lifestyle" | "graphic",
    selections: Record<string, string>,
    customInstructions: string = "",
    uploadedFiles: ProcessedFile[] = [],
  ): string {
    const config = generatorData[generatorType];
    const components: string[] = [];

    // Process selections with contextual optimization
    Object.entries(selections).forEach(([category, value]) => {
      if (!value) return;

      const optimizedComponent = this.optimizeComponent(
        generatorType,
        category,
        value,
      );
      components.push(optimizedComponent);
    });

    // Add custom instructions with smart integration
    if (customInstructions.trim()) {
      const processedInstructions =
        this.processCustomInstructions(customInstructions);
      components.push(processedInstructions);
    }

    // Add file references with metadata
    if (uploadedFiles.length > 0) {
      const fileReference = this.generateFileReference(uploadedFiles);
      components.push(fileReference);
    }

    // Apply context-aware enhancements
    const baseFormula = components.join(", ");
    return this.applyContextualEnhancements(
      generatorType,
      baseFormula,
      selections,
    );
  }

  // Optimize individual component based on context
  private optimizeComponent(
    generatorType: string,
    category: string,
    value: string,
  ): string {
    const optimizations = {
      product: {
        style: (val: string) => `featuring ${val.toLowerCase()}`,
        background: (val: string) => `with ${val.toLowerCase()} backdrop`,
        lighting: (val: string) => `illuminated by ${val.toLowerCase()}`,
        angle: (val: string) => `captured from ${val.toLowerCase()}`,
        mood: (val: string) => `conveying ${val.toLowerCase()}`,
        enhancement: (val: string) => `enhanced with ${val.toLowerCase()}`,
      },
      lifestyle: {
        scene: (val: string) => `depicting ${val.toLowerCase()}`,
        people: (val: string) => `featuring ${val.toLowerCase()}`,
        environment: (val: string) => `set in ${val.toLowerCase()}`,
        mood: (val: string) => `radiating ${val.toLowerCase()}`,
        lighting: (val: string) => `bathed in ${val.toLowerCase()}`,
        style: (val: string) => `shot in ${val.toLowerCase()} approach`,
      },
      graphic: {
        style: (val: string) => `designed with ${val.toLowerCase()}`,
        layout: (val: string) => `structured as ${val.toLowerCase()}`,
        color: (val: string) => `using ${val.toLowerCase()}`,
        typography: (val: string) => `featuring ${val.toLowerCase()}`,
        elements: (val: string) => `incorporating ${val.toLowerCase()}`,
        purpose: (val: string) => `optimized for ${val.toLowerCase()}`,
      },
    };

    const categoryOptimizations =
      optimizations[generatorType as keyof typeof optimizations];
    const optimizer =
      categoryOptimizations?.[category as keyof typeof categoryOptimizations];

    return optimizer ? optimizer(value) : value.toLowerCase();
  }

  // Process custom instructions for better integration
  private processCustomInstructions(instructions: string): string {
    // Clean and optimize custom instructions
    let processed = instructions.trim();

    // Add connecting words if needed
    if (
      !processed.startsWith("with") &&
      !processed.startsWith("featuring") &&
      !processed.startsWith("including")
    ) {
      processed = `with ${processed}`;
    }

    // Ensure proper sentence flow
    if (!processed.endsWith(".") && !processed.endsWith(",")) {
      processed = `${processed}`;
    }

    return processed;
  }

  // Generate smart file reference with embedded JSON data
  private generateFileReference(files: ProcessedFile[]): string {
    const imageFiles = files.filter((f) => f.type.startsWith("image/"));
    const videoFiles = files.filter((f) => f.type.startsWith("video/"));

    const references: string[] = [];

    if (imageFiles.length > 0) {
      const processedImages = imageFiles.filter(
        (f) => f.jsonData && f.processingStatus === "complete",
      );
      const pendingImages = imageFiles.filter(
        (f) => !f.jsonData || f.processingStatus !== "complete",
      );

      if (processedImages.length > 0) {
        // Include JSON data directly in the prompt for SORA
        const imageJsonData = processedImages.map((f) => {
          try {
            const jsonData = JSON.parse(f.jsonData!);
            return {
              name: jsonData.name,
              type: jsonData.type,
              data: jsonData.data, // Base64 image data
              metadata: jsonData.metadata,
            };
          } catch {
            return { name: f.name, error: "JSON parsing failed" };
          }
        });

        references.push(
          `[SORA_REFERENCE_IMAGES: ${JSON.stringify({
            images: imageJsonData,
            count: processedImages.length,
            format: "base64_embedded",
            ai_instruction:
              "Use these reference images to enhance visual understanding and generation accuracy for SORA AI",
            processing_metadata: {
              converted_at: Date.now(),
              optimized_for: ["sora", "chatgpt", "midjourney"],
              quality: "high_resolution",
            },
          })}]`,
        );
      }

      if (pendingImages.length > 0) {
        references.push(
          `referencing ${pendingImages.length} image${pendingImages.length > 1 ? "s" : ""} (${pendingImages.map((f) => f.name.replace(/\.[^/.]+$/, "")).join(", ")}) - processing`,
        );
      }
    }

    if (videoFiles.length > 0) {
      references.push(
        `including ${videoFiles.length} video reference${videoFiles.length > 1 ? "s" : ""} (${videoFiles.map((f) => f.name).join(", ")})`,
      );
    }

    return references.join(" and ");
  }

  // Apply contextual enhancements based on generator type
  private applyContextualEnhancements(
    generatorType: string,
    baseFormula: string,
    selections: Record<string, string>,
  ): string {
    let enhanced = baseFormula;

    // Add quality modifiers
    const qualityModifiers = {
      product:
        "professional product photography, commercial quality, sharp focus, high resolution",
      lifestyle:
        "authentic lifestyle photography, natural lighting, genuine moments, high quality",
      graphic:
        "professional graphic design, modern aesthetics, balanced composition, print-ready quality",
    };

    enhanced += `, ${qualityModifiers[generatorType as keyof typeof qualityModifiers]}`;

    // Add technical specifications
    enhanced +=
      ", 4K resolution, professional grade, optimized for commercial use";

    // Add contextual improvements based on combinations
    const improvementSuggestions = this.generateImprovementSuggestions(
      generatorType,
      selections,
    );
    if (improvementSuggestions.length > 0) {
      enhanced += `, ${improvementSuggestions.join(", ")}`;
    }

    return enhanced;
  }

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
