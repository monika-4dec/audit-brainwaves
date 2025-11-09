import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Loader2, FileText } from "lucide-react";
import { AuditRecord } from "@/pages/DataManagement";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

interface InsightsGeneratorProps {
  records: AuditRecord[];
}

export const InsightsGenerator = ({ records }: InsightsGeneratorProps) => {
  const [insights, setInsights] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const generateInsights = async () => {
    if (records.length === 0) {
      toast({
        title: "No data available",
        description: "Upload audit data first to generate insights",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const summary = {
        total_records: records.length,
        categories: [...new Set(records.map(r => r.category))],
        high_risk: records.filter(r => r.risk_level === "High").length,
        medium_risk: records.filter(r => r.risk_level === "Medium").length,
        low_risk: records.filter(r => r.risk_level === "Low").length,
        total_amount: records.reduce((sum, r) => sum + (r.amount || 0), 0),
        avg_risk_score: Math.round(
          records.reduce((sum, r) => sum + r.ai_risk_score, 0) / records.length
        ),
      };

      const { data, error } = await supabase.functions.invoke('generate-audit-insights', {
        body: { summary }
      });

      if (error) throw error;
      setInsights(data.insights);
      
      toast({
        title: "Insights generated",
        description: "AI has analyzed your audit data",
      });
    } catch (error: any) {
      toast({
        title: "Failed to generate insights",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-border/50 sticky top-24">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI Insights
        </CardTitle>
        <CardDescription>
          Generate intelligent analysis of your audit data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={generateInsights} 
          disabled={loading || records.length === 0}
          className="w-full gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Brain className="h-4 w-4" />
              Generate Insights
            </>
          )}
        </Button>

        {insights && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <FileText className="h-4 w-4 text-primary" />
              Analysis Report
            </div>
            <ScrollArea className="h-[400px]">
              <div className="p-4 rounded-lg bg-card/50 border border-border/50 text-sm whitespace-pre-wrap">
                {insights}
              </div>
            </ScrollArea>
          </div>
        )}

        {!insights && !loading && (
          <div className="p-4 rounded-lg bg-muted/30 text-center text-sm text-muted-foreground">
            Upload audit data and click "Generate Insights" to receive AI-powered analysis
          </div>
        )}
      </CardContent>
    </Card>
  );
};
