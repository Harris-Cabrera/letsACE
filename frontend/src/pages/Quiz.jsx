import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Layout from "../components/Layout";
import ProgressBar from "../components/ProgressBard";

function Quiz() {
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
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
    }, [navigate]);

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

            const response = await axios.post(
                "http://127.0.0.1:8000/quiz/submit",
                {
                    answers: finalAnswers,
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

                <p>
                    Question {currentIndex + 1} of {questions.length}
                    <ProgressBar
                        current={currentIndex + 1}
                        total={questions.length}
                    />
                </p>

                <p>Domain: {question.domain}</p>

                <h2>{question.question_text}</h2>

                <div className="button-row">
                    <button onClick={() => setSelectedAnswer("A")}>
                        A. {question.option_a}
                    </button>

                    <button onClick={() => setSelectedAnswer("B")}>
                        B. {question.option_b}
                    </button>

                    <button onClick={() => setSelectedAnswer("C")}>
                        C. {question.option_c}
                    </button>

                    <button onClick={() => setSelectedAnswer("D")}>
                        D. {question.option_d}
                    </button>
                </div>

                <p>Selected: {selectedAnswer || "None"}</p>

                <button onClick={handleNext} disabled={!selectedAnswer}>
                    {currentIndex + 1 === questions.length ? "Submit Quiz" : "Next"}
                </button>
            </Card>
        </Layout>
    );
}

export default Quiz;