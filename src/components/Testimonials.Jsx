import React from "react";
import Swiper from "swiper";
import { SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import { Navigation } from "swiper/modules";
import testimonialData from "../assets/data/testimonialData";

function Testimonials(image, message, person){

    return(
        <div className="testimonial-container">
            <h2>What They Say About Us</h2>

            <Swiper 
                modules={[Pagination, Navigation, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 3000 }}
                pagination={{ clickable: true }}
                navigation={true}
            >
            {testimonialData.map((item, index)=>(
                <SwiperSlide>
                    <div className="testimonialCard">
                        <img src={item.image}/>
                        <p>{item.message}</p>
                        <h3>{item.person}</h3>
                    </div>
                </SwiperSlide> 
            ))}
            </Swiper>            
        </div>
    )
}

export default Testimonials;