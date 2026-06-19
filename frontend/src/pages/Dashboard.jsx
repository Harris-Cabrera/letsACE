import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Layout from "../components/Layout";


function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
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
    </Layout>
  );
}

export default Dashboard;