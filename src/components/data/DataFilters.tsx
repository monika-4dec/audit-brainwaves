import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { AuditRecord } from "@/pages/DataManagement";

interface DataFiltersProps {
  records: AuditRecord[];
  onFilter: (filtered: AuditRecord[]) => void;
}

export const DataFilters = ({ records, onFilter }: DataFiltersProps) => {
  const [category, setCategory] = useState<string>("all");
  const [riskLevel, setRiskLevel] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let filtered = [...records];

    if (category !== "all") {
      filtered = filtered.filter(r => r.category === category);
    }

    if (riskLevel !== "all") {
      filtered = filtered.filter(r => r.risk_level === riskLevel);
    }

    if (searchTerm) {
      filtered = filtered.filter(r =>
        r.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.file_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    onFilter(filtered);
  }, [category, riskLevel, searchTerm, records]);

  const handleReset = () => {
    setCategory("all");
    setRiskLevel("all");
    setSearchTerm("");
  };

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          Filter & Search
        </CardTitle>
        <CardDescription>
          Narrow down audit records by category, risk level, or search terms
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Financial">Financial</SelectItem>
                <SelectItem value="Operations">Operations</SelectItem>
                <SelectItem value="Compliance">Compliance</SelectItem>
                <SelectItem value="IT Systems">IT Systems</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Risk Level</Label>
            <Select value={riskLevel} onValueChange={setRiskLevel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Search</Label>
            <Input
              placeholder="Search descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Button variant="outline" size="sm" onClick={handleReset} className="gap-2">
          <X className="h-4 w-4" />
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  );
};
