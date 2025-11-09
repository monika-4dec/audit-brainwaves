import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Database, Loader2 } from "lucide-react";
import { AuditRecord } from "@/pages/DataManagement";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DataTableProps {
  records: AuditRecord[];
  loading: boolean;
}

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

export const DataTable = ({ records, loading }: DataTableProps) => {
  if (loading) {
    return (
      <Card className="border-border/50">
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          Audit Records ({records.length})
        </CardTitle>
        <CardDescription>
          All uploaded and analyzed audit data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead>AI Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    No records found. Upload data to get started.
                  </TableCell>
                </TableRow>
              ) : (
                records.map((record) => (
                  <TableRow key={record.id} className="hover:bg-card/50">
                    <TableCell className="text-sm">
                      {new Date(record.transaction_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{record.category}</Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{record.description}</TableCell>
                    <TableCell>${record.amount?.toLocaleString() || 0}</TableCell>
                    <TableCell>
                      <Badge variant={getRiskColor(record.risk_level) as any}>
                        {record.risk_level}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${record.ai_risk_score}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground w-8">
                          {record.ai_risk_score}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
