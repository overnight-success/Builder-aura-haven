import { useCallback } from "react";

interface TrackingEvent {
  type: "signup" | "payment" | "download" | "output" | "question" | "view";
  details: string;
  metadata?: any;
}

export function useTracking() {
  const trackAction = useCallback(async (event: TrackingEvent) => {
    try {
      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) {
        console.warn("No user email found for tracking");
        return;
      }

      await fetch("/api/track-action", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userEmail,
          userEmail,
          type: event.type,
          details: event.details,
          metadata: {
            ...event.metadata,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString(),
            url: window.location.href,
          },
        }),
      });
    } catch (error) {
      console.error("Tracking error:", error);
    }
  }, []);

  // Specific tracking functions
  const trackView = useCallback(
    (page: string, details?: string) => {
      trackAction({
        type: "view",
        details: details || `Viewed ${page}`,
        metadata: { page },
      });
    },
    [trackAction],
  );

  const trackOutput = useCallback(
    (outputType: string, promptLength: number, metadata?: any) => {
      trackAction({
        type: "output",
        details: `Generated ${outputType} output`,
        metadata: {
          outputType,
          promptLength,
          ...metadata,
        },
      });
    },
    [trackAction],
  );

  const trackDownload = useCallback(
    (fileType: string, fileName: string, metadata?: any) => {
      trackAction({
        type: "download",
        details: `Downloaded ${fileType}: ${fileName}`,
        metadata: {
          fileType,
          fileName,
          ...metadata,
        },
      });
    },
    [trackAction],
  );

  const trackQuestion = useCallback(
    (question: string, context?: string) => {
      trackAction({
        type: "question",
        details: `Asked question: ${question.substring(0, 100)}...`,
        metadata: {
          fullQuestion: question,
          context,
        },
      });
    },
    [trackAction],
  );

  return {
    trackAction,
    trackView,
    trackOutput,
    trackDownload,
    trackQuestion,
  };
}
