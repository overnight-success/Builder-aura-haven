import React, { useEffect, useState } from "react";
import { Navigation } from "../components/Navigation";
import { Generator } from "../components/Generator";
import { SignupWall } from "../components/SignupWall";
import { Paywall } from "../components/Paywall";
import AdminDashboard from "./AdminDashboard";
import {
  PromptGeneratorProvider,
  usePromptGenerator,
} from "../contexts/PromptGeneratorContext";
import { useSubscription } from "../hooks/useSubscription";
import { useTracking } from "../hooks/useTracking";

function AppContent() {
  const { state, actions, computed } = usePromptGenerator();
  const [showSignupWall, setShowSignupWall] = useState(true);
  const [showPaywall, setShowPaywall] = useState(false);
  const { subscriptionStatus, canUseFeature, loading } = useSubscription();
  const { trackView } = useTracking();

  // Check if user has already signed up
  useEffect(() => {
    const hasSignedUp = localStorage.getItem("userSignedUp");
    if (hasSignedUp === "true") {
      setShowSignupWall(false);
    }
  }, []);

  // Track page views
  useEffect(() => {
    if (!showSignupWall && !loading) {
      trackView("main-app", `Generator: ${state.currentGenerator}`);
    }
  }, [showSignupWall, loading, state.currentGenerator, trackView]);

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
    actions.saveState, // Only depend on the specific action, not the entire actions object
  ]);

  const handlePageChange = (page: string) => {
    if (page === "product" || page === "lifestyle" || page === "graphic") {
      actions.setGenerator(page);
    }
  };

  const handleReset = () => {
    actions.resetAll();
  };

  const handleSignupComplete = () => {
    setShowSignupWall(false);
  };

  const handleUpgradeComplete = () => {
    setShowPaywall(false);
    // Refresh subscription status
    window.location.reload();
  };

  const checkUsageBeforeAction = (action: "outputs" | "downloads") => {
    if (!canUseFeature(action)) {
      setShowPaywall(true);
      return false;
    }
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

  // Show signup wall if user hasn't signed up
  if (showSignupWall) {
    return <SignupWall onSignupComplete={handleSignupComplete} />;
  }

  // Show paywall if user exceeded free limits
  if (showPaywall) {
    const userEmail = localStorage.getItem("userEmail") || "";
    return <Paywall onUpgrade={handleUpgradeComplete} userEmail={userEmail} />;
  }

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
  // Check if user is accessing admin route
  const isAdminRoute =
    window.location.pathname === "/admin" ||
    window.location.pathname === "/admin-dashboard";

  if (isAdminRoute) {
    return <AdminDashboard />;
  }

  return (
    <PromptGeneratorProvider>
      <AppContent />
    </PromptGeneratorProvider>
  );
}
