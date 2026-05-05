import { Link } from "react-router-dom";
import "../../assets/styles/Admin.css";
import { useScores } from "../../context/useScores";


//Overview page for managing user, scores and messages
const AdminDashboard = () => {

    const { scores } = useScores();
    const totalQuizzes = scores.length;
    const  uniquePlayers = [...new Set(scores.map(score => score.name))];
    const registeredPlayers = uniquePlayers.filter( player => player.includes("@"));
    const guestPlayers = uniquePlayers.filter( player => !player.includes("@"));

    return (
        <section className="admin_page">

            <div className="admin_container">

                <div className="admin_header">
                    <h1>Admin Dashboard</h1>
                    <p>Beheer gebruikers en quiz resultaten.</p>
                </div>

                <div className="admin_stats">
                    <div className="admin_stat_card">
                        <h2>Gespeelde quizzen</h2>
                        <p>{totalQuizzes}</p>
                    </div>
                    <div className="admin_stat_card">
                        <h2>Deelnemers</h2>
                        <p>{uniquePlayers.length}</p>
                    </div>

                    <div className="admin_stat_card">
                        <h2>Geregistreerd</h2>
                        <p>{registeredPlayers.length}</p>
                    </div>
                    <div className="admin_stat_card">
                        <h2>Gastspelers</h2>
                        <p>{guestPlayers.length}</p>
                    </div>
                </div>

                <div className="admin_dashboard_grid">

                    <Link to="/admin/users" className="admin_card">
                        <h2>Manage Users</h2>
                        <p>Bekijk en beheer alle gebruikers.</p>
                    </Link>

                    <Link to="/admin/scores" className="admin_card">
                        <h2>Manage Scores</h2>
                        <p>Bekijk en beheer alle quiz resultaten.</p>
                    </Link>

                    <Link to="/admin/messages" className="admin_card">
                        <h2>Manage Messages</h2>
                        <p>Bekijk en beheer contactberichten.</p>
                    </Link>

                </div>

            </div>

        </section>
    );
};

export default AdminDashboard;