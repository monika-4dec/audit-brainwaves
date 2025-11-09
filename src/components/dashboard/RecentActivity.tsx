import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Upload, FileText, AlertTriangle } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "upload",
    message: "Financial transactions uploaded",
    detail: "245 records processed",
    time: "5 minutes ago",
    icon: Upload,
  },
  {
    id: 2,
    type: "report",
    message: "Quarterly audit report generated",
    detail: "Q4 2024 Summary",
    time: "1 hour ago",
    icon: FileText,
  },
  {
    id: 3,
    type: "alert",
    message: "High-risk anomaly detected",
    detail: "Payment authorization control",
    time: "2 hours ago",
    icon: AlertTriangle,
  },
  {
    id: 4,
    type: "upload",
    message: "IT system logs imported",
    detail: "1,829 entries analyzed",
    time: "3 hours ago",
    icon: Upload,
  },
];

export const RecentActivity = () => {
  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Recent Activity
        </CardTitle>
        <CardDescription>Latest actions and system events</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {activities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div
                  key={activity.id}
                  className="flex gap-3 p-3 rounded-lg border border-border/50 bg-card/30 hover:bg-card/50 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-primary/10 h-fit">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="text-sm font-medium">{activity.message}</div>
                    <div className="text-xs text-muted-foreground">{activity.detail}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {activity.time}
                    </div>
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
