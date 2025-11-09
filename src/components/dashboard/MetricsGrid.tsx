import { TrendingUp, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const metrics = [
  {
    title: "Controls Monitored",
    value: "2,847",
    change: "+12%",
    trend: "up",
    icon: CheckCircle2,
    color: "text-success",
  },
  {
    title: "Anomalies Detected",
    value: "23",
    change: "-8%",
    trend: "down",
    icon: AlertTriangle,
    color: "text-warning",
  },
  {
    title: "Risk Score",
    value: "67/100",
    change: "+3pts",
    trend: "up",
    icon: TrendingUp,
    color: "text-primary",
  },
  {
    title: "Audit Hours Saved",
    value: "1,429",
    change: "+24%",
    trend: "up",
    icon: Clock,
    color: "text-success",
  },
];

export const MetricsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card key={metric.title} className="border-border/50 bg-gradient-to-br from-card to-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <Icon className={`h-5 w-5 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{metric.value}</div>
              <p className={`text-xs mt-1 ${metric.trend === "up" ? "text-success" : "text-muted-foreground"}`}>
                {metric.change} from last month
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
