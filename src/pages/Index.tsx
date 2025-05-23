
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
      <div className="fixed inset-0 bg-cover bg-center bg-no-repeat z-[-1]" 
           style={{ backgroundImage: "url('/images/barber-background.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      </div>
      
      <Navbar />
      
      <main>
        <HeroSection />
        <div className="bg-gradient-to-b from-barber-dark to-barber-gray py-2"></div>
        <ServicesList />
        <div className="bg-gradient-to-b from-barber-gray to-barber-dark py-2"></div>
        <AboutUs />
      </main>
      
      <Footer />
      
      <Link to="/agendar" className="floating-button shadow-lg hover:bg-opacity-90 hover:-translate-y-1 transition-all" aria-label="Agendar">
        <Calendar className="w-6 h-6" />
      </Link>
    </div>
  );
};

export default Index;
