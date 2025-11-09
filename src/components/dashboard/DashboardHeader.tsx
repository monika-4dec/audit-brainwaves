import { Brain, Shield, Activity, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DashboardHeaderProps {
  activeView: "overview" | "controls" | "anomalies" | "samples";
  setActiveView: (view: "overview" | "controls" | "anomalies" | "samples") => void;
}

export const DashboardHeader = ({ activeView, setActiveView }: DashboardHeaderProps) => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Brain className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Audit Intelligence</h1>
              <p className="text-sm text-muted-foreground">Bots to Brains: AI-Powered Audit Automation</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
              <span className="text-xs font-medium text-success">All Systems Operational</span>
            </div>
          </div>
        </div>

        <nav className="flex gap-2">
          <Button
            variant={activeView === "overview" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveView("overview")}
            className={cn(
              "gap-2",
              activeView === "overview" && "shadow-lg"
            )}
          >
            <Activity className="h-4 w-4" />
            Overview
          </Button>
          <Button
            variant={activeView === "controls" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveView("controls")}
            className={cn(
              "gap-2",
              activeView === "controls" && "shadow-lg"
            )}
          >
            <Shield className="h-4 w-4" />
            Control Monitor
          </Button>
          <Button
            variant={activeView === "anomalies" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveView("anomalies")}
            className={cn(
              "gap-2",
              activeView === "anomalies" && "shadow-lg"
            )}
          >
            <Brain className="h-4 w-4" />
            Anomaly Detection
          </Button>
          <Button
            variant={activeView === "samples" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveView("samples")}
            className={cn(
              "gap-2",
              activeView === "samples" && "shadow-lg"
            )}
          >
            <Database className="h-4 w-4" />
            Sample Selection
          </Button>
        </nav>
      </div>
    </header>
  );
};
