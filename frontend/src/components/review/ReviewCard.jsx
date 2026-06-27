import "../../styles/review.css";
import Card from "../Card";

function ReviewCard({ answer, index }) {
    const options = [
        { letter: "A", text: answer.option_a },
        { letter: "B", text: answer.option_b },
        { letter: "C", text: answer.option_c },
        { letter: "D", text: answer.option_d },
    ];

    return (
        <Card className="review-card">

            <div className="review-header">

                <span className="question-number">
                    Question {index + 1}
                </span>

                <span className="domain-badge">
                    {answer.domain}
                </span>

            </div>

            <h2 className="review-question">
                {answer.question_text}
            </h2>

            <div className="review-options">

                {options.map((option) => {

                    let className = "review-option";

                    if (option.letter === answer.correct_answer) {
                        className += " correct";
                    }

                    if (
                        option.letter === answer.selected_answer &&
                        option.letter !== answer.correct_answer
                    ) {
                        className += " incorrect";
                    }

                    return (
                        <div
                            key={option.letter}
                            className={className}
                        >
                            <strong>{option.letter}.</strong> {option.text}
                        </div>
                    );
                })}

            </div>

            <div className="review-footer">

                {answer.is_correct ? (
                    <span className="review-result correct">
                        ✅ Correct
                    </span>
                ) : (
                    <span className="review-result incorrect">
                        ❌ Incorrect
                    </span>
                )}

                <p className="review-explanation">
                    <strong>Explanation:</strong>{" "}
                    {answer.explanation}
                </p>

            </div>

        </Card>
    );
}

export default ReviewCard;