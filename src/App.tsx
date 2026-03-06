import { useState } from 'react';
import './App.css';
import './styles/landing.css';
import { Navbar } from './components/landing/Navbar';
import { Hero } from './components/landing/Hero';
import { Features } from './components/landing/Features';
import { HowItWorks } from './components/landing/HowItWorks';
import { Stats } from './components/landing/Stats';
import { Capabilities } from './components/landing/Capabilities';
import { CallToAction } from './components/landing/CallToAction';
import { Footer } from './components/landing/Footer';
import { DemoRequestModal } from './components/landing/DemoRequestModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Navbar onOpenDemo={openModal} />
      <main>
        <Hero onOpenDemo={openModal} />
        <Features />
        <HowItWorks />
        <Stats />
        <Capabilities />
        <CallToAction onOpenDemo={openModal} />
      </main>
      <Footer onOpenDemo={openModal} />
      
      <DemoRequestModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </>
  );
}

export default App;
