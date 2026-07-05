import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api";
import Card from "../components/Card";
import Layout from "../components/Layout";
import QuestionList from "../components/admin/QuestionList";


function AdminQuestions() {
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);

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

            <QuestionList questions={questions} />
        </Layout>
    );
}


export default AdminQuestions;