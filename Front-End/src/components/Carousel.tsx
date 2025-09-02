import { Swiper, SwiperSlide } from 'swiper/react';
// Importe o módulo Autoplay junto com os outros
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import img1 from '../assets/img/image1.jpg';
import img2 from '../assets/img/image2.jpg';
import img3 from '../assets/img/image3.jpg';
import { motion } from "framer-motion"

export default function Carousel() {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.2 }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false, // O carrossel continua rolando mesmo se o usuário interagir
        }}
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
    </motion.section>
  );
}