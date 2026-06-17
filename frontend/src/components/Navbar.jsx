import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
    const navigate = useNavigate();

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
                <Link to="/quiz">Practice</Link>

                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;