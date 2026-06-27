import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import API from "../api";
import Card from "../components/Card";
import Layout from "../components/Layout";
import AnswerOption from "../components/review/AnswerOption";
import ReviewSummary from "../components/review/reviewSummary";

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

            <ReviewSummary review={review} />

            {review.answers.map((answer) => (
                <AnswerOption
                    key={answer.question_id}
                    answer={answer}
                />
            ))}

        </Layout>
    );
}

export default Review;