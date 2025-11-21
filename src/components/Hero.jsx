import React from "react";
import "./styles/Hero.css"
import BookingForm from "./BookingForm";

function Hero(){

    return(
        <div className="image-container">
            <div className="hero-content">
                <h1>Safiri na sisi!</h1>
                <div className="form-container">
                    <h2>Book . Pay . Travel</h2>
                    <BookingForm />
                </div>
            </div>
            
        </div>
    );
}

export default Hero;