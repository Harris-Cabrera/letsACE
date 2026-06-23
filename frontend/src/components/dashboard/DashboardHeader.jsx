import { useNavigate } from "react-router-dom";

function DashboardHeader() {
    const navigate = useNavigate();

    return (
        <>
            <h1>letsACE Dashboard</h1>
            <p>Welcome back.</p>
            <div className="button-row" style={{ marginTop: "24px" }}>
                <button onClick={() => navigate("/quiz")}>
                    Start Quiz
                </button>
            </div>
        </>
    );
}

export default DashboardHeader;
