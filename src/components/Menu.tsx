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
    <section id="menu" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl lg:text-6xl font-bold text-cream mb-6">
            Popular Menu
          </h2>
          <div className="w-24 h-1 bg-gradient-accent mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-cream/80 max-w-3xl mx-auto leading-relaxed">
            Discover our signature blends and artisanal creations, each crafted with 
            the finest beans and served with meticulous attention to detail.
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-card rounded-3xl p-6 shadow-card border border-gold/10">
                  <div className="h-48 bg-muted/20 rounded-2xl mb-4"></div>
                  <div className="h-6 bg-muted/20 rounded mb-3"></div>
                  <div className="h-4 bg-muted/20 rounded mb-2"></div>
                  <div className="h-4 bg-muted/20 rounded mb-4 w-3/4"></div>
                  <div className="h-10 bg-muted/20 rounded-xl"></div>
                </div>
              </div>
            ))
          ) : (
            menuItems.map((item) => (
              <div 
                key={item.id} 
                className="group bg-card rounded-3xl p-6 shadow-card hover:shadow-warm transition-all duration-700 transform hover:-translate-y-3 hover:scale-105 border border-gold/10 hover:border-gold/30 animate-fade-in backdrop-blur-sm"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-2xl mb-6">
                  <img 
                    src={item.image_url || imageMap[item.name] || espressoImage} 
                    alt={`${item.name} coffee`}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {item.popular && (
                    <div className="absolute top-3 left-3 bg-gradient-accent text-coffee-dark px-3 py-1.5 rounded-full text-xs font-bold shadow-gold">
                      POPULAR
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center space-x-1">
                    <Star className="h-3.5 w-3.5 text-gold fill-current" />
                    <span className="text-xs font-semibold text-cream">{item.rating.toFixed(1)}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`absolute bottom-3 right-3 w-10 h-10 rounded-full p-0 backdrop-blur-sm transition-all duration-300 ${
                      favorites.includes(parseInt(item.id)) 
                        ? 'bg-red-500/30 text-red-400 hover:bg-red-500/40' 
                        : 'bg-card/80 text-cream/60 hover:bg-card hover:text-red-400'
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
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-serif text-xl font-bold text-cream group-hover:text-gold transition-colors duration-300">
                      {item.name}
                    </h3>
                    <span className="font-bold text-xl text-gold">${item.price.toFixed(2)}</span>
                  </div>
                  
                  <p className="text-cream/70 text-sm leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  <Button 
                    className="w-full bg-gradient-accent text-coffee-dark font-semibold hover:shadow-gold transition-all duration-500 group-hover:scale-105 active:scale-95 rounded-xl py-2.5"
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
              </div>
            ))
          )}
        </div>

        {/* View All Menu Button */}
        <div className="text-center mt-16">
          <Button 
            variant="outline" 
            size="lg" 
            className="border-2 border-gold/40 text-gold hover:bg-gold hover:text-coffee-dark transition-all duration-500 px-8 py-3 rounded-full font-semibold"
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