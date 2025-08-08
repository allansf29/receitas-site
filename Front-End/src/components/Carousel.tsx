import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import img1 from '../assets/img/image1.jpg';
import img2 from '../assets/img/image2.jpg';
import img3 from '../assets/img/image3.jpg';

export default function Carousel() {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      className="w-full h-84"
    >
      <SwiperSlide>
        <img src={img1} alt="Slide 1" className="w-full h-full object-cover" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={img2} alt="Slide 2" className="w-full h-full object-cover" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={img3} alt="Slide 3" className="w-full h-full object-cover" />
      </SwiperSlide>
    </Swiper>
  );
}
