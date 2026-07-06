import ProgressBar from "../ProgressBar";

function QuizHeader({
    mode,
    question,
    currentIndex,
    totalQuestions,
}) {
    return (
        <>
            <h1>Quiz</h1>

            <div className="mode-badge">
                {mode === "exam"
                    ? "Exam Simulation"
                    : "Practice Mode"}
            </div>

            <div className="domain-badge">
                {question.domain}
            </div>

            <div>
                Question {currentIndex + 1} of {totalQuestions}

                <ProgressBar
                    current={currentIndex + 1}
                    total={totalQuestions}
                />

                <p className="progress-text">
                    {Math.round(
                        ((currentIndex + 1) / totalQuestions) * 100
                    )}
                    % Complete
                </p>
            </div>
        </>
    );
}

export default QuizHeader;