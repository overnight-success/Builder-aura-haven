import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
<<<<<<< HEAD
  Bell,
  BookOpen,
  Archive,
  FileText,
  Wrench,
  Target,
=======
  Package,
  Palette,
  Briefcase,
  Target,
  RefreshCw,
  X,
  Crown,
>>>>>>> 30fb001de1ab98d7b81c7ea3a45522b696db2016
} from "lucide-react";

interface NavigationProps {
  onUpgradeRequest?: () => void;
}

export function Navigation({ onUpgradeRequest }: NavigationProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
<<<<<<< HEAD
      id: "updates",
      label: "UPDATES",
      icon: <Bell className="h-5 w-5" />,
      path: "/updates",
    },
    {
      id: "playbook",
      label: "PLAYBOOK",
      icon: <BookOpen className="h-5 w-5" />,
      path: "/playbook",
    },
    {
      id: "prompt-vault",
      label: "PROMPT VAULT",
      icon: <Archive className="h-5 w-5" />,
      path: "/prompt-vault",
    },
    {
      id: "templates",
      label: "TEMPLATES",
      icon: <FileText className="h-5 w-5" />,
      path: "/templates",
    },
    {
      id: "ai-toolkit",
      label: "AI TOOLKIT",
      icon: <Wrench className="h-5 w-5" />,
      path: "/ai-toolkit",
    },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleUpgrade = () => {
    if (onUpgradeRequest) {
      onUpgradeRequest();
=======
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
      // Navigate to Gumroad page
      window.open(
        "https://overnightsuccessllc.gumroad.com/l/creativeos",
        "_blank",
      );
      return;
    } else {
      setShowBriefcase(false);
      onPageChange(pageId);
>>>>>>> 30fb001de1ab98d7b81c7ea3a45522b696db2016
    }
  };

  return (
<<<<<<< HEAD
    <nav className="bg-neon-orange border-b-4 border-black">
      <div className="container mx-auto px-4 lg:px-8 py-2 lg:py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F326314a2e8634f90977b83f81df01501%2Fec00ceaef5524675ba25aca88f5d5cec?format=webp&width=400"
              alt="Overnight Success"
              className="h-8 lg:h-12 w-auto cursor-pointer"
              onClick={() => navigate("/updates")}
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
                onClick={() => handleNavigation(item.path)}
                className={`
                  font-bold text-xs lg:text-sm px-2 lg:px-3 py-1 lg:py-2 h-auto border-2 transition-all duration-200 whitespace-nowrap shrink-0 min-w-0
                  ${
                    location.pathname === item.path
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
            {onUpgradeRequest && (
              <Button
                onClick={handleUpgrade}
                className="bg-black border-2 border-black text-cream font-bold px-2 lg:px-3 py-1 lg:py-2 h-auto hover:bg-cream hover:text-black ml-2"
              >
                <span className="flex items-center gap-1">
                  <Badge className="bg-neon-orange text-black text-xs">
                    PRO
                  </Badge>
                  <span className="hidden sm:inline">UPGRADE</span>
                </span>
              </Button>
            )}
=======
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
>>>>>>> 30fb001de1ab98d7b81c7ea3a45522b696db2016
          </div>
        </div>
      </div>
    </nav>
  );
}
