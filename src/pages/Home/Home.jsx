import React from 'react';
import HeroSection from './HeroSection';
import ServicesSection from './ServicesSection';
import TopDecorators from './TopDecorators';
import ServiceCoverageMap from './ServiceCoverageMap';
import HowItWorks from './HowItWorks';

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <ServicesSection/>
      <TopDecorators/>
      <ServiceCoverageMap/>
      <HowItWorks/>
    </div>
  );
};

export default Home;