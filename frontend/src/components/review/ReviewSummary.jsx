import Card from "../Card";

function ReviewSummary({ review }) {
    return (
        <Card className="dashboard-card">
            <h1>Quiz Review</h1>

            <p>
                <strong>Score:</strong> {review.score}/{review.total}
            </p>

            <p>
                <strong>Accuracy:</strong> {review.percentage.toFixed(1)}%
            </p>
        </Card>
    );
}

export default ReviewSummary;