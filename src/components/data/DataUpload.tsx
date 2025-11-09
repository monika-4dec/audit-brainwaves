import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileSpreadsheet } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface DataUploadProps {
  onUploadComplete: () => void;
}

export const DataUpload = ({ onUploadComplete }: DataUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const parseCSV = async (file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          const lines = text.split('\n');
          const headers = lines[0].split(',').map(h => h.trim());
          
          const data = lines.slice(1).map(line => {
            if (!line.trim()) return null;
            const values = line.split(',');
            const obj: any = {};
            headers.forEach((header, index) => {
              obj[header] = values[index]?.trim() || '';
            });
            return obj;
          }).filter(Boolean);
          
          resolve(data);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  const handleUpload = async () => {
    if (!file || !category) {
      toast({
        title: "Missing information",
        description: "Please select a file and category",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const parsedData = await parseCSV(file);
      
      const records = parsedData.map(row => ({
        user_id: user.id,
        file_name: file.name,
        category: category,
        risk_level: row.risk_level || 'Medium',
        amount: parseFloat(row.amount) || 0,
        transaction_date: row.date || new Date().toISOString().split('T')[0],
        description: row.description || '',
        status: 'pending',
        ai_risk_score: Math.floor(Math.random() * 100),
        control_gaps: [],
      }));

      const { error } = await supabase
        .from('audit_records')
        .insert(records);

      if (error) throw error;

      onUploadComplete();
      setFile(null);
      setCategory("");
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5 text-primary" />
          Upload Audit Data
        </CardTitle>
        <CardDescription>
          Upload CSV files containing transaction data, control evidence, or audit findings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="category">Data Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Financial">Financial Transactions</SelectItem>
              <SelectItem value="Operations">Operational Data</SelectItem>
              <SelectItem value="Compliance">Compliance Records</SelectItem>
              <SelectItem value="IT Systems">IT System Logs</SelectItem>
              <SelectItem value="HR">HR Records</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="file">Upload File</Label>
          <div className="flex gap-2">
            <Input
              id="file"
              type="file"
              accept=".csv"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <Button onClick={handleUpload} disabled={uploading || !file || !category}>
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
          {file && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileSpreadsheet className="h-4 w-4" />
              {file.name}
            </div>
          )}
        </div>

        <div className="p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground">
          <p className="font-medium mb-1">Expected CSV format:</p>
          <code>amount, date, description, risk_level</code>
        </div>
      </CardContent>
    </Card>
  );
};
