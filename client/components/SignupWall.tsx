import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Zap,
  Mail,
  User,
  Search,
  Sparkles,
  Lock,
  CheckCircle,
} from "lucide-react";

interface SignupWallProps {
  onSignupComplete: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  howDidYouFindUs: string;
}

export function SignupWall({ onSignupComplete }: SignupWallProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    howDidYouFindUs: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.howDidYouFindUs.trim()) {
      newErrors.howDidYouFindUs = "Please tell us how you found us";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit to API endpoint
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          referrer: document.referrer,
        }),
      });

      if (response.ok) {
        // Store signup status in localStorage
        localStorage.setItem("userSignedUp", "true");
        localStorage.setItem("userEmail", formData.email);

        // Call completion callback
        onSignupComplete();
      } else {
        console.error("Signup failed:", response.statusText);
        // For now, still proceed to app even if API fails
        localStorage.setItem("userSignedUp", "true");
        onSignupComplete();
      }
    } catch (error) {
      console.error("Signup error:", error);
      // For now, still proceed to app even if API fails
      localStorage.setItem("userSignedUp", "true");
      onSignupComplete();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const findUsOptions = [
    "Google Search",
    "Social Media (Instagram, Twitter, etc.)",
    "YouTube",
    "Friend/Word of Mouth",
    "Blog/Article",
    "Email Newsletter",
    "Online Community/Forum",
    "Advertisement",
    "Other",
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="bg-neon-orange border-4 border-black shadow-2xl max-w-md w-full">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center mb-4">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F326314a2e8634f90977b83f81df01501%2F9a6248f59e554d6eb22258a507dde681?format=webp&width=800"
              alt="Overnight Success Logo"
              className="h-16 w-auto"
            />
          </div>
          <CardTitle className="text-3xl font-black text-black mb-2">
            Overnight Success
          </CardTitle>
          <p className="text-black font-bold text-lg">
            Join thousands changing their lives overnight with next level
            creative systems
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-black font-bold text-sm mb-2">
                <User className="h-4 w-4 inline mr-2" />
                Full Name *
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className="w-full px-3 py-2 bg-black text-cream border-2 border-black rounded-lg focus:outline-none focus:border-neon-orange transition-colors"
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="text-red-600 text-xs mt-1 font-semibold">
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-black font-bold text-sm mb-2">
                <Mail className="h-4 w-4 inline mr-2" />
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full px-3 py-2 bg-black text-cream border-2 border-black rounded-lg focus:outline-none focus:border-neon-orange transition-colors"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-600 text-xs mt-1 font-semibold">
                  {errors.email}
                </p>
              )}
            </div>

            {/* How Did You Find Us */}
            <div>
              <label className="block text-black font-bold text-sm mb-2">
                <Search className="h-4 w-4 inline mr-2" />
                How Did You Find Us? *
              </label>
              <select
                value={formData.howDidYouFindUs}
                onChange={(e) =>
                  handleInputChange("howDidYouFindUs", e.target.value)
                }
                className="w-full px-3 py-2 bg-black text-cream border-2 border-black rounded-lg focus:outline-none focus:border-neon-orange transition-colors"
              >
                <option value="">Select an option</option>
                {findUsOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.howDidYouFindUs && (
                <p className="text-red-600 text-xs mt-1 font-semibold">
                  {errors.howDidYouFindUs}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-neon-orange hover:bg-gray-900 border-2 border-black font-bold py-3 text-lg mt-6"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-neon-orange border-t-transparent mr-2" />
                  Joining Waitlist...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  OPEN THE PLAYBOOK
                </>
              )}
            </Button>
          </form>

          <div className="text-center mt-4">
            <p className="text-black text-xs">
              By signing up, you agree to receive updates about new features and
              AI creative tips.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
