import { useNavigate } from "react-router-dom";
import "../../styles/emptyState.css";

function RecentAttempts({ history }) {
    const navigate = useNavigate();

    return (
        <>
            <h2>Recent Attempts</h2>

            {history.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">🎉</div>
                    <p>Complete your first quiz to start tracking your progress.</p>
                    <button onClick={() => navigate("/quiz")}>Start Quiz</button>
                </div>
            ) : (
                <div className="attempt-table">
                    <div className="attempt-row attempt-header">
                        <span>Score</span>
                        <span>Correct</span>
                        <span>Date</span>
                        <span>Review</span>
                    </div>

                    {history.slice(0, 5).map((attempt) => {
                        const percentage = Math.round(
                            (attempt.score / attempt.total_questions) * 100
                        );

                        return (
                            <div className="attempt-row" key={attempt.id}>
                                <span>{percentage}%</span>
                                <span>
                                    {attempt.score}/{attempt.total_questions}
                                </span>
                                <span>
                                    {new Date(attempt.created_at).toLocaleDateString()}
                                </span>
                                <button
                                    onClick={() => navigate(`/review/${attempt.id}`)}
                                >
                                    Review →
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
}

export default RecentAttempts;