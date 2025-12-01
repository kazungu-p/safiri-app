import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./assets/styles/App.css"

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Modal from "./components/Modal";

function App() {
   const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="app-wrapper">
      <Router>
        <Navbar openModal={() => setModalOpen(true)}/>
        <Modal isOpen={modalOpen} closeModal={() => setModalOpen(false)} />

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
