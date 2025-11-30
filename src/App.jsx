import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./assets/styles/App.css"

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {

  return (
    <div className="app-wrapper">
      <Router>
        <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/join" />
            </Routes>
          </div>
        <Footer />
      </Router>
    </div>
  )
}

export default App
