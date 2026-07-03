import { useLocation, useNavigate } from "react-router-dom";

import Card from "../components/Card";
import Layout from "../components/Layout";

function Results() {
    const location = useLocation();
    const navigate = useNavigate();

    const result = location.state;

    if (!result) {
        return (
            <Layout>
                <Card>
                    <h1>No Results Found</h1>

                    <button onClick={() => navigate("/quiz")}>
                        Start Quiz
                    </button>
                </Card>
            </Layout>
        );
    }

    return (
        <Layout>
            <Card className="results-card">

                <h1>🎉 Quiz Complete</h1>

                <h2>
                    Score: {result.percentage.toFixed(2)}%
                </h2>

                <p>
                    {result.score} / {result.total} Correct
                </p>


                <div className="button-row">

                    <button
                        onClick={() =>
                            navigate(`/review/${result.attempt_id}`)
                        }
                    >
                        Review →
                    </button>


                    <button
                        onClick={() => navigate("/dashboard")}
                    >
                        Back to Dashboard
                    </button>


                    <button
                        onClick={() => navigate("/quiz")}
                    >
                        Retake Quiz
                    </button>

                </div>

            </Card>
        </Layout>
    );
}

export default Results;