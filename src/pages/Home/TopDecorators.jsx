import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  EffectCoverflow,
  Pagination,
  Autoplay,
  Navigation,
} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const TopDecorators = () => {
  const [decorators, setDecorators] = useState([]);
  const [loading, setLoading] = useState(true);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const fetchDecorators = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/decorators');
        setDecorators(data.slice(0, 6)); // প্রথম 6 decorators দেখাবে
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchDecorators();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-20 text-lg font-medium">
        Loading decorators...
      </p>
    );

  return (
    <section className="py-20 px-6 md:px-5">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-white">
        Top <span className="text-[#F9BC60]">Decorators</span>
      </h2>

      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        loop={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 200,
          scale: 0.75,
          modifier: 1,
          slideShadows: false,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
        className="mySwiper"
      >
        {decorators.map((d) => (
          <SwiperSlide key={d._id}>
            <div className="bg-gray-200 rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl transition duration-300">
              <img
                src={d.photoURL}
                alt={d.name}
                className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">{d.name}</h3>
              <p className="text-gray-600">{d.specialty}</p>
              <p className="text-yellow-500">
                {d.rating} ⭐ ({d.reviewsCount})
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-6 mt-15 -translate-y-10">
        <button
          ref={prevRef}
          className="bg-white mr-5 text-black w-10 h-10 rounded-full flex items-center justify-center transition"
        >
          <FaArrowLeft />
        </button>
        <button
          ref={nextRef}
          className="bg-[#F9BC60] ml-5 text-white w-10 h-10 rounded-full flex items-center justify-center transition"
        >
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default TopDecorators;
