import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./assets/styles/App.css"

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Modal from "./components/Modal";
import BookingPage from"./components/BookingPage";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  return (
    <div className="app-wrapper">
      <Router>
        <Navbar setModalOpen={setModalOpen} user={user} setUser={setUser}/>
        {modalOpen? <Modal setModalOpen={setModalOpen} setUser={setUser}/>: <></>}

          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/travel" element={<BookingPage/>}/>
            </Routes>
          </div>

        <Footer />
      </Router>
    </div>
  )
}

export default App
