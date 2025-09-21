-- Fix the search_path for the function to address security warning
CREATE OR REPLACE FUNCTION public.update_coffee_shops_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = 'public';