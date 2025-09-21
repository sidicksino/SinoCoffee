import { Coffee, Instagram, Facebook, Twitter, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card text-cream py-16 border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <Coffee className="h-10 w-10 text-gold" />
              <div className="flex flex-col">
                <span className="font-serif font-bold text-2xl text-cream">Sino</span>
                <span className="font-sans text-sm text-gold -mt-1">Coffee</span>
              </div>
            </div>
            <p className="text-cream/80 mb-6 max-w-md leading-relaxed">
              Brewed with love, served with passion. Experience the perfect blend of tradition 
              and innovation in every cup at SinoCoffee.
            </p>
            <div className="flex space-x-6">
              <Instagram className="h-6 w-6 text-cream/60 hover:text-gold cursor-pointer transition-all duration-300 hover:scale-110" />
              <Facebook className="h-6 w-6 text-cream/60 hover:text-gold cursor-pointer transition-all duration-300 hover:scale-110" />
              <Twitter className="h-6 w-6 text-cream/60 hover:text-gold cursor-pointer transition-all duration-300 hover:scale-110" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-xl font-bold mb-6 text-cream">Quick Links</h4>
            <ul className="space-y-3 text-cream/80">
              <li><a href="#home" className="hover:text-gold transition-colors duration-300 hover:underline">Home</a></li>
              <li><a href="#about" className="hover:text-gold transition-colors duration-300 hover:underline">About</a></li>
              <li><a href="#menu" className="hover:text-gold transition-colors duration-300 hover:underline">Menu</a></li>
              <li><a href="#subscription" className="hover:text-gold transition-colors duration-300 hover:underline">Subscription</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-xl font-bold mb-6 text-cream">Contact</h4>
            <div className="space-y-4 text-cream/80">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gold" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gold" />
                <span className="text-sm">hello@sinocoffee.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gold/20 mt-12 pt-8 text-center text-cream/60">
          <p>&copy; 2024 SinoCoffee. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;