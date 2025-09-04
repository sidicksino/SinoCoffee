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
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-coffee-dark mb-4 px-4">
            About SinoCoffee
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-coffee-medium max-w-3xl mx-auto leading-relaxed px-4">
            Born from a passion for exceptional coffee and a commitment to bringing people together, 
            SinoCoffee represents the perfect harmony between tradition and innovation in the heart of the city.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-card rounded-2xl p-8 mb-20 shadow-warm">
          <div className="text-center max-w-4xl mx-auto">
            <h3 className="font-serif text-2xl font-semibold text-coffee-dark mb-4">Our Mission</h3>
            <p className="text-coffee-medium leading-relaxed text-lg mb-6">
              To create a space where every cup tells a story, every conversation matters, and every moment 
              becomes a cherished memory. We believe in the power of coffee to connect cultures, inspire creativity, 
              and fuel dreams.
            </p>
            <div className="flex justify-center items-center space-x-8">
              <div className="text-center">
                <div className="font-serif text-3xl font-bold text-gold mb-1">100%</div>
                <div className="text-coffee-medium text-sm">Ethical Sourcing</div>
              </div>
              <div className="text-center">
                <div className="font-serif text-3xl font-bold text-gold mb-1">24/7</div>
                <div className="text-coffee-medium text-sm">Fresh Roasting</div>
              </div>
              <div className="text-center">
                <div className="font-serif text-3xl font-bold text-gold mb-1">∞</div>
                <div className="text-coffee-medium text-sm">Passion</div>
              </div>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h3 className="font-serif text-3xl font-semibold text-coffee-dark mb-6">Our Story</h3>
            <div className="space-y-4 text-coffee-medium leading-relaxed">
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

          <div className="relative">
            <div className="bg-gradient-card rounded-2xl p-8 shadow-warm">
              <div className="text-center">
                <div className="font-serif text-6xl font-bold text-coffee-dark mb-2">2020</div>
                <div className="text-coffee-medium mb-4">Founded with Passion</div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="font-serif text-2xl font-bold text-gold">50k+</div>
                    <div className="text-sm text-coffee-medium">Cups Served</div>
                  </div>
                  <div>
                    <div className="font-serif text-2xl font-bold text-gold">15</div>
                    <div className="text-sm text-coffee-medium">Countries</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {values.map((value, index) => (
            <Card key={index} className="group hover:shadow-warm transition-all duration-300 transform hover:-translate-y-1 bg-gradient-card border-0">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-accent rounded-full flex items-center justify-center group-hover:shadow-gold transition-all duration-300">
                    <value.icon className="h-8 w-8 text-coffee-dark" />
                  </div>
                </div>
                <h4 className="font-serif text-xl font-semibold text-coffee-dark mb-4">{value.title}</h4>
                <p className="text-coffee-medium text-sm leading-relaxed">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;