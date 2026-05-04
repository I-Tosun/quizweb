import { useState } from "react";
import Modal from "../components/Modal";
import "../assets/styles/Auth.css";
import { useAuth } from "../context/useAuth.js";
import ErrorMessage from "../components/ui/ErrorMessage.jsx";
import LoadingSpinner from "../components/ui/LoadingSpinner.jsx";
import { Icon } from "@iconify/react";

const Login = ({ onClose }) => {
    const { login, status, error } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            alert("Login succesvol");
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal title="Login to QuizWeb" onClose={onClose}>

            <form className="auth_form" onSubmit={handleSubmit}>
                <ErrorMessage message={error} />
                {status === "loading" && <LoadingSpinner />}

                <label htmlFor="login-email">
                    Email
                </label>

                <input
                    id="login-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required/>

                <label htmlFor="login-password">
                    Password
                </label>

                <div className="password_wrapper">
                    <input
                        id="login-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
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

                <button className="primary_btn" disabled={status === "loading"}>
                    {status === "loading" ? "Bezig..." : "Login"}
                </button>

            </form>

        </Modal>
    );
};

export default Login;