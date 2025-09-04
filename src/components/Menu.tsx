import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Star, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import espressoImage from '@/assets/espresso.jpg';
import cappuccinoImage from '@/assets/cappuccino.jpg';
import latteImage from '@/assets/latte.jpg';
import coldBrewImage from '@/assets/cold-brew.jpg';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  rating: number;
  popular: boolean;
  category: string;
}

const Menu = () => {
  const { addItem, openCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<number[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Image mapping for fallback
  const imageMap: { [key: string]: string } = {
    'Espresso': espressoImage,
    'Americano': espressoImage,
    'Cappuccino': cappuccinoImage,
    'Mocha': cappuccinoImage,
    'Latte': latteImage,
    'Macchiato': latteImage,
    'Cold Brew': coldBrewImage,
    'Flat White': coldBrewImage,
  };

  useEffect(() => {
    loadMenuItems();
    if (user) {
      loadFavorites();
    }
  }, [user]);

  const loadMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMenuItems(data || []);
    } catch (error) {
      console.error('Error loading menu items:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load menu items.',
      });
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = async () => {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('item_id')
        .eq('user_id', user?.id);

      if (error) throw error;
      
      setFavorites(data.map(item => parseInt(item.item_id)));
    } catch (error) {
      // Fail silently for favorites loading
      console.error('Error loading favorites:', error);
    }
  };

  const toggleFavorite = async (item: any) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to add favorites.",
        variant: "destructive",
      });
      return;
    }

    const isAlreadyFavorite = favorites.includes(item.id);
    
    try {
      if (isAlreadyFavorite) {
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('item_id', item.id.toString());

        if (error) throw error;

        setFavorites(favorites.filter(id => id !== item.id));
        toast({
          title: "Removed from favorites",
          description: `${item.name} has been removed from your favorites.`,
        });
      } else {
        const { error } = await supabase
          .from('favorites')
          .insert({
            user_id: user.id,
            item_id: item.id.toString(),
            name: item.name,
            price: parseFloat(item.price.replace('$', '')),
            image: item.image,
            category: 'Coffee'
          });

        if (error) throw error;

        setFavorites([...favorites, item.id]);
        toast({
          title: "Added to favorites!",
          description: `${item.name} has been added to your favorites.`,
        });
      }
    } catch (error) {
      toast({
        title: "Error updating favorites",
        description: "Failed to update favorites. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddToCart = async (item: any) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to add items to your cart.",
        variant: "destructive",
      });
      window.location.href = '/auth';
      return;
    }
    
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image
    });
    
    // Add to purchase history
    try {
      await supabase
        .from('history')
        .insert({
          user_id: user.id,
          order_id: Date.now().toString(),
          items: [{
            name: item.name,
            quantity: 1,
            price: parseFloat(item.price.replace('$', ''))
          }],
          total: parseFloat(item.price.replace('$', '')),
          status: 'completed'
        });
    } catch (error) {
      // Fail silently for history tracking
      console.error('Error adding to history:', error);
    }
    
    toast({
      title: "Added to cart!",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const handleViewCompleteMenu = () => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
    toast({
      title: "Complete Menu",
      description: "Explore all our coffee varieties below!",
    });
  };

  return (
    <section id="menu" className="py-20 bg-warm-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-coffee-dark mb-4 px-4">
            Our Coffee Menu
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-coffee-medium max-w-2xl mx-auto leading-relaxed px-4">
            Crafted with premium beans from around the world, each cup is a masterpiece 
            of flavor and artistry.
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 8 }).map((_, index) => (
              <Card key={index} className="animate-pulse bg-gradient-card border-0">
                <CardContent className="p-0">
                  <div className="h-48 sm:h-56 md:h-64 bg-muted rounded-t-lg"></div>
                  <div className="p-6">
                    <div className="h-6 bg-muted rounded mb-3"></div>
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded mb-4 w-3/4"></div>
                    <div className="h-10 bg-muted rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            menuItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-warm transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 hover:scale-105 bg-gradient-card border-0 relative overflow-hidden animate-fade-in">
                <CardContent className="p-0">
                  {/* Image Container */}
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={item.image_url || imageMap[item.name] || espressoImage} 
                      alt={`${item.name} coffee`}
                      className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {item.popular && (
                      <div className="absolute top-4 left-4 bg-gradient-accent text-coffee-dark px-3 py-1 rounded-full text-sm font-semibold shadow-gold animate-pulse">
                        Popular
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
                      <Star className="h-4 w-4 text-gold fill-current" />
                      <span className="text-sm font-medium text-coffee-dark">{item.rating.toFixed(1)}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`absolute bottom-4 right-4 w-10 h-10 rounded-full p-0 backdrop-blur-sm transition-all duration-300 ${
                        favorites.includes(parseInt(item.id)) 
                          ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' 
                          : 'bg-background/90 text-muted-foreground hover:bg-background hover:text-red-500'
                      }`}
                      onClick={() => toggleFavorite({
                        id: parseInt(item.id),
                        name: item.name,
                        price: `$${item.price.toFixed(2)}`,
                        image: item.image_url || imageMap[item.name] || espressoImage
                      })}
                    >
                      <Heart className={`h-4 w-4 transition-all duration-300 ${favorites.includes(parseInt(item.id)) ? 'fill-current scale-110' : ''}`} />
                    </Button>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-serif text-xl font-semibold text-coffee-dark">{item.name}</h3>
                      <span className="font-bold text-lg text-coffee-dark">${item.price.toFixed(2)}</span>
                    </div>
                    
                    <p className="text-coffee-medium text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <Button 
                      className="w-full bg-coffee-dark hover:bg-coffee-medium text-cream transition-all duration-300 group-hover:shadow-card hover:scale-105 active:scale-95"
                      onClick={() => handleAddToCart({
                        id: parseInt(item.id),
                        name: item.name,
                        price: `$${item.price.toFixed(2)}`,
                        image: item.image_url || imageMap[item.name] || espressoImage
                      })}
                    >
                      <Plus className="h-4 w-4 mr-2 transition-transform group-hover:rotate-90" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* View All Menu Button */}
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg" 
            className="border-coffee-dark text-coffee-dark hover:bg-coffee-dark hover:text-cream"
            onClick={handleViewCompleteMenu}
          >
            View Complete Menu
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Menu;