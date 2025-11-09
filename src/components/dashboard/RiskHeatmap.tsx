import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const data = [
  { category: "Financial", high: 12, medium: 28, low: 45 },
  { category: "Operations", high: 8, medium: 35, low: 52 },
  { category: "Compliance", high: 15, medium: 22, low: 38 },
  { category: "IT Systems", high: 19, medium: 31, low: 41 },
  { category: "HR", high: 5, medium: 18, low: 62 },
];

const COLORS = {
  high: "hsl(var(--destructive))",
  medium: "hsl(var(--warning))",
  low: "hsl(var(--success))",
};

export const RiskHeatmap = () => {
  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Risk Distribution by Category
        </CardTitle>
        <CardDescription>
          Control risk levels across audit domains
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
              }}
            />
            <Bar dataKey="high" stackId="a" fill={COLORS.high} />
            <Bar dataKey="medium" stackId="a" fill={COLORS.medium} />
            <Bar dataKey="low" stackId="a" fill={COLORS.low} />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex gap-4 mt-4 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: COLORS.high }} />
            <span className="text-xs text-muted-foreground">High Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: COLORS.medium }} />
            <span className="text-xs text-muted-foreground">Medium Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: COLORS.low }} />
            <span className="text-xs text-muted-foreground">Low Risk</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
