function RecentAttempts({ history }) {
    return (
        <>
            <h2>Recent Attempts</h2>
            {
                history.length === 0 ? (
                    <p>No quiz attempts yet.</p>
                ) : (
                    <div className="attempt-list">
                        {history.slice(0, 5).map((attempt) => {
                            const percentage = Math.round(
                                (attempt.score / attempt.total_questions) * 100
                            );

                            return (
                                <div className="attempt-item" key={attempt.id}>
                                    <span>{percentage}%</span>
                                    <span>
                                        {attempt.score} / {attempt.total_questions}
                                    </span>
                                    <span>
                                        {new Date(attempt.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                )
            }
        </>
    )
}

export default RecentAttempts;