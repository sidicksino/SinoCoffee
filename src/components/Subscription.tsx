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
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-coffee-dark mb-4">
            Coffee Subscription
          </h2>
          <p className="text-xl text-coffee-medium max-w-3xl mx-auto leading-relaxed">
            Never run out of your favorite coffee. Get freshly roasted, premium beans 
            delivered to your doorstep on your schedule.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-accent rounded-full flex items-center justify-center mb-4 shadow-gold">
                <benefit.icon className="h-8 w-8 text-coffee-dark" />
              </div>
              <h4 className="font-serif text-xl font-semibold text-coffee-dark mb-2">{benefit.title}</h4>
              <p className="text-coffee-medium">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Subscription Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative group hover:shadow-warm transition-all duration-300 transform hover:-translate-y-2 bg-gradient-card border-0 ${plan.popular ? 'ring-2 ring-gold shadow-gold' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-accent text-coffee-dark px-4 py-2 rounded-full text-sm font-semibold shadow-gold">
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="font-serif text-2xl font-bold text-coffee-dark mb-2">{plan.name}</h3>
                  <p className="text-coffee-medium text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="font-serif text-4xl font-bold text-coffee-dark">{plan.price}</span>
                    <span className="text-coffee-medium ml-1">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-coffee-medium">
                      <Check className="h-5 w-5 text-gold mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-gradient-accent text-coffee-dark hover:shadow-gold' 
                      : 'bg-coffee-dark hover:bg-coffee-medium text-cream'
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
              className="rounded-2xl shadow-warm max-w-md w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark/30 to-transparent rounded-2xl"></div>
          </div>
          <p className="mt-6 text-coffee-medium max-w-2xl mx-auto">
            All our subscription coffees are ethically sourced, sustainably grown, and roasted to perfection. 
            Experience the difference that quality makes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Subscription;