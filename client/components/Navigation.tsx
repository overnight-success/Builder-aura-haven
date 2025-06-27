import React, { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { TheBriefcase } from "./TheBriefcase";
import {
  Package,
  Camera,
  Palette,
  Briefcase,
  Target,
  RefreshCw,
  X,
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
      id: "product",
      label: "PRODUCT GENERATOR",
      icon: <Package className="h-5 w-5" />,
    },
    {
      id: "lifestyle",
      label: "LIFESTYLE GENERATOR",
      icon: <Camera className="h-5 w-5" />,
    },
    {
      id: "graphic",
      label: "GRAPHIC GENERATOR",
      icon: <Palette className="h-5 w-5" />,
    },
    {
      id: "briefcase",
      label: "THE BRIEFCASE",
      icon: <Briefcase className="h-5 w-5" />,
    },
  ];

  const handlePageChange = (pageId: string) => {
    if (pageId === "briefcase") {
      setShowBriefcase(true);
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
                alt="Overnight Success"
                className="h-8 lg:h-12 w-auto"
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
                  className={`
                    font-bold text-xs lg:text-sm px-2 lg:px-3 py-1 lg:py-2 h-auto border-2 transition-all duration-200 whitespace-nowrap shrink-0 min-w-0
                    ${
                      (currentPage === item.id && !showBriefcase) ||
                      (item.id === "briefcase" && showBriefcase)
                        ? "bg-black border-black text-cream"
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

            {/* Stats & Reset */}
            <div className="flex items-center gap-2 shrink-0">
              <Badge className="bg-black border-2 border-black text-cream font-bold text-xs px-2 py-1 whitespace-nowrap">
                <Target className="h-3 w-3 text-neon-orange mr-1 shrink-0" />
                <span>{totalComponents}/8</span>
              </Badge>
              <Button
                onClick={onReset}
                className="bg-black border-2 border-black text-cream font-bold text-xs px-3 py-1.5 h-auto hover:bg-cream hover:text-black transition-all duration-200 whitespace-nowrap"
                disabled={totalComponents === 0}
              >
                <RefreshCw className="h-3 w-3 text-neon-orange mr-1 shrink-0" />
                <span>RESET</span>
              </Button>
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
              <TheBriefcase />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
