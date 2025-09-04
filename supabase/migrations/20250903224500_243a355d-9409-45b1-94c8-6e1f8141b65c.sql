-- Create an enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create a security definer function to check if a user has a specific role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create policies for user_roles table
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create menu_items table
CREATE TABLE public.menu_items (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC NOT NULL,
    image_url TEXT,
    rating NUMERIC DEFAULT 0,
    popular BOOLEAN DEFAULT false,
    category TEXT DEFAULT 'Coffee',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on menu_items
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

-- Create policies for menu_items table
CREATE POLICY "Anyone can view menu items"
ON public.menu_items
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admins can manage menu items"
ON public.menu_items
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger for automatic timestamp updates on menu_items
CREATE TRIGGER update_menu_items_updated_at
BEFORE UPDATE ON public.menu_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample menu items from the current hardcoded data
INSERT INTO public.menu_items (name, description, price, rating, popular, category) VALUES
('Espresso', 'Rich, concentrated coffee with a perfect crema. The foundation of all great coffee drinks.', 3.50, 4.9, true, 'Coffee'),
('Cappuccino', 'Classic Italian coffee with steamed milk foam and beautiful latte art.', 4.75, 4.8, true, 'Coffee'),
('Latte', 'Smooth and creamy with perfectly steamed milk and subtle coffee flavor.', 5.25, 4.7, false, 'Coffee'),
('Cold Brew', 'Refreshing cold-extracted coffee with smooth, less acidic taste.', 4.25, 4.6, false, 'Coffee'),
('Americano', 'Bold espresso shots with hot water for a clean, strong coffee experience.', 3.75, 4.5, false, 'Coffee'),
('Mocha', 'Perfect blend of espresso, steamed milk, and rich chocolate syrup.', 5.50, 4.7, true, 'Coffee'),
('Macchiato', 'Espresso "marked" with a dollop of steamed milk foam.', 4.25, 4.6, false, 'Coffee'),
('Flat White', 'Smooth microfoam blended with double shot espresso.', 4.95, 4.8, true, 'Coffee');