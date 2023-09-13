import Responses from "./Response";
import '../css/test-result.css'

export default function TestResult({tests}) {
    return (
        <div>
            {/*<h2>Test Results</h2>*/}
            {tests.map((test, index) => (
                <div key={index} className="test-result">
                    <h3>Test {index + 1}</h3>
                    <p>
                        <strong>Time Submitted:</strong> {test.timeSubmitted || 'Not submitted'}
                    </p>
                    <Responses questions={test.questions}/>
                    <div className="test-info">
                        <p>
                            <strong>Outcome:</strong> {test.outcome}
                        </p>
                        <p>
                            <strong>Total Points:</strong> {test.totalPoints}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}