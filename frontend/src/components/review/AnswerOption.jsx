import Card from "../Card";

function AnswerOption({ answer }) {
    return (
        <Card className="answer-review-card">
            <h3>{answer.question_text}</h3>

            <p>
                <strong>Domain:</strong> {answer.domain}
            </p>

            <p>
                <strong>Your Answer:</strong> {answer.selected_answer}
            </p>

            <p>
                <strong>Correct Answer:</strong> {answer.correct_answer}
            </p>

            <p>
                <strong>Explanations:</strong> {answer.explanation}
            </p>
        </Card>
    );
}

export default AnswerOption;