import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import Card from "../components/Card";
import Layout from "../components/Layout";

function Dashboard() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchHistory = async () => {
      try {
        const response = await API.get("/history/");
        setHistory(response.data);
      } catch (error) {
        console.error("Failed to load quiz history:", error);
      }
    };

    fetchHistory();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Layout>
      <Card className="dashboard-card">
        <h1>letsACE Dashboard</h1>
        <p>Welcome back.</p>

        <div className="button-row" style={{ marginTop: "24px" }}>
          <button onClick={() => navigate("/quiz")}>Start Quiz</button>
        </div>
      </Card>

      <Card className="dashboard-card">
        <h2>Recent Attempts</h2>

        {history.length === 0 ? (
          <p>No quiz attempts yet.</p>
        ) : (
          <div className="attempt-list">
            {history.slice(0, 5).map((attempt) => {
              const percentage = Math.round(
                (attempt.score / attempt.total_questions) * 100
              );

              return (
                <div className="attempt-item" key={attempt.id}>
                  <span>{percentage}%</span>
                  <span>
                    {attempt.score} / {attempt.total_questions}
                  </span>
                  <span>
                    {new Date(attempt.created_at).toLocaleDateString()}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </Layout>
  );
}

export default Dashboard;