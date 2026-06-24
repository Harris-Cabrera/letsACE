import { useNavigate } from "react-router-dom";

function DashboardHeader({ stats }) {
    const navigate = useNavigate();

    return (
        <div className="dashboard-header-content">
            <div>
                <h1>
                    letsACE Dashboard
                </h1>
                <p>
                    Progress: {stats.accuracy.toFixed(2)}%
                </p>
            </div>

            <button className="start-quiz-button"
                onClick={() => navigate("/quiz")}>
                Start Quiz
            </button>
        </div>
    );
}

export default DashboardHeader;
