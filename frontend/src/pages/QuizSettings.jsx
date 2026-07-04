import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api";

import Card from "../components/Card";
import Layout from "../components/Layout";


function QuizSettings() {
    const navigate = useNavigate();

    const [domains, setDomains] = useState([
        "General Security Concepts",
        "Threats, Vulnerabilities, and Mitigations",
        "Security Architecture",
    ]);

    const [limit, setLimit] = useState(5);
    const [mode, setMode] = useState("practice");
    const [error, setError] = useState("");

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
        if (domains.length === 0) {
            setError("Please select at least one domain.");
            return;
        }

        setError("");

        try {
            const response = await API.post("/quiz/create", {
                domains,
                limit,
                mode,
            });

            navigate("/quiz", {
                state: {
                    questions: response.data,
                    mode,
                },
            });
        } catch (error) {
            console.error(error);
            setError("Failed to create quiz.");
        }
    };


    return (
        <Layout>
            <Card>

                <h1>Configure Quiz</h1>


                <div className="quiz-settings-options">
                    {[
                        "General Security Concepts",
                        "Threats, Vulnerabilities, and Mitigations",
                        "Security Architecture",
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
                </div>



                <h3>Number of Questions</h3>

                {[5, 10, 25, 50].map((num) => (
                    <button
                        key={num}
                        className={limit === num ? "active-option" : ""}
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

                {error && <p className="settings-error">{error}</p>}

                <button onClick={startQuiz}>
                    Start Quiz
                </button>

            </Card>
        </Layout>
    );
}


export default QuizSettings;