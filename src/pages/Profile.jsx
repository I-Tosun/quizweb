import { Link } from "react-router-dom";
import "../assets/styles/Profile.css";
import { useAuth } from "../context/useAuth";
import { useScores } from "../context/useScores";

// Profile page
const Profile = () => {

    const { user } = useAuth();
    const { scores } = useScores();
    // Alleen scores van ingelogde gebruiker
    const userScores = scores.filter(
        (score) =>
            score.name?.toLowerCase() ===
            user?.username?.toLowerCase()
    );
    // Total played quiz
    const totalQuizzes = userScores.length;
    // Highest %
    const highestScore = userScores.length > 0
        ? Math.max(...userScores.map(score => score.percentage))
        : 0;
    const averageScore = userScores.length > 0
        ? Math.round(
            userScores.reduce(
                (total, score) => total + score.percentage,
                0
            ) / userScores.length
        )
        : 0;

    return (
        <section className="score_page">
            <div className="score_container">
                {/* Header */}
                <div className="profile_header">
                    <h1>Welkom {user?.username || user?.email}</h1>
                    <p>Bekijk jouw quiz resultaten en statistieken.</p>
                </div>
                {/* Stats */}
                <div className="profile_stats">
                    <div className="profile_card">
                        <h2>Gespeelde quizzes</h2>
                        <p>{totalQuizzes}</p>
                    </div>

                    <div className="profile_card">
                        <h2>Hoogste score</h2>
                        <p>{highestScore}%</p>
                    </div>

                    <div className="profile_card">
                        <h2>Gemiddelde score</h2>
                        <p>{averageScore}%</p>
                    </div>
                </div>

                {/* User scores */}
                <div className="profile_scores">
                    <h2>Jouw quizresultaten</h2>
                    {userScores.length === 0 ? (
                        <p>Nog geen quizzen gespeeld.</p>
                    ) : (

                        <div className="profile_score_table">
                            {/* Header */}
                            <div className="profile_score_header">
                                <span>Categorie</span>
                                <span>Score</span>
                                <span>Percentage</span>
                            </div>
                            {/* Rows */}
                            {userScores.map((score) => (
                                <div
                                    className="profile_score_row"
                                    key={score.id}>
                                    <span>{score.category}</span>
                                    <span>{score.score}/{score.total}</span>
                                    <span>{score.percentage}%</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="profile_actions">
                    <Link to="/scores" className="primary_btn">
                        Bekijk scorelijst
                    </Link>
                    <Link to="/" className="primary_btn secondary_btn">
                        Terug naar home
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Profile;

