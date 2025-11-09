import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RefreshCw, Download, Filter } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const sampleData = [
  {
    id: "TXN-8847",
    category: "AP",
    amount: "$45,230",
    risk: "High",
    date: "2025-11-08",
    aiScore: 92,
  },
  {
    id: "TXN-8832",
    category: "Payroll",
    amount: "$12,450",
    risk: "Medium",
    date: "2025-11-07",
    aiScore: 78,
  },
  {
    id: "TXN-8819",
    category: "Expenses",
    amount: "$3,890",
    risk: "Low",
    date: "2025-11-07",
    aiScore: 45,
  },
  {
    id: "TXN-8804",
    category: "AP",
    amount: "$89,120",
    risk: "High",
    date: "2025-11-06",
    aiScore: 95,
  },
];

export const SampleSelector = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "High":
        return "destructive";
      case "Medium":
        return "warning";
      default:
        return "secondary";
    }
  };

  return (
    <Card className="border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>AI-Powered Sample Selection</CardTitle>
            <CardDescription>
              Machine learning algorithms identify high-risk transactions for targeted testing
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export Selected
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border/50">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox />
                </TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>AI Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleData.map((row) => (
                <TableRow key={row.id} className="hover:bg-card/50">
                  <TableCell>
                    <Checkbox
                      checked={selected.includes(row.id)}
                      onCheckedChange={(checked) => {
                        setSelected(
                          checked
                            ? [...selected, row.id]
                            : selected.filter((id) => id !== row.id)
                        );
                      }}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{row.id}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>
                    <Badge variant={getRiskColor(row.risk) as any}>{row.risk}</Badge>
                  </TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${row.aiScore}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">{row.aiScore}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
