import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Menu from '@/components/Menu';
import Subscription from '@/components/Subscription';
import Gallery from '@/components/Gallery';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import Map from '@/components/Map';
import Footer from '@/components/Footer';
import Profile from '@/components/Profile';
import Favorites from '@/components/Favorites';
import History from '@/components/History';
import { Toaster } from '@/components/ui/toaster';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user } = useAuth();
  const [currentSection, setCurrentSection] = useState('home');

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      setCurrentSection(hash);
    }
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setCurrentSection(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderContent = () => {
    if (currentSection === 'profile') {
      return <Profile />;
    }
    
    if (currentSection === 'favorites') {
      return <Favorites />;
    }
    
    if (currentSection === 'history') {
      return <History />;
    }

    return (
      <>
        <Hero />
        {!user && <About />}
        <Menu />
        {!user && <Subscription />}
        <Gallery />
        <Map />
        {!user && <Blog />}
        <Contact />
      </>
    );
  };

  return (
    <>
      <Navbar />
      <main>
        {renderContent()}
      </main>
      <Footer />
      <Toaster />
    </>
  );
};

export default Index;
