function formatAttemptDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();

    const todayOnly = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );

    const dateOnly = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    );

    const diffInDays = Math.floor(
        (todayOnly - dateOnly) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });
}

function RecentAttempts({ history }) {
    return (
        <>
            <h2>Recent Attempts</h2>

            {history.length === 0 ? (
                <p>No quiz attempts yet.</p>
            ) : (
                <div className="attempt-table">
                    <div className="attempt-row attempt-header">
                        <span>Score</span>
                        <span>Correct</span>
                        <span>Date</span>
                    </div>

                    {history.slice(0, 5).map((attempt) => {
                        const percentage = Math.round(
                            (attempt.score / attempt.total_questions) * 100
                        );

                        return (
                            <div className="attempt-row" key={attempt.id}>
                                <span>{percentage}%</span>
                                <span>
                                    {attempt.score} / {attempt.total_questions}
                                </span>
                                <span>
                                    {formatAttemptDate(attempt.created_at)}
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
}

export default RecentAttempts;