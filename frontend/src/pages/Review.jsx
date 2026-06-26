import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import API from "../api";
import Card from "../components/Card";
import Layout from "../components/Layout";

function Review() {
    const { attemptId } = useParams();
    const navigate = useNavigate();

    const [review, setReview] = useState(null);

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/login");
                    return;
                }

                const response = await API.get(`/history/${attemptId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setReview(response.data);
            } catch (err) {
                console.error(err);
                navigate("/dashboard");
            }
        };

        fetchReview();
    }, [attemptId, navigate]);

    if (!review) {
        return (
            <Layout>
                <Card>
                    <p>Loading...</p>
                </Card>
            </Layout>
        );
    }

    return (
        <Layout>
            <Card>
                <h1>Quiz Review</h1>

                <p>
                    <strong>Score:</strong> {review.score}/{review.total}
                </p>

                <p>
                    <strong>Percentage:</strong> {review.percentage}%
                </p>

                <hr />

                {review.answers.map((answer) => (
                    <div key={answer.question_id}>
                        <h3>{answer.question_text}</h3>

                        <p>
                            <strong>Domain:</strong> {answer.domain}
                        </p>

                        <p>
                            <strong>Your Answer:</strong>{" "}
                            {answer.selected_answer}
                        </p>

                        <p>
                            <strong>Correct Answer:</strong>{" "}
                            {answer.correct_answer}
                        </p>

                        <p>
                            <strong>Explanation:</strong>{" "}
                            {answer.explanation}
                        </p>

                        <hr />
                    </div>
                ))}
            </Card>
        </Layout>
    );
}

export default Review;