import { Coffee, Instagram, Facebook, Twitter, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-coffee-dark text-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Coffee className="h-8 w-8 text-gold" />
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl text-cream">Sino</span>
                <span className="font-sans text-sm text-cream/80 -mt-1">Coffee</span>
              </div>
            </div>
            <p className="text-cream/80 mb-4 max-w-md">
              Brewed with love, served with passion. Experience the perfect blend of tradition 
              and innovation in every cup at SinoCoffee.
            </p>
            <div className="flex space-x-4">
              <Instagram className="h-5 w-5 text-cream/60 hover:text-gold cursor-pointer transition-colors" />
              <Facebook className="h-5 w-5 text-cream/60 hover:text-gold cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-cream/60 hover:text-gold cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-cream/80">
              <li><a href="#home" className="hover:text-gold transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-gold transition-colors">About</a></li>
              <li><a href="#menu" className="hover:text-gold transition-colors">Menu</a></li>
              <li><a href="#subscription" className="hover:text-gold transition-colors">Subscription</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-cream/80">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">hello@sinocoffee.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-cream/20 mt-8 pt-8 text-center text-cream/60">
          <p>&copy; 2024 SinoCoffee. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;