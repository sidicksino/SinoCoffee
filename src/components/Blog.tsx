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
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Coffee Stories
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            <span className="hidden sm:inline">Dive deep into the world of coffee with our expert insights, brewing guides, 
            and stories from coffee farms around the globe.</span>
            <span className="sm:hidden">Expert insights and coffee stories from around the globe.</span>
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12">
          {blogPosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 bg-card border overflow-hidden">
              <CardContent className="p-0">
                {/* Image Placeholder */}
                <div className="relative h-36 sm:h-40 lg:h-48 bg-muted overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <post.icon className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-muted-foreground" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-primary text-primary-foreground px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 lg:p-6">
                  <div className="flex items-center text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 space-x-3 sm:space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="truncate">{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="truncate">{post.date}</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-foreground hover:text-primary hover:bg-transparent p-0 font-medium group text-xs sm:text-sm"
                    >
                      Read More
                      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
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
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;