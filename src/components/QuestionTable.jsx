import '../css/question-table.css'
import {useEffect, useState} from "react";
import ReactPaginate from "react-paginate";

export default function QuestionTable({questions}) {
    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [subset, setSubset] = useState([]);

    useEffect(() => {
        if (questions) {
            const calculatedTotalPages = Math.ceil(questions.length / itemsPerPage);
            setTotalPages(calculatedTotalPages);
        }
    }, [questions]);

    useEffect(() => {
        if (questions) {
            const startIndex = currentPage * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const calculatedSubset = questions.slice(startIndex, endIndex);
            setSubset(calculatedSubset);
        }
    }, [currentPage, questions]);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    if (!questions) {
        return <div>No questions available</div>;
    }

    return (
        <div>
            <div className='wrapper-table-heading'>
                <h3 className='table-heading'>Questions and its answers.</h3>
            </div>
            <div>
                <table className="question-table">
                    <thead>
                    <tr className='column-list'>
                        <th>Question</th>
                        <th>Answers</th>
                        <th>Points</th>
                    </tr>
                    </thead>
                    <tbody>
                    {subset.map((question) => (
                        <tr key={question.id}>
                            <td>{question.text}</td>
                            <td>
                                <ul className="answer-list">
                                    {question.answers.map((answer) => (
                                        <li key={answer.key}>{answer.key}</li>
                                    ))}
                                </ul>
                            </td>
                            <td>
                                <ul className="points-list">
                                    {question.answers.map((answer) => (
                                        <li key={answer.key}>{answer.points}</li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="pagination-container">
                    <ReactPaginate
                        previousLabel={"<"}
                        nextLabel={">"}
                        breakLabel={"..."}
                        pageCount={totalPages}
                        onPageChange={handlePageChange}
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                    />
                </div>
            </div>
        </div>
    );
}