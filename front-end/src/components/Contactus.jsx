import React from "react";
import ReusableForm from "./ReusableForm";
import "../assets/styles/contactus.css"

function Contactus() {
    return (
        <div className="contact-container">
            <h2>Contact Us</h2>
            <div className="box-container">
                <div className="contact-form-container">
                    <ReusableForm 
                        buttonText="Send"
                        fields={
                            [
                                {label: "Name", type: "text", name: "name", placeholder: "Name", required : true},
                                {label: "Phone", type: "text", name: "phone", placeholder: "Phone Number", required: true},
                                {label: "Email", type: "email", name: "email", placeholder: "Email address", required: true},
                                {label: "Subject", type: "text", name: "subject", placeholder: "Subject", required: true},
                                {label: "Message", type: "textarea", name: "message", placeholder: "Message", required: true}
                            ]
                        }
                    />
                </div>
                <div className="address-container">
                    <h2>Head Office</h2>
                    <p>Mombasa Booking Office</p>
                    <p>Ground Floor, Shekhe Building, River Rd, Mombasa</p>
                    <h3>Email Us</h3>
                    <div className="contact-us-group">
                        <img src="/images/envelope-red-full.svg" alt="email icon" /><a href="">info.example@gmail.com</a>
                    </div>
                    <h3>For Booking (Telephone):</h3>
                    <div className="contact-us-group">
                        <img src="/images/phone-red-full.svg" alt="phone icon" /><p>+254712345678</p>
                    </div>
                    <div className="contact-us-group">
                        <img src="/images/phone-red-full.svg" alt="phone icon" /><p>+254712345678</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Contactus;