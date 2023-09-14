import {Handle, Position} from "reactflow";
import {generateRandomString} from "../utils/utls";
import {useEffect} from "react";
import '../css/custion-question.css';

export default function CustomQuestion({ id, data }) {

    useEffect(() => {
        console.log(id, 'inside custom question');
    }, [])

    return (
        <div className='custom-question-container'>
            <Handle type="target"
                    position={Position.Top}
                    isValidConnection={(connection) => console.log(connection )}
                    // onConnect={(params) => console.log('handle onConnect', params)}
            />
            <h4 className='question-name'> { data.label } </h4>
            { data.properties.question.answers.map((answer, index) => {
                return (
                        <div key={generateRandomString(10)}
                             className='answer-container'>
                            <span> { answer.key } </span>

                            <Handle type="source"
                                    // isValidConnection={(connection) => console.log(connection )}
                                    // onConnect={(params) => console.log('handle onConnect', params)}
                                    style={{top: '50%', left: '100%', transform: 'translate(-50%, -50%)' }}/>
                        </div>
                )
              })
            }

        </div>

    )

}