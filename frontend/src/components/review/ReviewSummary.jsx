import Card from "../Card";


function ReviewSummary({ review }) {
    return (
        <Card className="dashboard-card">
            <h1>Quiz Review</h1>

            <div className="review-summary-grid">
                <div>
                    <span className="summary-label">Score</span>
                    <h2>{review.score}/{review.total}</h2>
                </div>

                <div>
                    <span className="summary-label">Accuracy</span>
                    <h2>{review.percentage.toFixed(1)}%</h2>
                </div>
            </div>
        </Card>
    );
}

export default ReviewSummary;