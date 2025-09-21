import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Coffee, Truck, Calendar } from 'lucide-react';
import coffeeBeansImage from '@/assets/coffee-beans.jpg';

const Subscription = () => {
  const plans = [
    {
      name: 'Starter',
      price: '$19.99',
      period: '/month',
      description: 'Perfect for casual coffee drinkers',
      features: [
        '250g premium coffee beans',
        'Delivered monthly',
        'Free shipping',
        'Cancel anytime',
        'Coffee brewing guide'
      ],
      popular: false
    },
    {
      name: 'Enthusiast',
      price: '$34.99',
      period: '/month',
      description: 'For true coffee lovers',
      features: [
        '500g premium coffee beans',
        'Delivered bi-weekly',
        'Free shipping',
        'Cancel anytime',
        'Coffee brewing guide',
        'Exclusive origin stories',
        'Early access to new blends'
      ],
      popular: true
    },
    {
      name: 'Connoisseur',
      price: '$59.99',
      period: '/month',
      description: 'Ultimate coffee experience',
      features: [
        '1kg premium coffee beans',
        'Weekly delivery',
        'Free express shipping',
        'Cancel anytime',
        'Coffee brewing guide',
        'Exclusive origin stories',
        'Early access to new blends',
        'Virtual cupping sessions',
        'Personal coffee consultant'
      ],
      popular: false
    }
  ];

  const benefits = [
    {
      icon: Coffee,
      title: 'Freshly Roasted',
      description: 'Beans roasted within 48 hours of delivery'
    },
    {
      icon: Truck,
      title: 'Free Delivery',
      description: 'Complimentary shipping on all subscriptions'
    },
    {
      icon: Calendar,
      title: 'Flexible Schedule',
      description: 'Pause, skip, or cancel anytime'
    }
  ];

  return (
    <section id="subscription" className="py-20 bg-warm-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Coffee Subscription
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            <span className="hidden sm:inline">Never run out of your favorite coffee. Get freshly roasted, premium beans 
            delivered to your doorstep on your schedule.</span>
            <span className="sm:hidden">Fresh premium beans delivered on your schedule.</span>
          </p>
        </div>

        {/* Benefits */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:grid md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center flex-shrink-0 w-full max-w-xs sm:max-w-none sm:w-auto md:w-auto">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mx-auto bg-primary rounded-full flex items-center justify-center mb-2 sm:mb-3 md:mb-4">
                <benefit.icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-primary-foreground" />
              </div>
              <h4 className="font-serif text-base sm:text-lg md:text-xl font-semibold text-foreground mb-1 sm:mb-2">{benefit.title}</h4>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground px-2">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Subscription Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 bg-card border ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground ml-1 text-sm">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-muted-foreground">
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mr-2 sm:mr-3 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full transition-all duration-300 text-sm sm:text-base ${
                    plan.popular 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  Choose {plan.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Coffee Beans Image */}
        <div className="text-center">
          <div className="relative inline-block">
            <img 
              src={coffeeBeansImage} 
              alt="Premium coffee beans package"
              className="rounded-2xl shadow-lg max-w-xs sm:max-w-md w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent rounded-2xl"></div>
          </div>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            <span className="hidden sm:inline">All our subscription coffees are ethically sourced, sustainably grown, and roasted to perfection. 
            Experience the difference that quality makes.</span>
            <span className="sm:hidden">Ethically sourced, sustainably grown, roasted to perfection.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Subscription;