import { useState } from "react";
import Modal from "../components/Modal";
import "../assets/styles/Auth.css";
import { useAuth } from "../context/useAuth.js";
import ErrorMessage from "../components/ui/ErrorMessage";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { Icon } from "@iconify/react";

const SignUp = ({ onClose }) => {

    const { register } = useAuth();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(null);

        if (password !== confirmPassword) {
            setError("Wachtwoorden komen niet overeen");
            return;
        }

        setLoading(true);

        try {
            await register(username, email, password);
            alert("Account succesvol aangemaakt");
            onClose();
        } catch (err) {
            console.error(err);
            setError("Registratie mislukt. Probeer een andere username of email.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal title="Create Account" onClose={onClose}>

            <form className="auth_form" onSubmit={handleSubmit}>
                <ErrorMessage message={error} />
                {loading && <LoadingSpinner />}

                <label htmlFor="Signup-email">
                    Email Address
                </label>
                <input
                    id="Signup-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required/>

                <label htmlFor="signup-username">Screen Name</label>
                <input
                    id="signup-username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required/>

                {/* Password */}
                <label htmlFor="signup-password">Password</label>
                <div className="password_wrapper">
                    <input
                        id="signup-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required/>
                    <button
                        type="button"
                        onClick={() => setShowPassword(prev => !prev)}
                        className="password_toggle">
                        <Icon icon={showPassword ? "mdi:eye-off" : "mdi:eye"} width="20" />
                    </button>
                </div>

                {/* Confirm password */}
                <label htmlFor="signup-confirm-password">Confirm Password</label>
                <div className="password_wrapper">
                    <input
                        id="signup-confirm-password"
                        name="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required/>
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(prev => !prev)}
                        className="password_toggle">
                        <Icon icon={showConfirmPassword ? "mdi:eye-off" : "mdi:eye"} width="20" />
                    </button>
                </div>

                <button
                    className="primary_btn"
                    disabled={loading}>
                    {loading ? "Bezig..." : "Create Account"}
                </button>

            </form>

        </Modal>
    );
};

export default SignUp;