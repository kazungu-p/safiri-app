import React, { useState } from "react";
import "../assets/styles/navbar.css";
import { NavLink } from "react-router-dom";

function Navbar(){

    const [menuOpen, setMenuOpen] = useState(false);

    function toggleMenu(){
        setMenuOpen(!menuOpen);
    }

    return (
        <div className="nav-container">
            <header>
                <nav>
                    <div className="nav-top">
                        <ul>
                            <li><a href="https://www.threads.com/?hl=en"><img src="/images/threads-fill.svg" alt="threads app logo" /></a></li>
                            <li><a href="https://x.com/home"><img src="/images/twitter-x.svg" alt="x(formerly twitter) app logo" /></a></li>
                            <li><a href="https://www.instagram.com/"><img src="/images/instagram.svg" alt="instagram app logo" /></a></li>
                        </ul>
                    </div>
                    <div className="nav-bottom">
                        <div className="logo-container">
                            <img src="/images/destination.png" alt="logo-image" className="logo"/>
                        </div>
                        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
                            <ul>
                                <li><NavLink to="/" className="nav-item" onClick={()=>setMenuOpen(false)}>Home</NavLink></li>
                                <li><NavLink to="/about" className="nav-item" onClick={()=>setMenuOpen(false)}>About Us</NavLink></li>
                                <li><NavLink to="contact" className="nav-item" onClick={()=>setMenuOpen(false)}>Contact Us</NavLink></li>
                                <li><NavLink to="joinus" className="nav-item" onClick={()=>setMenuOpen(false)}>Sign in/ Register</NavLink></li>
                            </ul>
                        </div>
                        <div className="hamburger" onClick={toggleMenu}>
                            {menuOpen ? "\u2715" : "\u2630"}
                        </div>

                    </div>
            </nav>
            </header>
        </div>
    )
}

export default Navbar;