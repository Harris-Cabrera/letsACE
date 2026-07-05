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
        try {
            await API.delete(`/questions/${id}`);

            setQuestions(
                questions.filter((q) => q.id !== id)
            );

            setMessage("Question deleted successfully.");
            setError("");

        } catch (err) {
            console.error(err);

            setError("Failed to delete question.");
            setMessage("");
        }
    };

    const updateQuestion = async (id, question) => {
        try {
            const response = await API.put(
                `/questions/${id}`,
                question
            );

            setQuestions(
                questions.map((q) =>
                    q.id === id ? response.data : q
                )
            );

            setMessage("Question updated successfully.");
            setError("");
            setEditingQuestion(null);

        } catch (err) {
            console.error(err);

            setError("Failed to update question.");
            setMessage("");
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
                    onCreate={createQuestion}
                    onUpdate={updateQuestion}
                    editingQuestion={editingQuestion}
                    onCancelEdit={() => setEditingQuestion(null)}
                />
            </Card>

            <QuestionList
                questions={questions}
                onDelete={deleteQuestion}
                onEdit={setEditingQuestion}
            />

        </Layout>
    );
}


export default AdminQuestions;