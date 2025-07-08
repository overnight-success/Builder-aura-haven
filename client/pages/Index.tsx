import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignupWall } from "../components/SignupWall";
import { Paywall } from "../components/Paywall";
import { useSubscription } from "../hooks/useSubscription";

export default function Index() {
  const navigate = useNavigate();
  const [showSignupWall, setShowSignupWall] = useState(true);
  const [showPaywall, setShowPaywall] = useState(false);
  const { subscriptionStatus, canUseFeature, loading } = useSubscription();

  // Check if user has already signed up
  useEffect(() => {
    const hasSignedUp = localStorage.getItem("userSignedUp");
    if (hasSignedUp === "true") {
      setShowSignupWall(false);
      // Redirect to updates page (new home)
      navigate("/updates");
    }
  }, [navigate]);

  const handleSignupComplete = () => {
    setShowSignupWall(false);
    // Redirect to updates page after signup
    navigate("/updates");
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

  return null; // This component will redirect, so no need to render anything
}
