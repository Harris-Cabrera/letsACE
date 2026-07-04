import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

function DashboardHeader({ stats, history }) {
    const navigate = useNavigate();

    const randomGreeting = useMemo(() => {
        const messages = [
            "Ready to ace another quiz?",
            "Keep up the great work!",
        ];

        return messages[Math.floor(Math.random() * messages.length)];
    }, []);

    const greeting =
        history.length === 0
            ? "👋 Welcome! Ready to take your first quiz?"
            : randomGreeting;

    return (
        <div className="dashboard-header-content">
            <div>
                <h1>letsACE Dashboard</h1>

                <p>{greeting}</p>

                <p>
                    Progress: {stats.accuracy.toFixed(2)}% Accuracy
                </p>
            </div>

            <button
                className="start-quiz-button"
                onClick={() => navigate("/quiz/settings")}
            >
                🚀 Start Quiz
            </button>
        </div>
    );
}

export default DashboardHeader;