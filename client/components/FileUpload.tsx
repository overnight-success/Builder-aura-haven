import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Upload,
  File,
  X,
  Check,
  Image,
  Video,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProcessedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  originalFile: File;
  jsonData?: string; // Base64 encoded JSON for images
  processingStatus: "pending" | "processing" | "complete" | "error";
}

interface FileUploadProps {
  files: ProcessedFile[];
  onFilesChange: (files: ProcessedFile[]) => void;
  stepNumber: number;
  isCompleted: boolean;
}

export function FileUpload({
  files,
  onFilesChange,
  stepNumber,
  isCompleted,
}: FileUploadProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Convert image file to base64 JSON format
  const processImageToJSON = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const base64 = reader.result as string;
          const imageData = {
            name: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
            type: file.type,
            size: file.size,
            data: base64,
            metadata: {
              lastModified: file.lastModified,
              uploadTimestamp: Date.now(),
              optimizedForSora: true,
            },
          };
          resolve(JSON.stringify(imageData));
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };

  // Process a single file
  const processSingleFile = async (file: File): Promise<ProcessedFile> => {
    const processedFile: ProcessedFile = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      size: file.size,
      type: file.type,
      originalFile: file,
      processingStatus: "pending",
    };

    // Start processing for images
    if (file.type.startsWith("image/")) {
      processedFile.processingStatus = "processing";
      try {
        processedFile.jsonData = await processImageToJSON(file);
        processedFile.processingStatus = "complete";
      } catch (error) {
        console.error("Failed to process image:", error);
        processedFile.processingStatus = "error";
      }
    } else {
      // For videos, mark as complete without JSON processing
      processedFile.processingStatus = "complete";
    }

    return processedFile;
  };

  // Process multiple files
  const processFiles = async (newFiles: File[]) => {
    setIsProcessing(true);
    try {
      const processedNewFiles = await Promise.all(
        newFiles.map(processSingleFile),
      );
      onFilesChange([...files, ...processedNewFiles]);
    } catch (error) {
      console.error("Failed to process files:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      (file) =>
        file.type.startsWith("image/") || file.type.startsWith("video/"),
    );

    if (droppedFiles.length > 0) {
      processFiles(droppedFiles);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []).filter(
      (file) =>
        file.type.startsWith("image/") || file.type.startsWith("video/"),
    );

    if (selectedFiles.length > 0) {
      processFiles(selectedFiles);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange(newFiles);
  };

  const getFileIcon = (file: ProcessedFile) => {
    if (file.processingStatus === "processing") {
      return <Loader2 className="h-4 w-4 animate-spin text-neon-orange" />;
    }
    if (file.type.startsWith("image/")) {
      return (
        <div className="relative">
          <Image className="h-4 w-4" />
          {file.jsonData && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full" />
          )}
        </div>
      );
    }
    if (file.type.startsWith("video/")) {
      return <Video className="h-4 w-4" />;
    }
    return <File className="h-4 w-4" />;
  };

  const getProcessingStatus = (file: ProcessedFile) => {
    switch (file.processingStatus) {
      case "processing":
        return "Converting to JSON...";
      case "complete":
        return file.jsonData ? "JSON Ready for SORA" : "Ready";
      case "error":
        return "Processing Failed";
      default:
        return "Pending";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="relative">
      <Card
        className={cn(
          "bg-black border-2 transition-all duration-300",
          isCompleted
            ? "border-neon-orange shadow-lg"
            : "border-cream hover:border-neon-orange",
          isExpanded && "border-neon-orange",
        )}
      >
        <CardHeader className="pb-3">
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full h-auto p-4 hover:bg-transparent group"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300",
                    isCompleted
                      ? "bg-neon-orange border-neon-orange text-black"
                      : "border-cream bg-black text-cream group-hover:border-neon-orange",
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-lg font-black">{stepNumber}</span>
                  )}
                </div>
                <div className="p-3 rounded-lg bg-black border-2 border-neon-orange">
                  <div className="text-neon-orange">
                    <Upload className="h-5 w-5" />
                  </div>
                </div>
                <div className="text-left min-w-0 flex-1">
                  <h3 className="text-lg font-black text-cream tracking-tight truncate">
                    Reference Files
                  </h3>
                  {files.length > 0 && (
                    <p className="text-sm font-bold text-neon-orange truncate mt-1">
                      {files.length} file{files.length > 1 ? "s" : ""} uploaded
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {files.length > 0 && (
                  <Badge
                    variant="secondary"
                    className="text-xs px-2 py-0.5 whitespace-nowrap"
                  >
                    {files.length} files
                  </Badge>
                )}
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
              </div>
            </div>
          </Button>
        </CardHeader>

        {isExpanded && (
          <CardContent className="pt-0 space-y-4">
            {/* Upload Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={cn(
                "border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300",
                isProcessing
                  ? "border-neon-orange bg-neon-orange/5 cursor-wait"
                  : isDragOver
                    ? "border-primary bg-primary/5 cursor-pointer"
                    : "border-border/30 hover:border-border/50 hover:bg-muted/20 cursor-pointer",
              )}
              onClick={() => !isProcessing && fileInputRef.current?.click()}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-8 w-8 mx-auto mb-2 text-neon-orange animate-spin" />
                  <p className="text-sm font-medium text-neon-orange mb-1">
                    Converting images to JSON for SORA...
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Please wait while we optimize your files
                  </p>
                </>
              ) : (
                <>
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm font-medium text-foreground mb-1">
                    Upload reference images or videos
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Images will be converted to JSON • Drag & drop or click to
                    browse
                  </p>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileSelect}
                className="hidden"
                disabled={isProcessing}
              />
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {files.map((file, index) => (
                  <div
                    key={file.id}
                    className={cn(
                      "flex items-center justify-between p-2 rounded-md border transition-all duration-200",
                      file.processingStatus === "complete" && file.jsonData
                        ? "bg-green-500/10 border-green-500/30"
                        : file.processingStatus === "error"
                          ? "bg-red-500/10 border-red-500/30"
                          : "bg-muted/30 border-border/30",
                    )}
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      {getFileIcon(file)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {file.name}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(file.size)}
                          </p>
                          <p
                            className={cn(
                              "text-xs font-medium",
                              file.processingStatus === "complete" &&
                                file.jsonData
                                ? "text-green-400"
                                : file.processingStatus === "error"
                                  ? "text-red-400"
                                  : "text-neon-orange",
                            )}
                          >
                            {getProcessingStatus(file)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => removeFile(index)}
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 hover:bg-destructive/20 hover:text-destructive"
                      disabled={file.processingStatus === "processing"}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="text-xs text-muted-foreground">
              🎯 Supported: JPG, PNG, GIF, MP4, MOV, WebM
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
