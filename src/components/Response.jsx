import '../css/responses-table.css'
function ResponseTable({ questions }) {
    return (
        <div className="responses-table">
            <table>
                <thead>
                <tr>
                    <th>Question</th>
                    <th>Answer</th>
                    <th>Points</th>
                </tr>
                </thead>
                <tbody>
                {questions.map((question, index) => (
                    <tr key={index}>
                        <td>{question.questionText}</td>
                        <td>{question.answerText}</td>
                        <td>{question.answerPoints}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default ResponseTable;