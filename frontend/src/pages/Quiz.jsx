import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import API from "../api";
import AnswerCard from "../components/AnswerCard";
import Card from "../components/Card";
import Layout from "../components/Layout";
import FeedbackBox from "../components/quiz/FeedbackBox";
import QuizHeader from "../components/quiz/QuizHeader";

function Quiz() {
    const navigate = useNavigate();
    const location = useLocation();

    const mode = location.state?.mode;

    const [questions, setQuestions] = useState(location.state?.questions || []);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [showFeedback, setShowFeedback] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        if (!location.state?.questions) {
            navigate("/quiz/settings");
            return;
        }

        setQuestions(location.state.questions);
        setLoading(false);
    }, [navigate, location.state]);

    const handleNext = () => {
        if (!selectedAnswer) return;

        if (mode === "practice" && !showFeedback) {
            setShowFeedback(true);
            return;
        }

        const currentQuestion = questions[currentIndex];

        const updatedAnswers = [
            ...answers,
            {
                question_id: currentQuestion.id,
                selected_answer: selectedAnswer,
            },
        ];

        setAnswers(updatedAnswers);
        setSelectedAnswer("");
        setShowFeedback(false);

        if (currentIndex + 1 < questions.length) {
            setCurrentIndex(currentIndex + 1);
        } else {
            submitQuiz(updatedAnswers);
        }
    };

    const submitQuiz = async (finalAnswers) => {
        try {
            const response = await API.post("/quiz/submit", {
                answers: finalAnswers,
                mode: mode || "practice",
            });

            navigate("/results", { state: response.data });

        } catch (error) {
            console.error("Failed to submit quiz:", error);
            console.error("Status:", error.response?.status);
            console.error("Data:", error.response?.data);
            alert("Quiz submission failed.");
        }
    };

    if (loading) return <h2>Loading quiz...</h2>;

    if (questions.length === 0) return <h2>No questions available.</h2>;

    const question = questions[currentIndex];

    return (
        <Layout>
            <Card className="quiz-card">
                <QuizHeader
                    mode={mode}
                    question={question}
                    currentIndex={currentIndex}
                    totalQuestions={questions.length}
                />

                <h2 className="question-title">
                    {question.question_text}
                </h2>


                <div className="answer-list">
                    <AnswerCard
                        label="A"
                        text={question.option_a}
                        selected={selectedAnswer === "A"}
                        onClick={() => setSelectedAnswer("A")}
                    />

                    <AnswerCard
                        label="B"
                        text={question.option_b}
                        selected={selectedAnswer === "B"}
                        onClick={() => setSelectedAnswer("B")}
                    />

                    <AnswerCard
                        label="C"
                        text={question.option_c}
                        selected={selectedAnswer === "C"}
                        onClick={() => setSelectedAnswer("C")}
                    />

                    <AnswerCard
                        label="D"
                        text={question.option_d}
                        selected={selectedAnswer === "D"}
                        onClick={() => setSelectedAnswer("D")}
                    />
                </div>
                <div className="quiz-actions">
                    <button onClick={handleNext} disabled={!selectedAnswer}>
                        {mode === "practice" && !showFeedback
                            ? "Check Answer"
                            : currentIndex + 1 === questions.length
                                ? "Submit Quiz"
                                : "Next →"}
                    </button>
                    {showFeedback && (
                        <FeedbackBox
                            selectedAnswer={selectedAnswer}
                            question={question}
                        />
                    )}
                </div>
            </Card>
        </Layout>
    );
}

export default Quiz;