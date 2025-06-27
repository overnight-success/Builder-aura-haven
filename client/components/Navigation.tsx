import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Package,
  Camera,
  Palette,
  Briefcase,
  Target,
  RefreshCw,
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

  return (
    <nav className="bg-neon-orange border-b-4 border-black">
      <div className="container mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F326314a2e8634f90977b83f81df01501%2Fec00ceaef5524675ba25aca88f5d5cec?format=webp&width=400"
              alt="Overnight Success"
              className="h-12 w-auto"
            />
          </div>

          {/* Menu Items */}
          <div className="flex items-center gap-2">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`
                  font-bold text-sm px-4 py-2 h-auto border-2 transition-all duration-200
                  ${
                    currentPage === item.id
                      ? "bg-black border-black text-cream"
                      : "bg-neon-orange border-black text-black hover:bg-black hover:text-cream"
                  }
                `}
              >
                {item.icon}
                {item.label}
              </Button>
            ))}
          </div>

          {/* Stats & Reset */}
          <div className="flex items-center gap-4">
            <Badge className="bg-black border-2 border-black text-cream font-bold text-sm px-3 py-1.5">
              <Target className="h-4 w-4 text-neon-orange mr-1" />
              {totalComponents}/8
            </Badge>
            <Button
              onClick={onReset}
              className="bg-black border-2 border-black text-cream font-bold text-sm px-4 py-2 h-auto hover:bg-cream hover:text-black transition-all duration-200"
              disabled={totalComponents === 0}
            >
              <RefreshCw className="h-4 w-4 text-neon-orange mr-1" />
              RESET
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
