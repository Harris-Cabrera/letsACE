import StatCard from "./StatCard";

function StatGrid({ stats }) {
    return (
        <div className="stats-grid">
            <StatCard
                icon="📊"
                title="Total Quizzes"
                value={stats.total_attempts} />
            <StatCard
                icon="🎯"
                title="Accuracy"
                value={`${stats.accuracy.toFixed(2)}%`} />
            <StatCard
                icon="🏆"
                title="Best Score"
                value={`${stats.best_score}%`} />
            <StatCard
                icon="✅"
                title="Questions Answered"
                value={stats.questions_answered} />
        </div>
    );
}

export default StatGrid;