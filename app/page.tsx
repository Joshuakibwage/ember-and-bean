import HeroSection from "@/components/sections/HeroSection.tsx";
import FeaturedMenu from "@/components/sections/FeaturedMenu.tsx";


const HomePage = () => {
  return (
    <section className="">
      <HeroSection imageSrc="/Hero.jpg"/>
      <FeaturedMenu 
        items={[
    {
      id: "1",
      slug: "ember-oat-latte",
      name: "Ember Oat Latte",
      price: "KSh 450",
      description: "Double shot, steamed oat milk, a little cinnamon at the end.",
      imageSrc: "/images/menu/ember-oat-latte.jpg",
      tag: "Signature",
    },
    // ...
  ]}
    
      />
    </section>
  );
}

export default HomePage;