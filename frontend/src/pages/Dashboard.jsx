import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api";

import Card from "../components/Card";
import Layout from "../components/Layout";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DomainPerformance from "../components/dashboard/DomainPerformance";
import RecentAttempts from "../components/dashboard/RecentAttempts";
import StatGrid from "../components/dashboard/StatGrid";

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
        <DashboardHeader stats = {stats} history={history}/>
      </Card>
      <Card className="dashboard-card">
        <StatGrid stats={stats} />
      </Card>
      <div className="dashboard-columns">
        <Card className="dashboard-card">
          <RecentAttempts history={history} />
        </Card>
        <Card className="dashboard-card">
          <DomainPerformance domains={domains} />
        </Card>
      </div>

    </Layout>
  );
}

export default Dashboard;