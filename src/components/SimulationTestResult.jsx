
export default function SimulationTestResult({data}){
    return (
        <div className='test-result-container'>
            <p>Your assessment is complete.</p>
            <p>Total points based on your responses: {data.totalPoints}</p>
            <p>Assessment Outcome: {data.outcome}</p>
            {data.outcome === 'Passed' && (
                <p className="success">Congratulations! You have successfully passed the assessment.</p>
            )}
            {data.outcome === 'Strong Warning' && (
                <p className="warning">Warning: Based on your responses, you have received a strong warning.</p>
            )}
            {data.outcome === 'Soft Warning' && (
                <p className="warning">Warning: Based on your responses, you have received a soft warning.</p>
            )}
            {data.outcome === 'Failed' && (
                <p className="warning">Unfortunately, you did not pass the assessment.</p>
            )}
        </div>
    );
}