import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import heroImage from '@/assets/hero-coffee.jpg';
const Hero = () => {
  return <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Steaming coffee in cozy atmosphere" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-coffee-dark/80 to-coffee-medium/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-cream mb-4 sm:mb-6">
          Brewed with Love,
          <span className="block text-gold">Served with Passion</span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-cream/90 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4">Experience the perfect blend of tradition and innovation in every cup. Welcome to SinoCoffee - where every sip tells a story.</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
          <Button size="lg" className="w-full sm:w-auto bg-gradient-accent text-coffee-dark font-semibold hover:shadow-gold transition-all duration-300 transform hover:scale-105">
            <a href="#menu" className="flex items-center">
              Order Now
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </a>
          </Button>
          
          <Button variant="outline" size="lg" className="w-full sm:w-auto border-cream/30 text-cream backdrop-blur-sm bg-amber-950 hover:bg-amber-800">
            <a href="/auth" className="flex items-center">
              <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Get Started
            </a>
          </Button>
        </div>

        {/* Floating Stats */}
        <div className="mt-12 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-xs sm:max-w-md mx-auto px-4">
          <div className="text-center">
            <div className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-gold">15+</div>
            <div className="text-cream/80 text-xs sm:text-sm">Coffee Varieties</div>
          </div>
          <div className="text-center">
            <div className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-gold">1000+</div>
            <div className="text-cream/80 text-xs sm:text-sm">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-gold">5★</div>
            <div className="text-cream/80 text-xs sm:text-sm">Average Rating</div>
          </div>
        </div>
      </div>

      {/* Floating 3D Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="relative group cursor-pointer" onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}>
          <div className="w-16 h-16 rounded-full border-2 border-gold/30 bg-gradient-to-br from-gold/20 to-transparent backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-all duration-500 animate-float"
               style={{ 
                 transform: 'perspective(1000px) rotateX(15deg)',
                 animation: 'float 3s ease-in-out infinite, glow 2s ease-in-out infinite alternate'
               }}>
            <div className="flex flex-col items-center space-y-1">
              <div className="w-2 h-2 bg-gold rounded-full animate-bounce"></div>
              <div className="w-1 h-3 bg-gradient-to-b from-gold to-gold/50 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-gold/70 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
            </div>
          </div>
          <div className="absolute inset-0 rounded-full bg-gold/10 blur-xl group-hover:bg-gold/20 transition-all duration-500"></div>
        </div>
      </div>
    </section>;
};
export default Hero;