import React from "react";
import Navbar from "./components/navbar";
import Hero from "./components/Hero";
import Marketing from "./components/Marketing";
import marketingData from "./assets/data/marketingData";


function App() {

  return (
    <>
     <Navbar />
     <Hero />
     <Marketing title="Why Us?" data={marketingData}/>
    </>
  )
}

export default App
