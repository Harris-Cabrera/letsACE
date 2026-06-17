import { useLocation, useNavigate } from "react-router-dom";

function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  const result = location.state;

  if (!result) {
    return (
      <div>
        <h1>No Results Found</h1>
        <button onClick={() => navigate("/quiz")}>
          Start Quiz
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Quiz Complete</h1>

      <h2>Score: {result.percentage.toFixed(2)}%</h2>

      <p>
        {result.score} / {result.total} correct
      </p>

      <button onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>

      <button onClick={() => navigate("/quiz")}>
        Retake Quiz
      </button>
    </div>
  );
}

export default Results;