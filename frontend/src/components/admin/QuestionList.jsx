import Card from "../Card";

function QuestionList({ questions }) {
    return (
        <div>
            {questions.map((question) => (
                <Card key={question.id}>
                    <h3>{question.question_text}</h3>

                    <p>
                        <strong>Domain:</strong> {question.domain}
                    </p>

                    <p>A. {question.option_a}</p>
                    <p>B. {question.option_b}</p>
                    <p>C. {question.option_c}</p>
                    <p>D. {question.option_d}</p>
                </Card>
            ))}
        </div>
    );
}

export default QuestionList;