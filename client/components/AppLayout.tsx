import React from "react";
import { Navigation } from "./Navigation";

interface AppLayoutProps {
  children: React.ReactNode;
  onUpgradeRequest?: () => void;
}

export function AppLayout({ children, onUpgradeRequest }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-neon-orange font-sans">
      <Navigation onUpgradeRequest={onUpgradeRequest} />
      <main>{children}</main>
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
            <div className="text-xs text-cream/60">v2.0 • Enhanced with AI</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
