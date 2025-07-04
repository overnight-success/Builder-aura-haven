import React, { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { TheBriefcase } from "./TheBriefcase";
import {
  Package,
  Palette,
  Briefcase,
  Target,
  RefreshCw,
  X,
  Crown,
} from "lucide-react";

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  totalComponents: number;
  onReset: () => void;
}

export function Navigation({
  currentPage,
  onPageChange,
  totalComponents,
  onReset,
}: NavigationProps) {
  const [showBriefcase, setShowBriefcase] = useState(false);

  const menuItems = [
    {
      id: "access",
      label: "GET FULL ACCESS",
      icon: <Crown className="h-5 w-5" />,
    },
  ];

  const handlePageChange = (pageId: string) => {
    if (pageId === "briefcase") {
      setShowBriefcase(true);
    } else if (pageId === "admin") {
      // Navigate to admin dashboard
      window.location.href = "/admin";
    } else if (pageId === "access") {
      // Handle Get Full Access - could open pricing modal or redirect to pricing page
      console.log("Get Full Access clicked");
      // For now, just prevent navigation but could be customized
      return;
    } else {
      setShowBriefcase(false);
      onPageChange(pageId);
    }
  };

  const handleCloseBriefcase = () => {
    setShowBriefcase(false);
  };

  return (
    <>
      <nav className="bg-neon-orange border-b-4 border-black">
        <div className="container mx-auto px-4 lg:px-8 py-3 lg:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F326314a2e8634f90977b83f81df01501%2Fec00ceaef5524675ba25aca88f5d5cec?format=webp&width=400"
                alt="Overnight Success LLC - Lifestyle Studio"
                className="h-8 lg:h-12 w-auto"
                loading="eager"
              />
            </div>

            {/* Menu Items - Horizontal scroll on mobile */}
            <div
              className="flex items-center gap-1 overflow-x-auto scrollbar-hide flex-1 justify-end"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => handlePageChange(item.id)}
                  aria-label={`Navigate to ${item.label}`}
                  className={`
                    font-bold text-xs lg:text-sm px-2 lg:px-3 py-1 lg:py-2 h-auto border-2 transition-all duration-200 whitespace-nowrap shrink-0 min-w-0 mr-3
                    ${
                      (currentPage === item.id && !showBriefcase) ||
                      (item.id === "briefcase" && showBriefcase)
                        ? "bg-neon-orange border-black text-black"
                        : "bg-neon-orange border-black text-black hover:bg-black hover:text-cream"
                    }
                  `}
                >
                  <span className="mr-1 lg:mr-2 shrink-0">{item.icon}</span>
                  <span className="truncate hidden sm:inline">
                    {item.label}
                  </span>
                  <span className="truncate sm:hidden">
                    {item.label.split(" ")[0]}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Briefcase Modal/Overlay */}
      {showBriefcase && (
        <div className="fixed inset-0 z-50 bg-neon-orange">
          <div className="relative h-full">
            {/* Close Button */}
            <div className="absolute top-4 right-4 z-10">
              <Button
                onClick={handleCloseBriefcase}
                className="bg-black border-2 border-black text-cream font-bold px-4 py-2 hover:bg-cream hover:text-black"
              >
                <X className="h-4 w-4 mr-1" />
                CLOSE
              </Button>
            </div>

            {/* Briefcase Content */}
            <div className="h-full overflow-y-auto">
              <TheBriefcase onClose={handleCloseBriefcase} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
