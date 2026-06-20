import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api";

import Card from "../components/Card";
import DomainPerformance from "../components/DomainPerformance";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";

function Dashboard() {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [domains, setDomains] = useState([]);
  const [stats, setStats] = useState({
    total_attempts: 0,
    questions_answered: 0,
    correct_answers: 0,
    accuracy: 0,
    best_score: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchDashboard = async () => {
      try {
        const [historyResponse, statsResponse, domainResponse] =
          await Promise.all([
            API.get("/history/"),
            API.get("/dashboard/stats"),
            API.get("/dashboard/domain-performance"),
          ]);

        setHistory(historyResponse.data);
        setStats(statsResponse.data);
        setDomains(domainResponse.data);

      } catch (error) {
        console.error("Failed to load dashboard:", error);
      }
    };

    fetchDashboard();
  }, [navigate]);

  return (
    <Layout>
      <Card className="dashboard-card">
        <h1>letsACE Dashboard</h1>
        <p>Welcome back.</p>

        <div className="button-row" style={{ marginTop: "24px" }}>
          <button onClick={() => navigate("/quiz")}>Start Quiz</button>
        </div>
      </Card>

      <div className="stats-grid">
        <StatCard title="Total Quizzes" value={stats.total_attempts} />
        <StatCard title="Accuracy" value={`${stats.accuracy.toFixed(1)}%`} />
        <StatCard title="Best Score" value={`${stats.best_score}%`} />
        <StatCard title="Questions Answered" value={stats.questions_answered} />
      </div>

      <Card className="dashboard-card">
        <h2>Recent Attempts</h2>
        <Card className="dashboard-card">
          <h2>Domain Performance</h2>

          <DomainPerformance domains={domains} />
        </Card>
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