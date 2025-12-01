import React, { useState } from "react";
import ReusableForm from "./ReusableForm";
import "../assets/styles/modal.css";

function Modal({ isOpen, closeModal }) {

    const [authMode, setAuthMode] = useState("login");

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>

                <span className="close" onClick={closeModal}>&times;</span>
                <h2>Join Safiri</h2>

                <div className="form-toggle">
                    <button
                        className={authMode === "login" ? "active" : ""}
                        onClick={() => setAuthMode("login")}
                    >
                        Sign In
                    </button>

                    <button
                        className={authMode === "register" ? "active" : ""}
                        onClick={() => setAuthMode("register")}
                    >
                        Register
                    </button>
                </div>

                {/* LOGIN FORM */}
                <div className="modal-login-form">
                    {authMode === "login" && (
                        <ReusableForm
                            title=""
                            buttonText="Let me in"
                            fields={[
                                {label: "Username",type: "text", name: "username", placeholder: "Username", required: true},
                                {label: "Password", type: "password",name: "password", placeholder: "Password", required:true}
                            ]}
                        />
                    )}
                </div>


                {/* REGISTER FORM */}
                <div className="modal-registration-form">
                    {authMode === "register" && (
                        <ReusableForm
                            title=""
                            buttonText="Register"
                            fields={[
                                {label: "Name",type: "text",name: "name",placeholder: "Full name", required: true},
                                {label: "Username",type: "text",name: "username",placeholder: "Username", required: true},
                                {label: "Email",type: "email",name: "email",placeholder: "Email", required: true},
                                {label: "Phone",type: "text", name: "phone", placeholder: "Phone number", required: true },
                                {label: "Password", type: "password", name: "password",placeholder: "Password", required: true}
                            ]}
                        />
                    )}
                </div>

            </div>
        </div>
    );
}

export default Modal;
