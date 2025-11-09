import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MetricsGrid } from "@/components/dashboard/MetricsGrid";
import { RiskHeatmap } from "@/components/dashboard/RiskHeatmap";
import { AnomalyFeed } from "@/components/dashboard/AnomalyFeed";
import { ControlMonitor } from "@/components/dashboard/ControlMonitor";
import { SampleSelector } from "@/components/dashboard/SampleSelector";
import { InsightsPanel } from "@/components/dashboard/InsightsPanel";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

const Index = () => {
  const [activeView, setActiveView] = useState<"overview" | "controls" | "anomalies" | "samples">("overview");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardHeader activeView={activeView} setActiveView={setActiveView} />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        {activeView === "overview" && (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
                <p className="text-muted-foreground">Real-time audit intelligence and insights</p>
              </div>
            </div>
            
            <MetricsGrid />
            
            <QuickActions onViewChange={setActiveView} onNavigate={navigate} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <RiskHeatmap />
                <ControlMonitor />
              </div>
              <div className="space-y-6">
                <AnomalyFeed />
                <RecentActivity />
                <InsightsPanel />
              </div>
            </div>
          </>
        )}

        {activeView === "controls" && (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-3xl font-bold tracking-tight">Control Monitor</h2>
              <p className="text-muted-foreground">Real-time control effectiveness tracking</p>
            </div>
            <ControlMonitor expanded />
          </div>
        )}

        {activeView === "anomalies" && (
          <>
            <div className="mb-6">
              <h2 className="text-3xl font-bold tracking-tight">Anomaly Detection</h2>
              <p className="text-muted-foreground">AI-powered risk identification and analysis</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <RiskHeatmap />
              </div>
              <AnomalyFeed expanded />
            </div>
          </>
        )}

        {activeView === "samples" && (
          <>
            <div className="mb-6">
              <h2 className="text-3xl font-bold tracking-tight">Sample Selection</h2>
              <p className="text-muted-foreground">AI-powered transaction sampling and analysis</p>
            </div>
            <SampleSelector />
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
