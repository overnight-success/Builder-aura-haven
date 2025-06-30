import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Users,
  DollarSign,
  Download,
  MessageSquare,
  Eye,
  TrendingUp,
  Calendar,
  Search,
  RefreshCw,
  Activity,
  CreditCard,
  FileText,
  Share,
  Copy,
  Settings,
  Filter,
  BarChart3,
  Clock,
} from "lucide-react";

interface AdminStats {
  totalSignups: number;
  totalRevenue: number;
  totalDownloads: number;
  totalQuestions: number;
  totalOutputs: number;
  activeUsers: number;
  conversionRate: number;
  avgSessionTime: number;
}

interface Activity {
  id: string;
  userId: string;
  userEmail: string;
  type: "signup" | "payment" | "download" | "output" | "question" | "view";
  details: string;
  timestamp: string;
  metadata?: any;
}

interface Payment {
  id: string;
  userId: string;
  userEmail: string;
  amount: number;
  status: "completed" | "pending" | "failed";
  plan: string;
  timestamp: string;
}

interface UserActivity {
  userId: string;
  email: string;
  signupDate: string;
  lastActive: string;
  totalSessions: number;
  totalOutputs: number;
  totalDownloads: number;
  subscriptionStatus: "free" | "paid" | "trial";
  totalSpent: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [users, setUsers] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("overview");
  const [dateFilter, setDateFilter] = useState("7d");

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, activitiesRes, paymentsRes, usersRes] =
        await Promise.all([
          fetch("/api/admin/stats"),
          fetch("/api/admin/activities"),
          fetch("/api/admin/payments"),
          fetch("/api/admin/users"),
        ]);

      if (statsRes.ok) setStats(await statsRes.json());
      if (activitiesRes.ok) setActivities(await activitiesRes.json());
      if (paymentsRes.ok) setPayments(await paymentsRes.json());
      if (usersRes.ok) setUsers(await usersRes.json());
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [dateFilter]);

  const exportData = (type: string) => {
    let data: any[] = [];
    let filename = "";

    switch (type) {
      case "activities":
        data = activities;
        filename = "activities";
        break;
      case "payments":
        data = payments;
        filename = "payments";
        break;
      case "users":
        data = users;
        filename = "users";
        break;
    }

    const csvContent = [
      Object.keys(data[0] || {}).join(","),
      ...data.map((item) =>
        Object.values(item)
          .map((val) => `"${val}"`)
          .join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neon-orange flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent mx-auto mb-4"></div>
          <p className="text-black font-bold">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neon-orange p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black text-black mb-2">
              ADMIN DASHBOARD
            </h1>
            <p className="text-black font-bold">
              Comprehensive system monitoring and analytics
            </p>
          </div>
          <div className="flex gap-2">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-black text-neon-orange border-2 border-black rounded-lg px-3 py-2 font-bold"
            >
              <option value="1d">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <Button
              onClick={fetchDashboardData}
              className="bg-black text-neon-orange border-2 border-black"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {[
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "activities", label: "Activities", icon: Activity },
            { id: "payments", label: "Payments", icon: CreditCard },
            { id: "users", label: "Users", icon: Users },
            { id: "settings", label: "Settings", icon: Settings },
          ].map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 border-2 border-black font-bold ${
                selectedTab === tab.id
                  ? "bg-black text-neon-orange"
                  : "bg-neon-orange text-black hover:bg-black hover:text-neon-orange"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Overview Tab */}
        {selectedTab === "overview" && stats && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-black border-4 border-black text-cream">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-neon-orange text-sm">
                    <Users className="h-4 w-4" />
                    Total Signups
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-black text-cream">
                    {stats.totalSignups}
                  </div>
                  <div className="text-xs text-cream/60">All time</div>
                </CardContent>
              </Card>

              <Card className="bg-black border-4 border-black text-cream">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-neon-orange text-sm">
                    <DollarSign className="h-4 w-4" />
                    Total Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-black text-cream">
                    ${stats.totalRevenue}
                  </div>
                  <div className="text-xs text-cream/60">All time</div>
                </CardContent>
              </Card>

              <Card className="bg-black border-4 border-black text-cream">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-neon-orange text-sm">
                    <Download className="h-4 w-4" />
                    Downloads
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-black text-cream">
                    {stats.totalDownloads}
                  </div>
                  <div className="text-xs text-cream/60">Total files</div>
                </CardContent>
              </Card>

              <Card className="bg-black border-4 border-black text-cream">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-neon-orange text-sm">
                    <FileText className="h-4 w-4" />
                    Outputs Generated
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-black text-cream">
                    {stats.totalOutputs}
                  </div>
                  <div className="text-xs text-cream/60">AI generations</div>
                </CardContent>
              </Card>
            </div>

            {/* Secondary Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-black border-4 border-black text-cream">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-neon-orange text-sm">
                    <Eye className="h-4 w-4" />
                    Active Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-black text-cream">
                    {stats.activeUsers}
                  </div>
                  <div className="text-xs text-cream/60">Last 7 days</div>
                </CardContent>
              </Card>

              <Card className="bg-black border-4 border-black text-cream">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-neon-orange text-sm">
                    <TrendingUp className="h-4 w-4" />
                    Conversion Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-black text-cream">
                    {stats.conversionRate}%
                  </div>
                  <div className="text-xs text-cream/60">Free to paid</div>
                </CardContent>
              </Card>

              <Card className="bg-black border-4 border-black text-cream">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-neon-orange text-sm">
                    <Clock className="h-4 w-4" />
                    Avg Session
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-black text-cream">
                    {stats.avgSessionTime}m
                  </div>
                  <div className="text-xs text-cream/60">Per user</div>
                </CardContent>
              </Card>

              <Card className="bg-black border-4 border-black text-cream">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-neon-orange text-sm">
                    <MessageSquare className="h-4 w-4" />
                    Questions Asked
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-black text-cream">
                    {stats.totalQuestions}
                  </div>
                  <div className="text-xs text-cream/60">Support queries</div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Activities Tab */}
        {selectedTab === "activities" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black text-black">
                Recent Activities
              </h2>
              <Button
                onClick={() => exportData("activities")}
                className="bg-black text-neon-orange border-2 border-black"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>

            <Card className="bg-black border-4 border-black text-cream">
              <CardContent className="p-0">
                <div className="max-h-96 overflow-y-auto">
                  {activities.map((activity, index) => (
                    <div
                      key={activity.id}
                      className={`p-4 border-b border-cream/20 ${
                        index % 2 === 0 ? "bg-neon-orange/5" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-neon-orange/20 rounded-lg">
                            {activity.type === "signup" && (
                              <Users className="h-4 w-4 text-neon-orange" />
                            )}
                            {activity.type === "payment" && (
                              <CreditCard className="h-4 w-4 text-neon-orange" />
                            )}
                            {activity.type === "download" && (
                              <Download className="h-4 w-4 text-neon-orange" />
                            )}
                            {activity.type === "output" && (
                              <FileText className="h-4 w-4 text-neon-orange" />
                            )}
                            {activity.type === "question" && (
                              <MessageSquare className="h-4 w-4 text-neon-orange" />
                            )}
                            {activity.type === "view" && (
                              <Eye className="h-4 w-4 text-neon-orange" />
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-cream">
                              {activity.details}
                            </div>
                            <div className="text-sm text-cream/80">
                              {activity.userEmail}
                            </div>
                            <Badge className="bg-neon-orange text-black text-xs mt-1">
                              {activity.type}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-xs text-cream/60">
                          {new Date(activity.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Payments Tab */}
        {selectedTab === "payments" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black text-black">
                Payment Transactions
              </h2>
              <Button
                onClick={() => exportData("payments")}
                className="bg-black text-neon-orange border-2 border-black"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>

            <Card className="bg-black border-4 border-black text-cream">
              <CardContent className="p-0">
                <div className="max-h-96 overflow-y-auto">
                  {payments.map((payment, index) => (
                    <div
                      key={payment.id}
                      className={`p-4 border-b border-cream/20 ${
                        index % 2 === 0 ? "bg-neon-orange/5" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-neon-orange/20 rounded-lg">
                            <DollarSign className="h-4 w-4 text-neon-orange" />
                          </div>
                          <div>
                            <div className="font-bold text-cream">
                              ${payment.amount}
                            </div>
                            <div className="text-sm text-cream/80">
                              {payment.userEmail}
                            </div>
                            <div className="text-xs text-cream/60">
                              {payment.plan}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            className={`text-xs ${
                              payment.status === "completed"
                                ? "bg-green-600 text-white"
                                : payment.status === "pending"
                                  ? "bg-yellow-600 text-white"
                                  : "bg-red-600 text-white"
                            }`}
                          >
                            {payment.status}
                          </Badge>
                          <div className="text-xs text-cream/60 mt-1">
                            {new Date(payment.timestamp).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Users Tab */}
        {selectedTab === "users" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black text-black">
                User Management
              </h2>
              <Button
                onClick={() => exportData("users")}
                className="bg-black text-neon-orange border-2 border-black"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>

            <Card className="bg-black border-4 border-black text-cream">
              <CardContent className="p-0">
                <div className="max-h-96 overflow-y-auto">
                  {users.map((user, index) => (
                    <div
                      key={user.userId}
                      className={`p-4 border-b border-cream/20 ${
                        index % 2 === 0 ? "bg-neon-orange/5" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-neon-orange/20 rounded-lg">
                            <Users className="h-4 w-4 text-neon-orange" />
                          </div>
                          <div>
                            <div className="font-bold text-cream">
                              {user.email}
                            </div>
                            <div className="text-sm text-cream/80">
                              Joined:{" "}
                              {new Date(user.signupDate).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-cream/60">
                              Last active:{" "}
                              {new Date(user.lastActive).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            className={`text-xs mb-1 ${
                              user.subscriptionStatus === "paid"
                                ? "bg-green-600 text-white"
                                : user.subscriptionStatus === "trial"
                                  ? "bg-yellow-600 text-white"
                                  : "bg-gray-600 text-white"
                            }`}
                          >
                            {user.subscriptionStatus}
                          </Badge>
                          <div className="text-xs text-cream/60">
                            ${user.totalSpent} spent
                          </div>
                          <div className="text-xs text-cream/60">
                            {user.totalOutputs} outputs
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
