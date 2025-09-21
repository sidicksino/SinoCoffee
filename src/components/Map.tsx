import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Phone, Clock, Star, Navigation, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// We'll lazy load mapbox only when needed
let mapboxgl: any = null;

interface CoffeeShop {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone?: string;
  hours?: string;
  rating: number;
  image_url?: string;
  description?: string;
  specialty?: string;
}

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [tokenInput, setTokenInput] = useState<string>('');
  const [coffeeShops, setCoffeeShops] = useState<CoffeeShop[]>([]);
  const [filteredShops, setFilteredShops] = useState<CoffeeShop[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [specialtyFilter, setSpecialtyFilter] = useState<string>('all');
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const { toast } = useToast();

  const loadMapbox = async () => {
    if (!mapboxgl) {
      mapboxgl = await import('mapbox-gl');
      await import('mapbox-gl/dist/mapbox-gl.css');
    }
    return mapboxgl;
  };

  const fetchCoffeeShops = async () => {
    try {
      const { data, error } = await supabase
        .from('coffee_shops')
        .select('*')
        .order('rating', { ascending: false });

      if (error) {
        console.error('Error fetching coffee shops:', error);
        toast({
          title: "Error",
          description: "Failed to load coffee shop locations",
          variant: "destructive"
        });
        return;
      }

      setCoffeeShops(data || []);
      setFilteredShops(data || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getUserLocation = () => {
    setIsLoadingLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([longitude, latitude]);
          if (map.current) {
            map.current.flyTo({
              center: [longitude, latitude],
              zoom: 10,
              duration: 2000
            });
          }
          setIsLoadingLocation(false);
          toast({
            title: "Location found!",
            description: "Map centered on your location"
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
          setIsLoadingLocation(false);
          toast({
            title: "Location unavailable",
            description: "Unable to get your current location",
            variant: "destructive"
          });
        }
      );
    }
  };

  const filterShops = () => {
    let filtered = coffeeShops;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(shop =>
        shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.specialty?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by specialty
    if (specialtyFilter !== 'all') {
      filtered = filtered.filter(shop =>
        shop.specialty?.toLowerCase() === specialtyFilter.toLowerCase()
      );
    }

    setFilteredShops(filtered);
  };

  const initializeMap = async (token: string) => {
    if (!mapContainer.current || !token) return;

    try {
      const mapbox = await loadMapbox();
      
      // Set access token
      mapbox.default.accessToken = token;
      
      // Initialize map
      map.current = new mapbox.default.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        projection: 'globe',
        zoom: 2,
        center: [0, 20],
        pitch: 30,
      });

      // Add navigation controls
      map.current.addControl(
        new mapbox.default.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Add atmosphere and fog effects
      map.current.on('style.load', () => {
        map.current?.setFog({
          color: 'rgb(255, 255, 255)',
          'high-color': 'rgb(200, 200, 225)',
          'horizon-blend': 0.2,
        });
      });

      // Add coffee shop markers from database
      const addMarkers = () => {
        filteredShops.forEach(shop => {
          // Create custom marker element
          const markerEl = document.createElement('div');
          markerEl.className = 'custom-marker';
          markerEl.style.cssText = `
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #8B4513, #A0522D);
            border: 3px solid white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            transition: transform 0.2s ease;
          `;
          markerEl.innerHTML = '☕';
          markerEl.style.fontSize = '18px';
          
          markerEl.addEventListener('mouseenter', () => {
            markerEl.style.transform = 'scale(1.2)';
          });
          
          markerEl.addEventListener('mouseleave', () => {
            markerEl.style.transform = 'scale(1)';
          });

          // Create detailed popup content
          const popupContent = `
            <div style="font-family: system-ui, sans-serif; max-width: 280px;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <h3 style="margin: 0; color: #8B4513; font-size: 18px; font-weight: bold;">${shop.name}</h3>
                <div style="display: flex; align-items: center; gap: 2px; color: #f59e0b;">
                  <span style="font-size: 14px;">⭐</span>
                  <span style="font-size: 14px; font-weight: 600;">${shop.rating}</span>
                </div>
              </div>
              
              ${shop.specialty ? `<div style="margin-bottom: 8px;"><span style="background: #f3f4f6; color: #374151; padding: 2px 8px; border-radius: 12px; font-size: 12px; font-weight: 500;">${shop.specialty}</span></div>` : ''}
              
              <div style="display: flex; align-items: flex-start; gap: 6px; margin-bottom: 6px; color: #6b7280; font-size: 14px;">
                <span style="margin-top: 2px;">📍</span>
                <span>${shop.address}</span>
              </div>
              
              ${shop.phone ? `
                <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px; color: #6b7280; font-size: 14px;">
                  <span>📞</span>
                  <span>${shop.phone}</span>
                </div>
              ` : ''}
              
              ${shop.hours ? `
                <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px; color: #6b7280; font-size: 14px;">
                  <span>🕒</span>
                  <span>${shop.hours}</span>
                </div>
              ` : ''}
              
              ${shop.description ? `<p style="margin: 8px 0 0 0; color: #4b5563; font-size: 13px; line-height: 1.4;">${shop.description}</p>` : ''}
              
              <button onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${shop.latitude},${shop.longitude}', '_blank')" 
                style="margin-top: 12px; background: #8B4513; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-size: 13px; cursor: pointer; width: 100%; display: flex; align-items: center; justify-content: center; gap: 6px;">
                <span>🧭</span> Get Directions
              </button>
            </div>
          `;

          new mapbox.default.Marker({ element: markerEl })
            .setLngLat([shop.longitude, shop.latitude])
            .setPopup(
              new mapbox.default.Popup({ 
                offset: 25,
                closeButton: true,
                closeOnClick: false 
              }).setHTML(popupContent)
            )
            .addTo(map.current);
        });
      };

      // Add user location marker if available
      if (userLocation) {
        const userMarkerEl = document.createElement('div');
        userMarkerEl.style.cssText = `
          width: 20px;
          height: 20px;
          background: #3b82f6;
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        `;
        
        new mapbox.default.Marker({ element: userMarkerEl })
          .setLngLat(userLocation)
          .setPopup(new mapbox.default.Popup().setHTML('<div style="text-align: center; font-weight: bold; color: #3b82f6;">Your Location</div>'))
          .addTo(map.current);
      }

      addMarkers();

      setIsMapLoaded(true);
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  };

  const handleTokenSubmit = () => {
    if (tokenInput.trim()) {
      setMapboxToken(tokenInput.trim());
      initializeMap(tokenInput.trim());
    }
  };

  useEffect(() => {
    fetchCoffeeShops();
    return () => {
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    filterShops();
  }, [searchQuery, specialtyFilter, coffeeShops]);

  useEffect(() => {
    if (map.current && mapboxToken) {
      // Clear existing markers
      const markers = document.querySelectorAll('.custom-marker');
      markers.forEach(marker => marker.remove());
      
      // Re-initialize map with new data
      initializeMap(mapboxToken);
    }
  }, [filteredShops, userLocation]);

  if (!mapboxToken) {
    return (
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Interactive Coffee Map
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover premium coffee shops around the world with our interactive map
            </p>
          </div>
          
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center gap-2">
                <MapPin className="w-5 h-5" />
                Enter Mapbox Token
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                Get your free token at{' '}
                <a 
                  href="https://mapbox.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  mapbox.com
                </a>
              </p>
              <Input
                type="text"
                placeholder="pk.eyJ1..."
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                className="text-center"
              />
              <Button 
                onClick={handleTokenSubmit}
                className="w-full"
                disabled={!tokenInput.trim()}
              >
                Load Interactive Map
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Interactive Coffee Map
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover {coffeeShops.length} premium coffee locations worldwide
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search coffee shops, locations, or specialties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                <SelectItem value="single origin">Single Origin</SelectItem>
                <SelectItem value="espresso blends">Espresso Blends</SelectItem>
                <SelectItem value="french roast">French Roast</SelectItem>
                <SelectItem value="dark roast">Dark Roast</SelectItem>
                <SelectItem value="cold brew">Cold Brew</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={getUserLocation}
              disabled={isLoadingLocation}
              variant="outline"
              size="default"
              className="w-full sm:w-auto"
            >
              {isLoadingLocation ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" />
              ) : (
                <Navigation className="w-4 h-4" />
              )}
              <span className="ml-2">My Location</span>
            </Button>
          </div>

          {/* Results Counter */}
          <div className="text-center">
            <Badge variant="secondary" className="text-sm">
              {filteredShops.length} {filteredShops.length === 1 ? 'location' : 'locations'} found
            </Badge>
          </div>
        </div>
        
        <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-lg border">
          <div ref={mapContainer} className="absolute inset-0" />
          {!isMapLoaded && (
            <div className="absolute inset-0 bg-muted flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading interactive map...</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-8 text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Click on coffee markers to see details, ratings, and get directions
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full border border-white"></div>
              <span>Coffee Shop</span>
            </div>
            {userLocation && (
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full border border-white"></div>
                <span>Your Location</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;