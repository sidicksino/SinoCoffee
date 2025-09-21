import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Coffee, Award, Star } from 'lucide-react';
import heroImage from '@/assets/hero-coffee.jpg';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero pt-20 sm:pt-0">
      {/* Background Image with Rich Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Premium coffee experience" 
          className="w-full h-full object-cover opacity-40" 
        />
        <div className="absolute inset-0 bg-gradient-to-br from-coffee-dark/90 via-coffee-medium/70 to-coffee-dark/95"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-warm-bg via-transparent to-transparent"></div>
      </div>

      {/* Elegant Content Container */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6 lg:px-8">
        {/* Main Heading with Premium Typography */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold text-cream leading-tight mb-6">
            <span className="block opacity-95">Premium Coffee</span>
            <span className="block text-transparent bg-gradient-accent bg-clip-text">
              Experience
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-cream/80 max-w-3xl mx-auto leading-relaxed font-light">
            <span className="hidden sm:inline">Discover the art of exceptional coffee craftsmanship. From carefully sourced beans to expertly crafted beverages, 
            every cup is a journey of flavor and passion.</span>
            <span className="sm:hidden">Exceptional coffee craftsmanship. Every cup is a journey of flavor and passion.</span>
          </p>
        </div>

        {/* Premium Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Button 
            size="lg" 
            className="w-full sm:w-auto bg-gradient-accent text-coffee-dark font-semibold hover:shadow-gold transition-all duration-500 transform hover:scale-105 px-8 py-4 text-lg rounded-full"
          >
            <a href="#menu" className="flex items-center">
              Explore Menu
              <ArrowRight className="ml-3 h-5 w-5" />
            </a>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full sm:w-auto border-2 border-cream/40 text-cream backdrop-blur-md bg-card/20 hover:bg-card/30 transition-all duration-500 px-8 py-4 text-lg rounded-full"
          >
            <a href="/auth" className="flex items-center">
              <Play className="mr-3 h-5 w-5" />
              Get Started
            </a>
          </Button>
        </div>

        {/* Elegant Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-card/30 backdrop-blur-md rounded-2xl p-6 border border-gold/20">
            <div className="flex flex-col items-center space-y-3">
              <Coffee className="h-8 w-8 text-gold" />
              <div className="font-serif text-3xl font-bold text-gold">25+</div>
              <div className="text-cream/80 font-medium">Premium Blends</div>
            </div>
          </div>
          
          <div className="bg-card/30 backdrop-blur-md rounded-2xl p-6 border border-gold/20">
            <div className="flex flex-col items-center space-y-3">
              <Award className="h-8 w-8 text-gold" />
              <div className="font-serif text-3xl font-bold text-gold">5K+</div>
              <div className="text-cream/80 font-medium">Satisfied Customers</div>
            </div>
          </div>
          
          <div className="bg-card/30 backdrop-blur-md rounded-2xl p-6 border border-gold/20">
            <div className="flex flex-col items-center space-y-3">
              <Star className="h-8 w-8 text-gold" />
              <div className="font-serif text-3xl font-bold text-gold">4.9★</div>
              <div className="text-cream/80 font-medium">Average Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2">
        <div 
          className="group cursor-pointer" 
          onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border border-gold/40 bg-gradient-to-br from-gold/20 to-transparent backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-all duration-300 animate-float">
            <div className="flex flex-col items-center space-y-0.5">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gold rounded-full animate-bounce"></div>
              <div className="w-0.5 h-2 sm:h-3 bg-gradient-to-b from-gold to-gold/30 rounded-full"></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;