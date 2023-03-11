import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper";

export default function SwiperBanner() {
    return (
        <Swiper
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
        >

          <SwiperSlide>
            <div className="banner">
              <img src="./images/home/banner1.jpg" alt="" style={{width: "100%"}} />
              <div className="content-banner">
                <span className="banner-subtitle">Amazing Tour</span>
                <h1>Ventice</h1>
                <ul>
                  <li>1023 reviews</li>
                  <li>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <span>4,5/5</span>
                  </li>
                </ul>
                <a href="">Discover Now</a>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="banner">
              <img src="./images/home/banner2.jpg" alt="" />
              <div className="content-banner">
                <span className="banner-subtitle">Amazing Tour</span>
                <h1>Ventice</h1>
                <ul>
                  <li>1023 reviews</li>
                  <li>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <span>4,5/5</span>
                  </li>
                </ul>
                <a href="">Discover Now</a>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="banner">
              <img src="./images/home/banner3.jpg" alt="" />
              <div className="content-banner">
                <span className="banner-subtitle">Amazing Tour</span>
                <h1>Ventice</h1>
                <ul>
                  <li>1023 reviews</li>
                  <li>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <span>4,5/5</span>
                  </li>
                </ul>
                <a href="">Discover Now</a>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="banner">
              <img src="./images/home/banner4.jpg" alt="" />
              <div className="content-banner">
                <span className="banner-subtitle">Amazing Tour</span>
                <h1>Ventice</h1>
                <ul>
                  <li>1023 reviews</li>
                  <li>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <span>4,5/5</span>
                  </li>
                </ul>
                <a href="">Discover Now</a>
              </div>
            </div>

        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
        <div className="swiper-pagination"></div>
          </SwiperSlide>

        </Swiper>
    );
}