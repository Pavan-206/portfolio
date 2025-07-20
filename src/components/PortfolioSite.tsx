import React from 'react';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Experience from './Experience';
import Achievements from './Achievements';
import Certifications from './Certifications';
import Resume from './Resume';
import Contact from './Contact';
import Footer from './Footer';

const PortfolioSite: React.FC = () => {
  return (
    <div className="min-h-screen transition-colors duration-300">
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Achievements />
      <Certifications />
      <Resume />
      <Contact />
      <Footer />
    </div>
  );
};

export default PortfolioSite;