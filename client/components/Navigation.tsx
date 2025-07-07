import React, { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { TheBriefcase } from "./TheBriefcase";
import { Briefcase, Target, X } from "lucide-react";

interface NavigationProps {
  onUpgradeRequest: () => void;
}

export function Navigation({ onUpgradeRequest }: NavigationProps) {
  const [showBriefcase, setShowBriefcase] = useState(false);

  const menuItems = [
    {
      id: "briefcase",
      label: "THE BRIEFCASE",
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      id: "admin",
      label: "ADMIN",
      icon: <Target className="h-5 w-5" />,
    },
  ];

  const handlePageChange = (pageId: string) => {
    if (pageId === "briefcase") {
      setShowBriefcase(true);
    } else if (pageId === "admin") {
      // Navigate to admin dashboard
      window.location.href = "/admin";
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
                      item.id === "briefcase" && showBriefcase
                        ? "bg-black border-black text-cream"
                        : "bg-neon-orange border-black text-black hover:bg-black hover:text-cream"
                    }
                  `}
                >
                  <span className="flex items-center gap-1 lg:gap-2">
                    {item.icon}
                    <span className="hidden sm:inline">{item.label}</span>
                  </span>
                </Button>
              ))}

              {/* Upgrade Button */}
              <Button
                onClick={onUpgradeRequest}
                className="bg-black border-2 border-black text-cream font-bold px-2 lg:px-3 py-1 lg:py-2 h-auto hover:bg-cream hover:text-black ml-2"
              >
                <span className="flex items-center gap-1">
                  <Badge className="bg-neon-orange text-black text-xs">
                    PRO
                  </Badge>
                  <span className="hidden sm:inline">UPGRADE</span>
                </span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Briefcase Modal/Overlay */}
      {showBriefcase && (
        <div className="fixed inset-0 z-50 bg-neon-orange">
          <div className="h-full flex flex-col">
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <Button
                onClick={handleCloseBriefcase}
                className="bg-black border-2 border-black text-cream font-bold px-4 py-2 hover:bg-cream hover:text-black"
              >
                <X className="h-4 w-4 mr-2" />
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
