import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Users,
  TrendingUp,
  Calendar,
  Search,
  RefreshCw,
  Download,
} from "lucide-react";
import { Button } from "../components/ui/button";

interface SignupData {
  fullName: string;
  email: string;
  howDidYouFindUs: string;
  timestamp: string;
  userAgent?: string;
  referrer?: string;
}

interface DashboardData {
  stats: {
    totalSignups: number;
    todaySignups: number;
    sourceBreakdown: Record<string, number>;
  };
  recentSignups: SignupData[];
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/signup/dashboard");
      if (response.ok) {
        const dashboardData = await response.json();
        setData(dashboardData);
        setError(null);
      } else {
        setError("Failed to fetch dashboard data");
      }
    } catch (err) {
      setError("Error connecting to server");
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const exportData = () => {
    if (!data) return;

    const csvContent = [
      "Full Name,Email,How Did You Find Us,Timestamp,User Agent,Referrer",
      ...data.recentSignups.map((signup) =>
        [
          signup.fullName,
          signup.email,
          signup.howDidYouFindUs,
          signup.timestamp,
          signup.userAgent || "",
          signup.referrer || "",
        ]
          .map((field) => `"${field}"`)
          .join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `signups-${new Date().toISOString().split("T")[0]}.csv`;
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
          <p className="text-black font-bold">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neon-orange flex items-center justify-center">
        <Card className="bg-black border-4 border-black text-cream max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <Button onClick={fetchData} className="bg-neon-orange text-black">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="min-h-screen bg-neon-orange p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black text-black mb-2">
              SIGNUPS DASHBOARD
            </h1>
            <p className="text-black font-bold">
              Internal dashboard for monitoring user registrations
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={fetchData}
              className="bg-black text-neon-orange border-2 border-black"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button
              onClick={exportData}
              className="bg-black text-neon-orange border-2 border-black"
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-black border-4 border-black text-cream">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-neon-orange">
                <Users className="h-5 w-5" />
                Total Signups
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-cream">
                {data.stats.totalSignups}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black border-4 border-black text-cream">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-neon-orange">
                <Calendar className="h-5 w-5" />
                Today's Signups
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-cream">
                {data.stats.todaySignups}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black border-4 border-black text-cream">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-neon-orange">
                <TrendingUp className="h-5 w-5" />
                Top Source
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-bold text-cream">
                {Object.entries(data.stats.sourceBreakdown)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 1)
                  .map(([source, count]) => (
                    <div key={source}>
                      <div className="text-lg font-black">{source}</div>
                      <div className="text-cream/60">{count} signups</div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Source Breakdown */}
        <Card className="bg-black border-4 border-black text-cream mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-neon-orange">
              <Search className="h-5 w-5" />
              Traffic Sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {Object.entries(data.stats.sourceBreakdown)
                .sort(([, a], [, b]) => b - a)
                .map(([source, count]) => (
                  <div
                    key={source}
                    className="bg-neon-orange/10 p-3 rounded-lg border border-neon-orange/20"
                  >
                    <div className="text-sm font-bold text-cream">{source}</div>
                    <div className="text-2xl font-black text-neon-orange">
                      {count}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Signups */}
        <Card className="bg-black border-4 border-black text-cream">
          <CardHeader>
            <CardTitle className="text-neon-orange">
              Recent Signups ({data.recentSignups.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {data.recentSignups.map((signup, index) => (
                <div
                  key={index}
                  className="bg-neon-orange/10 p-4 rounded-lg border border-neon-orange/20"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-bold text-cream text-lg">
                        {signup.fullName}
                      </div>
                      <div className="text-cream/80 text-sm">
                        {signup.email}
                      </div>
                      <Badge className="bg-neon-orange text-black text-xs mt-2">
                        {signup.howDidYouFindUs}
                      </Badge>
                    </div>
                    <div className="text-right text-xs text-cream/60">
                      {new Date(signup.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
