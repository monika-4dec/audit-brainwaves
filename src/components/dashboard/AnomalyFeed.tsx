import { AlertCircle, TrendingUp, FileWarning, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const anomalies = [
  {
    id: 1,
    type: "Transaction",
    severity: "high",
    message: "Unusual payment pattern detected in AP-2847",
    time: "2 min ago",
    icon: AlertCircle,
  },
  {
    id: 2,
    type: "Control Gap",
    severity: "medium",
    message: "Missing approval documentation for 15 transactions",
    time: "12 min ago",
    icon: FileWarning,
  },
  {
    id: 3,
    type: "Trend",
    severity: "low",
    message: "Increasing expense variance in Marketing dept",
    time: "1 hour ago",
    icon: TrendingUp,
  },
  {
    id: 4,
    type: "Security",
    severity: "high",
    message: "Unauthorized system access attempt logged",
    time: "2 hours ago",
    icon: Shield,
  },
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "high":
      return "destructive";
    case "medium":
      return "warning";
    default:
      return "secondary";
  }
};

interface AnomalyFeedProps {
  expanded?: boolean;
}

export const AnomalyFeed = ({ expanded }: AnomalyFeedProps) => {
  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-warning" />
          Live Anomaly Feed
        </CardTitle>
        <CardDescription>Real-time AI-detected issues</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className={expanded ? "h-[600px]" : "h-[400px]"}>
          <div className="space-y-4">
            {anomalies.map((anomaly) => {
              const Icon = anomaly.icon;
              return (
                <div
                  key={anomaly.id}
                  className="flex gap-3 p-3 rounded-lg border border-border/50 bg-card/50 hover:bg-card/80 transition-colors"
                >
                  <div className={`p-2 rounded-lg bg-${getSeverityColor(anomaly.severity)}/10 h-fit`}>
                    <Icon className={`h-4 w-4 text-${getSeverityColor(anomaly.severity)}`} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{anomaly.type}</span>
                      <Badge variant={getSeverityColor(anomaly.severity) as any}>
                        {anomaly.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{anomaly.message}</p>
                    <span className="text-xs text-muted-foreground">{anomaly.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
