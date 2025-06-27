import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Upload, File, X, Check, Image, Video } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
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
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      onFilesChange([...files, ...droppedFiles]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []).filter(
      (file) =>
        file.type.startsWith("image/") || file.type.startsWith("video/"),
    );

    if (selectedFiles.length > 0) {
      onFilesChange([...files, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange(newFiles);
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <Image className="h-4 w-4" />;
    }
    if (file.type.startsWith("video/")) {
      return <Video className="h-4 w-4" />;
    }
    return <File className="h-4 w-4" />;
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
            ? "border-primary/50 shadow-lg shadow-primary/10"
            : "hover:border-border/70",
          isExpanded && "border-primary/30",
        )}
      >
        <CardHeader className="pb-3">
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full h-auto p-0 hover:bg-transparent group"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300",
                    isCompleted
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-border/50 group-hover:border-primary/50",
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span className="text-sm font-semibold">{stepNumber}</span>
                  )}
                </div>
                <div
                  className={cn(
                    "p-2 rounded-lg transition-all duration-300",
                    isCompleted
                      ? "bg-primary/20 text-primary"
                      : "bg-muted/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary",
                  )}
                >
                  <Upload className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <h3
                    className={cn(
                      "font-semibold transition-colors duration-300",
                      isCompleted
                        ? "text-primary"
                        : "text-foreground group-hover:text-primary",
                    )}
                  >
                    Reference Files
                  </h3>
                  {files.length > 0 && (
                    <p className="text-sm text-muted-foreground">
                      {files.length} file{files.length > 1 ? "s" : ""} uploaded
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {files.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {files.length} files
                  </Badge>
                )}
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
                "border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 cursor-pointer",
                isDragOver
                  ? "border-primary bg-primary/5"
                  : "border-border/30 hover:border-border/50 hover:bg-muted/20",
              )}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm font-medium text-foreground mb-1">
                Upload reference images or videos
              </p>
              <p className="text-xs text-muted-foreground">
                Drag & drop or click to browse • Images & Videos only
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 rounded-md bg-muted/30 border border-border/30"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      {getFileIcon(file)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => removeFile(index)}
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 hover:bg-destructive/20 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="text-xs text-muted-foreground">
              <p>💡 Reference files help AI understand your vision better</p>
              <p>🎯 Supported: JPG, PNG, GIF, MP4, MOV, WebM</p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
