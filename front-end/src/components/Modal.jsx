import React, { useEffect, useState } from "react";
import "../assets/styles/modal.css";

function Modal({ setModalOpen, setUser }) {
    const [authMode, setAuthMode] = useState("Sign Up");

    // Form fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // UI state
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = "unset"; };
    }, []);

    // Clear error and fields when switching modes
    function switchMode(mode) {
        setAuthMode(mode);
        setError("");
        setName("");
        setEmail("");
        setPassword("");
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        const endpoint = authMode === "Sign Up" ? "register" : "login";
        const body = authMode === "Sign Up"
            ? { name, email, password }
            : { email, password };

        try {
            const res = await fetch(`http://localhost:3000/api/users/${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const data = await res.json();

            // Back-end returns a message field for errors too, check for known error phrases
            if (data.message.toLowerCase().includes("error") ||
                data.message.toLowerCase().includes("exist") ||
                data.message.toLowerCase().includes("incorrect") ||
                data.message.toLowerCase().includes("required") ||
                data.message.toLowerCase().includes("does not")) {
                setError(data.message);
            } else {
                // Success — store user info and close modal
                const loggedInUser = {
                    id: data.id || data.user?.id,
                    email: data.email || data.user?.email,
                    name: name || data.email, // register has name, login doesn't return it
                };
                setUser(loggedInUser);
                setModalOpen(false);
            }
        } catch {
            setError("Could not connect to server. Is the back-end running?");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="modal-container" onClick={() => setModalOpen(false)}>
            <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
                <div className="modal-title">
                    <h2>{authMode}</h2>
                    <span onClick={() => setModalOpen(false)}>&times;</span>
                </div>

                <div className="modal-input">
                    {authMode === "Sign Up" && (
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
                    />
                </div>

                {error && <p className="modal-error">{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? "Please wait…" : authMode === "Sign Up" ? "Create Account" : "Login"}
                </button>

                {authMode === "Sign Up" && (
                    <div className="join-terms">
                        <input type="checkbox" required />
                        <p>By continuing, I agree to the terms of use &amp; privacy policy.</p>
                    </div>
                )}

                {authMode === "Login"
                    ? <p>Don't have an account? <span onClick={() => switchMode("Sign Up")}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => switchMode("Login")}>Login here</span></p>
                }
            </form>
        </div>
    );
}

export default Modal;
