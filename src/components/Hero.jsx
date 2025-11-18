import React from "react";
import "./css/Hero.css"
import Form from "./Form";

function Hero(){

    const fields = [
        {type : "text", placeholder : "From"},
        {type : "text", placeholder : "To"},
        {type : "date", placeholder : "Date"}
    ];

    return(
        <div className="image-container">
            <div className="hero-content">
                <h1>Safiri na sisi!</h1>
                <div className="form-container">
                    <h2>Book . Pay . Travel</h2>
                    <Form 
                        fields={fields}
                        buttonText= "Search"
                    />
                </div>
            </div>
            
        </div>
    );
}

export default Hero;