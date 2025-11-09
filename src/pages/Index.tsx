import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MetricsGrid } from "@/components/dashboard/MetricsGrid";
import { RiskHeatmap } from "@/components/dashboard/RiskHeatmap";
import { AnomalyFeed } from "@/components/dashboard/AnomalyFeed";
import { ControlMonitor } from "@/components/dashboard/ControlMonitor";
import { SampleSelector } from "@/components/dashboard/SampleSelector";
import { InsightsPanel } from "@/components/dashboard/InsightsPanel";

const Index = () => {
  const [activeView, setActiveView] = useState<"overview" | "controls" | "anomalies" | "samples">("overview");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardHeader activeView={activeView} setActiveView={setActiveView} />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        {activeView === "overview" && (
          <>
            <MetricsGrid />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <RiskHeatmap />
                <ControlMonitor />
              </div>
              <div className="space-y-6">
                <AnomalyFeed />
                <InsightsPanel />
              </div>
            </div>
          </>
        )}

        {activeView === "controls" && (
          <div className="space-y-6">
            <ControlMonitor expanded />
          </div>
        )}

        {activeView === "anomalies" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RiskHeatmap />
            </div>
            <AnomalyFeed expanded />
          </div>
        )}

        {activeView === "samples" && (
          <SampleSelector />
        )}
      </main>
    </div>
  );
};

export default Index;
