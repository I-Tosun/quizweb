import { useEffect, useState } from "react";
import "../../assets/styles/Admin.css";

import DeleteButton from "../../components/buttons/DeleteButton.jsx";
import BackButton from "../../components/buttons/BackButton.jsx";

/**
 * @typedef {{ id: number, email: string, roles: string[] }} User
 */
// Management of users via Novi Dynamic API
const API_URL = "/api";
const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;

const projectHeader = {
    "Content-Type": "application/json",
    "novi-education-project-id": PROJECT_ID
};

const ManageUsers = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`${API_URL}/users`, {
                    method: "GET",
                    headers: {
                        ...projectHeader,
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                } else {
                    setError("Gebruikers konden niet worden geladen.");
                }
            } catch {
                setError("Verbindingsfout bij het ophalen van gebruikers.");
            } finally {
                setLoading(false);
            }
        };

        void loadUsers();
    }, []);

    const handleDelete = async (id) => {

        if (!window.confirm("Weet je zeker dat je deze gebruiker wilt verwijderen?")) { return;

        }

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL}/users/${id}`, {
                method: "DELETE",
                headers: {
                    ...projectHeader,
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.ok) {
                alert("User verwijderd");
                setUsers(prev => prev.filter((u) => u.id !== id) );
            } else if (response.status === 403) {
                alert("Verwijderen niet toegestaan");
            } else {
                alert("Verwijderen mislukt");
            }
        } catch {
            alert("Verwijderen mislukt");
        }
    };

    return (
        <section className="admin_page">
            <div className="admin_container">

                <div className="admin_header">
                    <h1>Manage Users</h1>
                    <p>Gebruikers in het systeem.</p>
                </div>

                {loading && <p>Gebruikers laden...</p>}

                {error && <p style={{ color: "#d33" }}>{error}</p>}

                {!loading && !error && (
                    <div className="admin_table users_grid">

                        <div className="admin_table_header">
                            <span>ID</span>
                            <span>Email</span>
                            <span>Role</span>
                            <span>Action</span>
                        </div>

                        {users.map((user) => {
                            const roleList = Array.isArray(user.roles) ? user.roles.join(", ") : "-";
                            return (
                                <div className="admin_table_row" key={`${user.id}-${user.email}`}>
                                    <span>{user.id}</span>
                                    <span>{user.email}</span>
                                    <span>{roleList}</span>
                                    <DeleteButton onDelete={() => handleDelete(user.id)}/>
                                </div>
                            );
                        })}

                    </div>
                )}

                <BackButton />

            </div>
        </section>
    );
};

export default ManageUsers;