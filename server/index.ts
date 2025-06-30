import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleSignup, handleSignupDashboard } from "./routes/signup";
import {
  handleAdminStats,
  handleAdminActivities,
  handleAdminPayments,
  handleAdminUsers,
  handleTrackAction,
} from "./routes/admin";
import {
  handleCreateCheckoutSession,
  handleStripeWebhook,
  handlePaymentStatus,
  handleSubscriptionStatus,
} from "./routes/payments";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);

  // Signup routes
  app.post("/api/signup", handleSignup);
  app.get("/api/signup/dashboard", handleSignupDashboard);

  // Admin routes
  app.get("/api/admin/stats", handleAdminStats);
  app.get("/api/admin/activities", handleAdminActivities);
  app.get("/api/admin/payments", handleAdminPayments);
  app.get("/api/admin/users", handleAdminUsers);
  app.post("/api/track-action", handleTrackAction);

  // Payment routes
  app.post("/api/create-checkout-session", handleCreateCheckoutSession);
  app.post(
    "/api/stripe/webhook",
    express.raw({ type: "application/json" }),
    handleStripeWebhook,
  );
  app.get("/api/payment-status", handlePaymentStatus);
  app.get("/api/subscription-status", handleSubscriptionStatus);

  return app;
}
