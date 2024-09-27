import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

interface SliderProps {
  slides: Slide[];
}

const Carousel: React.FC<SliderProps> = ({ slides }) => {
  return (
    <div className="h-[70vh] flex items-center justify-center bg-gray-100">
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 p-4">
                <h2 className="text-3xl text-white font-bold">{slide.title}</h2>
                <h3 className="text-xl text-white mt-2">{slide.subtitle}</h3>
                <p className="text-white mt-4 text-center">{slide.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
