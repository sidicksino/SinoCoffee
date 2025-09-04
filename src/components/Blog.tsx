import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, User, ArrowRight, Coffee, Book, Zap } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'The Art of Pour Over Coffee',
      excerpt: 'Discover the precision and patience required to master the pour-over brewing method. From grind size to water temperature, every detail matters.',
      author: 'Maria Chen',
      date: 'March 15, 2024',
      readTime: '5 min read',
      category: 'Brewing',
      icon: Coffee,
      image: '/api/placeholder/400/250'
    },
    {
      id: 2,
      title: 'Coffee Origins: Ethiopian Highlands',
      excerpt: 'Journey to the birthplace of coffee and explore the rich history and unique flavors of Ethiopian coffee beans from the highlands.',
      author: 'David Wu',
      date: 'March 10, 2024',
      readTime: '7 min read',
      category: 'Origins',
      icon: Book,
      image: '/api/placeholder/400/250'
    },
    {
      id: 3,
      title: 'Cold Brew vs Iced Coffee',
      excerpt: 'Understanding the difference between cold brew and iced coffee, and why the brewing method completely changes the flavor profile.',
      author: 'Sarah Kim',
      date: 'March 5, 2024',
      readTime: '4 min read',
      category: 'Tips',
      icon: Zap,
      image: '/api/placeholder/400/250'
    }
  ];

  return (
    <section id="blog" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-coffee-dark mb-4">
            Coffee Stories
          </h2>
          <p className="text-xl text-coffee-medium max-w-3xl mx-auto leading-relaxed">
            Dive deep into the world of coffee with our expert insights, brewing guides, 
            and stories from coffee farms around the globe.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-warm transition-all duration-300 transform hover:-translate-y-2 bg-gradient-card border-0 overflow-hidden">
              <CardContent className="p-0">
                {/* Image Placeholder */}
                <div className="relative h-48 bg-warm-bg overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <post.icon className="h-12 w-12 text-coffee-light" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark/20 to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-gradient-accent text-coffee-dark px-3 py-1 rounded-full text-sm font-semibold shadow-gold">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center text-sm text-coffee-light mb-3 space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-semibold text-coffee-dark mb-3 group-hover:text-coffee-medium transition-colors duration-300">
                    {post.title}
                  </h3>
                  
                  <p className="text-coffee-medium text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-coffee-light">{post.readTime}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-coffee-dark hover:text-coffee-medium hover:bg-transparent p-0 font-medium group"
                    >
                      Read More
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Blog Button */}
        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg" 
            className="border-coffee-dark text-coffee-dark hover:bg-coffee-dark hover:text-cream"
          >
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;