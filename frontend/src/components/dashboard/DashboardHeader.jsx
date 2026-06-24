import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

function DashboardHeader({ stats }) {
  const navigate = useNavigate();

  const greeting = useMemo(() => {
    const messages = [
      "Ready to ace another quiz?",
      "Keep up the great work!",
    ];

    return messages[Math.floor(Math.random() * messages.length)];
  }, []);

  return (
    <div className="dashboard-header-content">
      <div>
        <h1>letsACE Dashboard</h1>
        <p>{greeting}</p>
        <p>Progress: {stats.accuracy.toFixed(1)}% Accuracy</p>
      </div>

      <button
        className="start-quiz-button"
        onClick={() => navigate("/quiz")}
      >
        🚀 Start Quiz
      </button>
    </div>
  );
}

export default DashboardHeader;