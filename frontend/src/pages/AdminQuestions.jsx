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

        } catch (err) {
            console.error(err);
        }
    };

    const deleteQuestion = async (id) => {
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
            </Card>

            <Card>
                <h2>Add Question</h2>
                <QuestionForm onCreate={createQuestion} />
            </Card>

            <QuestionList
                questions={questions}
                onDelete={deleteQuestion}
            />        </Layout>
    );
}


export default AdminQuestions;