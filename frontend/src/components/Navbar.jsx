import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../api";

import "../styles/navbar.css";

function Navbar() {
    const navigate = useNavigate();

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    return;
                }

                const response = await API.get("/auth/me");

                setIsAdmin(response.data.is_admin);

            } catch (err) {
                console.error(err);
                setIsAdmin(false);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/dashboard">letsACE</Link>
            </div>

            <div className="navbar-links">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/quiz/settings">Practice</Link>

                {isAdmin && (
                    <Link to="/admin/questions">
                        Admin
                    </Link>
                )}

                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;