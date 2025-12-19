import React from "react";
import Hero from "../components/Hero";
import Marketing from "../components/Marketing";
import marketingData from "../assets/data/marketingData";
import destinationsData from "../assets/data/destinationsData";
import TestimonialCard from "../components/TestimonialCard";


function Home(){
    return (
        <>
            <Hero />
            <Marketing title="Why Us?" data={marketingData}/>
            <Marketing title="Top Destinations" data={destinationsData} className="destinations-section"/>
            <TestimonialCard />
            
        </>
    )
}

export default Home;