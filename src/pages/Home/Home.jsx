import React from 'react';
import HeroSection from './HeroSection';
import ServicesSection from './ServicesSection';
import TopDecorators from './TopDecorators';
import ServiceCoverageMap from './ServiceCoverageMap';
import HowItWorks from './HowItWorks';
import FeaturedProjects from './FeaturedProjects';

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <ServicesSection/>
      <TopDecorators/>
      <ServiceCoverageMap/>
      <HowItWorks/>
      <FeaturedProjects/>
    </div>
  );
};

export default Home;