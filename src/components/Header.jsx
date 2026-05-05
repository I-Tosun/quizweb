import "../assets/styles/Header.css";
import { useLanguage } from "../context/useLanguage";

const Header = ({ title, subtitle}) => {
    const { t } = useLanguage();
    return (
        <header className="header">
            <div className="header_container">
                <h1>{ title || t("welcomeTitle")}</h1>
                <p> {subtitle ? ( subtitle ) : (
                    <> {t("welcomeSubtitle")} <br /> {t("welcomeSubtitle2")} </> )} </p>
            </div>
        </header>
    );
};

export default Header;
