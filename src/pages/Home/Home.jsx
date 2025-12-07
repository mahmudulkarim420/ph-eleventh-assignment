import React from 'react';
import HeroSection from './HeroSection';
import ServicesSection from './ServicesSection';
import TopDecorators from './TopDecorators';
import ServiceCoverageMap from './ServiceCoverageMap';

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <ServicesSection/>
      <TopDecorators/>
      <ServiceCoverageMap/>
    </div>
  );
};

export default Home;