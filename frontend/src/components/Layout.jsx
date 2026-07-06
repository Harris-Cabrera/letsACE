import { useLocation } from "react-router-dom";
import "../styles/layout.css";
import Navbar from "./Navbar";


function Layout({ children }) {
    const location = useLocation();

    const hideNavbar =
        location.pathname === "/login" ||
        location.pathname === "/register";

    return (
        <div className="app-layout">
            {!hideNavbar && <Navbar />}

            <main className={hideNavbar ? "app-content auth-layout" : "app-content"}>
                {children}
            </main>
        </div>
    );
}

export default Layout;