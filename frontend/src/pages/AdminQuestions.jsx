import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api";
import Card from "../components/Card";
import Layout from "../components/Layout";
import QuestionForm from "../components/admin/QuestionForm";
import QuestionImport from "../components/admin/QuestionImport";
import QuestionList from "../components/admin/QuestionList";

function AdminQuestions() {
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [search, setSearch] = useState("");
    const [editingQuestion, setEditingQuestion] = useState(null);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(true);



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
            "Are you sure you want to delete this question?"
        );

        if (!confirmed) {
            return;
        }

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

    const refreshQuestions = async () => {
        const response = await API.get("/questions/");
        setQuestions(response.data);
    };

    const filteredQuestions = questions.filter((question) =>
        question.question_text
            .toLowerCase()
            .includes(search.toLowerCase()) ||

        question.domain
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    useEffect(() => {
        const verifyAdmin = async () => {
            try {
                const userResponse = await API.get("/auth/me");

                if (!userResponse.data.is_admin) {
                    navigate("/dashboard");
                    return;
                }

                await refreshQuestions();

            } catch (err) {
                console.error(err);
                navigate("/login");
            } finally {
                setLoading(false);
            }

        };

        verifyAdmin();
    }, [navigate]);

    if (loading) {
        return (
            <Layout>
                <Card>
                    <p>Loading questions...</p>
                </Card>
            </Layout>
        );
    }
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
                <input
                    className="admin-search"
                    placeholder="Search questions..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Card>

            <Card>
                <QuestionImport onImport={refreshQuestions} />
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

            {filteredQuestions.length === 0 ? (
                <Card>
                    <p>No questions found.</p>
                </Card>
            ) : (
                <QuestionList
                    questions={filteredQuestions}
                    onDelete={deleteQuestion}
                    onEdit={setEditingQuestion}
                />
            )}

        </Layout>
    );
}


export default AdminQuestions;