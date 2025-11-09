import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Search, TrendingUp } from "lucide-react";

interface QuickActionsProps {
  onViewChange: (view: "overview" | "controls" | "anomalies" | "samples") => void;
  onNavigate: (path: string) => void;
}

export const QuickActions = ({ onViewChange, onNavigate }: QuickActionsProps) => {
  const actions = [
    {
      title: "Upload Data",
      description: "Import audit records and evidence",
      icon: Upload,
      color: "text-primary",
      action: () => onNavigate("/data"),
    },
    {
      title: "Generate Report",
      description: "Create automated audit summary",
      icon: FileText,
      color: "text-success",
      action: () => onNavigate("/data"),
    },
    {
      title: "Review Samples",
      description: "Analyze high-risk transactions",
      icon: Search,
      color: "text-warning",
      action: () => onViewChange("samples"),
    },
    {
      title: "View Trends",
      description: "Explore risk patterns over time",
      icon: TrendingUp,
      color: "text-primary",
      action: () => onViewChange("anomalies"),
    },
  ];

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common audit tasks and workflows</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.title}
                variant="outline"
                className="h-auto p-4 justify-start gap-4 hover:bg-card/80"
                onClick={action.action}
              >
                <div className={`p-3 rounded-lg bg-card ${action.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
