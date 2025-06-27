import React, { useEffect } from "react";
import { Navigation } from "../components/Navigation";
import { Generator } from "../components/Generator";
import { TheBriefcase } from "../components/TheBriefcase";
import {
  PromptGeneratorProvider,
  usePromptGenerator,
} from "../contexts/PromptGeneratorContext";

function AppContent() {
  const { state, actions, computed } = usePromptGenerator();

  // Load saved state on mount
  useEffect(() => {
    actions.loadState();
  }, [actions]);

  // Auto-save state changes
  useEffect(() => {
    const timer = setTimeout(() => {
      actions.saveState();
    }, 1000); // Debounce saves

    return () => clearTimeout(timer);
  }, [state.favorites, state.history, actions]);

  const handlePageChange = (page: string) => {
    if (page === "product" || page === "lifestyle" || page === "graphic") {
      actions.setGenerator(page);
    }
  };

  const handleReset = () => {
    actions.resetAll();
  };

  const renderCurrentPage = () => {
    switch (state.currentGenerator) {
      case "product":
        return <Generator type="product" />;
      case "lifestyle":
        return <Generator type="lifestyle" />;
      case "graphic":
        return <Generator type="graphic" />;
      default:
        return <Generator type="product" />;
    }
  };

  const renderBriefcase = () => {
    return <TheBriefcase />;
  };

  // Determine current page for navigation
  const getCurrentPage = () => {
    // If we're showing briefcase, return 'briefcase'
    // Otherwise return the current generator
    return state.currentGenerator;
  };

  return (
    <div className="min-h-screen bg-neon-orange font-sans">
      <div className="relative z-10">
        {/* Navigation */}
        <Navigation
          currentPage={getCurrentPage()}
          onPageChange={(page) => {
            if (page === "briefcase") {
              // Handle briefcase separately - don't change generator
              // This would need to be handled by a separate state
            } else {
              handlePageChange(page);
            }
          }}
          totalComponents={computed.totalComponents}
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

export default function Index() {
  return (
    <PromptGeneratorProvider>
      <AppContent />
    </PromptGeneratorProvider>
  );
}
