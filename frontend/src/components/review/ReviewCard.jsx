function ReviewCard({ answer, index }) {
    return (
        <div className="review-card">

            <div className="review-header">

                <span className="question-number">
                    Question {index + 1}
                </span>

                <span className="domain-badge">
                    {answer.domain}
                </span>

            </div>

            <h2>{answer.question_text}</h2>

        </div>
    );
}

export default ReviewCard;