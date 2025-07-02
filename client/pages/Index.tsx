import React, { useEffect } from "react";
import { Navigation } from "../components/Navigation";
import { Generator } from "../components/Generator";
import {
  PromptGeneratorProvider,
  usePromptGenerator,
} from "../contexts/PromptGeneratorContext";
import { useSubscription } from "../hooks/useSubscription";
import { useTracking } from "../hooks/useTracking";

function AppContent() {
  const { state, actions, computed } = usePromptGenerator();
  const { subscriptionStatus, canUseFeature, loading } = useSubscription();
  const { trackView } = useTracking();

  // Load saved state on mount
  useEffect(() => {
    actions.loadState();
  }, [actions.loadState]);

  // Auto-save state changes (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      actions.saveState();
    }, 2000); // Save after 2 seconds of inactivity

    return () => clearTimeout(timer);
  }, [
    state.favorites,
    state.history,
    state.selections,
    state.customInstructions,
    actions.saveState,
  ]);

  const handlePageChange = (page: string) => {
    if (page === "product" || page === "lifestyle" || page === "graphic") {
      actions.setGenerator(page);
    }
  };

  const handleReset = () => {
    actions.resetAll();
  };

  const checkUsageBeforeAction = (action: "outputs" | "downloads") => {
    // Allow unlimited access - remove paywall restrictions
    return true;
  };

  const renderCurrentGenerator = () => {
    return (
      <Generator
        type={state.currentGenerator}
        onActionAttempt={checkUsageBeforeAction}
      />
    );
  };

  return (
    <div className="min-h-screen bg-neon-orange font-sans">
      {renderCurrentGenerator()}
    </div>
  );
}

export default function Index() {
  return (
    <PromptGeneratorProvider>
      <AppContent />
    </PromptGeneratorProvider>
  );
}
