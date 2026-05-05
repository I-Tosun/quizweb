import Navbar from "../components/Navbar.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../assets/styles/Layout.css";
import {useLocation} from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useLanguage } from "../context/useLanguage";



const Layout = ({ children, openLogin, openSignUp }) => {


    const location = useLocation();
    const { user } = useAuth();
    const { t } = useLanguage()
    const showHeader = location.pathname === "/";

    return (
        <div className= "layout">

            <Navbar
              openLogin={openLogin}
              openSignUp={openSignUp}
            />

            {showHeader && ( <Header title={ user ? `${t("welcomeBack")} ${ user.username?.split("@")[0] || user.email?.split("@")[0] || "speler" } ` : undefined }
                                     subtitle={ user ? t("welcomeBackSubtitle")
                    : undefined }
                />
            )}
            <main className= "layout_main">
                {children}
            </main>

            <Footer/>

        </div>
    );
}

export default Layout;