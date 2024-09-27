import HeroSection from "../components/HeroSection";
import Carousel from "../components/HeroSlider";

const Home = () => {
  const slides = [
    {
      image: "https://swiperjs.com/demos/images/nature-1.jpg",
      title: "Innovative Technology",
      subtitle: "The Future is Here",
      description:
        "Discover the latest advancements in technology and how they are shaping our world.",
    },
    {
      image: "https://swiperjs.com/demos/images/nature-2.jpg",
      title: "AI and Machine Learning",
      subtitle: "Intelligent Solutions",
      description:
        "Explore how AI is transforming industries and enhancing everyday life.",
    },
    {
      image: "https://swiperjs.com/demos/images/nature-3.jpg",
      title: "Cybersecurity Trends",
      subtitle: "Stay Protected",
      description:
        "Learn about the latest trends in cybersecurity and how to safeguard your data.",
    },
    {
      image: "https://swiperjs.com/demos/images/nature-4.jpg",
      title: "Cloud Computing",
      subtitle: "Efficiency Redefined",
      description:
        "Understand the impact of cloud computing on business operations and scalability.",
    },
  ];
  return (
    <div className="container mx-auto">
      {/* <Carousel slides={slides} />
       */}
       <HeroSection />
    </div>
  );
};

export default Home;
