import React from 'react';
import Navbar from '../components/sanara/Navbar';
import Hero from '../components/sanara/Hero';
import IntroSection from '../components/sanara/IntroSection';
import PipelineSection from '../components/sanara/PipelineSection';
import MetricsSection from '../components/sanara/MetricsSection';
import SpecialtiesSection from '../components/sanara/SpecialtiesSection';
import FindingsSection from '../components/sanara/FindingsSection';
import RefsSection from '../components/sanara/RefsSection';
import Footer from '../components/sanara/Footer';

export default function Home() {
  return (
    <div style={{ background: '#04080f', minHeight: '100vh', fontFamily: "'Courier New', Courier, monospace" }}>
      <Navbar />
      <Hero />
      <IntroSection />
      <PipelineSection />
      <MetricsSection />
      <SpecialtiesSection />
      <FindingsSection />
      <RefsSection />
      <Footer />
    </div>
  );
}