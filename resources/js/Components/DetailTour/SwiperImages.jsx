import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";

export default function SwiperImages(props) {
    
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <>
        <Swiper
            style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
            zIndex: 0
            }}
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2"
        >

            <SwiperSlide className="widen">
                <img src="../images/home/tour_1.jpg" />
            </SwiperSlide>
            <SwiperSlide className="widen">
                <img src="../images/home/tour_2.jpg" />
            </SwiperSlide>
            <SwiperSlide className="widen">
                <img src="../images/home/tour_3.jpg" />
            </SwiperSlide>
            <SwiperSlide className="widen">
                <img src="../images/home/tour_4.jpg" />
            </SwiperSlide>
            <SwiperSlide className="widen">
                <img src="../images/home/tour_5.jpg" />
            </SwiperSlide>
            <SwiperSlide className="widen">
                <img src="../images/home/tour_6.jpg" />
            </SwiperSlide>
        </Swiper>
        <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper mySwiper-details"
            style={{
                zIndex: 0
            }}
        >
            <SwiperSlide>
                <img src="../images/home/tour_1.jpg" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="../images/home/tour_2.jpg" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="../images/home/tour_3.jpg" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="../images/home/tour_4.jpg" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="../images/home/tour_5.jpg" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="../images/home/tour_6.jpg" />
            </SwiperSlide>
        </Swiper>
        </>
    );
}
