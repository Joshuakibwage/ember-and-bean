import HeroSection from "@/components/sections/HeroSection.tsx";
import Menu from "@/components/sections/Menu.tsx";


const HomePage = () => {
  return (
    <section className="">
      <HeroSection imageSrc="/Hero.jpg"/>
      <Menu />
    </section>
  );
}

export default HomePage;