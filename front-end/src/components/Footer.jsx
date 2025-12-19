import React from "react";
import "../assets/styles/footer.css";

function Footer() {

    const currentYear = new Date().getFullYear()

    return (
        <div className="footer-container">
            <div className="information-segment">
                <div className="info-segment">
                    <h2>About Us</h2>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta, ipsum quis! Commodi error a fugiat officiis, dolorum eum neque ratione.</p>
                </div>
                <div className="social-segment">
                    <h2>Follow Us</h2>
                    <ul>
                        <li><a href=""><img src="/images/facebook-brands-solid-full.svg" alt="facebook logo" /></a></li>
                        <li><a href=""><img src="/images/instagram-brands-solid-full.svg" alt="instagram logo" /></a></li>
                        <li><a href=""><img src="/images/threads-brands-solid-full.svg" alt="threads logo" /></a></li>
                        <li><a href=""><img src="/images/x-twitter-brands-solid-full.svg" alt="twitter logo" /></a></li>
                    </ul>
                </div>
                <div className="contact-segment">
                    <h2>Contact Us</h2>
                    <div className="phone-group">
                      <img src="/images/phone-solid-full.svg" alt="phone icon" /><p>+2547123456789</p> 
                    </div>
                    <div className="phone-group">
                      <img src="/images/envelope-solid-full.svg" alt="email icon" /><p>info.example@gmail.com</p> 
                    </div>
                    
                </div>
            </div>

            <hr />

            <div className="copyright">
                © {currentYear} Safiri LTD. All rights reserved.
            </div>

        </div>
    )
}

export default Footer;