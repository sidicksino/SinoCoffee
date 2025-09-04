import { useState, useEffect } from 'react';
import { Heart, Coffee, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const Favorites = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const { addItem } = useCart();
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadFavorites();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadFavorites = async () => {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setFavorites(data.map(item => ({
        id: item.item_id,
        name: item.name,
        price: Number(item.price),
        image: item.image,
        category: item.category
      })));
    } catch (error) {
      toast({
        title: "Error loading favorites",
        description: "Failed to load your favorites. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (id: string) => {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user?.id)
        .eq('item_id', id);

      if (error) throw error;

      setFavorites(favorites.filter(item => item.id !== id));
      toast({
        title: "Removed from favorites",
        description: "Item has been removed from your favorites.",
      });
    } catch (error) {
      toast({
        title: "Error removing favorite",
        description: "Failed to remove from favorites. Please try again.",
        variant: "destructive",
      });
    }
  };

  const addToCart = (item: FavoriteItem) => {
    addItem({
      id: parseInt(item.id),
      name: item.name,
      price: `$${item.price.toFixed(2)}`,
      image: item.image
    });
    toast({
      title: "Added to cart!",
      description: `${item.name} has been added to your cart.`,
    });
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse bg-gradient-card border-0">
              <div className="aspect-video bg-coffee-light/20 rounded-t-lg"></div>
              <CardContent className="p-6">
                <div className="h-6 bg-coffee-light/20 rounded mb-2"></div>
                <div className="h-4 bg-coffee-light/20 rounded mb-4"></div>
                <div className="h-10 bg-coffee-light/20 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 pt-24">
        <div className="text-center py-12">
          <div className="relative">
            <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4 animate-pulse" />
            <Sparkles className="h-8 w-8 absolute -top-2 -right-2 text-gold animate-bounce" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-coffee-dark">No Favorites Yet</h2>
          <p className="text-coffee-medium mb-6">
            Start adding items to your favorites to see them here!
          </p>
          <Button 
            onClick={() => window.location.href = '/#menu'}
            className="bg-coffee-dark hover:bg-coffee-medium text-cream transition-all duration-300 hover:scale-105"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Browse Menu
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 pt-24">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="h-8 w-8 text-coffee-dark" />
        <h1 className="text-3xl font-bold text-coffee-dark">My Favorites</h1>
      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((item, index) => (
          <Card key={item.id} className="group overflow-hidden hover:shadow-warm transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 hover:scale-105 bg-gradient-card border-0 animate-fade-in"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  transform: 'perspective(1000px) rotateY(0deg)',
                  transformStyle: 'preserve-3d'
                }}>
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg text-coffee-dark group-hover:text-coffee-medium transition-colors">
                    {item.name}
                  </CardTitle>
                  <Badge variant="secondary" className="mt-2 bg-gradient-accent text-coffee-dark">
                    {item.category}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-coffee-dark">
                    ${item.price.toFixed(2)}
                  </p>
                  <Sparkles className="h-4 w-4 text-gold animate-pulse mx-auto mt-1" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button 
                  className="flex-1 bg-coffee-dark hover:bg-coffee-medium text-cream transition-all duration-300 hover:scale-105"
                  onClick={() => addToCart(item)}
                >
                  <Coffee className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => removeFavorite(item.id)}
                  className="text-red-500 hover:text-red-600 hover:border-red-300 hover:scale-110 transition-all duration-300"
                >
                  <Heart className="h-4 w-4 fill-current" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Favorites;