import { RequestHandler } from "express";
import fs from "fs";
import path from "path";

// Data file paths
const SIGNUPS_FILE = path.join(process.cwd(), "data", "signups.json");
const ACTIVITIES_FILE = path.join(process.cwd(), "data", "activities.json");
const PAYMENTS_FILE = path.join(process.cwd(), "data", "payments.json");
const USERS_FILE = path.join(process.cwd(), "data", "users.json");

// Ensure data directory exists
const ensureDataDirectory = () => {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Helper functions to load/save data
const loadData = (filename: string): any[] => {
  ensureDataDirectory();
  try {
    if (fs.existsSync(filename)) {
      const data = fs.readFileSync(filename, "utf8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error(`Error loading ${filename}:`, error);
  }
  return [];
};

const saveData = (filename: string, data: any[]) => {
  ensureDataDirectory();
  try {
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error saving ${filename}:`, error);
    throw error;
  }
};

// Activity logging function
export const logActivity = (
  userId: string,
  userEmail: string,
  type: "signup" | "payment" | "download" | "output" | "question" | "view",
  details: string,
  metadata?: any,
) => {
  const activities = loadData(ACTIVITIES_FILE);
  const activity = {
    id: Date.now().toString(),
    userId,
    userEmail,
    type,
    details,
    timestamp: new Date().toISOString(),
    metadata,
  };
  activities.push(activity);
  saveData(ACTIVITIES_FILE, activities);
};

// Admin Stats endpoint
export const handleAdminStats: RequestHandler = (req, res) => {
  try {
    const signups = loadData(SIGNUPS_FILE);
    const activities = loadData(ACTIVITIES_FILE);
    const payments = loadData(PAYMENTS_FILE);
    const users = loadData(USERS_FILE);

    // Calculate stats
    const totalSignups = signups.length;
    const totalRevenue = payments
      .filter((p) => p.status === "completed")
      .reduce((sum, p) => sum + p.amount, 0);

    const totalDownloads = activities.filter(
      (a) => a.type === "download",
    ).length;
    const totalOutputs = activities.filter((a) => a.type === "output").length;
    const totalQuestions = activities.filter(
      (a) => a.type === "question",
    ).length;

    // Active users (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const activeUsers = new Set(
      activities
        .filter((a) => new Date(a.timestamp) > sevenDaysAgo)
        .map((a) => a.userId),
    ).size;

    // Conversion rate (paid users / total signups)
    const paidUsers = users.filter((u) => u.subscriptionStatus === "paid");
    const conversionRate =
      totalSignups > 0
        ? ((paidUsers.length / totalSignups) * 100).toFixed(1)
        : 0;

    // Average session time (simulated)
    const avgSessionTime = Math.floor(Math.random() * 30) + 15; // 15-45 minutes

    const stats = {
      totalSignups,
      totalRevenue,
      totalDownloads,
      totalQuestions,
      totalOutputs,
      activeUsers,
      conversionRate: parseFloat(conversionRate.toString()),
      avgSessionTime,
    };

    res.json(stats);
  } catch (error) {
    console.error("Admin stats error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Admin Activities endpoint
export const handleAdminActivities: RequestHandler = (req, res) => {
  try {
    const activities = loadData(ACTIVITIES_FILE);
    // Return latest 100 activities
    const recentActivities = activities.slice(-100).reverse();
    res.json(recentActivities);
  } catch (error) {
    console.error("Admin activities error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Admin Payments endpoint
export const handleAdminPayments: RequestHandler = (req, res) => {
  try {
    const payments = loadData(PAYMENTS_FILE);
    // Return latest 50 payments
    const recentPayments = payments.slice(-50).reverse();
    res.json(recentPayments);
  } catch (error) {
    console.error("Admin payments error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Admin Users endpoint
export const handleAdminUsers: RequestHandler = (req, res) => {
  try {
    const users = loadData(USERS_FILE);
    const signups = loadData(SIGNUPS_FILE);
    const activities = loadData(ACTIVITIES_FILE);
    const payments = loadData(PAYMENTS_FILE);

    // Combine user data with activity stats
    const enrichedUsers = signups.map((signup) => {
      const userActivities = activities.filter(
        (a) => a.userEmail === signup.email,
      );
      const userPayments = payments.filter((p) => p.userEmail === signup.email);

      const lastActivity =
        userActivities.length > 0
          ? userActivities[userActivities.length - 1].timestamp
          : signup.timestamp;

      const totalSpent = userPayments
        .filter((p) => p.status === "completed")
        .reduce((sum, p) => sum + p.amount, 0);

      const subscriptionStatus = totalSpent > 0 ? "paid" : "free";

      return {
        userId: signup.email,
        email: signup.email,
        signupDate: signup.timestamp,
        lastActive: lastActivity,
        totalSessions: userActivities.length,
        totalOutputs: userActivities.filter((a) => a.type === "output").length,
        totalDownloads: userActivities.filter((a) => a.type === "download")
          .length,
        subscriptionStatus,
        totalSpent,
      };
    });

    // Sort by last active (most recent first)
    enrichedUsers.sort(
      (a, b) =>
        new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime(),
    );

    res.json(enrichedUsers);
  } catch (error) {
    console.error("Admin users error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Track user action endpoint
export const handleTrackAction: RequestHandler = (req, res) => {
  try {
    const { userId, userEmail, type, details, metadata } = req.body;

    if (!userId || !userEmail || !type || !details) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    logActivity(userId, userEmail, type, details, metadata);

    res.json({ success: true, message: "Action tracked successfully" });
  } catch (error) {
    console.error("Track action error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
