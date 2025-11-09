import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

const controls = [
  {
    id: "FIN-001",
    name: "Payment Authorization",
    status: "compliant",
    effectiveness: 98,
    samples: 245,
    exceptions: 2,
  },
  {
    id: "OPS-042",
    name: "Inventory Reconciliation",
    status: "warning",
    effectiveness: 87,
    samples: 189,
    exceptions: 12,
  },
  {
    id: "IT-028",
    name: "Access Control Review",
    status: "compliant",
    effectiveness: 95,
    samples: 312,
    exceptions: 5,
  },
  {
    id: "COM-015",
    name: "Regulatory Reporting",
    status: "risk",
    effectiveness: 72,
    samples: 156,
    exceptions: 23,
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "compliant":
      return <CheckCircle2 className="h-5 w-5 text-success" />;
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-warning" />;
    case "risk":
      return <XCircle className="h-5 w-5 text-destructive" />;
    default:
      return null;
  }
};

interface ControlMonitorProps {
  expanded?: boolean;
}

export const ControlMonitor = ({ expanded }: ControlMonitorProps) => {
  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle>Control Effectiveness Monitor</CardTitle>
        <CardDescription>Real-time control performance tracking</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {controls.map((control) => (
            <div key={control.id} className="space-y-3 p-4 rounded-lg border border-border/50 bg-card/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(control.status)}
                  <div>
                    <div className="font-medium">{control.name}</div>
                    <div className="text-sm text-muted-foreground">{control.id}</div>
                  </div>
                </div>
                <Badge variant="outline">{control.effectiveness}% Effective</Badge>
              </div>
              <Progress value={control.effectiveness} className="h-2" />
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>{control.samples} samples tested</span>
                <span>•</span>
                <span className={control.exceptions > 10 ? "text-warning" : ""}>
                  {control.exceptions} exceptions
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
