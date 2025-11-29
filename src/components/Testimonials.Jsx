import React from "react";
import "./styles/testimonials.css";
import "swiper/css"
import "swiper/swiper-bundle.css"
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination,Autoplay, Navigation } from "swiper/modules";
import testimonialData from "../assets/data/testimonialData";

function Testimonials (){

    return(
        <div className="testimonial-container">
            <h2>What They Say About Us</h2>

            <Swiper 
                modules={[Pagination,Navigation, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 3000 }}
                navigation={true}
                pagination={{clickable: true}}
                autoHeight={true}
            >
            {testimonialData.map((item)=>(
                <SwiperSlide key={item.key}>
                    <div className="testimonial-card">
                        <p className="review">{item.review}</p>
                        <div className="person-info">
                            <h3>{item.personName}</h3>
                            <p>{item.jobTitle}</p>
                        </div>
                    </div>
                </SwiperSlide> 
            ))}
            </Swiper>            
        </div>
    )
}

export default Testimonials;