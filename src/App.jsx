import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marketing from "./components/Marketing";
import marketingData from "./assets/data/marketingData";
import destinationsData from "./assets/data/destinationsData";
import TestimonialCard from "./components/TestimonialCard";
import Footer from "./components/Footer";

function App() {

  return (
    <>
     <Navbar />
     <Hero />
     <Marketing title="Why Us?" data={marketingData}/>
     <Marketing title="Top Destinations" data={destinationsData} className="destinations-section"/>
     <TestimonialCard />
     <Footer />
    </>
  )
}

export default App
