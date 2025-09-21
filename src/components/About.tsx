import { Card, CardContent } from '@/components/ui/card';
import { Coffee, Heart, Leaf, Award } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Coffee,
      title: 'Premium Quality',
      description: 'We source the finest coffee beans from sustainable farms around the world, ensuring every cup meets our high standards.'
    },
    {
      icon: Heart,
      title: 'Crafted with Love',
      description: 'Every cup is prepared with passion and attention to detail by our skilled baristas who truly care about your experience.'
    },
    {
      icon: Leaf,
      title: 'Sustainable Practices',
      description: 'We are committed to ethical sourcing and environmental responsibility, supporting farmers and protecting our planet.'
    },
    {
      icon: Award,
      title: 'Award Winning',
      description: 'Recognized for excellence in coffee quality and customer service, SinoCoffee has won multiple industry awards.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-background relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-coffee-dark/20"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="font-serif text-4xl lg:text-6xl font-bold text-cream mb-6">
            Our Story
          </h2>
          <div className="w-24 h-1 bg-gradient-accent mx-auto mb-8 rounded-full"></div>
          <p className="text-lg text-cream/80 max-w-4xl mx-auto leading-relaxed">
            Born from a passion for exceptional coffee and a commitment to bringing people together, 
            SinoCoffee represents the perfect harmony between tradition and innovation in the heart of the city.
          </p>
        </div>

        {/* Mission Statement Card */}
        <div className="bg-card rounded-3xl p-12 mb-20 shadow-warm border border-gold/10 backdrop-blur-sm">
          <div className="text-center max-w-5xl mx-auto">
            <h3 className="font-serif text-3xl font-bold text-cream mb-6">Our Mission</h3>
            <p className="text-cream/80 leading-relaxed text-lg mb-10">
              To create a space where every cup tells a story, every conversation matters, and every moment 
              becomes a cherished memory. We believe in the power of coffee to connect cultures, inspire creativity, 
              and fuel dreams.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center bg-card/50 rounded-2xl p-6 border border-gold/10">
                <div className="font-serif text-4xl font-bold text-gold mb-2">100%</div>
                <div className="text-cream/80 font-medium">Ethical Sourcing</div>
              </div>
              <div className="text-center bg-card/50 rounded-2xl p-6 border border-gold/10">
                <div className="font-serif text-4xl font-bold text-gold mb-2">24/7</div>
                <div className="text-cream/80 font-medium">Fresh Roasting</div>
              </div>
              <div className="text-center bg-card/50 rounded-2xl p-6 border border-gold/10">
                <div className="font-serif text-4xl font-bold text-gold mb-2">∞</div>
                <div className="text-cream/80 font-medium">Passion</div>
              </div>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-6">
            <h3 className="font-serif text-3xl font-bold text-cream">Our Journey</h3>
            <div className="space-y-6 text-cream/80 leading-relaxed">
              <p>
                Founded in 2020 by coffee enthusiasts Maria Chen and David Wu, SinoCoffee began as a small 
                roastery with a big dream: to create a coffee experience that honors both Eastern and Western 
                coffee traditions.
              </p>
              <p>
                What started as a weekend farmers market stall has grown into a beloved coffee destination, 
                but our core values remain unchanged. We believe that great coffee is more than just a beverage - 
                it's a moment of connection, a pause in the day, and a bridge between cultures.
              </p>
              <p>
                Today, we continue to hand-select our beans, roast in small batches, and serve each cup with 
                the same care and attention that started our journey.
              </p>
            </div>
          </div>

          <div className="bg-card rounded-3xl p-10 shadow-warm border border-gold/10 backdrop-blur-sm">
            <div className="text-center">
              <div className="font-serif text-7xl font-bold text-gold mb-4">2020</div>
              <div className="text-cream/80 text-lg mb-8">Founded with Passion</div>
              <div className="grid grid-cols-2 gap-6 text-center">
                <div className="bg-card/50 rounded-2xl p-4 border border-gold/10">
                  <div className="font-serif text-3xl font-bold text-gold">50k+</div>
                  <div className="text-sm text-cream/80 font-medium">Cups Served</div>
                </div>
                <div className="bg-card/50 rounded-2xl p-4 border border-gold/10">
                  <div className="font-serif text-3xl font-bold text-gold">15</div>
                  <div className="text-sm text-cream/80 font-medium">Countries</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div 
              key={index} 
              className="group bg-card rounded-3xl p-6 sm:p-8 transition-all duration-700 transform hover:-translate-y-3 hover:scale-105 border border-border hover:border-primary/30 text-center backdrop-blur-sm"
            >
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-accent rounded-full flex items-center justify-center group-hover:shadow-gold transition-all duration-500 group-hover:scale-110">
                  <value.icon className="h-10 w-10 text-coffee-dark" />
                </div>
              </div>
              <h4 className="font-serif text-xl font-bold text-cream mb-4 group-hover:text-gold transition-colors duration-300">
                {value.title}
              </h4>
              <p className="text-cream/70 text-sm leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;