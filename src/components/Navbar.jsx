import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/Navbar.css";

import logo from "../assets/images/logo.png";
import { Icon } from "@iconify/react";


import { menuItems } from "../helpers/menuItems";
import { languages } from "../helpers/languages";
import { useLanguage } from "../context/useLanguage";
import { useAuth } from "../context/useAuth.js";

const Navbar = ({ openLogin, openSignUp }) => {

    const navigate = useNavigate();
    const { language, changeLanguage, t } = useLanguage();
    const { user, isAdmin, logout } = useAuth(); // ← NIEUW: user, isAdmin en logout uit Context

    const [menuOpen, setMenuOpen] = useState(false);
    const [languageOpen, setLanguageOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const menuRef = useRef(null);
    const langRef = useRef(null);

    useEffect(() => {
        const handleClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
            if (langRef.current && !langRef.current.contains(e.target)) {
                setLanguageOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const handleSearch = (e) => {
        if (e.key !== "Enter") return;

        const value = searchTerm.toLowerCase().trim();
        const match = menuItems.find(item => item.path.includes(value));

        if (match) {
            navigate(match.path);
            setSearchTerm("");
        } else {
            alert("Quiz categorie niet gevonden");
        }
    };

    return (
        <nav className="navbar">

            {/* Left */}
            <div className="navbar_left">

                <img
                    src={logo}
                    alt="Quiz logo"
                    className="navbar_logo"/>

                <div className="menu" ref={menuRef}>

                    <button
                        className="menu_text"
                        onClick={() => setMenuOpen(!menuOpen)}>
                        {t("menu")}
                        <span className="menu_arrow">▼</span>
                    </button>

                    {menuOpen && (
                        <ul className="dropdown">
                            {menuItems.map((item) => (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        onClick={() => setMenuOpen(false)}>
                                        {t(item.key)}
                                    </Link>
                                </li>
                            ))}

                            {isAdmin && (
                                <li>
                                    <Link
                                        to="/admin"
                                        onClick={() => setMenuOpen(false)}>
                                        Admin
                                    </Link>
                                </li>
                            )}
                        </ul>
                    )}

                </div>

            </div>

            <label htmlFor="quiz-search" className="visually-hidden">Zoek quiz</label>
            {/* Search */}
            <div className="search_wrapper">

                <input
                    id="quiz-search"
                    name="quiz-search"
                    type="text"
                    className="search"
                    placeholder={t("search")}
                    autoComplete="off"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleSearch}
                />
                <button
                    className="search_icon_btn"
                    onClick={() => handleSearch({ key: "Enter" })}>
                    <Icon icon="mdi:magnify" width="18" />
                </button>
            </div>

            {/* Right */}
            <div className="navbar_right">

                {!user ? ( // user uit Context ipv token
                    <>
                        <button
                            className="nav-text"
                            onClick={openSignUp}>
                            {t("signup")}
                        </button>

                        <button
                            className="nav-text"
                            onClick={openLogin}>
                            {t("login")}
                        </button>
                    </>
                ) : (
                    <div className="user_section">
                        <span className="username">
                            {t("hello")} {user?.username || "User"}
                        </span>
                        <Link to="/profile" className="nav-text">Profiel</Link>

                        <button
                            className="nav-text"
                            onClick={() => {
                                logout();
                                navigate("/");
                            }}>
                            {t("logout")}
                        </button>
                    </div>
                )}

                {/* Language */}
                <div className="language" ref={langRef}>

                    <button
                        className="language_switch"
                        onClick={() => setLanguageOpen(!languageOpen)}>
                        {language}
                        <span className="language_arrow">▼</span>
                    </button>

                    {languageOpen && (
                        <ul className="dropdown">
                            {languages.map((lang) => (
                                <li
                                    key={lang.code}
                                    onClick={() => {
                                        changeLanguage(lang.code);
                                        setLanguageOpen(false);
                                    }}>
                                    {lang.label}
                                </li>
                            ))}
                        </ul>
                    )}

                </div>

            </div>

        </nav>
    );
};

export default Navbar;