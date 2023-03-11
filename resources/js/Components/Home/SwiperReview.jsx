import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper";

export default function SwiperReview() {

    return (
        <Swiper
        slidesPerView = {1}
        spaceBetween = {30}
        loop = {true}
        keyboard = {{
            enabled: true,
        }}
        pagination = {{
        el: ".swiper-pagination",
        clickable: true,
        }}
        navigation = {true}
        modules={[Navigation, Pagination]}
        className="mySwiper"
        >
            <SwiperSlide>
            <div className="text-align item-inner">
                <div className="content">
                “Customer service was professional. Highly recommend. Absolutely wonderful! Just the right amount of time spent snorkeling and one of the most beautiful beaches I have ever seen.”    
                </div>
                <div className="rating">
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                </div>
                <div className="details">
                <div className="name">Sofia Joly</div>
                <div className="job">London, England</div>
                </div>
            </div>
            </SwiperSlide>
            <SwiperSlide>
            <div className="text-align item-inner">
                <div className="content">
                
                “Customer service was professional. Highly recommend. Absolutely wonderful! Just the right amount of time spent snorkeling and one of the most beautiful beaches I have ever seen.”
                                            
                </div>
                <div className="rating">
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                </div>
                <div className="details">
                <div className="name">Sofia Joly</div>
                <div className="job">London, England</div>
                </div>
            </div>
            </SwiperSlide>
            <SwiperSlide>
            <div className="text-align item-inner">
                <div className="content">
                
                “Customer service was professional. Highly recommend. Absolutely wonderful! Just the right amount of time spent snorkeling and one of the most beautiful beaches I have ever seen.”
                                            
                </div>
                <div className="rating">
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                </div>
                <div className="details">
                <div className="name">Sofia Joly</div>
                <div className="job">London, England</div>
                </div>
            </div>
            </SwiperSlide>
            <SwiperSlide>
            <div className="text-align item-inner">
                <div className="content">
                    
                    “Customer service was professional. Highly recommend. Absolutely wonderful! Just the right amount of time spent snorkeling and one of the most beautiful beaches I have ever seen.”
                </div>
                <div className="rating">
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                </div>
                <div className="details">
                <div className="name">Sofia Joly</div>
                <div className="job">London, England</div>
                </div>
            </div>
            </SwiperSlide>
            <SwiperSlide>
            <div className="text-align item-inner">
                <div className="content">
                    
                    “Customer service was professional. Highly recommend. Absolutely wonderful! Just the right amount of time spent snorkeling and one of the most beautiful beaches I have ever seen.”
                </div>
                <div className="rating">
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                </div>
                <div className="details">
                <div className="name">Sofia Joly</div>
                <div className="job">London, England</div>
                </div>
            </div>
            </SwiperSlide>
            <SwiperSlide>
            <div className="text-align item-inner">
                <div className="content">
                    
                    “Customer service was professional. Highly recommend. Absolutely wonderful! Just the right amount of time spent snorkeling and one of the most beautiful beaches I have ever seen.”
                </div>
                <div className="rating">
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                </div>
                <div className="details">
                <div className="name">Sofia Joly</div>
                <div className="job">London, England</div>
                </div>
            </div>
            </SwiperSlide>
            <SwiperSlide>
            <div className="text-align item-inner">
                <div className="content">      
                “Customer service was professional. Highly recommend. Absolutely wonderful! Just the right amount of time spent snorkeling and one of the most beautiful beaches I have ever seen.”
                </div>
                <div className="rating">
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                </div>
                <div className="details">
                <div className="name">Sofia Joly</div>
                <div className="job">London, England</div>
                </div>
            </div>
            </SwiperSlide>
            <SwiperSlide>
            <div className="text-align item-inner">
                <div className="content">
                “Customer service was professional. Highly recommend. Absolutely wonderful! Just the right amount of time spent snorkeling and one of the most beautiful beaches I have ever seen.”            
                </div>
                <div className="rating">
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                </div>
                <div className="details">
                <div className="name">Sofia Joly</div>
                <div className="job">London, England</div>
                </div>
            </div>
            </SwiperSlide>
            <SwiperSlide>
            <div className="text-align item-inner">
                <div className="content">
                “Customer service was professional. Highly recommend. Absolutely wonderful! Just the right amount of time spent snorkeling and one of the most beautiful beaches I have ever seen.”                       
                </div>
                <div className="rating">
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                </div>
                <div className="details">
                <div className="name">Sofia Joly</div>
                <div className="job">London, England</div>
                </div>
            </div>
            </SwiperSlide>
        </Swiper>
    );
}