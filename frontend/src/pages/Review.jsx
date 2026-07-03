import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import API from "../api";
import Card from "../components/Card";
import Layout from "../components/Layout";
import ReviewCard from "../components/review/ReviewCard";
import ReviewSummary from "../components/review/ReviewSummary";


import "../styles/review.css";

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

                const response = await API.get(`/history/${attemptId}`);
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
                    <p>Loading review...</p>
                </Card>
            </Layout>
        );
    }

    return (
        <Layout>
            <ReviewSummary review={review} />

            {review.answers.map((answer, index) => (
                <ReviewCard
                    key={answer.question_id}
                    answer={answer}
                    index={index}
                />
            ))}
        </Layout>
    );
}

export default Review;