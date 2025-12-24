import React from "react";
import ReusableForm from "./ReusableForm";
import "../assets/styles/contactus.css"

function Contactus() {

    return (
        <div className="contact-container">
            <h2>Contact Us</h2>
            <p>We'd love to hear from you! Get in touch with us via the form below, or reach out using the contact details provided.</p>
            <div className="box-container">
                <div className="contact-form-container">
                    <ReusableForm
                        buttonText="Send"
                        fields={
                            [
                                { label: "Name", type: "text", name: "name", placeholder: "Your Full Name", required: true },
                                { label: "Phone", type: "text", name: "phone", placeholder: "Phone Number", required: true },
                                { label: "Email", type: "email", name: "email", placeholder: "Your Email address", required: true },
                                { label: "Subject", type: "text", name: "subject", placeholder: "Subject", required: true },
                                { label: "Message", type: "textarea", name: "message", placeholder: "Your Message goes here", required: true }
                            ]
                        }
                    />
                </div>
                <div className="address-container">
                    <div className="location">
                        <h4 >Head Office</h4>
                        <p>Mwembe Tayari, Mombasa</p>

                        <h3>Email Us</h3>
                        <div className="contact-us-group">
                            <img src="/images/envelope-red-full.svg" alt="email icon" /><a href="">info.example@gmail.com</a>
                        </div>
                        <h3>For Booking (Telephone):</h3>
                        <div className="contact-us-group">
                            <img src="/images/phone-red-full.svg" alt="phone icon" />
                            <p>+254712345678</p>
                        </div>
                        <div className="contact-us-group">
                            <img src="/images/phone-red-full.svg" alt="phone icon" /><p>+254712345678</p>
                        </div>
                    </div>

                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7959.627228195929!2d39.663770638742044!3d-4.058392383661348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x184012df1a2bace1%3A0x811fe33c838d3841!2sMwembe%20Tayari%2C%20Mombasa!5e0!3m2!1sen!2ske!4v1766169723113!5m2!1sen!2ske" style={{ border: 0 }} allowFullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>


                </div>
            </div>

        </div>
    )
}

export default Contactus;