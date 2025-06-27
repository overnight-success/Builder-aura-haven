import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
} from "react";

// Import ProcessedFile type
export interface ProcessedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  originalFile: File;
  jsonData?: string; // Base64 encoded JSON for images
  processingStatus: "pending" | "processing" | "complete" | "error";
}

// Types
export interface PromptState {
  currentGenerator: "product" | "lifestyle" | "graphic";
  selections: Record<string, string>;
  customInstructions: string;
  uploadedFiles: ProcessedFile[];
  favorites: SavedPrompt[];
  history: PromptVersion[];
  isGenerating: boolean;
  lastSaved: number | null;
}

export interface SavedPrompt {
  id: string;
  generator: string;
  formula: string;
  selections: Record<string, string>;
  customInstructions: string;
  files: string[];
  timestamp: number;
  quality: number;
}

export interface PromptVersion {
  id: string;
  formula: string;
  timestamp: number;
  quality: number;
}

// Action types
type PromptAction =
  | { type: "SET_GENERATOR"; payload: "product" | "lifestyle" | "graphic" }
  | { type: "UPDATE_SELECTION"; payload: { category: string; option: string } }
  | { type: "SET_CUSTOM_INSTRUCTIONS"; payload: string }
  | { type: "SET_UPLOADED_FILES"; payload: ProcessedFile[] }
  | { type: "ADD_FAVORITE"; payload: SavedPrompt }
  | { type: "REMOVE_FAVORITE"; payload: string }
  | { type: "ADD_TO_HISTORY"; payload: PromptVersion }
  | { type: "SET_GENERATING"; payload: boolean }
  | { type: "RESET_ALL" }
  | { type: "LOAD_STATE"; payload: Partial<PromptState> };

// Initial state
const initialState: PromptState = {
  currentGenerator: "product",
  selections: {},
  customInstructions: "",
  uploadedFiles: [],
  favorites: [],
  history: [],
  isGenerating: false,
  lastSaved: null,
};

// Reducer
function promptReducer(state: PromptState, action: PromptAction): PromptState {
  switch (action.type) {
    case "SET_GENERATOR":
      return {
        ...state,
        currentGenerator: action.payload,
        selections: {}, // Reset selections when changing generator
        customInstructions: "",
        uploadedFiles: [],
      };

    case "UPDATE_SELECTION":
      const { category, option } = action.payload;
      const newSelections = {
        ...state.selections,
        [category]: state.selections[category] === option ? "" : option,
      };
      return {
        ...state,
        selections: newSelections,
      };

    case "SET_CUSTOM_INSTRUCTIONS":
      return {
        ...state,
        customInstructions: action.payload,
      };

    case "SET_UPLOADED_FILES":
      return {
        ...state,
        uploadedFiles: action.payload,
      };

    case "ADD_FAVORITE":
      return {
        ...state,
        favorites: [action.payload, ...state.favorites].slice(0, 20), // Keep only 20 most recent
      };

    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter((fav) => fav.id !== action.payload),
      };

    case "ADD_TO_HISTORY":
      return {
        ...state,
        history: [action.payload, ...state.history].slice(0, 50), // Keep only 50 most recent
      };

    case "SET_GENERATING":
      return {
        ...state,
        isGenerating: action.payload,
      };

    case "RESET_ALL":
      return {
        ...state,
        selections: {},
        customInstructions: "",
        uploadedFiles: [],
      };

    case "LOAD_STATE":
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}

// Context
const PromptGeneratorContext = createContext<{
  state: PromptState;
  dispatch: React.Dispatch<PromptAction>;
  actions: {
    setGenerator: (generator: "product" | "lifestyle" | "graphic") => void;
    updateSelection: (category: string, option: string) => void;
    setCustomInstructions: (instructions: string) => void;
    setUploadedFiles: (files: ProcessedFile[]) => void;
    addFavorite: (prompt: SavedPrompt) => void;
    removeFavorite: (id: string) => void;
    addToHistory: (version: PromptVersion) => void;
    resetAll: () => void;
    saveState: () => void;
    loadState: () => void;
  };
  computed: {
    selectedCount: number;
    totalComponents: number;
    isComplete: boolean;
    promptQuality: number;
    hasCustomInstructions: boolean;
    hasFiles: boolean;
  };
} | null>(null);

// Provider component
export function PromptGeneratorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(promptReducer, initialState);

  // Memoized actions
  const actions = useMemo(
    () => ({
      setGenerator: (generator: "product" | "lifestyle" | "graphic") => {
        dispatch({ type: "SET_GENERATOR", payload: generator });
      },

      updateSelection: (category: string, option: string) => {
        dispatch({ type: "UPDATE_SELECTION", payload: { category, option } });
      },

      setCustomInstructions: (instructions: string) => {
        dispatch({ type: "SET_CUSTOM_INSTRUCTIONS", payload: instructions });
      },

      setUploadedFiles: (files: ProcessedFile[]) => {
        dispatch({ type: "SET_UPLOADED_FILES", payload: files });
      },

      addFavorite: (prompt: SavedPrompt) => {
        dispatch({ type: "ADD_FAVORITE", payload: prompt });
      },

      removeFavorite: (id: string) => {
        dispatch({ type: "REMOVE_FAVORITE", payload: id });
      },

      addToHistory: (version: PromptVersion) => {
        dispatch({ type: "ADD_TO_HISTORY", payload: version });
      },

      resetAll: () => {
        dispatch({ type: "RESET_ALL" });
      },

      saveState: () => {
        try {
          const stateToSave = {
            favorites: state.favorites,
            history: state.history,
            lastSaved: Date.now(),
          };
          localStorage.setItem(
            "promptGeneratorState",
            JSON.stringify(stateToSave),
          );
        } catch (error) {
          console.error("Failed to save state:", error);
        }
      },

      loadState: () => {
        try {
          const saved = localStorage.getItem("promptGeneratorState");
          if (saved) {
            const parsedState = JSON.parse(saved);
            dispatch({ type: "LOAD_STATE", payload: parsedState });
          }
        } catch (error) {
          console.error("Failed to load state:", error);
        }
      },
    }),
    [state.favorites, state.history],
  );

  // Memoized computed values
  const computed = useMemo(() => {
    const selectedCount = Object.values(state.selections).filter(
      Boolean,
    ).length;
    const hasCustomInstructions = state.customInstructions.trim().length > 0;
    const hasFiles = state.uploadedFiles.length > 0;
    const totalComponents =
      selectedCount + (hasCustomInstructions ? 1 : 0) + (hasFiles ? 1 : 0);
    const isComplete = selectedCount >= 4;

    // Calculate prompt quality score (0-100)
    let quality = selectedCount * 10; // Base score from selections
    if (hasCustomInstructions) quality += 15; // Bonus for custom instructions
    if (hasFiles) quality += 10; // Bonus for files
    if (selectedCount >= 6) quality += 5; // Bonus for completeness
    quality = Math.min(quality, 100);

    return {
      selectedCount,
      totalComponents,
      isComplete,
      promptQuality: quality,
      hasCustomInstructions,
      hasFiles,
    };
  }, [state.selections, state.customInstructions, state.uploadedFiles]);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      actions,
      computed,
    }),
    [state, actions, computed],
  );

  return (
    <PromptGeneratorContext.Provider value={value}>
      {children}
    </PromptGeneratorContext.Provider>
  );
}

// Hook to use the context
export function usePromptGenerator() {
  const context = useContext(PromptGeneratorContext);
  if (!context) {
    throw new Error(
      "usePromptGenerator must be used within a PromptGeneratorProvider",
    );
  }
  return context;
}
