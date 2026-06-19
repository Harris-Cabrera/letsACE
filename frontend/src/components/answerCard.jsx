import "../styles/answerCard.css";

function AnswerCard({ label, text, selected, onClick }) {
  return (
    <div
      className={`answer-card ${selected ? "answer-selected" : ""}`}
      onClick={onClick}
    >
      <span className="answer-label">
        {selected ? "✔" : "○"} {label}.
      </span>

      <span className="answer-text">{text}</span>
    </div>
  );
}

export default AnswerCard;