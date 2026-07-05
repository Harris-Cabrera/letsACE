import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api";
import Card from "../components/Card";
import Layout from "../components/Layout";
import QuestionForm from "../components/admin/QuestionForm";
import QuestionList from "../components/admin/QuestionList";

function AdminQuestions() {
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [editingQuestion, setEditingQuestion] = useState(null);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const createQuestion = async (question) => {
        try {
            const response = await API.post(
                "/questions/",
                question
            );

            setQuestions([
                ...questions,
                response.data
            ]);

            setMessage("Question created successfully.");
            setError("");

        } catch (err) {
            console.error(err);

            setError("Failed to create question.");
            setMessage("");
        }
    };

    const deleteQuestion = async (id) => {
        const confirmed = window.confirm(
            "Delete this question?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await API.delete(`/questions/${id}`);

            setQuestions(
                questions.filter(
                    question => question.id !== id
                )
            );

        } catch (err) {
            console.error(err);
        }
    };

    const updateQuestion = async (question) => {
        try {
            const response = await API.put(
                `/questions/${editingQuestion.id}`,
                question
            );

            setQuestions(
                questions.map(q =>
                    q.id === editingQuestion.id
                        ? response.data
                        : q
                )
            );

            setEditingQuestion(null);

        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        const verifyAdmin = async () => {
            try {
                const userResponse = await API.get("/auth/me");

                if (!userResponse.data.is_admin) {
                    navigate("/dashboard");
                    return;
                }

                const questionsResponse = await API.get("/questions/");
                setQuestions(questionsResponse.data);

            } catch (err) {
                console.error(err);
                navigate("/login");
            }
        };

        verifyAdmin();
    }, [navigate]);


    return (
        <Layout>
            <Card>
                <h1>Admin Questions</h1>
                <p>Manage certification questions.</p>
                {message && (
                    <p className="success-message">
                        {message}
                    </p>
                )}

                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}
            </Card>

            <Card>
                <h2>Add Question</h2>
                <QuestionForm
                    onCreate={
                        editingQuestion
                            ? updateQuestion
                            : createQuestion
                    }
                    editingQuestion={editingQuestion}
                />            </Card>

            <QuestionList
                questions={questions}
                onDelete={deleteQuestion}
                onEdit={setEditingQuestion}
            />

        </Layout>
    );
}


export default AdminQuestions;