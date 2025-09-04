import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, Trash2, ShoppingCart, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CartDrawer = () => {
  const { state, removeItem, updateQuantity, clearCart, toggleCart, closeCart, getTotalPrice } = useCart();
  const { toast } = useToast();

  const handleCheckout = async () => {
    if (state.items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some items to your cart before checkout.",
      });
      return;
    }

    try {
      // Use Supabase client from integrations
      const { supabase } = await import('@/integrations/supabase/client');

      // Call Supabase Edge Function to create payment session
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          items: state.items,
          customerEmail: 'guest@sinocoffee.com' // Default for guest checkout
        }
      });

      if (error) {
        throw error;
      }

      if (data?.url) {
        // Open Stripe checkout in new tab
        window.open(data.url, '_blank');
        
        toast({
          title: "Redirecting to checkout",
          description: "Opening secure payment gateway...",
        });
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Checkout Error",
        description: "Unable to process payment. Please try again or contact support.",
        variant: "destructive",
      });
    }
  };

  return (
    <Sheet open={state.isOpen} onOpenChange={toggleCart}>
      <SheetContent side="right" className="w-full sm:w-[400px] bg-background">
        <SheetHeader className="pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2 text-coffee-dark">
              <ShoppingCart className="h-5 w-5" />
              Your Cart ({state.items.length})
            </SheetTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={closeCart}
              className="text-coffee-medium hover:text-coffee-dark"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>

        {state.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <ShoppingCart className="h-16 w-16 text-coffee-light mb-4" />
            <h3 className="font-serif text-xl text-coffee-dark mb-2">Your cart is empty</h3>
            <p className="text-coffee-medium mb-4">Add some delicious coffee to get started!</p>
            <Button onClick={closeCart} className="bg-gradient-accent text-coffee-dark">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto space-y-4 pb-32">
              {state.items.map((item) => (
                <div key={item.id} className="bg-gradient-card rounded-lg p-4 shadow-card">
                  <div className="flex items-start gap-3">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-serif font-semibold text-coffee-dark">{item.name}</h4>
                      <p className="text-coffee-medium text-sm">{item.price}</p>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-coffee-light text-coffee-medium hover:bg-coffee-light"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium text-coffee-dark">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-coffee-light text-coffee-medium hover:bg-coffee-light"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-coffee-medium hover:text-red-500"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary - Fixed at bottom */}
            <div className="sticky bottom-0 bg-background border-t border-coffee-light pt-4 space-y-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="font-serif text-base sm:text-lg font-semibold text-coffee-dark">Total:</span>
                <span className="font-serif text-lg sm:text-xl font-bold text-coffee-dark">{getTotalPrice()}</span>
              </div>
              
              <div className="space-y-2">
                <Button 
                  className="w-full bg-gradient-accent text-coffee-dark hover:shadow-gold text-sm sm:text-base"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-coffee-light text-coffee-medium hover:bg-coffee-light text-sm sm:text-base"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;