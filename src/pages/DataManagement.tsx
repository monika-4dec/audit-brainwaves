import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DataUpload } from "@/components/data/DataUpload";
import { DataTable } from "@/components/data/DataTable";
import { DataFilters } from "@/components/data/DataFilters";
import { InsightsGenerator } from "@/components/data/InsightsGenerator";

export interface AuditRecord {
  id: string;
  file_name: string;
  category: string;
  risk_level: string;
  amount: number;
  transaction_date: string;
  description: string;
  status: string;
  ai_risk_score: number;
  control_gaps: string[];
  created_at: string;
}

const DataManagement = () => {
  const [records, setRecords] = useState<AuditRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<AuditRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<"overview" | "controls" | "anomalies" | "samples">("overview");
  const { toast } = useToast();

  const fetchRecords = async () => {
    try {
      const { data, error } = await supabase
        .from("audit_records")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRecords(data || []);
      setFilteredRecords(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching data",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleUploadComplete = () => {
    fetchRecords();
    toast({
      title: "Upload successful",
      description: "Your audit data has been saved and analyzed.",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardHeader activeView={activeView} setActiveView={setActiveView} />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <DataUpload onUploadComplete={handleUploadComplete} />
            <DataFilters records={records} onFilter={setFilteredRecords} />
            <DataTable records={filteredRecords} loading={loading} />
          </div>
          <div>
            <InsightsGenerator records={filteredRecords} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DataManagement;
