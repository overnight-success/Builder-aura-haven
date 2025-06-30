import { RequestHandler } from "express";
import fs from "fs";
import path from "path";

interface SignupData {
  fullName: string;
  email: string;
  howDidYouFindUs: string;
  timestamp: string;
  userAgent?: string;
  referrer?: string;
}

interface SignupResponse {
  success: boolean;
  message: string;
  userId?: string;
}

// Simple file-based storage for signups (in production, use a proper database)
const SIGNUPS_FILE = path.join(process.cwd(), "data", "signups.json");

// Ensure data directory exists
const ensureDataDirectory = () => {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Load existing signups
const loadSignups = (): SignupData[] => {
  ensureDataDirectory();
  try {
    if (fs.existsSync(SIGNUPS_FILE)) {
      const data = fs.readFileSync(SIGNUPS_FILE, "utf8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error loading signups:", error);
  }
  return [];
};

// Save signups
const saveSignups = (signups: SignupData[]) => {
  ensureDataDirectory();
  try {
    fs.writeFileSync(SIGNUPS_FILE, JSON.stringify(signups, null, 2));
  } catch (error) {
    console.error("Error saving signups:", error);
    throw error;
  }
};

export const handleSignup: RequestHandler = (req, res) => {
  try {
    const signupData: SignupData = req.body;

    // Validate required fields
    if (
      !signupData.fullName ||
      !signupData.email ||
      !signupData.howDidYouFindUs
    ) {
      const response: SignupResponse = {
        success: false,
        message: "Missing required fields",
      };
      return res.status(400).json(response);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signupData.email)) {
      const response: SignupResponse = {
        success: false,
        message: "Invalid email format",
      };
      return res.status(400).json(response);
    }

    // Load existing signups
    const signups = loadSignups();

    // Check if email already exists
    const existingSignup = signups.find(
      (signup) => signup.email.toLowerCase() === signupData.email.toLowerCase(),
    );
    if (existingSignup) {
      const response: SignupResponse = {
        success: true,
        message: "Welcome back! You're already registered.",
        userId: signupData.email,
      };
      return res.json(response);
    }

    // Add new signup
    signups.push({
      ...signupData,
      timestamp: signupData.timestamp || new Date().toISOString(),
    });

    // Save to file
    saveSignups(signups);

    console.log(
      `New signup: ${signupData.fullName} (${signupData.email}) - Found us via: ${signupData.howDidYouFindUs}`,
    );

    const response: SignupResponse = {
      success: true,
      message: "Successfully registered!",
      userId: signupData.email,
    };

    res.status(201).json(response);
  } catch (error) {
    console.error("Signup error:", error);
    const response: SignupResponse = {
      success: false,
      message: "Internal server error",
    };
    res.status(500).json(response);
  }
};

// Dashboard endpoint to view all signups (for internal use)
export const handleSignupDashboard: RequestHandler = (req, res) => {
  try {
    const signups = loadSignups();

    // Return stats and recent signups
    const stats = {
      totalSignups: signups.length,
      todaySignups: signups.filter((signup) => {
        const today = new Date().toDateString();
        const signupDate = new Date(signup.timestamp).toDateString();
        return today === signupDate;
      }).length,
      sourceBreakdown: signups.reduce(
        (acc, signup) => {
          acc[signup.howDidYouFindUs] = (acc[signup.howDidYouFindUs] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      ),
    };

    res.json({
      stats,
      recentSignups: signups.slice(-50).reverse(), // Last 50 signups, most recent first
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
