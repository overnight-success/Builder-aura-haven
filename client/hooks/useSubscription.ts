import { useState, useEffect, useCallback } from "react";

interface SubscriptionStatus {
  hasActiveSubscription: boolean;
  subscriptionStatus: "free" | "paid" | "trial";
  totalSpent: number;
  latestPayment?: any;
}

interface UsageStats {
  dailyOutputs: number;
  monthlyOutputs: number;
  dailyDownloads: number;
  monthlyDownloads: number;
}

const FREE_LIMITS = {
  dailyOutputs: 5,
  monthlyOutputs: 50,
  dailyDownloads: 3,
  monthlyDownloads: 20,
};

export function useSubscription() {
  const [subscriptionStatus, setSubscriptionStatus] =
    useState<SubscriptionStatus>({
      hasActiveSubscription: false,
      subscriptionStatus: "free",
      totalSpent: 0,
    });
  const [usageStats, setUsageStats] = useState<UsageStats>({
    dailyOutputs: 0,
    monthlyOutputs: 0,
    dailyDownloads: 0,
    monthlyDownloads: 0,
  });
  const [loading, setLoading] = useState(true);

  const checkSubscriptionStatus = useCallback(async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) {
        setLoading(false);
        return;
      }

      const response = await fetch(
        `/api/subscription-status?userEmail=${encodeURIComponent(userEmail)}`,
      );
      if (response.ok) {
        const data = await response.json();
        setSubscriptionStatus(data);
      }
    } catch (error) {
      console.error("Error checking subscription status:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUsageStats = useCallback(() => {
    const today = new Date().toDateString();
    const thisMonth = `${new Date().getFullYear()}-${new Date().getMonth()}`;

    const dailyOutputs = parseInt(
      localStorage.getItem(`dailyOutputs_${today}`) || "0",
    );
    const monthlyOutputs = parseInt(
      localStorage.getItem(`monthlyOutputs_${thisMonth}`) || "0",
    );
    const dailyDownloads = parseInt(
      localStorage.getItem(`dailyDownloads_${today}`) || "0",
    );
    const monthlyDownloads = parseInt(
      localStorage.getItem(`monthlyDownloads_${thisMonth}`) || "0",
    );

    setUsageStats({
      dailyOutputs,
      monthlyOutputs,
      dailyDownloads,
      monthlyDownloads,
    });
  }, []);

  useEffect(() => {
    checkSubscriptionStatus();
    updateUsageStats();
  }, [checkSubscriptionStatus, updateUsageStats]);

  const incrementUsage = useCallback(
    (type: "outputs" | "downloads") => {
      const today = new Date().toDateString();
      const thisMonth = `${new Date().getFullYear()}-${new Date().getMonth()}`;

      if (type === "outputs") {
        const newDailyOutputs = usageStats.dailyOutputs + 1;
        const newMonthlyOutputs = usageStats.monthlyOutputs + 1;

        localStorage.setItem(
          `dailyOutputs_${today}`,
          newDailyOutputs.toString(),
        );
        localStorage.setItem(
          `monthlyOutputs_${thisMonth}`,
          newMonthlyOutputs.toString(),
        );

        setUsageStats((prev) => ({
          ...prev,
          dailyOutputs: newDailyOutputs,
          monthlyOutputs: newMonthlyOutputs,
        }));
      } else if (type === "downloads") {
        const newDailyDownloads = usageStats.dailyDownloads + 1;
        const newMonthlyDownloads = usageStats.monthlyDownloads + 1;

        localStorage.setItem(
          `dailyDownloads_${today}`,
          newDailyDownloads.toString(),
        );
        localStorage.setItem(
          `monthlyDownloads_${thisMonth}`,
          newMonthlyDownloads.toString(),
        );

        setUsageStats((prev) => ({
          ...prev,
          dailyDownloads: newDailyDownloads,
          monthlyDownloads: newMonthlyDownloads,
        }));
      }
    },
    [usageStats],
  );

  const canUseFeature = useCallback(
    (feature: "outputs" | "downloads"): boolean => {
      // Paid users have unlimited access
      if (subscriptionStatus.hasActiveSubscription) {
        return true;
      }

      // Free users have limits
      if (feature === "outputs") {
        return usageStats.dailyOutputs < FREE_LIMITS.dailyOutputs;
      } else if (feature === "downloads") {
        return usageStats.dailyDownloads < FREE_LIMITS.dailyDownloads;
      }

      return false;
    },
    [subscriptionStatus.hasActiveSubscription, usageStats],
  );

  const getRemainingUsage = useCallback(
    (feature: "outputs" | "downloads"): number => {
      if (subscriptionStatus.hasActiveSubscription) {
        return -1; // Unlimited
      }

      if (feature === "outputs") {
        return Math.max(0, FREE_LIMITS.dailyOutputs - usageStats.dailyOutputs);
      } else if (feature === "downloads") {
        return Math.max(
          0,
          FREE_LIMITS.dailyDownloads - usageStats.dailyDownloads,
        );
      }

      return 0;
    },
    [subscriptionStatus.hasActiveSubscription, usageStats],
  );

  const getUsagePercentage = useCallback(
    (feature: "outputs" | "downloads"): number => {
      if (subscriptionStatus.hasActiveSubscription) {
        return 0; // No limits for paid users
      }

      if (feature === "outputs") {
        return Math.min(
          100,
          (usageStats.dailyOutputs / FREE_LIMITS.dailyOutputs) * 100,
        );
      } else if (feature === "downloads") {
        return Math.min(
          100,
          (usageStats.dailyDownloads / FREE_LIMITS.dailyDownloads) * 100,
        );
      }

      return 0;
    },
    [subscriptionStatus.hasActiveSubscription, usageStats],
  );

  return {
    subscriptionStatus,
    usageStats,
    loading,
    canUseFeature,
    incrementUsage,
    getRemainingUsage,
    getUsagePercentage,
    checkSubscriptionStatus,
    updateUsageStats,
    freeLimits: FREE_LIMITS,
  };
}
