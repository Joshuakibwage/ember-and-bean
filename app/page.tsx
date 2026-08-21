import { Suspense } from "react";

import HeroSection from "@/components/sections/HeroSection.tsx";

import ErrorBoundary from "@/components/ErrorBoundary";
import FeaturedMenuSkeleton from "@/components/sections/FeaturedMenuSkeleton";
import FeaturedMenuSection from "@/components/sections/FeaturedMenuSection";
import Testimonials from "@/components/sections/Testimonials";


const HomePage = () => {
  return (
    <section className="">
      <HeroSection imageSrc="/Hero.jpg"/>

      <ErrorBoundary
        title="Couldn't load today's menu."
        message="The rest of the site is still here. Try refreshing this section"
      >
        <Suspense fallback={<FeaturedMenuSkeleton />}>
          <FeaturedMenuSection />
        </Suspense>
      </ErrorBoundary>
      <Testimonials /> 
    </section>
  );
}

export default HomePage;