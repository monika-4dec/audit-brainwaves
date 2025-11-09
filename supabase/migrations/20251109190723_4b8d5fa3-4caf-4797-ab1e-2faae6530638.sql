-- Create audit_records table for storing uploaded audit data
CREATE TABLE public.audit_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  file_name TEXT NOT NULL,
  category TEXT NOT NULL,
  risk_level TEXT NOT NULL,
  amount NUMERIC,
  transaction_date DATE,
  description TEXT,
  status TEXT DEFAULT 'pending',
  ai_risk_score INTEGER,
  control_gaps TEXT[],
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.audit_records ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own audit records" 
ON public.audit_records 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own audit records" 
ON public.audit_records 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own audit records" 
ON public.audit_records 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own audit records" 
ON public.audit_records 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.audit_records
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Create index for faster queries
CREATE INDEX idx_audit_records_user_id ON public.audit_records(user_id);
CREATE INDEX idx_audit_records_category ON public.audit_records(category);
CREATE INDEX idx_audit_records_risk_level ON public.audit_records(risk_level);
CREATE INDEX idx_audit_records_created_at ON public.audit_records(created_at DESC);