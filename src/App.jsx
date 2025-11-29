import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marketing from "./components/Marketing";
import marketingData from "./assets/data/marketingData";
import destinationsData from "./assets/data/destinationsData";
import TestimonialCard from "./components/TestimonialCard";

function App() {

  return (
    <>
     <Navbar />
     <Hero />
     <Marketing title="Why Us?" data={marketingData}/>
     <Marketing title="Top Destinations" data={destinationsData} className="destinations-section"/>
     <TestimonialCard />
    </>
  )
}

export default App
