import React, { useEffect, useState } from "react";
import { Navigation } from "../components/Navigation";
import { Generator } from "../components/Generator";
import { SignupWall } from "../components/SignupWall";
import { Paywall } from "../components/Paywall";
import { PaywallLanding } from "../components/PaywallLanding";
import {
  PromptGeneratorProvider,
  usePromptGenerator,
} from "../contexts/PromptGeneratorContext";
import { useSubscription } from "../hooks/useSubscription";
import { useTracking } from "../hooks/useTracking";

function AppContent() {
  const { state, actions, computed } = usePromptGenerator();
  const [showPaywallLanding, setShowPaywallLanding] = useState(true);
  const [showSignupWall, setShowSignupWall] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const { subscriptionStatus, canUseFeature, loading } = useSubscription();
  const { trackView } = useTracking();

  // Check if user has already accessed the app
  useEffect(() => {
    // Clear localStorage for testing - remove this in production
    localStorage.removeItem("hasAccessedApp");
    localStorage.removeItem("userSignedUp");

    const hasAccessedApp = localStorage.getItem("hasAccessedApp");
    const hasSignedUp = localStorage.getItem("userSignedUp");

    if (hasAccessedApp === "true") {
      setShowPaywallLanding(false);
      if (hasSignedUp === "true") {
        setShowSignupWall(false);
      } else {
        setShowSignupWall(true);
      }
    }
  }, []);

  // Track page views - DISABLED TO PREVENT FLASHING
  // useEffect(() => {
  //   if (!showSignupWall && !loading) {
  //     trackView("main-app", `Generator: ${state.currentGenerator}`);
  //   }
  // }, [showSignupWall, loading, state.currentGenerator, trackView]);

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
    // Handle navigation changes (no generators available in nav)
    console.log("Page change requested:", page);
  };

  const handleReset = () => {
    actions.resetAll();
  };

  const handleGetAccess = () => {
    localStorage.setItem("hasAccessedApp", "true");
    setShowPaywallLanding(false);
    setShowPaywall(true);
  };

  const handleStartFree = () => {
    localStorage.setItem("hasAccessedApp", "true");
    setShowPaywallLanding(false);
    setShowSignupWall(true);
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

  const renderMainContent = () => {
    // Since we removed the generator from navigation, show the lifestyle generator by default
    return (
      <Generator type="lifestyle" onActionAttempt={checkUsageBeforeAction} />
    );
  };

  // Show paywall landing page first
  if (showPaywallLanding) {
    return (
      <PaywallLanding
        onGetAccess={handleGetAccess}
        onStartFree={handleStartFree}
      />
    );
  }

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
          currentPage="lifestyle"
          onPageChange={handlePageChange}
          totalComponents={computed.totalComponents}
          onReset={handleReset}
        />

        {/* Main Content */}
        {renderMainContent()}

        {/* Enhanced Footer */}
        <footer className="border-t-2 border-black bg-black mt-12"></footer>
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
