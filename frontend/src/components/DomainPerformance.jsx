function DomainPerformance({ domains }) {
    return (
        <div>
            {domains.length === 0 ? (
                <p>No domain data yet.</p>
            ) : (
                domains.map((domain) => (
                    <div className="domain-row" key={domain.domain}>
                        <div className="domain-header">
                            <span>{domain.domain}</span>
                            <strong>{domain.accuracy.toFixed(1)}%</strong>
                        </div>

                        <div className="domain-bar">
                            <div
                                className="domain-fill"
                                style={{ width: `${domain.accuracy}%` }}
                            />
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default DomainPerformance;