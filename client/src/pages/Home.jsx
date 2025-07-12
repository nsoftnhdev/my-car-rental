import Banner from "../components/Banner";
import FeaturedSection from "../components/FeaturedSection";
import Hero from "../components/Hero";
import Newsletter from "../components/Newsletter";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedSection />
      <Banner />
      <Testimonials />
      <Newsletter />
    </>
  );
};

export default Home;
