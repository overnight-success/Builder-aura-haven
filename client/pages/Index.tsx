import React, { useEffect, useState } from "react";
import { Navigation } from "../components/Navigation";
import { SignupWall } from "../components/SignupWall";
import { Paywall } from "../components/Paywall";
import { useSubscription } from "../hooks/useSubscription";
import { useTracking } from "../hooks/useTracking";

function AppContent() {
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

  const handleSignupComplete = () => {
    setShowSignupWall(false);
  };

  const handleUpgradeComplete = () => {
    setShowPaywall(false);
    // Refresh subscription status
    window.location.reload();
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
        {/* Enhanced Navigation with The Briefcase */}
        <Navigation onUpgradeRequest={() => setShowPaywall(true)} />

        {/* Main Content Area - Simple welcome message */}
        <main className="container mx-auto px-8 py-12">
          <div className="text-center">
            <h1 className="text-6xl font-black text-black mb-6 retro-text">
              OVERNIGHT SUCCESS
            </h1>
            <p className="text-2xl font-bold text-black mb-8">
              Welcome to your creative resource hub
            </p>
            <p className="text-lg text-black/80 max-w-2xl mx-auto">
              Access THE BRIEFCASE from the navigation above to explore our
              complete resource library, playbook, updates, and more.
            </p>
          </div>
        </main>

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
  return <AppContent />;
}
