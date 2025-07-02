import React, { useEffect, useState } from "react";
import { Navigation } from "../components/Navigation";
import { Generator } from "../components/Generator";
import { SignupWall } from "../components/SignupWall";
import { Paywall } from "../components/Paywall";
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
      <div className="relative z-10">
        {/* Enhanced Navigation */}
        <Navigation
          currentPage={state.currentGenerator}
          onPageChange={handlePageChange}
          totalComponents={computed.totalComponents}
          onReset={handleReset}
        />

        {/* Current Generator */}
        {renderCurrentGenerator()}

        {/* Enhanced Footer */}
        <footer className="border-t-2 border-black bg-black mt-12">
          <div className="container mx-auto px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="text-center text-sm font-medium text-cream">
                <p>
                  POWERED BY AI • OPTIMIZED FOR SORA • BUILT FOR CREATIVE
                  EXCELLENCE
                </p>
              </div>
              <div className="text-xs text-cream/60">
                v2.0 • Enhanced with AI
              </div>
            </div>
          </div>
        </footer>
      </div>
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
