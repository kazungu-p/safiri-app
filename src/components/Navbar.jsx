import React, { useState } from "react";
import "./css/navbar.css";

function Navbar() {

    return (
        <div className="nav-container">
            <header>
                <nav>
                    <div className="nav-top">
                        <ul>
                            <li><a href="https://www.threads.com/?hl=en"><img src="src/assets/threads-fill.svg" alt="threads app logo" /></a></li>
                            <li><a href="https://x.com/home"><img src="src/assets/twitter-x.svg" alt="x(formerly twitter) app logo" /></a></li>
                            <li><a href="https://www.instagram.com/"><img src="src/assets/instagram.svg" alt="instagram app logo" /></a></li>
                        </ul>
                    </div>
                    <div className="nav-bottom">
                        <div className="logo-container">
                            <img src="src/assets/destination.png" alt="logo-image" className="logo" />
                        </div>

                        <div className="nav-links">
                            <ul>
                                <li><a href="">Home</a></li>
                                <li><a href="">About us</a></li>
                                <li><a href="">Contact us</a></li>
                                <li><a href="">Sign in/ Register</a></li>
                            </ul>
                        </div>

                    </div>
                </nav>
            </header>
        </div>
    )
}

export default Navbar;