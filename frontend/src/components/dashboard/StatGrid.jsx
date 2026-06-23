import StatCard from "./StatCard";

function StatGrid({ stats }) {
    return (
        <div className="stats-grid">
            <StatCard title="Total Quizzes" value={stats.total_attempts} />
            <StatCard title="Accuracy" value={`${stats.accuracy.toFixed(2)}%`} />
            <StatCard title="Best Score" value={`${stats.best_score}%`} />
            <StatCard title="Questions Answered" value={stats.questions_answered} />
        </div>
    );
}

export default StatGrid;