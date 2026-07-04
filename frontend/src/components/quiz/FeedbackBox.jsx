function FeedbackBox({
    selectedAnswer,
    question,
}) {
    return (
        <div className="feedback-box">
            <h3>
                {selectedAnswer === question.correct_answer
                    ? "✅ Correct!"
                    : "❌ Incorrect"}
            </h3>

            <p>
                Correct Answer: {question.correct_answer}
            </p>

            <p>
                {question.explanation}
            </p>
        </div>
    );
}

export default FeedbackBox;