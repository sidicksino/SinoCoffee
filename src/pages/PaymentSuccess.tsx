import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Coffee, Home, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [orderNumber] = useState(() => Math.random().toString(36).substr(2, 9).toUpperCase());
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear cart after successful payment
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-warm-bg flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <Card className="bg-gradient-card shadow-warm border-0">
          <CardContent className="p-8 sm:p-12">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>

            {/* Success Message */}
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-coffee-dark mb-4">
              Payment Successful! ☕
            </h1>
            
            <p className="text-coffee-medium text-lg mb-6 leading-relaxed">
              Thank you for your order! Your delicious coffee is being prepared with love.
            </p>

            {/* Order Details */}
            <div className="bg-background/50 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-center mb-4">
                <Coffee className="h-6 w-6 text-gold mr-2" />
                <h3 className="font-serif text-xl font-semibold text-coffee-dark">Order Confirmation</h3>
              </div>
              
              <div className="space-y-2 text-coffee-medium">
                <p><span className="font-medium">Order Number:</span> #{orderNumber}</p>
                {sessionId && (
                  <p className="text-sm"><span className="font-medium">Payment ID:</span> {sessionId}</p>
                )}
                <p><span className="font-medium">Status:</span> Processing</p>
                <p className="text-sm text-coffee-light">
                  You'll receive an email confirmation shortly with your order details.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-gradient-accent text-coffee-dark hover:shadow-gold">
                <Link to="/#menu">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Order More Coffee
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="border-coffee-light text-coffee-medium hover:bg-coffee-light">
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 p-4 bg-gold/10 rounded-lg">
              <p className="text-coffee-medium text-sm leading-relaxed">
                🚚 <strong>Delivery:</strong> Your order will be prepared fresh and delivered within 30-45 minutes.
                <br />
                📧 <strong>Updates:</strong> We'll send you real-time updates about your order status.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSuccess;