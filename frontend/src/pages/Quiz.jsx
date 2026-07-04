import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AnswerCard from "../components/AnswerCard";
import Card from "../components/Card";
import Layout from "../components/Layout";
import ProgressBar from "../components/ProgressBard";

function Quiz() {
    const navigate = useNavigate();
    const location = useLocation();

    const mode = location.state?.mode;

    const [questions, setQuestions] = useState(location.state?.questions || []);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        if (location.state?.questions) {
            setQuestions(location.state.questions);
            setLoading(false);
            return;
        }

        const fetchQuestions = async () => {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:8000/questions/random?limit=5"
                );

                setQuestions(response.data);
            } catch (error) {
                console.error("Failed to fetch questions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [navigate, location.state]);

    const handleNext = () => {
        if (!selectedAnswer) return;

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

        if (currentIndex + 1 < questions.length) {
            setCurrentIndex(currentIndex + 1);
        } else {
            submitQuiz(updatedAnswers);
        }
    };

    const submitQuiz = async (finalAnswers) => {
        try {
            const token = localStorage.getItem("token");

            console.log("Submitting answers:", finalAnswers);

            const response = await axios.post(
                "http://127.0.0.1:8000/quiz/submit",
                {
                    answers: finalAnswers,
                    mode: mode || "practice",
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

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
                <h1>Quiz</h1>
                <div className="domain-badge">
                    {question.domain}
                </div>
                <div>
                    Question {currentIndex + 1} of {questions.length}
                    <ProgressBar
                        current={currentIndex + 1}
                        total={questions.length}
                    />
                    <p className="progress-text">
                        {Math.round(((currentIndex + 1) / questions.length) * 100)}% Complete
                    </p>
                </div>

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
                        {currentIndex + 1 === questions.length ? "Submit Quiz" : "Next →"}
                    </button>
                </div>
            </Card>
        </Layout>
    );
}

export default Quiz;