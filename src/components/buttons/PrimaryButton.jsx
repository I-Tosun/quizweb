import { Link } from "react-router-dom";
import "../../assets/styles/buttons/Buttons.css";

// Reusable primary button component
const PrimaryButton = ({ to, label, onClick, className = "" }) => {

    if (to) {
        return (
            <Link to={to} className={`primary_btn ${className}`}>
                {label}
            </Link>
        );
    }

    return (
        <button className={`primary_btn ${className}`} onClick={onClick}>
            {label}
        </button>
    );
};

export default PrimaryButton;