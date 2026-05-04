import { Link } from "react-router-dom";
import "../assets/styles/NotFound.css";

const NotFound = () => {

    return (
        <section className="notfound_page">

            <h1>404</h1>

            <p>
                Pagina niet gevonden.
            </p>

            <Link
                to="/"
                className="primary_btn">
                Terug naar Home
            </Link>

        </section>
    );
};

export default NotFound;
