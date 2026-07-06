import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";


import Card from "../components/Card";
import Layout from "../components/Layout";

import "../styles/auth.css";
function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await API.post("/auth/register", {
                email,
                password,
            });


            navigate("/login");


        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Layout>
            <Card className="auth-card">

                <div className="auth-container">

                    <h1>letsACE</h1>

                    <p className="auth-subtitle">
                        Create your account
                    </p>


                    <form onSubmit={handleRegister}>

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />


                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />


                        <button type="submit">
                            Register
                        </button>


                        <div className="auth-footer">

                            <p>Already have an account?</p>

                            <button
                                type="button"
                                className="secondary-button"
                                onClick={() => navigate("/login")}
                            >
                                Sign In
                            </button>

                        </div>

                    </form>

                </div>

            </Card>
        </Layout>
    );
}

export default Register;