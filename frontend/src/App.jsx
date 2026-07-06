import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "./styles/card.css";
import "./styles/dashboard.css";
import "./styles/globals.css";
import "./styles/layout.css";
import "./styles/navbar.css";
import "./styles/progress.css";
import "./styles/quiz.css";
import "./styles/statCard.css";


import AdminQuestions from "./pages/AdminQuestions";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import QuizSettings from "./pages/QuizSettings";
import Register from "./pages/Register";
import Results from "./pages/Results";
import Review from "./pages/Review";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/quiz/settings" element={<QuizSettings />} />
        <Route path="/quiz" element={<Quiz />} />

        <Route path="/results" element={<Results />} />
        <Route path="/review/:attemptId" element={<Review />} />

        <Route path="/admin/questions" element={<AdminQuestions />}

        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;