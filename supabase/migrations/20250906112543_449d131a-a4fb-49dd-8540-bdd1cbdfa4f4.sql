-- Create coffee_shops table for storing location data
CREATE TABLE public.coffee_shops (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  latitude NUMERIC NOT NULL,
  longitude NUMERIC NOT NULL,
  phone TEXT,
  hours TEXT,
  rating NUMERIC DEFAULT 4.5,
  image_url TEXT,
  description TEXT,
  specialty TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.coffee_shops ENABLE ROW LEVEL SECURITY;

-- Create policies for coffee shops
CREATE POLICY "Anyone can view coffee shops" 
ON public.coffee_shops 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage coffee shops" 
ON public.coffee_shops 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Insert sample coffee shop data
INSERT INTO public.coffee_shops (name, address, latitude, longitude, phone, hours, rating, specialty, description) VALUES
('Origin Roasters NYC', '123 Broadway, New York, NY 10001', 40.730610, -73.935242, '(212) 555-0123', 'Mon-Fri: 6:30AM-8PM, Sat-Sun: 7AM-9PM', 4.9, 'Single Origin', 'Artisanal single-origin coffee roasted daily in-house'),
('Bean & Beyond London', '45 Oxford Street, London W1D 2DX, UK', 51.507351, -0.127758, '+44 20 7946 0958', 'Mon-Sun: 7AM-10PM', 4.8, 'Espresso Blends', 'Traditional British coffee house with modern twist'),
('Café Central Paris', '12 Rue de Rivoli, 75001 Paris, France', 48.864716, 2.349014, '+33 1 42 97 48 75', 'Mon-Sun: 6AM-11PM', 4.7, 'French Roast', 'Classic Parisian café experience with premium beans'),
('Roast Masters Sydney', '200 George Street, Sydney NSW 2000, Australia', -33.867487, 151.209900, '+61 2 9247 7890', 'Mon-Fri: 5:30AM-6PM, Sat-Sun: 7AM-5PM', 4.9, 'Dark Roast', 'Award-winning roastery with sustainable sourcing'),
('Coffee Culture Vancouver', '1055 West Georgia Street, Vancouver, BC V6E 3P3, Canada', 49.282729, -123.121086, '+1 604 555-0199', 'Mon-Sun: 6AM-9PM', 4.6, 'Cold Brew', 'Innovative cold brew specialists and local favorite');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_coffee_shops_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_coffee_shops_updated_at
  BEFORE UPDATE ON public.coffee_shops
  FOR EACH ROW
  EXECUTE FUNCTION public.update_coffee_shops_updated_at();