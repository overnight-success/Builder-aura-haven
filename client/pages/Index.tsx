import React, { useState } from "react";
import { Navigation } from "../components/Navigation";
import { Generator } from "../components/Generator";
import { TheBriefcase } from "../components/TheBriefcase";

export default function Index() {
  const [currentPage, setCurrentPage] = useState("product");
  const [totalComponents, setTotalComponents] = useState(0);

  const handleReset = () => {
    // Reset will be handled by each generator component
    window.location.reload();
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "product":
        return <Generator type="product" />;
      case "lifestyle":
        return <Generator type="lifestyle" />;
      case "graphic":
        return <Generator type="graphic" />;
      case "briefcase":
        return <TheBriefcase />;
      default:
        return <Generator type="product" />;
    }
  };

  return (
    <div className="min-h-screen bg-neon-orange font-sans">
      <div className="relative z-10">
        {/* Navigation */}
        <Navigation
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalComponents={totalComponents}
          onReset={handleReset}
        />

        {/* Current Page Content */}
        {renderCurrentPage()}

        {/* Footer */}
        <footer className="border-t-2 border-black bg-black mt-12">
          <div className="container mx-auto px-8 py-4">
            <div className="text-center text-sm font-medium text-cream">
              <p>
                POWERED BY AI • OPTIMIZED FOR SORA • BUILT FOR CREATIVE
                EXCELLENCE
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
