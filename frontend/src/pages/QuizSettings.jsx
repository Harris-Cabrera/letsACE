import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api";

import Card from "../components/Card";
import Layout from "../components/Layout";

function QuizSettings() {
    const navigate = useNavigate();

    const [domains, setDomains] = useState([
        "General Security Concepts",
        "Threats & Vulnerabilities",
        "Architecture",
        "Operations",
        "Governance",
    ]);

    const [limit, setLimit] = useState(5);
    const [mode, setMode] = useState("practice");


    const toggleDomain = (domain) => {
        if (domains.includes(domain)) {
            setDomains(
                domains.filter((item) => item !== domain)
            );
        } else {
            setDomains([...domains, domain]);
        }
    };


    const startQuiz = async () => {
        try {
            const response = await API.post(
                "/quiz/create",
                {
                    domains,
                    limit,
                    mode,
                }
            );


            navigate("/quiz", {
                state: {
                    questions: response.data,
                    mode,
                },
            });


        } catch (error) {
            console.error(error);
        }
    };


    return (
        <Layout>
            <Card>

                <h1>Configure Quiz</h1>


                <h3>Domains</h3>

                {[
                    "General Security Concepts",
                    "Threats & Vulnerabilities",
                    "Architecture",
                    "Operations",
                    "Governance",
                ].map((domain) => (
                    <label key={domain}>
                        <input
                            type="checkbox"
                            checked={domains.includes(domain)}
                            onChange={() => toggleDomain(domain)}
                        />

                        {domain}
                    </label>
                ))}



                <h3>Number of Questions</h3>

                {[5, 10, 25, 50].map((num) => (
                    <button
                        key={num}
                        onClick={() => setLimit(num)}
                    >
                        {num}
                    </button>
                ))}


                <h3>Mode</h3>

                <label>
                    <input
                        type="radio"
                        checked={mode === "practice"}
                        onChange={() => setMode("practice")}
                    />
                    Practice
                </label>


                <label>
                    <input
                        type="radio"
                        checked={mode === "exam"}
                        onChange={() => setMode("exam")}
                    />
                    Exam Simulation
                </label>


                <br /><br />


                <button onClick={startQuiz}>
                    Start Quiz
                </button>

            </Card>
        </Layout>
    );
}


export default QuizSettings;