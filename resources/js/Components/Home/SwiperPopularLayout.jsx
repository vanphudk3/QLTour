import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper";

export default function SwiperPopularLayout({children}) {

    return (
      <Swiper 
        slidesPerView = {1}
        spaceBetween = {10}
        loop = {true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 10
          },
          "@0.75": {
            slidesPerView: 2,
            spaceBetween: 20
          },
          "@1.00": {
            slidesPerView: 2,
            spaceBetween: 20
          },
          "@1.25": {
            slidesPerView: 3,
            spaceBetween: 100
          },
          "@1.50": {
            slidesPerView: 4,
            spaceBetween: 50
          }
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
              {children}
      </Swiper>
    );
}