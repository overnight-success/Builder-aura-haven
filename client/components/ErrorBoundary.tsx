import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen bg-neon-orange flex items-center justify-center p-4">
            <div className="bg-black border-2 border-cream rounded-lg p-8 max-w-md w-full text-center">
              <h2 className="text-xl font-black text-cream mb-4">
                Oops! Something went wrong
              </h2>
              <p className="text-cream/80 mb-6">
                The app encountered an unexpected error. Please refresh the page
                to try again.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-neon-orange text-black font-bold px-6 py-3 rounded-lg hover:bg-cream transition-colors"
              >
                Refresh Page
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
