import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
// import "swiper/css";
// import "swiper/css/navigation";

// import { Navigation } from "swiper";

export default function SwiperPopular({ children }) {
    return <SwiperSlide style={{ display: "flex" }}>{children}</SwiperSlide>;
}
