import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, Coffee, User, LogOut, Heart, Clock, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { supabase } from '@/integrations/supabase/client';
import CartDrawer from './CartDrawer';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState<{display_name: string | null; avatar_url: string | null} | null>(null);
  const { getTotalItems, openCart } = useCart();
  const { user, signOut } = useAuth();
  const { isAdmin } = useUserRole();

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const { data } = await supabase
        .from('profiles')
        .select('display_name, avatar_url')
        .eq('user_id', user.id)
        .single();

      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleCartClick = () => {
    if (!user) {
      window.location.href = '/auth';
      return;
    }
    openCart();
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const publicNavItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Subscription', href: '#subscription' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  const userNavItems = [
    { name: 'Home', href: '#home' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Favorites', href: '#favorites' },
    { name: 'History', href: '#history' },
    { name: 'Contact', href: '#contact' },
  ];

  const navItems = user ? userNavItems : publicNavItems;

  const getInitials = (email: string) => {
    return email.split('@')[0].slice(0, 2).toUpperCase();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Coffee className="h-8 w-8 text-coffee-dark" />
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg text-coffee-dark">Sino</span>
              <span className="font-sans text-sm text-coffee-medium -mt-1">Coffee</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-coffee-medium hover:text-coffee-dark transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
            
            {/* Admin Link - Only show for admin users */}
            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center space-x-1 text-coffee-medium hover:text-coffee-dark transition-colors duration-200 font-medium"
              >
                <Shield className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            )}
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Button 
                  size="sm" 
                  className="bg-gradient-accent text-coffee-dark hover:shadow-gold"
                  onClick={handleCartClick}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart ({getTotalItems()})
                </Button>
                <Avatar className="h-8 w-8 cursor-pointer" onClick={() => window.location.href = '#profile'}>
                  <AvatarImage src={profile?.avatar_url || undefined} />
                  <AvatarFallback className="text-xs">
                    {getInitials(user.email || '')}
                  </AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Button 
                  size="sm" 
                  className="bg-gradient-accent text-coffee-dark hover:shadow-gold"
                  onClick={handleCartClick}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart ({getTotalItems()})
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.location.href = '/auth'}
                  className="border-coffee-light text-coffee-medium hover:bg-coffee-light"
                >
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-coffee-dark"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-background border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-coffee-medium hover:text-coffee-dark transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              
              {/* Admin Link Mobile - Only show for admin users */}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center space-x-2 px-3 py-2 text-coffee-medium hover:text-coffee-dark transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <Shield className="h-4 w-4" />
                  <span>Admin Dashboard</span>
                </Link>
              )}
              <div className="px-3 py-2 space-y-2">
                <Button 
                  size="sm" 
                  className="w-full bg-gradient-accent text-coffee-dark"
                  onClick={() => {
                    setIsOpen(false);
                    handleCartClick();
                  }}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart ({getTotalItems()})
                </Button>
                
                {user ? (
                  <div className="flex items-center space-x-3 px-3 py-2">
                    <Avatar className="h-8 w-8 cursor-pointer" onClick={() => { setIsOpen(false); window.location.href = '#profile'; }}>
                      <AvatarImage src={profile?.avatar_url || undefined} />
                      <AvatarFallback className="text-xs">
                        {getInitials(user.email || '')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium text-coffee-dark">
                        {profile?.display_name || user.email?.split('@')[0]}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsOpen(false);
                      window.location.href = '/auth';
                    }}
                    className="w-full border-coffee-light text-coffee-medium hover:bg-coffee-light"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <CartDrawer />
    </nav>
  );
};

export default Navbar;