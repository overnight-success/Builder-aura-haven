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

  // Admin dashboard route
  app.get("/admin", (_req, res) => {
    res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>Admin Dashboard</title>
    <style>
        body { font-family: Arial, sans-serif; background: #ff3120; color: black; margin: 0; padding: 20px; }
        .container { max-width: 1200px; margin: 0 auto; }
        .header { text-align: center; margin-bottom: 30px; }
        .header h1 { font-size: 3rem; font-weight: 900; margin: 0; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .stat-card { background: black; color: #f5e6d3; padding: 20px; border-radius: 8px; }
        .stat-title { color: #ff3120; font-weight: bold; margin-bottom: 10px; }
        .stat-value { font-size: 2rem; font-weight: 900; }
        .activities { background: black; color: #f5e6d3; padding: 20px; border-radius: 8px; }
        .activity-item { padding: 10px 0; border-bottom: 1px solid #333; }
        .refresh-btn { background: black; color: #ff3120; border: 2px solid black; padding: 12px 24px; font-weight: bold; cursor: pointer; margin-bottom: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>ADMIN DASHBOARD</h1>
            <p><strong>System Analytics & Monitoring</strong></p>
            <button class="refresh-btn" onclick="loadData()">🔄 REFRESH DATA</button>
        </div>

        <div class="stats">
            <div class="stat-card">
                <div class="stat-title">TOTAL SIGNUPS</div>
                <div class="stat-value" id="signups">Loading...</div>
            </div>
            <div class="stat-card">
                <div class="stat-title">TOTAL REVENUE</div>
                <div class="stat-value" id="revenue">Loading...</div>
            </div>
            <div class="stat-card">
                <div class="stat-title">DOWNLOADS</div>
                <div class="stat-value" id="downloads">Loading...</div>
            </div>
            <div class="stat-card">
                <div class="stat-title">AI OUTPUTS</div>
                <div class="stat-value" id="outputs">Loading...</div>
            </div>
        </div>

        <div class="activities">
            <h2 style="color: #ff3120; margin-top: 0;">RECENT ACTIVITIES</h2>
            <div id="activities-list">Loading activities...</div>
        </div>
    </div>

    <script>
        async function loadData() {
            try {
                // Load stats
                const statsRes = await fetch('/api/admin/stats');
                if (statsRes.ok) {
                    const stats = await statsRes.json();
                    document.getElementById('signups').textContent = stats.totalSignups || 0;
                    document.getElementById('revenue').textContent = '$' + (stats.totalRevenue || 0);
                    document.getElementById('downloads').textContent = stats.totalDownloads || 0;
                    document.getElementById('outputs').textContent = stats.totalOutputs || 0;
                }

                // Load activities
                const activitiesRes = await fetch('/api/admin/activities');
                if (activitiesRes.ok) {
                    const activities = await activitiesRes.json();
                    const list = document.getElementById('activities-list');
                    list.innerHTML = activities.slice(0, 15).map(a =>
                        '<div class="activity-item"><strong>' + a.type + '</strong>: ' + a.details + '<br><small>' + a.userEmail + ' • ' + new Date(a.timestamp).toLocaleString() + '</small></div>'
                    ).join('');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

        // Auto-load data when page opens
        loadData();

        // Auto-refresh every 30 seconds
        setInterval(loadData, 30000);
    </script>
</body>
</html>
    `);
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
