import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Instagram, Camera, Heart } from 'lucide-react';
import latteArtImage from '@/assets/gallery-latte-art.jpg';
import cozyCornorImage from '@/assets/gallery-cozy-corner.jpg';
import beansImage from '@/assets/gallery-beans.jpg';
import rosettaImage from '@/assets/gallery-rosetta.jpg';
import morningLightImage from '@/assets/gallery-morning-light.jpg';
import pourOverImage from '@/assets/gallery-pour-over.jpg';

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const galleryImages = [
    {
      id: 1,
      category: 'latte-art',
      title: 'Heart Latte Art',
      description: 'Perfect heart-shaped foam art',
      likes: 127,
      image: latteArtImage
    },
    {
      id: 2,
      category: 'cafe',
      title: 'Cozy Corner',
      description: 'Our signature reading nook',
      likes: 89,
      image: cozyCornorImage
    },
    {
      id: 3,
      category: 'beans',
      title: 'Ethiopian Beans',
      description: 'Premium single-origin beans',
      likes: 156,
      image: beansImage
    },
    {
      id: 4,
      category: 'latte-art',
      title: 'Rosetta Design',
      description: 'Intricate leaf pattern foam',
      likes: 203,
      image: rosettaImage
    },
    {
      id: 5,
      category: 'cafe',
      title: 'Morning Light',
      description: 'Golden hour at SinoCoffee',
      likes: 95,
      image: morningLightImage
    },
    {
      id: 6,
      category: 'brewing',
      title: 'Pour Over',
      description: 'Precision brewing method',
      likes: 112,
      image: pourOverImage
    }
  ];

  const filters = [
    { id: 'all', name: 'All' },
    { id: 'latte-art', name: 'Latte Art' },
    { id: 'cafe', name: 'Café Life' },
    { id: 'beans', name: 'Coffee Beans' },
    { id: 'brewing', name: 'Brewing' }
  ];

  const filteredImages = activeFilter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter);

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Coffee Gallery
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            <span className="hidden sm:inline">Discover the artistry behind every cup. From beautiful latte art to the cozy ambiance 
            of our café, experience the SinoCoffee aesthetic.</span>
            <span className="sm:hidden">Beautiful latte art and cozy café ambiance.</span>
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300 font-medium text-sm sm:text-base ${
                activeFilter === filter.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredImages.map((image) => (
            <Card key={image.id} className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 bg-card border overflow-hidden">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img 
                    src={image.image} 
                    alt={image.title}
                    className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                      <h4 className="font-serif text-base sm:text-lg font-semibold text-foreground mb-1">{image.title}</h4>
                      <p className="text-muted-foreground text-xs sm:text-sm">{image.description}</p>
                    </div>
                    
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex items-center space-x-1 bg-background/20 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1">
                      <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-foreground" />
                      <span className="text-foreground text-xs sm:text-sm">{image.likes}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="inline-flex items-center justify-center space-x-2 sm:space-x-3 bg-card rounded-full px-4 sm:px-6 lg:px-8 py-3 sm:py-4 shadow-md border">
            <Instagram className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
            <span className="font-medium text-foreground text-sm sm:text-base">Follow us @sinocoffee for more</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;