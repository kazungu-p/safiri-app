import React, { useState } from "react";
import "../assets/styles/navbar.css";

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
                                <li><a href="">Home</a></li>
                                <li><a href="">About us</a></li>
                                <li><a href="">Contact us</a></li>
                                <li><a href="">Sign in/ Register</a></li>
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