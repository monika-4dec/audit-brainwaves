import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, FileText, TrendingUp } from "lucide-react";

const insights = [
  {
    id: 1,
    title: "Control Gap Detected",
    description: "15 transactions missing approval workflow in Q4",
    action: "Review Process",
    icon: Brain,
  },
  {
    id: 2,
    title: "Forecast Alert",
    description: "87% probability of control breakdown in IT systems next month",
    action: "View Forecast",
    icon: TrendingUp,
  },
  {
    id: 3,
    title: "Draft Report Ready",
    description: "AI-generated audit report for Financial Controls available",
    action: "Open Report",
    icon: FileText,
  },
];

export const InsightsPanel = () => {
  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI Insights
        </CardTitle>
        <CardDescription>Automated recommendations & reports</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => {
            const Icon = insight.icon;
            return (
              <div
                key={insight.id}
                className="p-4 rounded-lg border border-border/50 bg-gradient-to-br from-primary/5 to-transparent space-y-3"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="font-medium text-sm">{insight.title}</div>
                    <p className="text-xs text-muted-foreground">{insight.description}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  {insight.action}
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
