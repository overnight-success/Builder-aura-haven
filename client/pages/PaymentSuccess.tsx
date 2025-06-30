import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { CheckCircle, Crown, Zap, ArrowRight } from "lucide-react";

export default function PaymentSuccess() {
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkPaymentStatus = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const sessionId = urlParams.get("session_id");

      if (sessionId) {
        try {
          const response = await fetch(
            `/api/payment-status?sessionId=${sessionId}`,
          );
          if (response.ok) {
            const data = await response.json();
            setPaymentDetails(data);
          }
        } catch (error) {
          console.error("Error checking payment status:", error);
        }
      }
      setLoading(false);
    };

    checkPaymentStatus();
  }, []);

  const handleContinue = () => {
    // Clear any existing paywall state and redirect to main app
    localStorage.setItem("paymentCompleted", "true");
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neon-orange flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent mx-auto mb-4"></div>
          <p className="text-black font-bold">Confirming your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neon-orange flex items-center justify-center p-4">
      <Card className="bg-black border-4 border-black max-w-md w-full">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="p-4 bg-green-500 rounded-full">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-black text-cream mb-2">
            Welcome to Premium!
          </CardTitle>
          <p className="text-cream/80">
            Your payment was successful and your account has been upgraded.
          </p>
        </CardHeader>

        <CardContent className="text-center">
          {paymentDetails && (
            <div className="bg-neon-orange/10 rounded-lg p-4 mb-6">
              <div className="text-cream/60 text-sm mb-2">
                Payment Confirmed
              </div>
              <div className="text-neon-orange font-bold text-lg">
                ${(paymentDetails.amountTotal / 100).toFixed(2)}
              </div>
              <div className="text-cream/60 text-sm">
                {paymentDetails.customerEmail}
              </div>
            </div>
          )}

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3 text-cream">
              <Crown className="h-5 w-5 text-neon-orange" />
              <span>Unlimited AI outputs</span>
            </div>
            <div className="flex items-center gap-3 text-cream">
              <Zap className="h-5 w-5 text-neon-orange" />
              <span>Premium features unlocked</span>
            </div>
            <div className="flex items-center gap-3 text-cream">
              <CheckCircle className="h-5 w-5 text-neon-orange" />
              <span>Priority support access</span>
            </div>
          </div>

          <Button
            onClick={handleContinue}
            className="w-full bg-neon-orange text-black hover:bg-neon-orange/90 font-bold py-3"
          >
            Start Creating Now
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>

          <p className="text-cream/60 text-xs mt-4">
            You can manage your subscription anytime in your account settings.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
