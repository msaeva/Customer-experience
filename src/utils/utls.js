import {
    Background,
    Controls,
    MarkerType,
    MiniMap,
    ReactFlow,
    ReactFlowProvider,
    useEdgesState,
    useNodesState
} from "reactflow";
import CustomQuestion from "../components/CustomQuestion";
import {getQuestionnaire} from "../services/QuestionnaireService";

export const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}

// export default function ConfigurationView() {
//
//     const nodeTypes = {
//         custom: CustomQuestion,
//     };
//
//     const [nodes, setNodes, onNodesChange] = useNodesState([]);
//
//     const [edges, setEdges, onEdgesChange] = useEdgesState([]);
//
//     const minimapStyle = {
//         height: 120,
//     };
//
//     useEffect(() => {
//         const data = {customerId: 1, accountTradingType: 'CFD', category: 'Financial Details', version: 1}
//
//         getQuestionnaire(data)
//             .then((response) => {
//                 // console.log(response.data);
//
//                 const questions = response.data.questions;
//                 // console.log(questions);
//                 const firstQuestion = questions.find(question => question.key === response.data.firstQuestionKey);
//
//                 setNodes((previous) => [...previous, {
//                     id: firstQuestion.id.toString(),
//                     type: 'default',
//                     data: {
//                         label: firstQuestion.key,
//                     },
//                     position: {x: 0, y: 0},
//                 }])
//
//                 position(firstQuestion, questions, 1);
//
//
//             })
//             .catch((error) => {
//                 console.error('Error:', error);
//             })
//     }, []);
//
//     const position = (parent, questions, verticalLevel = 0) => {
//         const rowQuestionNodes = [], rowQuestionEdges = [];
//
//         let horizontalSpacingIndex = 0;
//
//
//         let answerKeys = [], index = 0;
//         const foundQuestionsPerRow = new Set();
//         for (const answer of parent.answers) {
//             if (answer === null) continue;
//
//             const question = questions.find(question => question.key === answer.nextQuestionKey) ?? null;
//             index++;
//             if (question === null) {
//                 const node = {
//                     id: generateRandomString(10),
//                     type: 'default',
//                     data: {
//                         label: 'Termination',
//                     },
//                     position: {x: 450 * horizontalSpacingIndex, y: 125 * verticalLevel},
//                 };
//
//                 rowQuestionEdges.push({
//                     id: parent.id + generateRandomString(15),
//                     source: parent.id.toString(),
//                     target: node.id,
//                     label: answer.key,
//                     markerEnd: {
//                         type: MarkerType.ArrowClosed,
//                     },
//                 });
//
//                 rowQuestionNodes.push(node);
//                 horizontalSpacingIndex++;
//                 continue;
//             }
//
//             answerKeys.push(answer.key.toString());
//
//             if (index === parent.answers.length) {
//                 rowQuestionEdges.push({
//                     id: parent.id + generateRandomString(10) + question.id,
//                     source: parent.id.toString(),
//                     target: question.id.toString(),
//                     label: answerKeys.join(' --> '),
//                     markerEnd: {
//                         type: MarkerType.ArrowClosed,
//                     },
//                 });
//             }
//
//
//             if (foundQuestionsPerRow.has(question.id)) {
//                 continue;
//             }
//
//             position(question, questions, verticalLevel + 1);
//             foundQuestionsPerRow.add(question.id);
//             rowQuestionNodes.push({
//                 id: question.id.toString(),
//                 type: 'custom',
//                 data: {
//                     label: question.key,
//                 },
//                 position: {x: 450 * horizontalSpacingIndex, y: 125 * verticalLevel},
//             });
//             horizontalSpacingIndex++;
//         }
//
//         setNodes((previous) => [...previous, ...rowQuestionNodes]);
//         setEdges((previous) => [...previous, ...rowQuestionEdges]);
//     }
//     const onInit = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);
//
//     return (
//         <div style={{height: '100vh'}}>
//             <ReactFlow
//                 nodes={nodes}
//                 edges={edges}
//                 onInit={onInit}
//                 nodeTypes={nodeTypes}
//                 fitView
//                 attributionPosition="top-right"
//             >
//                 <MiniMap style={minimapStyle} zoomable pannable/>
//                 <Controls/>
//                 <Background color="#aaa" gap={16}/>
//             </ReactFlow>
//
//         </div>
//
//     )
// }




// {
//
//     const nodeTypes = {
//         custom: CustomQuestion,
//     };
//
//     const [nodes, setNodes, onNodesChange] = useNodesState([]);
//
//     const [edges, setEdges, onEdgesChange] = useEdgesState([]);
//
//     const minimapStyle = {
//         height: 120,
//     };
//
//     useEffect(() => {
//         const data = {customerId: 1, accountTradingType: 'CFD', category: 'Financial Details', version: 1}
//
//         getQuestionnaire(data)
//             .then((response) => {
//                 // console.log(response.data);
//
//                 const questions = response.data.questions;
//                 // console.log(questions);
//                 const firstQuestion = questions.find(question => question.key === response.data.firstQuestionKey);
//
//                 setNodes((previous) => [...previous, {
//                     id: firstQuestion.id.toString(),
//                     type: 'default',
//                     data: {
//                         label: firstQuestion.key,
//                     },
//                     position: {x: 0, y: 0},
//                 }])
//
//                 position(firstQuestion, questions, 1);
//
//
//             })
//             .catch((error) => {
//                 console.error('Error:', error);
//             })
//     }, []);
//
//     const position = (parent, questions, verticalLevel = 0) => {
//         const rowQuestionNodes = [], rowQuestionEdges = [];
//
//         let horizontalSpacingIndex = 0;
//
//
//         let answerKeys = [], index = 0;
//         const foundQuestionsPerRow = new Set();
//         for (const answer of parent.answers) {
//             if (answer === null) continue;
//
//             const question = questions.find(question => question.key === answer.nextQuestionKey) ?? null;
//             index++;
//             if (question === null) {
//                 const node = {
//                     id: generateRandomString(10),
//                     type: 'default',
//                     data: {
//                         question: question,
//                         label: 'Termination',
//                     },
//                     position: {x: 450 * horizontalSpacingIndex, y: 125 * verticalLevel},
//                 };
//
//                 rowQuestionEdges.push({
//                     id: parent.id + generateRandomString(15),
//                     source: parent.id.toString(),
//                     target: node.id,
//                     label: answer.key,
//                     markerEnd: {
//                         type: MarkerType.ArrowClosed,
//                     },
//                 });
//
//                 rowQuestionNodes.push(node);
//                 horizontalSpacingIndex++;
//                 continue;
//             }
//
//             answerKeys.push(answer.key.toString());
//
//             if (index === parent.answers.length) {
//                 rowQuestionEdges.push({
//                     id: parent.id + generateRandomString(10) + question.id,
//                     source: parent.id.toString(),
//                     target: question.id.toString(),
//                     label: answerKeys.join(' --> '),
//                     markerEnd: {
//                         type: MarkerType.ArrowClosed,
//                     },
//                 });
//             }
//
//
//             if (foundQuestionsPerRow.has(question.id)) {
//                 continue;
//             }
//
//             position(question, questions, verticalLevel + 1);
//             foundQuestionsPerRow.add(question.id);
//             rowQuestionNodes.push({
//                 id: question.id.toString(),
//                 type: 'custom',
//                 data: {
//                     label: question.key,
//                     properties: {question}
//                 },
//                 draggable: true,
//                 position: {x: 450 * horizontalSpacingIndex, y: 150 * verticalLevel},
//             });
//             horizontalSpacingIndex++;
//         }
//
//         setNodes((previous) => [...previous, ...rowQuestionNodes]);
//         setEdges((previous) => [...previous, ...rowQuestionEdges]);
//     }
//     const onInit = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);
//
//     return (
//         <div style={{height: '100vh'}}>
//             <ReactFlowProvider>
//                 <ReactFlow
//                     nodes={nodes}
//                     edges={edges}
//                     onInit={onInit}
//                     nodeTypes={nodeTypes}
//                     fitView
//                     attributionPosition="top-right"
//                 >
//                     <MiniMap style={minimapStyle} zoomable pannable/>
//                     <Controls/>
//                     <Background color="#aaa" gap={16}/>
//                 </ReactFlow>
//             </ReactFlowProvider>
//
//         </div>
//
//     )
// }