
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

// Components
import { Button } from "@/components/ui/button";
import HeroSection from '@/components/home/HeroSection';
import ServicesList from '@/components/home/ServicesList';
import AboutUs from '@/components/home/AboutUs';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';

const Index = () => {
  return (
    <div className="min-h-screen bg-barber-dark text-barber-light">
      <Navbar />
      
      <main>
        <HeroSection />
        <ServicesList />
        <AboutUs />
      </main>
      
      <Footer />
      
      <Link to="/agendar" className="floating-button" aria-label="Agendar">
        <Calendar className="w-6 h-6" />
      </Link>
    </div>
  );
};

export default Index;
