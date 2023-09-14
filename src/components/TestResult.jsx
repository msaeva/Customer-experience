import ResponseTable from "./Response";
import '../css/test-result.css'

export default function TestResult({handleTypeChange, tests}) {
    return (
        <div>
            {/*<h2>Test Results</h2>*/}
            {tests.map((test, index) => (
                <div key={index} className="test-result">
                    <div style={{display:"flex", justifyContent: "space-between"}}>
                        <h3>Test {index + 1}</h3>
                        <div className='search-field'>
                            <label htmlFor="category">Question Type:</label>
                            <select className="search-input"
                                    name="type"
                                    id="type"
                                    value=""
                                    onChange={handleTypeChange}
                            >
                                <option value="" disabled>Select type</option>
                                <option value="Financial Details">Financial Details</option>
                                <option value="Appropriateness Test">Appropriateness Test</option>
                            </select>
                        </div>
                    </div>
                    <p>
                        <strong>Time Submitted:</strong> {test.timeSubmitted || 'Not submitted'}
                    </p>
                    <ResponseTable questions={test.questions}/>
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