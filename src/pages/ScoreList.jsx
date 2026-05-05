import { Link } from "react-router-dom";
import "../assets/styles/ScoreList.css";
import ScoreTable from "../components/ScoreTable";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorMessage from "../components/ui/ErrorMessage";
import { useLanguage } from "../context/useLanguage";
import { useScores } from "../context/useScores.js";

// Score list shows scores sorted by high score
const ScoreList = () => {

    const { t } = useLanguage();
    const { scores, loading, error } = useScores();
    const totalQuizzes = scores.length;
    const uniquePlayers = [
        ...new Set(scores.map(score => score.name))
    ];

    return (
        <section className="score_page">

            {/* Header */}
            <div className="score_header">
                <h1>{t("ScoresListTitle")}</h1>
                <p>{t("scoreListText")}</p>
            </div>

            <div className="score_container">

                {/* Statistics cards */}
                <div className="score_stats">

                    <div className="score_stat_card">
                        <h2>{t("playedQuizzes")}</h2>
                        <p>{totalQuizzes}</p>
                    </div>

                    <div className="score_stat_card">
                        <h2>{t("players")}</h2>
                        <p>{uniquePlayers.length}</p>
                    </div>
                </div>

                {loading && ( <LoadingSpinner />
                )}

                {error && ( <ErrorMessage message={error} />
                )}

                {!loading && !error && scores.length === 0 && (
                    <p style={{ textAlign: "center" }}>
                        Nog geen scores opgeslagen
                    </p>
                )}

                {!loading && !error && scores.length > 0 && ( <ScoreTable scores={scores} />
                )}

                <div className="score_back">
                    <Link to="/" className="score_back_btn">
                        ← Terug naar Home
                    </Link>
                </div>

            </div>

        </section>
    );
};

export default ScoreList;
