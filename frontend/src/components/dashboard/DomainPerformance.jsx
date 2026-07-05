import "../../styles/domainPerformance.css";

function getDomainColorClass(accuracy) {
    if (accuracy >= 85) return "high";
    if (accuracy >= 70) return "medium";
    return "low";
}

function DomainPerformance({ domains }) {
    return (
        <div>
            {domains.length === 0 ? (
                <div className="empty-state">
                    <p>
                        Complete quizzes to unlock domain performance analytics.
                    </p>
                </div>
            ) : (
                domains.map((domain) => {
                    const colorClass = getDomainColorClass(domain.accuracy);

                    return (
                        <div className="domain-row" key={domain.domain}>
                            <div className="domain-header">
                                <span>{domain.domain}</span>
                                <strong>{domain.accuracy.toFixed(1)}%</strong>
                            </div>

                            <div className="domain-bar">
                                <div
                                    className={`domain-fill ${colorClass}`}
                                    style={{ width: `${domain.accuracy}%` }}
                                />
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default DomainPerformance;