import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

import Card from "../components/Card";
import Layout from "../components/Layout";

import "../styles/auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post(
        "/auth/login",
        new URLSearchParams({
          username: email,
          password: password,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      localStorage.setItem("token", response.data.access_token);
      alert("Login Successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Login Failed");
    }
  };

  return (
    <Layout>
      <Card>
        <div className="auth-container">

          <h1>letsACE</h1>

          <p className="auth-subtitle">
            Sign in to continue studying
          </p>


          <form onSubmit={handleLogin}>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">
              Login
            </button>
            <div className="auth-footer">

              <p>Don't have an account?</p>

              <button
                type="button"
                className="secondary-button"
                onClick={() => navigate("/register")}
              >
                Create Account
              </button>

            </div>
          </form>

        </div>
      </Card>
    </Layout>
  );
}

export default Login;