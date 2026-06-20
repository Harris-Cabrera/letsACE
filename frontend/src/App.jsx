import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/card.css";
import "./styles/dashboard.css";
import "./styles/globals.css";
import "./styles/layout.css";
import "./styles/navbar.css";
import "./styles/progress.css";
import "./styles/quiz.css";
import "./styles/statCard.css";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Register from "./pages/Register";
import Results from "./pages/Results";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;