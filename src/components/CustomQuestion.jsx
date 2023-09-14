import {Handle, Position} from "reactflow";
import {generateRandomString} from "../utils/utls";
import {useEffect} from "react";
import '../css/custion-question.css';

export default function CustomQuestion({ id, data }) {

    const question = data.properties.question;

    useEffect(() => {
        // console.log(data.properties);
    }, [])

    return (
        <div className='custom-question-container'>
            <Handle type="target"
                    id={question.id}
                    position={Position.Top}
                    isValidConnection={(connection) => console.log(connection )}
                    style={{top: '0', left: '50%', transform: 'translate(-50%, -50%)', width: '2rem' }}
                    // onConnect={(params) => console.log('handle onConnect', params)}
            />
            <h4 className='question-name'> { data.label } </h4>
            { question.answers.map((answer, index) => {
                return (
                        <div key={generateRandomString(10)}
                             className='answer-container'>
                            <span> { answer.key } </span>

                            <Handle type="source"
                                    id={answer.questionId + answer.key}

                                    // isValidConnection={(connection) => console.log(connection )}
                                    onConnect={(params) => console.log('handle onConnect', params)}
                                    style={{top: '50%', left: '100%', transform: 'translate(-50%, -50%)' }}/>
                        </div>
                )
              })
            }

        </div>
    )
}
