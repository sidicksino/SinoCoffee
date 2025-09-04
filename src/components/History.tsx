import { useState, useEffect } from 'react';
import { Clock, Package, RefreshCw, Sparkles, Coffee } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: 'completed' | 'processing' | 'delivered';
}

const History = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { addItem } = useCart();
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadHistory();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('history')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setOrders(data.map(item => ({
        id: item.order_id,
        date: item.created_at,
        items: Array.isArray(item.items) ? (item.items as unknown as OrderItem[]) : [],
        total: Number(item.total),
        status: item.status as 'completed' | 'processing' | 'delivered'
      })));
    } catch (error) {
      toast({
        title: "Error loading history",
        description: "Failed to load your order history. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'delivered':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const reorderItems = (items: OrderItem[]) => {
    items.forEach(item => {
      addItem({
        id: Math.floor(Math.random() * 1000), // Generate random ID since we don't have original IDs
        name: item.name,
        price: `$${item.price.toFixed(2)}`,
        image: '/placeholder.svg' // Default image since we don't store images in history
      });
    });
    
    toast({
      title: "Items reordered!",
      description: `${items.length} item${items.length > 1 ? 's' : ''} have been added to your cart.`,
    });
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 pt-24">
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse bg-gradient-card border-0">
              <CardHeader>
                <div className="h-6 bg-coffee-light/20 rounded mb-2"></div>
                <div className="h-4 bg-coffee-light/20 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 bg-coffee-light/20 rounded"></div>
                  <div className="h-4 bg-coffee-light/20 rounded"></div>
                  <div className="h-4 bg-coffee-light/20 rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 pt-24">
        <div className="text-center py-12">
          <div className="relative">
            <Clock className="h-16 w-16 mx-auto text-muted-foreground mb-4 animate-pulse" />
            <Sparkles className="h-8 w-8 absolute -top-2 -right-2 text-gold animate-bounce" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-coffee-dark">No Order History</h2>
          <p className="text-coffee-medium mb-6">
            Your past orders will appear here once you start shopping!
          </p>
          <Button 
            onClick={() => window.location.href = '/#menu'}
            className="bg-coffee-dark hover:bg-coffee-medium text-cream transition-all duration-300 hover:scale-105"
          >
            <Coffee className="h-4 w-4 mr-2" />
            Start Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 pt-24">
      <div className="flex items-center gap-3 mb-8">
        <Clock className="h-8 w-8 text-coffee-dark" />
        <h1 className="text-3xl font-bold text-coffee-dark">Order History</h1>
      </div>

        <div className="space-y-6">
        {orders.map((order, index) => (
          <Card key={order.id} className="overflow-hidden hover:shadow-warm transition-all duration-500 transform hover:-translate-y-1 hover:scale-[1.02] bg-gradient-card border-0 group animate-fade-in"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  transform: 'perspective(1000px) rotateX(0deg)',
                  transformStyle: 'preserve-3d'
                }}>
            <CardHeader className="bg-gradient-to-r from-coffee-dark/5 to-coffee-medium/5">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg text-coffee-dark flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Order #{order.id}
                  </CardTitle>
                  <p className="text-coffee-medium text-sm flex items-center gap-1 mt-1">
                    <Clock className="h-4 w-4" />
                    {new Date(order.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <Badge 
                  variant="secondary" 
                  className={`${getStatusColor(order.status)} text-white animate-pulse`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold mb-2 text-coffee-dark flex items-center gap-2">
                    <Coffee className="h-4 w-4" />
                    Items:
                  </h4>
                  <div className="space-y-1">
                    {order.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex justify-between text-sm bg-warm-bg/20 p-2 rounded">
                        <span className="text-coffee-dark">{item.quantity}x {item.name}</span>
                        <span className="font-semibold text-coffee-dark">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border-t pt-3 flex justify-between items-center bg-gradient-to-r from-coffee-dark/5 to-coffee-medium/5 -mx-6 -mb-6 px-6 py-4">
                  <div className="font-bold text-coffee-dark flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-gold" />
                    Total: ${order.total.toFixed(2)}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => reorderItems(order.items)}
                    className="border-coffee-dark text-coffee-dark hover:bg-coffee-dark hover:text-cream transition-all duration-300 hover:scale-105"
                  >
                    <RefreshCw className="h-4 w-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                    Reorder Items
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default History;